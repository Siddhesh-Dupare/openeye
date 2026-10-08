import { describe, it, expect, afterAll } from "vitest";
import { pool } from "../../src/db.js";
import { createTask } from "../../src/services/taskService.js";
import { createUser } from "../../src/services/userService.js";
import { createGoal } from "../../src/services/goalService.js";

describe("Task Service", () => {
  it("should create a new task", async () => {

    const userCreation = await createUser(
      "Test Siddhesh Dupare"
    );

    expect(userCreation.name).toBe("Test Siddhesh Dupare");

    const goalCreation = await createGoal(
      userCreation.id,
      "Test Writing an email",
      "Test writing an email to a friend about the new project"
    );

    expect(goalCreation.user_id).toBe(userCreation.id);
    expect(goalCreation.title).toBe("Test Writing an email");
    expect(goalCreation.description).toBe("Test writing an email to a friend about the new project");
    expect(goalCreation.status).toBe("active");

    const taskCreation = await createTask(
      goalCreation.id,
      "Test write the email task",
      "Test write the email task to a friend about the new project",
    );

    expect(taskCreation.goal_id).toBe(goalCreation.id);
    expect(taskCreation.title).toBe("Test write the email task");
    expect(taskCreation.description).toBe("Test write the email task to a friend about the new project");
    expect(taskCreation.status).toBe("pending");
  });

  afterAll(async () => {
    await pool.end();
  });
});
