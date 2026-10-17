import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { openUrl } from "@tauri-apps/plugin-opener";
import type { AppInfo } from "./types";

/** Fallback used in the browser (e.g. `vitest`, `vite dev` outside Tauri). */
export const FALLBACK_APP_INFO: AppInfo = {
  version: "0.0.0",
};

function isTauri(): boolean {
  return "__TAURI_INTERNALS__" in window;
}

/**
 * Fetches static app info (currently just the version) from the Rust
 * backend. Falls back to a hardcoded value when not running inside Tauri,
 * so the UI also renders in a plain browser during development.
 */
export async function getAppInfo(): Promise<AppInfo> {
  if (!isTauri()) {
    return FALLBACK_APP_INFO;
  }
  return invoke<AppInfo>("app_info");
}

/**
 * Opens `url` in the system's default browser. Inside Tauri this goes
 * through the opener plugin, since a plain `<a target="_blank">` would
 * otherwise navigate the app's own webview; outside Tauri it falls back to
 * `window.open`, same pattern as the other helpers here.
 */
export async function openExternal(url: string): Promise<void> {
  if (!isTauri()) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  await openUrl(url);
}

/** Minimizes the window. No-op outside Tauri. */
export async function minimizeWindow(): Promise<void> {
  if (!isTauri()) {
    return;
  }
  await getCurrentWindow().minimize();
}

/** Toggles between the window's maximized and restored state. No-op outside Tauri. */
export async function toggleMaximizeWindow(): Promise<void> {
  if (!isTauri()) {
    return;
  }
  await getCurrentWindow().toggleMaximize();
}

/** Closes the window. No-op outside Tauri. */
export async function closeWindow(): Promise<void> {
  if (!isTauri()) {
    return;
  }
  await getCurrentWindow().close();
}

/**
 * Calls `onChange` with the window's current maximized state, then again
 * every time it changes, so the custom title bar can swap its
 * maximize/restore icon. Returns a function that stops listening. Outside
 * Tauri, calls `onChange(false)` once and returns a no-op unsubscribe.
 */
export async function onMaximizedChange(
  onChange: (maximized: boolean) => void,
): Promise<() => void> {
  if (!isTauri()) {
    onChange(false);
    return () => {};
  }
  const win = getCurrentWindow();
  onChange(await win.isMaximized());
  return await win.onResized(async () => {
    onChange(await win.isMaximized());
  });
}
