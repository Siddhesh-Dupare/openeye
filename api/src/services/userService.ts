import { desc } from "drizzle-orm";
import { db } from "../../lib/db/client";
import { users } from "../../lib/db/schema";

export function getUsers() {
  return db.select().from(users).orderBy(desc(users.createAt));
}
