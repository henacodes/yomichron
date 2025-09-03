import { Heartbeat, RawWindowData } from "@/heartbeat/interface";
import { ProgramHeartbeatPlugin } from "./plugin";
import { VSCodiumPlugin } from "@plugins/vscode";

export const plugins: ProgramHeartbeatPlugin[] = [
  new VSCodiumPlugin(),
  // Add more plugins here!
];
