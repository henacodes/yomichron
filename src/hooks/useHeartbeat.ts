import { useEffect, useRef } from "react";
import { handleWindowMetadata } from "@/heartbeat/emitter";
import { getCurrentActiveWindow } from "@/heartbeat/utils";
import { RawWindowData } from "@/heartbeat/interface";
import { HEARTBEAT_TIMEOUT, IDLE_THRESHOLD } from "@/constants";

export function useHeartbeat() {
  const lastHeartbeatRef = useRef<RawWindowData | null>(null);
  const lastTimestampRef = useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(async () => {
      const metadata = await getCurrentActiveWindow();

      const now = Date.now();
      const last = lastHeartbeatRef.current;

      /*

      * This will be true if 
      - User is not AFK and 
      - if user changed window/file/program or it has been 2 mins since last heartbeat was saved 
     
      */
      const shouldEmit =
        parseInt(metadata.idle_sec) <= IDLE_THRESHOLD &&
        (!last ||
          last.app_name !== metadata.app_name ||
          last.title !== metadata.title ||
          last.path_id !== metadata.path_id ||
          now - lastTimestampRef.current > HEARTBEAT_TIMEOUT);

      if (shouldEmit) {
        handleWindowMetadata(metadata);
        lastHeartbeatRef.current = metadata;
        lastTimestampRef.current = now;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
