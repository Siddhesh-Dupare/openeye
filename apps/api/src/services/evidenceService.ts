import { pool } from "../db.js";

export async function getEvidence() {
  const result = await pool.query(
    `
    SELECT
      id,
      goal_id,
      source_type,
      source_id,
      content,
      metadata,
      created_at
    FROM evidence
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}
