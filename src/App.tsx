import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { db } from "./db/db";
import "./App.css";
import { Heartbeat, RawWindowData } from "@/heartbeat/interface";
import { useHeartbeat } from "./hooks/useHeartbeat";
import { getHeartbeats } from "./db/services/heartbeat";

interface FileProjectSummary {
  entity: string | null;
  project: string | null;
  count: number;
  totalIdle: number;
  lastTime: number;
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [summary, setSummary] = useState<FileProjectSummary[]>([]);

  useHeartbeat();

  async function fetchSummary() {
    try {
      const heartbeats = (await getHeartbeats()) as Heartbeat[];

      const grouped: Record<string, FileProjectSummary> = {};

      heartbeats.forEach((hb) => {
        const key = `${hb.entity || "null"}__${hb.project || "null"}`;
        if (!grouped[key]) {
          grouped[key] = {
            entity: hb.entity,
            project: hb.project,
            count: 0,
            totalIdle: 0,
            lastTime: hb.time,
          };
        }

        grouped[key].count += 1;
        grouped[key].totalIdle += hb.idle_sec;

        // Update lastTime if this heartbeat is newer
        if (hb.time > grouped[key].lastTime) {
          grouped[key].lastTime = hb.time;
        }
      });

      setSummary(Object.values(grouped));
    } catch (err) {
      console.error("Failed to fetch heartbeats:", err);
    }
  }

  fetchSummary();
  return (
    <div>
      <h2>File-Project Summary</h2>
      <table>
        <thead>
          <tr>
            <th>File (Entity)</th>
            <th>Project</th>
            <th>Count</th>
            <th>Total Idle (s)</th>
            <th>Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((s) => (
            <tr key={`${s.entity}-${s.project}`}>
              <td>{s.entity}</td>
              <td>{s.project}</td>
              <td>{s.count}</td>
              <td>{s.totalIdle}</td>
              <td>{new Date(s.lastTime * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
