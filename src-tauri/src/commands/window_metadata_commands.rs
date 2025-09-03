use active_win_pos_rs::{get_active_window};
use serde::Serialize;
use user_idle_time::get_idle_time;


#[derive(Serialize)]
pub struct WindowInfo {
    title: String,
    app_name: String,
    path_id:String,
    window_id: String,
    process_id:u64,
    x: f64,
    y: f64,
    width: f64,
    height: f64,
    idle_sec:u64
}


#[tauri::command]
pub fn get_current_active_window() -> Option<WindowInfo> {
    let idle = get_idle_time().unwrap();
    let idle_seconds = idle.as_secs();

    match get_active_window() {
        Ok(aw) => Some(WindowInfo {
            title: aw.title,
            path_id:aw.process_path.to_string_lossy().to_string(),
            app_name: aw.app_name,
            window_id: aw.window_id,
            process_id:aw.process_id,
            x: aw.position.x,
            y: aw.position.y,
            width: aw.position.width,
            height: aw.position.height,
            idle_sec:idle_seconds
        }),
        Err(()) => None,
    }
}