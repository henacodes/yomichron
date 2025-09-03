mod migrations;
mod commands;



use commands::window_metadata_commands::get_current_active_window;
use migrations::get_migrations;




#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = get_migrations();
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:yomichron.db", migrations)
                .build(),
            )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_current_active_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
