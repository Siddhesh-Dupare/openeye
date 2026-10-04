import { FastifyInstance } from "fastify";
import { getGoalStates } from "../services/goalStateService.js";

export async function goalStateRoutes(server: FastifyInstance) {
  server.get("/goal_states", async () => {
    const goalStates = await getGoalStates();

    return {
      goalStates
    };
  });
}
