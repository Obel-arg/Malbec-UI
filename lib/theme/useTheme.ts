"use client";

import { useContext } from "react";
import { MalbecThemeContext } from "./MalbecThemeContext";
import type { MalbecThemeContextValue } from "./MalbecThemeContext";

export function useTheme(): MalbecThemeContextValue {
  const ctx = useContext(MalbecThemeContext);
  if (ctx == null) {
    throw new Error("useTheme must be used within MalbecThemeProvider");
  }
  return ctx;
}
