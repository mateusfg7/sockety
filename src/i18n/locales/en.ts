/**
 * English strings — the default locale and the type every other locale is
 * checked against (`export type Messages = typeof en`), so a missing key in
 * `pt-BR.ts`/`es.ts` is a compile error.
 */
export const en = {
  theme: {
    useLight: "Use light theme",
    useDark: "Use dark theme",
  },
  language: {
    label: "Change language",
  },
  about: {
    label: "About",
    title: "Sockety",
    description:
      "A desktop client for testing and debugging Socket.IO servers: connect, emit events and inspect what comes back.",
    license: "MIT License · © 2026 Mateus Felipe Gonçalves",
    madeBy: "Made by Mateus Felipe Gonçalves",
    sourceCode: "Source code on GitHub",
    close: "Close",
  },
  window: {
    minimize: "Minimize",
    maximize: "Maximize",
    restore: "Restore",
    close: "Close",
  },
};

export type Messages = typeof en;
