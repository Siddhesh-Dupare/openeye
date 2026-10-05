import { FastifyInstance } from "fastify";
import { taskSchema, updateTaskSchema } from "../schemas/task.js";
import { z } from "zod";
import { getTasks, createTask, updateTask } from "../services/taskService.js";
import { createStateEvent } from "../services/stateEventService.js";

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

  server.patch("/tasks/:id", async (request, reply) => {
    const parsed = updateTaskSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid request",
        details: z.treeifyError(parsed.error),
      });
    }

    const params = request.params as { id: string };

    const result = await updateTask(
      params.id,
      parsed.data,
    );

    if (!result) {
      return reply.code(404).send({
        error: "Task not found"
      });
    }

    const { task, previousStatus } = result;

    if (previousStatus !== "completed" && task.status === "completed") {
      await createStateEvent({
        goalId: task.goal_id,
        eventType: "task_completed",
        description: `Task ${task.title} has been completed`,
        data: {
          taskId: task.id,
        }
      });
    }

    return reply.send(task);
  });
}
