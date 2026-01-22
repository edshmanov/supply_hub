import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  // Set default for local dev if not present (although we hardcoded sqlite.db in config, runtime needs it too or just use file)
  // Actually, for better-sqlite3 we just need a filename.
}

export const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema });
