import { FastifyInstance } from "fastify";
import { pool } from "../db.js";

export async function evidenceRoutes(server: FastifyInstance) {
  server.get("/evidence", async () => {
    const result = await pool.query(`
      SELECT * FROM evidence
      `);

    return {
      evidence: result.rows
    };
  });
}
