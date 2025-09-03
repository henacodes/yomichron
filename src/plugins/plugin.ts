import { Heartbeat, RawWindowData } from "@/heartbeat/interface";

export interface HeartbeatPlugin {
  /** Return true if this plugin should handle the given app/window. */
  matches(metadata: RawWindowData): boolean;

  /** Parse the metadata and return normalized heartbeat fields. */
  parse(
    metadata: RawWindowData
  ): Pick<Heartbeat, "context" | "entity" | "project">;
}
