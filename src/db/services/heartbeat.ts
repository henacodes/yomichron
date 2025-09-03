import { Heartbeat } from "@/heartbeat/interface";
import { db } from "../db";

/**
 * @returns The inserted row's ID.
 */
export async function saveHeartbeat(
  heartbeat: Omit<Heartbeat, "id">
): Promise<number | undefined> {
  const result = await db.execute(
    `INSERT INTO heartbeat (
        time, entity, app_name, process_id, project, idle_sec, context
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      heartbeat.time,
      heartbeat.entity,
      heartbeat.app_name,
      heartbeat.process_id,
      heartbeat.project,
      heartbeat.idle_sec,
      heartbeat.context,
    ]
  );

  return result.lastInsertId;
}

export async function getHeartbeats() {
  const result = await db.select(
    `SELECT id, time, entity, app_name, process_id, project, idle_sec, context FROM heartbeat`
  );

  return result;
}
