import { afterAll, describe, expect, test, vi } from "vitest";

vi.mock("../src/services/userService", () => ({
  getUsers: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test User",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    },
  ]),
}));

import { buildServer } from "../src/server";

describe("GET /users", () => {
  const server = buildServer();

  afterAll(async () => {
    await server.close();
  });

  test("returns users", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([
      {
        id: 1,
        name: "Test User",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    ]);
  });
});
