import { plugins } from "@plugins/index";
import { RawWindowData, Heartbeat } from "@/heartbeat/interface";

export function handleWindowMetadata(metadata: RawWindowData) {
  for (const plugin of plugins) {
    if (plugin.matches(metadata)) {
      const parsed = plugin.parse(metadata);
      const heartbeat: Heartbeat = {
        // Fill in fields from parsed and raw metadata
        ...parsed,
        time: Date.now() / 1000,
        app_name: metadata.app_name,
        process_id: Number(metadata.process_id),
        idle_sec: Number(metadata.idle_sec),
      };
      console.log(heartbeat);

      console.log("SAVVEEEEEEEEEEEEEEEEEEE");
      //saveHeartbeatToDatabase(heartbeat);
      return;
    }
  }
  // Optionally log unhandled metadata
  console.log("No plugin for", metadata.app_name);
}
