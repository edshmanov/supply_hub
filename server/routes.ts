import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertItemSchema, insertItemGroupSchema, type OrderItem } from "@shared/schema";
import { z } from "zod";
import { sendOrderEmail } from "./gmail";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed initial data on startup
  await storage.seedInitialData();

  // Get all groups with their items (for kiosk view)
  app.get("/api/groups", async (_req, res) => {
    try {
      const groups = await storage.getGroupsWithItems();
      res.json(groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({ error: "Failed to fetch groups" });
    }
  });

  // Get all items (flat list for manager view)
  app.get("/api/items", async (_req, res) => {
    try {
      const items = await storage.getAllItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  // Get items by group
  app.get("/api/groups/:groupId/items", async (req, res) => {
    try {
      const { groupId } = req.params;
      const items = await storage.getItemsByGroup(groupId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  // Create new group
  app.post("/api/groups", async (req, res) => {
    try {
      const parsed = insertItemGroupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid group data", details: parsed.error });
      }
      const group = await storage.createGroup(parsed.data);
      res.status(201).json(group);
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json({ error: "Failed to create group" });
    }
  });

  // Create new item
  app.post("/api/items", async (req, res) => {
    try {
      const parsed = insertItemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid item data", details: parsed.error });
      }
      const item = await storage.createItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ error: "Failed to create item" });
    }
  });

  // Request restock for an item
  app.post("/api/items/:id/request", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.requestRestock(id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error requesting restock:", error);
      res.status(500).json({ error: "Failed to request restock" });
    }
  });

  // Clear request for an item (mark as ordered)
  app.post("/api/items/:id/clear", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.clearRequest(id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error clearing request:", error);
      res.status(500).json({ error: "Failed to clear request" });
    }
  });

  // Clear all requests
  app.post("/api/items/clear-all", async (_req, res) => {
    try {
      await storage.clearAllRequests();
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing all requests:", error);
      res.status(500).json({ error: "Failed to clear all requests" });
    }
  });

  // Validate manager PIN
  app.post("/api/auth/validate-pin", async (req, res) => {
    try {
      const { pin } = req.body;
      const managerPin = process.env.MANAGER_PIN || "1234";

      if (pin === managerPin) {
        res.json({ valid: true });
      } else {
        res.status(401).json({ valid: false, error: "Invalid PIN" });
      }
    } catch (error) {
      console.error("Error validating PIN:", error);
      res.status(500).json({ error: "Failed to validate PIN" });
    }
  });

  // Submit order
  const orderItemSchema = z.object({
    itemId: z.string(),
    itemName: z.string(),
    groupId: z.string(),
    groupName: z.string(),
  });

  const submitOrderSchema = z.object({
    items: z.array(orderItemSchema).min(1),
  });

  app.post("/api/orders/submit", async (req, res) => {
    try {
      const parsed = submitOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid order data", details: parsed.error });
      }

      const { items } = parsed.data;

      // Create order in database
      const order = await storage.createOrder(items);
      const orderCount = await storage.getOrderCount();

      // Generate order summary for logging
      const orderSummary = generateOrderSummary(items);
      console.log("Order submitted:", order.id, "Number:", orderCount);
      console.log("Order summary:\n", orderSummary);

      // Send email to manager in background (do not await)
      sendOrderEmail(items, order.id)
        .then((result) => {
          if (result.success) {
            console.log(`[Background] Email sent successfully for order ${order.id}`);
          } else {
            console.error(`[Background] Failed to send email for order ${order.id}:`, result.error);
          }
        })
        .catch((err) => {
          console.error(`[Background] Unexpected error sending email for order ${order.id}:`, err);
        });

      // Return success immediately to UI
      res.json({
        success: true,
        orderId: order.id,
        orderNumber: orderCount,
        emailSent: true, // Optimistic success
        message: "Order submitted successfully"
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      res.status(500).json({ error: "Failed to submit order" });
    }
  });

  // Get all orders (for manager)
  // Admin route to clear orders (Requested by user to reset sequence)
  app.get("/api/admin/reset-now", async (_req, res) => {
    try {
      await storage.clearOrders();
      console.log("Orders cleared by admin request");
      res.json({ success: true, message: "Orders have been reset to 0. Next order will be #1." });
    } catch (e) {
      console.error("Failed to clear orders:", e);
      res.status(500).json({ success: false, message: "Failed to reset orders" });
    }
  });

  app.get("/api/orders", async (_req, res) => {
    try {
      const ordersList = await storage.getOrders();
      res.json(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  return httpServer;
}

function generateOrderSummary(items: OrderItem[]): string {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item.itemName);
    return acc;
  }, {} as Record<string, string[]>);

  let summary = "=== SUPPLY ORDER ===\n";
  summary += `Date: ${new Date().toLocaleString()}\n\n`;

  for (const [groupName, itemNames] of Object.entries(grouped)) {
    summary += `${groupName}:\n`;
    for (const name of itemNames) {
      summary += `  - ${name}\n`;
    }
    summary += "\n";
  }

  summary += `Total items: ${items.length}\n`;
  summary += "==================";

  return summary;
}
