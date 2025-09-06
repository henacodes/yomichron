import { ProgramHeartbeatPlugin } from "./plugin";
import type {
  RawWindowData,
  ParsedHeartbeatFields,
} from "../heartbeat/interface";

export class BlenderPlugin extends ProgramHeartbeatPlugin {
  matches(metadata: RawWindowData): boolean {
    return metadata.app_name.toLowerCase() == "blender";
  }

  parse(metadata: RawWindowData): ParsedHeartbeatFields {
    let parsed = this.parseTitle(metadata.title);
    console.log("parsed blender", parsed);
    return parsed;
  }

  protected parseTitle(title: string): ParsedHeartbeatFields {
    // all blender window ( with open project ) titles have "[path/to/project_file.blend]" in them
    const trimStartIndex = title.indexOf("[");
    const trimEndIndex = title.indexOf("]");

    const projectPath = title.slice(trimStartIndex + 1, trimEndIndex); // returns path/to/project_file.blend

    let arr = projectPath.split("/");

    return {
      entity: arr[arr.length - 1], // project_file.blend
      project: null,
      context: null,
    };
  }
}
