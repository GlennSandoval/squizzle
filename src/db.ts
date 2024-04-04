import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema.ts";

import Database from "better-sqlite3";
const sqlite = new Database("database.db");

// Recommended setting for SQLite
// WAL = Write-Ahead Logging
sqlite.pragma("journal_mode = WAL");

// Init drizzle with our schema
console.log("Initializing drizzle");
const db = drizzle(sqlite, { schema });

export default db;

process.on("SIGTERM", () => {
  if (sqlite) {
    console.log("Closing database connection");
    sqlite.close();
  }
});
