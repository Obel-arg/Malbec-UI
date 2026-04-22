export const TOKEN_NAMES = [
  "background-100",
  "background-200",
  "background-300",
  "foreground",
  "primary",
  "accent",
] as const;

export type TokenName = (typeof TOKEN_NAMES)[number];

export type ThemeScheme = Partial<Record<TokenName, string>>;

export interface ThemeConfig {
  name?: string;
  light: ThemeScheme;
  dark: ThemeScheme;
}

export type ThemeMode = "light" | "dark" | "system";

/** Maps token names to CSS custom properties used in `lib/styles.css`. */
export const TOKEN_TO_CSS_VAR: Record<TokenName, string> = {
  "background-100": "--color-background-100",
  "background-200": "--color-background-200",
  "background-300": "--color-background-300",
  foreground: "--color-foreground",
  primary: "--color-primary",
  accent: "--color-accent",
};
