import { Heartbeat, RawWindowData } from "@/heartbeat/interface";

export abstract class ProgramHeartbeatPlugin {
  /** Return true if this plugin should handle the given app/window. */
  abstract matches(metadata: RawWindowData): boolean;

  /** Parse the metadata and return normalized heartbeat fields. */
  abstract parse(
    metadata: RawWindowData
  ): Pick<Heartbeat, "context" | "entity" | "project">;
  /* Parse the metadata title  */
  protected abstract parseTitle(title: string): {
    entity: string | null;
    project: string | null;
  };
}
