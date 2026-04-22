import "@fontsource-variable/inter";
import "./styles.css";

export { Button } from "./Button/Button";

export { MalbecThemeProvider, useTheme } from "./theme";
export type {
  MalbecThemeContextValue,
  MalbecThemeProviderProps,
  ThemeConfig,
  ThemeMode,
  ThemeScheme,
  TokenName,
} from "./theme";
export * as themes from "./theme/presets";
