import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { db } from "./db/db";
import "./App.css";
import { RawWindowData } from "./types/heartbeat";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [currentActiveWindowData, setCurrentActiveWindowData] =
    useState<RawWindowData | null>(null);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));

    const result = await db.execute(
      `INSERT INTO heartbeat (
        time, entity, app_name, process_id, project, idle_sec, context
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        1756615067.713, // time (number)
        "ExcerptCard.tsx", // entity (string or null)
        "VSCodium", // app_name (string)
        2593, // process_id (number)
        "bereans", // project (string or null)
        120, // idle (number of seconds, e.g. 120 for 2 minutes)
        "some string", // context (string or null)
      ]
    );

    console.log(result);
  }

  async function fetchActiveWindow() {
    let res = await invoke("get_current_active_window");
    let raw = res as RawWindowData;
    setCurrentActiveWindowData(raw);
  }

  useEffect(() => {
    fetchActiveWindow();
    const intervalId = setInterval(fetchActiveWindow, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
