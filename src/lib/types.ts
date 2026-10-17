/**
 * Shared data contract between the Rust backend and the React frontend.
 */

/** Static info shown in the app header, returned by the `app_info` command. */
export interface AppInfo {
  version: string;
}
