import type { ReactNode } from "react";
import { MalbecThemeClientProvider } from "./MalbecThemeClientProvider";
import { malbecRecords } from "./presets";
import {
  TOKEN_NAMES,
  TOKEN_TO_CSS_VAR,
  type ThemeConfig,
  type ThemeMode,
} from "./tokens";

const STYLE_ID = "malbec-theme";
const DEFAULT_STORAGE_KEY = "malbec-theme-mode";

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

function buildPreHydrationScript(
  defaultMode: ThemeMode,
  storageKey: string,
): string {
  return `(function(){try{var k=${JSON.stringify(storageKey)};var d=${JSON.stringify(
    defaultMode,
  )};var s=null;try{s=localStorage.getItem(k);}catch(e){}var m=(s==='light'||s==='dark'||s==='system')?s:d;var dk=m==='dark'||(m==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dk);}catch(e){}})();`;
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
  /**
   * localStorage key used to persist the user's mode across reloads.
   * The pre-hydration script reads this key to set `.dark` before paint.
   * @default 'malbec-theme-mode'
   */
  storageKey?: string;
}

export function MalbecThemeProvider({
  children,
  theme: themeProp,
  defaultMode = "system",
  storageKey = DEFAULT_STORAGE_KEY,
}: MalbecThemeProviderProps) {
  const theme = themeProp ?? malbecRecords;
  const css = buildOverrideStylesheet(theme);
  const initScript = buildPreHydrationScript(defaultMode, storageKey);

  return (
    <>
      <style
        id={STYLE_ID}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: theme tokens are author-controlled
        dangerouslySetInnerHTML={{ __html: css }}
      />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: script content is generated from typed inputs
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
      <MalbecThemeClientProvider
        theme={theme}
        defaultMode={defaultMode}
        storageKey={storageKey}
      >
        {children}
      </MalbecThemeClientProvider>
    </>
  );
}
