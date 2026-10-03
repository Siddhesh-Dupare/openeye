import Fastify from "fastify";
import { z } from "zod";
import { pool } from "./db";
import { userSchema } from "./schemas/user";

const server = Fastify({
  logger: true,
});

server.get("/health", async () => {

  const result = await pool.query("SELECT NOW()");

  return {
    status: "ok",
    service: "open-eye api",
    database: result.rows[0].now,
  }
});

server.get("/users", async () => {
  const result = await pool.query("SELECT id, name, created_at FROM users ORDER BY created_at DESC");

  return {
    users: result.rows,
  };
});

server.get("/goals", async () => {
  const result = await pool.query("SELECT * FROM goals");

  return {
    goals: result.rows,
  };
});

server.get("/tasks", async () => {
  const result = await pool.query("SELECT * FROM tasks");

  return {
    tasks: result.rows
  };
});

server.get("/evidence", async () => {
  const result = await pool.query("SELECT * FROM evidence");

  return {
    evidence: result.rows
  };
});

server.get("/goal_states", async () => {
  const result = await pool.query("SELECT * FROM goal_states");

  return {
    goal_states: result.rows
  };
});

// NOTE: When user enter his/her data
server.post("/users", async (request, reply) => {
  const parsed = userSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.code(400).send({
      error: "Invalid request",
      details: z.treeifyError(parsed.error),
    })
  }

  const result = await pool.query("INSERT INTO users (name) VALUES ($1) RETURNING id, name, created_at", [parsed.data.name]);

  return reply.code(201).send(result.rows[0]);
});

const start = async () => {
  try {
    await server.listen({
      port: 3001,
      host: "127.0.0.1",
    });
  } catch (error) {
    server.log.error("Failed to start server", error);
    process.exit(1);
  }
};

start();
