import { FastifyInstance } from "fastify";
import { goalSchema } from "../schema/goal";
import { getGoals } from "../services/goalService";

export default function goalRoute(server: FastifyInstance) {
  server.get("/goals", async () => {
    const goal = await getGoals();

    const result = goalSchema.safeParse(goal);

    if (!result.success) {
      server.log.error(result.error);
      throw new Error("Invalid goald data returned from database");
    }

    return result.data;
  });
}
