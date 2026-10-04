
import { FastifyInstance } from "fastify";
import { userSchema } from "../schemas/user.js";
import { z } from "zod";
import { createUser, getUsers } from "../services/userService.js";

export async function userRoutes(server: FastifyInstance) {
  server.get("/users", async () => {
    const users = await getUsers();

    return {
      users,
    };
  });

  server.post("/users", async (request, reply) => {
    const parsed = userSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid request",
        details: z.treeifyError(parsed.error),
      })
    }

    const result = await createUser(
      parsed.data.name
    );

    return reply.code(201).send(result.rows[0]);
  });
}
