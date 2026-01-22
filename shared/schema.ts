import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ID Generator (Client/Server compatible)
function createId(): string {
  // Simple UUID v4 replacement that works in Node and Browser without polyfills
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Item groups (categories like "Block Paper", "DA Paper", etc.)
export const itemGroups = sqliteTable("item_groups", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  icon: text("icon").notNull().default("package"),
  sortOrder: integer("sort_order").notNull().default(0),
  isSingleItem: integer("is_single_item", { mode: "boolean" }).notNull().default(false),
});

export const insertItemGroupSchema = createInsertSchema(itemGroups).pick({
  name: true,
  icon: true,
  sortOrder: true,
  isSingleItem: true,
});

export type InsertItemGroup = z.infer<typeof insertItemGroupSchema>;
export type ItemGroup = typeof itemGroups.$inferSelect;

// Supply items table (variants within groups)
export const items = sqliteTable("items", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  groupId: text("group_id").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isRequested: integer("is_requested", { mode: "boolean" }).notNull().default(false),
  requestedAt: integer("requested_at", { mode: "timestamp" }),
});

export const insertItemSchema = createInsertSchema(items).pick({
  name: true,
  groupId: true,
  sortOrder: true,
});

export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;

// Combined type for frontend
export type ItemGroupWithItems = ItemGroup & {
  items: Item[];
};

// Users table (kept for structure continuity)
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(createId),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Orders table for tracking submitted orders
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey().$defaultFn(createId),
  items: text("items").notNull(), // JSON string of order items
  status: text("status").notNull().default("pending"), // pending, sent, completed
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  sentAt: integer("sent_at", { mode: "timestamp" }),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  items: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Cart item type for order submission
export interface OrderItem {
  itemId: string;
  itemName: string;
  groupId: string;
  groupName: string;
}
