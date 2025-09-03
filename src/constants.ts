/* user will be considered AFK after this time */
export const IDLE_THRESHOLD: number = 300; // in seconds

/* The maximum amount of time between two heartbeats for them to be considered one session   */
export const HEARTBEAT_TIMEOUT = 2 * 60 * 1000; // in milliseconds

/* The time interval get new active window pings */
export const ACTIVE_WINDOW_PING_SECONDS = 5;
