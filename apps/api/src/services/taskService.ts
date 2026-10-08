import { pool } from "../db.js";
import type { Pool, PoolClient } from "pg";
import { createStateEvent } from "./stateEventService.js";

export async function getTasks() {
  const result = await pool.query(
    `
    SELECT
      id,
      goal_id,
      title,
      description,
      status,
      priority,
      due_at,
      created_at,
      updated_at
    FROM tasks
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}

export async function createTask(
  goalId: string,
  title: string,
  description: string | undefined
) {
  const result = await pool.query(
    `
    INSERT INTO tasks (goal_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING
      id,
      goal_id,
      title,
      description,
      status,
      priority,
      due_at,
      created_at,
      updated_at
    `,
    [goalId, title, description]
  );

  return result.rows[0];
}

type UpdateTaskParams = {
  title?: string;
  description?: string | null;
  status?: "pending" | "in_progress" | "completed" | "cancelled";
  priority?: "low" | "medium" | "high";
  dueAt?: string | null;
}

export async function updateTask(
  taskId: string,
  data: UpdateTaskParams,
  client: Pool | PoolClient = pool,
) {

  const currentTask = await client.query(
    `
    SELECT
      status
    FROM tasks
    WHERE id = $1
    FOR UPDATE
    `,
    [taskId]
  );

  if (currentTask.rows.length === 0)
    return null;

  const previousStatus = currentTask.rows[0].status;

  const fields: string[] = [];
  const values: unknown[] = [taskId];

  if (data.title !== undefined) {
    fields.push(`title = $${values.length + 1}`);
    values.push(data.title);
  }

  if (data.description !== undefined) {
    fields.push(`description = $${values.length + 1}`);
    values.push(data.description);
  }

  if (data.status !== undefined) {
    fields.push(`status = $${values.length + 1}`);
    values.push(data.status);
  }

  if (data.priority !== undefined) {
    fields.push(`priority = $${values.length + 1}`);
    values.push(data.priority);
  }

  if (data.dueAt !== undefined) {
    fields.push(`due_at = $${values.length + 1}`);
    values.push(data.dueAt);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push(`updated_at = NOW()`);

  const result = await client.query(
    `
    UPDATE tasks
    SET
      ${fields.join(",\n      ")}
    WHERE id = $1
    RETURNING
      id,
      goal_id,
      title,
      description,
      status,
      priority,
      due_at,
      created_at,
      updated_at
    `,
    values,
  );

  return {
    task: result.rows[0],
    previousStatus,
  }
}

export async function updateTaskWithStateEvent(
  taskId: string,
  data: UpdateTaskParams
) {

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await updateTask(
      taskId,
      data,
      client
    );

    if (!result) {
      await client.query("ROLLBACK");
      return null;
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
      }, client);
    }

    await client.query("COMMIT");

    return task;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
