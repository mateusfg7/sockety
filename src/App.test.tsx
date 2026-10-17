import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { mockTauriWindow } from "./test/setup";

beforeEach(() => {
  // Undoes any `vi.spyOn` left over from a previous test (e.g. the OS-language mock below).
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("App", () => {
  it("renders the header with the app name and version badge", async () => {
    render(<App />);

    expect(screen.getByText("Sockety")).toBeInTheDocument();
    expect(await screen.findByText(/^v/)).toBeInTheDocument();
  });

  it("renders the custom title bar's window controls and wires them to the Tauri window", async () => {
    render(<App />);

    expect(await screen.findByRole("button", { name: "Minimize" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Maximize" })).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(mockTauriWindow.close).toHaveBeenCalledOnce();
  });

  it("switches the UI to Português (Brasil) via the language menu and persists the choice", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "Change language" }));
    fireEvent.click(await screen.findByRole("menuitemradio", { name: "Português (Brasil)" }));

    expect(await screen.findByRole("button", { name: "Alterar idioma" })).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe("pt-BR"));
    expect(localStorage.getItem("sockety.locale")).toBe("pt-BR");
  });

  it("starts in Spanish when the OS language is Spanish and nothing was stored", async () => {
    vi.spyOn(navigator, "languages", "get").mockReturnValue(["es-ES"]);

    render(<App />);

    expect(await screen.findByRole("button", { name: "Cambiar idioma" })).toBeInTheDocument();
  });

  it("shows the license and a link to the source code in the About dialog", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "About" }));

    expect(await screen.findByText(/MIT License/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source code on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/mateusfg7/sockety",
    );
  });
});
