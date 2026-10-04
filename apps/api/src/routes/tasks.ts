import { FastifyInstance } from "fastify";
import { taskSchema } from "../schemas/task.js";
import { z } from "zod";
import { getTasks, createTask } from "../services/taskService.js";

export async function taskRoutes(server: FastifyInstance) {
  server.get("/tasks", async () => {
    const tasks = await getTasks();

    return {
      tasks
    };
  });

  server.post("/tasks", async (request, reply) => {
    const parsed = taskSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid request",
        details: z.treeifyError(parsed.error),
      })
    }

    const result = await createTask(
      parsed.data.goal_id,
      parsed.data.title,
      parsed.data.description
    );

    return reply.code(201).send(result.rows[0]);
  });
}
