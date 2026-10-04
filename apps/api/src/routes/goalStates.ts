import { FastifyInstance } from "fastify";
import { getGoalStates } from "../services/goalStateService.js";

export async function goalStateRoutes(server: FastifyInstance) {
  server.get("/goal_states", async () => {
    const goal_states = await getGoalStates();

    return {
      goal_states
    };
  });
}
