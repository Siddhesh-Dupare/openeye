import { FastifyInstance } from "fastify";
import { getUsers } from "../services/userService";

export default function userRoute(server: FastifyInstance) {
  server.get("/users", async () => {
    return getUsers();
  });
}
