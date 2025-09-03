import { ProgramHeartbeatPlugin } from "@plugins/plugin";
import type { RawWindowData, Heartbeat } from "../heartbeat/interface";

export class VSCodiumPlugin extends ProgramHeartbeatPlugin {
  matches(metadata: RawWindowData): boolean {
    return metadata.app_name === "VSCodium";
  }

  parse(
    metadata: RawWindowData
  ): Pick<Heartbeat, "context" | "project" | "entity"> {
    console.log(metadata.title);
    const { entity, project } = this.parseTitle(metadata.title);
    return {
      entity,
      project,
      context: metadata.window_id,
    };
  }

  protected parseTitle(title: string): {
    entity: string | null;
    project: string | null;
  } {
    const cleanTitle = title.replace("● ", "").trim();
    const parts = cleanTitle.split(" - ");

    let entity: string | null = null;
    let project: string | null = null;

    if (parts.length === 3) {
      entity = parts[0].trim() || null;
      project = parts[1].trim() || null;
    } else if (parts.length === 2) {
      entity = parts[0].trim() || null;
      project = null;
    }

    return { entity, project };
  }
}
