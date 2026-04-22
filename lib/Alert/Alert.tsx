import * as React from "react";
import { cn } from "../utils/cn";
import {
  alertActionVariants,
  alertDescriptionVariants,
  alertIconVariants,
  alertRootVariants,
  alertTitleVariants,
} from "./alert-variants";
import type { AlertVariant } from "./alert-variants";

export type { AlertVariant } from "./alert-variants";

type AlertContextValue = {
  variant: AlertVariant;
};

const AlertContext = React.createContext<AlertContextValue | null>(null);

function useAlertContext(component: string): AlertContextValue {
  const ctx = React.useContext(AlertContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <Alert> component.`,
    );
  }
  return ctx;
}

export interface AlertProps extends React.ComponentProps<"div"> {
  variant?: AlertVariant;
}

const AlertRoot = React.forwardRef<HTMLDivElement, AlertProps>(function AlertRoot(
  { variant = "default", className, ...rest },
  ref,
) {
  const ctx = React.useMemo<AlertContextValue>(
    () => ({ variant }),
    [variant],
  );

  return (
    <AlertContext.Provider value={ctx}>
      <div
        ref={ref}
        data-slot="alert"
        role="alert"
        className={cn(alertRootVariants({ variant }), className)}
        data-variant={variant}
        {...rest}
      />
    </AlertContext.Provider>
  );
});

export interface AlertIconProps
  extends React.ComponentProps<"div"> {
  /**
   * Set to false to expose the icon to the accessibility tree (rare: prefer
   * a separate visible title).
   */
  decorative?: boolean;
}

const AlertIcon = React.forwardRef<HTMLDivElement, AlertIconProps>(function AlertIcon(
  { className, children, decorative = true, ...rest },
  ref,
) {
  const { variant } = useAlertContext("Alert.Icon");
  return (
    <div
      ref={ref}
      data-slot="alert-icon"
      className={cn(alertIconVariants({ variant }), className)}
      aria-hidden={decorative || undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

export type AlertTitleProps = React.ComponentProps<"div">;

const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(function AlertTitle(
  { className, ...rest },
  ref,
) {
  const { variant } = useAlertContext("Alert.Title");
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn(alertTitleVariants({ variant }), className)}
      {...rest}
    />
  );
});

export type AlertDescriptionProps = React.ComponentProps<"div">;

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  function AlertDescription({ className, ...rest }, ref) {
    const { variant } = useAlertContext("Alert.Description");
    return (
      <div
        ref={ref}
        data-slot="alert-description"
        className={cn(alertDescriptionVariants({ variant }), className)}
        {...rest}
      />
    );
  },
);

export type AlertActionProps = React.ComponentProps<"div">;

const AlertAction = React.forwardRef<HTMLDivElement, AlertActionProps>(
  function AlertAction({ className, ...rest }, ref) {
    useAlertContext("Alert.Action");
    return (
      <div
        ref={ref}
        data-slot="alert-action"
        className={cn(alertActionVariants(), className)}
        {...rest}
      />
    );
  },
);

type AlertComponent = typeof AlertRoot & {
  Icon: typeof AlertIcon;
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
  Action: typeof AlertAction;
};

export const Alert = AlertRoot as AlertComponent;
Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Action = AlertAction;

/** shadcn-style names — same as `Alert.Title` / `Alert.Description` / … */
export { AlertIcon, AlertTitle, AlertDescription, AlertAction };
