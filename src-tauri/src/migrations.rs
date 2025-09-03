use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_heatbeat_table",
            sql: r#"
                CREATE TABLE heartbeat (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time REAL NOT NULL,
                    entity TEXT,
                    app_name TEXT NOT NULL,
                    process_id INTEGER NOT NULL,
                    project TEXT,
                    idle_sec REAL NOT NULL, -- time in seconds
                    context TEXT
                );
            "#,
            kind: MigrationKind::Up,
        },
    ]
}