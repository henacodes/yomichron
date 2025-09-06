import { Heartbeat, RawWindowData } from "@/heartbeat/interface";
import { ProgramHeartbeatPlugin } from "./plugin";
import { VSCodiumPlugin } from "@plugins/vscode";
import { BlenderPlugin } from "./blender";

export const plugins: ProgramHeartbeatPlugin[] = [
  new VSCodiumPlugin(),
  new BlenderPlugin(),
  // Add more plugins here!
];
