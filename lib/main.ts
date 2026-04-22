import "@fontsource-variable/inter";
import "./styles.css";

export { Button } from "./Button/Button";
export { buttonVariants } from "./Button/button-variants";
export {
  Alert,
  AlertAction,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "./Alert/Alert";
export {
  alertActionVariants,
  alertDescriptionVariants,
  alertIconVariants,
  alertRootVariants,
  alertTitleVariants,
} from "./Alert/alert-variants";
export type { AlertProps, AlertActionProps, AlertIconProps, AlertDescriptionProps, AlertTitleProps } from "./Alert/Alert";
export type { AlertVariant } from "./Alert/alert-variants";
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

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog/AlertDialog";
export {
  alertDialogActionVariants,
  alertDialogCancelVariants,
  alertDialogContentVariants,
  alertDialogDescriptionVariants,
  alertDialogFooterVariants,
  alertDialogHeaderVariants,
  alertDialogMediaVariants,
  alertDialogOverlayVariants,
  alertDialogTitleVariants,
} from "./AlertDialog/alert-dialog-variants";
export type {
  AlertDialogSize,
  AlertDialogActionVariant,
} from "./AlertDialog/alert-dialog-variants";
export type {
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogMediaProps,
  AlertDialogOverlayProps,
} from "./AlertDialog/AlertDialog";

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
