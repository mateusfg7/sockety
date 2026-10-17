import { useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { StatusBar } from "./components/StatusBar";
import { I18nProvider } from "./i18n";
import { getAppInfo } from "./lib/ipc";
import type { AppInfo } from "./lib/types";

export function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

function AppContent() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    getAppInfo().then(setAppInfo);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-kumo-base text-kumo-default">
      <AppHeader appInfo={appInfo} />

      <main className="flex flex-1 items-center justify-center overflow-hidden">
        {/* Socket.IO connection UI lands in a later task. */}
      </main>

      <StatusBar />
    </div>
  );
}
