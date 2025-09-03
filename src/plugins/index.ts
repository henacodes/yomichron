import { Heartbeat, RawWindowData } from "@/heartbeat/interface";
import { HeartbeatPlugin } from "./plugin";
import { VSCodiumPlugin } from "@plugins/vscode";

export const plugins: HeartbeatPlugin[] = [
  new VSCodiumPlugin(),
  // Add more plugins here!
];
