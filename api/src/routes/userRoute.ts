import { FastifyInstance } from "fastify";
import { userSchema } from "../schema/userSchema";
import { getUsers } from "../services/userService";
import { z } from "zod";

export default function userRoute(server: FastifyInstance) {
  server.get("/users", async () => {
    const users = getUsers();

    return users;
  });
}
