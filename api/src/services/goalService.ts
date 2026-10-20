import { desc } from "drizzle-orm";
import { db } from "../../lib/db/client";
import { goals } from "../../lib/db/schema";

export function getGoals() {
  return db.select().from(goals).orderBy(desc(goals.createdAt));
}
