import { FastifyInstance } from "fastify";
import { getEvidence } from "../services/evidenceService.js";

export async function evidenceRoutes(server: FastifyInstance) {
  server.get("/evidence", async () => {
    const evidence = await getEvidence();

    return {
      evidence
    };
  });
}
