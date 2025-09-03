import type { HeartbeatPlugin } from "@plugins/plugin";
import type { RawWindowData, Heartbeat } from "../heartbeat/interface";

export class VSCodiumPlugin implements HeartbeatPlugin {
  matches(metadata: RawWindowData): boolean {
    return metadata.app_name === "VSCodium";
  }

  parse(
    metadata: RawWindowData
  ): Pick<Heartbeat, "context" | "project" | "entity"> {
    const titleParts = metadata.title.split(" - ");
    const entity = titleParts[0]?.replace("● ", "").trim() || null;
    const project = titleParts[1]?.trim() || null;
    return {
      entity,
      project,
      context: metadata.window_id,
    };
  }
}
