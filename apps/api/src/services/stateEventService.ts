import { pool } from "../db.js";
import type { Pool, PoolClient } from "pg";

type CreateStateEventParams = {
  goalId: string;
  eventType: string;
  description?: string;
  data?: Record<string, unknown>;
};

export async function getStateEvents() {
  const result = await pool.query(
    `
    SELECT
      id,
      goal_id,
      event_type,
      description,
      data,
      created_at
    FROM state_events
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}

export async function createStateEvent(
  params: CreateStateEventParams,
  client: Pool | PoolClient = pool,
) {
  const result = await client.query(
    `
    INSERT INTO state_events (goal_id, event_type, description, data)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      goal_id,
      event_type,
      description,
      data,
      created_at
    `,
    [params.goalId, params.eventType, params.description, params.data ?? {}]
  );

  return result.rows[0];
}
