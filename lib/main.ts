import "@fontsource-variable/inter";
import "./styles.css";

export { Button, buttonVariants } from "./Button/Button";
export { cn } from "./utils/cn";
export { Spinner } from "./Spinner/Spinner";
export type { SpinnerProps } from "./Spinner/Spinner";
export type {
  ButtonProps,
  ButtonIconProps,
  ButtonTextProps,
  ButtonSpinnerProps,
  ButtonVariant,
  ButtonSize,
} from "./Button/Button";

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
