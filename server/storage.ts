import {
  items, itemGroups, orders,
  type Item, type InsertItem,
  type ItemGroup, type InsertItemGroup,
  type ItemGroupWithItems,
  type User, type InsertUser, users,
  type Order, type OrderItem
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

export interface IStorage {
  // Item Groups
  getAllGroups(): Promise<ItemGroup[]>;
  getGroupsWithItems(): Promise<ItemGroupWithItems[]>;
  createGroup(group: InsertItemGroup): Promise<ItemGroup>;

  // Items
  getAllItems(): Promise<Item[]>;
  getItem(id: string): Promise<Item | undefined>;
  getItemsByGroup(groupId: string): Promise<Item[]>;
  createItem(item: InsertItem): Promise<Item>;
  requestRestock(id: string): Promise<Item | undefined>;
  clearRequest(id: string): Promise<Item | undefined>;
  clearAllRequests(): Promise<void>;

  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Orders
  createOrder(orderItems: OrderItem[]): Promise<Order>;
  getOrders(): Promise<Order[]>;

  getOrderCount(): Promise<number>;
  clearOrders(): Promise<void>;

  // Seeding
  seedInitialData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Item Groups
  async getAllGroups(): Promise<ItemGroup[]> {
    const groups = await db.select().from(itemGroups).orderBy(asc(itemGroups.name));

    // Deduplicate logic: Keep only the first occurrence of each group name
    const uniqueMap = new Map<string, ItemGroup>();
    groups.forEach(g => {
      // Normalize name for check (optional, but safer)
      const key = g.name.trim();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, g);
      }
    });

    return Array.from(uniqueMap.values());
  }

  async getGroupsWithItems(): Promise<ItemGroupWithItems[]> {
    const groups = await this.getAllGroups();
    const allItems = await this.getAllItems();

    return groups.map(group => ({
      ...group,
      items: allItems
        .filter(item => item.groupId === group.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
    }));
  }

  async createGroup(insertGroup: InsertItemGroup): Promise<ItemGroup> {
    const [group] = await db.insert(itemGroups).values(insertGroup).returning();
    return group;
  }

  // Items
  async getAllItems(): Promise<Item[]> {
    return db.select().from(items).orderBy(asc(items.sortOrder));
  }

  async getItem(id: string): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item || undefined;
  }

  async getItemsByGroup(groupId: string): Promise<Item[]> {
    return db.select().from(items).where(eq(items.groupId, groupId)).orderBy(asc(items.sortOrder));
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const [item] = await db.insert(items).values(insertItem).returning();
    return item;
  }

  async requestRestock(id: string): Promise<Item | undefined> {
    const [item] = await db
      .update(items)
      .set({ isRequested: true, requestedAt: new Date() })
      .where(eq(items.id, id))
      .returning();
    return item || undefined;
  }

  async clearRequest(id: string): Promise<Item | undefined> {
    const [item] = await db
      .update(items)
      .set({ isRequested: false, requestedAt: null })
      .where(eq(items.id, id))
      .returning();
    return item || undefined;
  }

  async clearAllRequests(): Promise<void> {
    await db
      .update(items)
      .set({ isRequested: false, requestedAt: null })
      .where(eq(items.isRequested, true));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Orders
  async createOrder(orderItems: OrderItem[]): Promise<Order> {
    const [order] = await db.insert(orders).values({
      items: JSON.stringify(orderItems),
    }).returning();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrderCount(): Promise<number> {
    const ordersList = await this.getOrders();
    return ordersList.length;
  }

  async clearOrders(): Promise<void> {
    await db.delete(orders);
  }

  // Seed initial inventory data
  async seedInitialData(): Promise<void> {
    const existingGroups = await this.getAllGroups();
    if (existingGroups.length > 0) {
      return; // Already seeded
    }

    // Create groups with their items
    const seedData = [
      {
        group: { name: "Block Paper", icon: "block-paper", sortOrder: 1, isSingleItem: false },
        items: ["40", "80", "180", "240", "320"]
      },
      {
        group: { name: "Scuff Roll", icon: "scuff-roll", sortOrder: 2, isSingleItem: false },
        items: ["Red", "Grey"]
      },
      {
        group: { name: "DA Paper", icon: "da-paper", sortOrder: 3, isSingleItem: false },
        items: ["40", "80", "180", "240", "320", "400", "600"]
      },
      {
        group: { name: "Primer", icon: "primer", sortOrder: 4, isSingleItem: false },
        items: ["Dimension DP 840", "Super Build 4:1", "Finish Sand 4:1", "Bulldog"]
      },
      {
        group: { name: "Filler Bondo", icon: "filler", sortOrder: 5, isSingleItem: true },
        items: ["Filler Bondo"]
      },
      {
        group: { name: "Glaze", icon: "glaze", sortOrder: 6, isSingleItem: true },
        items: ["Glaze"]
      },
      {
        group: { name: "Wax & Grease", icon: "wax-grease", sortOrder: 7, isSingleItem: true },
        items: ["Wax & Grease Remover"]
      },
      {
        group: { name: "Lacquer Thinner", icon: "lacquer", sortOrder: 8, isSingleItem: true },
        items: ["Lacquer Thinner"]
      },
      {
        group: { name: "Yellow Tape", icon: "tape", sortOrder: 9, isSingleItem: true },
        items: ["Yellow Tape"]
      },
      {
        group: { name: "Plastic Sheet", icon: "plastic-sheet", sortOrder: 10, isSingleItem: true },
        items: ["Plastic Sheet for Masking"]
      },
      {
        group: { name: "Spray Cans", icon: "spray-can", sortOrder: 11, isSingleItem: false },
        items: ["Adhesive Remover", "Etch Primer"]
      },
      {
        group: { name: "Parts", icon: "parts", sortOrder: 12, isSingleItem: false },
        items: ["Fender", "Innerstructer", "Doors", "Cargo door", "Extender"]
      },
      {
        group: { name: "Gloves", icon: "gloves", sortOrder: 13, isSingleItem: false },
        items: ["S", "M", "L", "XL"]
      },
      {
        group: { name: "Wishlist", icon: "wishlist", sortOrder: 14, isSingleItem: true },
        items: ["Wishlist"]
      }
    ];

    for (const { group, items: itemNames } of seedData) {
      const createdGroup = await this.createGroup(group);

      for (let i = 0; i < itemNames.length; i++) {
        await this.createItem({
          name: itemNames[i],
          groupId: createdGroup.id,
          sortOrder: i + 1
        });
      }
    }
  }
}

export const storage = new DatabaseStorage();
