import { afterAll, describe, expect, test, vi } from "vitest";

vi.mock("../src/services/goalService", () => ({
  getGoals: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      title: "A new title",
      description: "A description for the title",
      status: "active",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    },
  ]),
}));

import { buildServer } from "../src/server";
import { getGoals } from "../src/services/goalService";

const mockedGetGoals = vi.mocked(getGoals);

describe("GET /goals", () => {
  const server = buildServer();

  afterAll(async () => {
    await server.close();
  });

  test("returns goals", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/goals",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([
      {
        id: 1,
        userId: 1,
        title: "A new title",
        description: "A description for the title",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ]);
  });
});
