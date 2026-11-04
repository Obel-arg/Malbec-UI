import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MalbecThemeProvider } from "./MalbecThemeProvider";
import { useTheme } from "./useTheme";

function Mode() {
  const { mode, resolvedMode } = useTheme();
  return <span>{`${mode}/${resolvedMode}`}</span>;
}

describe("Theme defaults (2.0)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove("dark");
  });

  it("starts in light mode even when the OS prefers dark", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-color-scheme: dark)",
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    render(
      <MalbecThemeProvider>
        <Mode />
      </MalbecThemeProvider>,
    );
    expect(screen.getByText("light/light")).toBeDefined();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
