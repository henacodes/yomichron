export interface RawWindowData {
  title: string;
  app_name: string;
  path_id: string;
  process_id: string;
  window_id: string;
  x: string;
  y: string;
  width: string;
  height: string;
  idle_sec: string;
}

export interface Heartbeat {
  time: number; //
  entity: string | null;
  app_name: string;
  process_id: number;
  project: string | null;
  idle_sec: number;
  context: string | null;
}
