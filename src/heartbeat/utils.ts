import { invoke } from "@tauri-apps/api/core";
import { RawWindowData } from "@/heartbeat/interface";

export async function getCurrentActiveWindow() {
  let res = await invoke("get_current_active_window");
  let raw = res as RawWindowData;

  return raw;
}
