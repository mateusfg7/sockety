import { Surface } from "@cloudflare/kumo";

/**
 * Footer bar placeholder, keeping the app shell's layout proportions. Becomes
 * the connection/event status summary once Socket.IO features land.
 */
export function StatusBar() {
  return (
    <Surface
      as="footer"
      className="flex items-center gap-6 border-t border-kumo-hairline bg-kumo-elevated px-6 py-3"
    />
  );
}
