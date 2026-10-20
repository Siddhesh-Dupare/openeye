import { pgTable, pgEnum, bigint, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const statusEnum = pgEnum("status", [
  "active",
  "completed",
  "paused",
  "cancelled",
]);

export const goals = pgTable("goals", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: statusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
