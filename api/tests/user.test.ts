import { afterAll, describe, expect, test, vi } from "vitest";

vi.mock("../src/services/userService", () => ({
  getUsers: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test User",
      createAt: new Date("2026-01-01T00:00:00.000Z"),
    },
  ]),
}));

import { buildServer } from "../src/server";
import { getUsers } from "../src/services/userService";

const mockedGetUsers = vi.mocked(getUsers);

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
        createAt: "2026-01-01T00:00:00.000Z",
      },
    ]);
  });

  test("returns an empty array when no users are found", async () => {
    mockedGetUsers.mockResolvedValueOnce([]);

    const response = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([]);
  });

  test("returs error when name field is not provided", async () => {
    mockedGetUsers.mockResolvedValueOnce([
      {
        id: 2,
        createAt: "2026-01-01T00:00:00.000Z",
      },
    ]);

    const response = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(response.statusCode).toBe(500);
  });
});
