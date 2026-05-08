"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MalbecThemeContext } from "./MalbecThemeContext";
import type { ThemeConfig, ThemeMode } from "./tokens";

interface MalbecThemeClientProviderProps {
  children: ReactNode;
  theme: ThemeConfig;
  defaultMode: ThemeMode;
  storageKey: string;
}

function readStoredMode(
  storageKey: string,
  fallback: ThemeMode,
): ThemeMode {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch {
    // ignore
  }
  return fallback;
}

export function MalbecThemeClientProvider({
  children,
  theme,
  defaultMode,
  storageKey,
}: MalbecThemeClientProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    readStoredMode(storageKey, defaultMode),
  );
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setSystemDark(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const resolvedMode: "light" | "dark" = useMemo(() => {
    if (mode === "light") return "light";
    if (mode === "dark") return "dark";
    return systemDark ? "dark" : "light";
  }, [mode, systemDark]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", resolvedMode === "dark");
  }, [resolvedMode]);

  const persist = useCallback(
    (next: ThemeMode) => {
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      persist(next);
    },
    [persist],
  );

  const toggle = useCallback(() => {
    const isDark =
      mode === "dark" ? true : mode === "light" ? false : systemDark;
    const next: ThemeMode = isDark ? "light" : "dark";
    setModeState(next);
    persist(next);
  }, [mode, systemDark, persist]);

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      setMode,
      toggle,
      theme,
    }),
    [mode, resolvedMode, setMode, toggle, theme],
  );

  return (
    <MalbecThemeContext.Provider value={value}>
      {children}
    </MalbecThemeContext.Provider>
  );
}
