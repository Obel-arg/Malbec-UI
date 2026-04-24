import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MalbecThemeContext } from "./MalbecThemeContext";
import { malbecRecords } from "./presets";
import {
  TOKEN_NAMES,
  TOKEN_TO_CSS_VAR,
  type ThemeConfig,
  type ThemeMode,
} from "./tokens";

const STYLE_ID = "malbec-theme";

function schemeToBlock(selector: string, scheme: ThemeConfig["light"]): string {
  const lines: string[] = [];
  for (const name of TOKEN_NAMES) {
    const value = scheme[name];
    if (value != null && value !== "") {
      lines.push(`  ${TOKEN_TO_CSS_VAR[name]}: ${value};`);
    }
  }
  if (lines.length === 0) return "";
  return `${selector} {\n${lines.join("\n")}\n}`;
}

function buildOverrideStylesheet(theme: ThemeConfig): string {
  const root = schemeToBlock(":root", theme.light);
  const dark = schemeToBlock(".dark", theme.dark);
  return [root, dark].filter(Boolean).join("\n");
}

export interface MalbecThemeProviderProps {
  children: ReactNode;
  /** Full or partial theme; defaults to Records preset. */
  theme?: ThemeConfig;
  /**
   * Initial color scheme. Use `setMode` from `useTheme()` to change at runtime.
   * @default 'system'
   */
  defaultMode?: ThemeMode;
}

export function MalbecThemeProvider({
  children,
  theme: themeProp,
  defaultMode = "system",
}: MalbecThemeProviderProps) {
  const theme = themeProp ?? malbecRecords;
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
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

  useEffect(() => {
    if (typeof document === "undefined") return;
    const css = buildOverrideStylesheet(theme);
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = css;
    return () => {
      el?.remove();
    };
  }, [theme]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    const isDark =
      mode === "dark" ? true : mode === "light" ? false : systemDark;
    setModeState(isDark ? "light" : "dark");
  }, [mode, systemDark]);

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
