import { createContext } from "react";
import type { ThemeConfig, ThemeMode } from "./tokens";

export interface MalbecThemeContextValue {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
  theme: ThemeConfig;
}

export const MalbecThemeContext =
  createContext<MalbecThemeContextValue | null>(null);
