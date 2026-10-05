import { FastifyInstance } from "fastify";
import { getStateEvents } from "../services/stateEventService.js";

export async function stateEventsRoutes(server: FastifyInstance) {
  server.get("/state_events", async () => {
    const stateEvents = await getStateEvents();

    return {
      stateEvents,
    }
  });
}
