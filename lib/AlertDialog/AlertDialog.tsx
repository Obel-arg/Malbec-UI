"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../utils/cn";
import {
  alertDialogActionVariants,
  alertDialogCancelVariants,
  alertDialogContentVariants,
  alertDialogDescriptionVariants,
  alertDialogFooterVariants,
  alertDialogHeaderVariants,
  alertDialogMediaVariants,
  alertDialogOverlayVariants,
  alertDialogTitleVariants,
} from "./alert-dialog-variants";
import type {
  AlertDialogActionVariant,
  AlertDialogSize,
} from "./alert-dialog-variants";

export type { AlertDialogSize, AlertDialogActionVariant } from "./alert-dialog-variants";

const AlertDialogSizeContext = React.createContext<{
  size: AlertDialogSize;
} | null>(null);

function useAlertDialogSize(
  subcomponent: string,
): { size: AlertDialogSize } {
  const ctx = React.useContext(AlertDialogSizeContext);
  if (!ctx) {
    throw new Error(
      `<${subcomponent}> must be used inside <AlertDialogContent>.`,
    );
  }
  return ctx;
}

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

export type AlertDialogOverlayProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Overlay
>;

const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(function AlertDialogOverlay({ className, ...rest }, ref) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      data-slot="alert-dialog-overlay"
      className={cn(alertDialogOverlayVariants(), className)}
      {...rest}
    />
  );
});

export interface AlertDialogContentProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Content> {
  size?: AlertDialogSize;
}

const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(function AlertDialogContent(
  { className, size = "default", children, ...rest },
  ref,
) {
  const ctx = React.useMemo(
    () => ({ size: size as AlertDialogSize }),
    [size],
  );

  return (
    <AlertDialogSizeContext.Provider value={ctx}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          ref={ref}
          data-slot="alert-dialog-content"
          data-size={size}
          className={cn(alertDialogContentVariants({ size }), className)}
          {...rest}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPortal>
    </AlertDialogSizeContext.Provider>
  );
});

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  AlertDialogHeaderProps
>(function AlertDialogHeader({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn(alertDialogHeaderVariants(), className)}
      {...rest}
    />
  );
});

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(function AlertDialogFooter({ className, ...rest }, ref) {
  const { size } = useAlertDialogSize("AlertDialogFooter");
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      data-size={size}
      className={cn(alertDialogFooterVariants({ size }), className)}
      {...rest}
    />
  );
});

export type AlertDialogMediaProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogMedia = React.forwardRef<HTMLDivElement, AlertDialogMediaProps>(
  function AlertDialogMedia({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-media"
        className={cn(alertDialogMediaVariants(), className)}
        {...rest}
      />
    );
  },
);

export type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;

const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, children, ...rest }, ref) {
  const { size } = useAlertDialogSize("AlertDialogTitle");
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn(alertDialogTitleVariants({ size }), className)}
      {...rest}
    >
      {children}
    </AlertDialogPrimitive.Title>
  );
});

export type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;

const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, ...rest }, ref) {
  const { size } = useAlertDialogSize("AlertDialogDescription");
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn(alertDialogDescriptionVariants({ size }), className)}
      {...rest}
    />
  );
});

export interface AlertDialogActionProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Action> {
  variant?: AlertDialogActionVariant;
}

const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(function AlertDialogAction(
  { className, variant = "default", children, ...rest },
  ref,
) {
  const { size } = useAlertDialogSize("AlertDialogAction");
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      data-slot="alert-dialog-action"
      data-variant={variant}
      className={cn(
        alertDialogActionVariants({ variant, size }),
        className,
      )}
      {...rest}
    >
      {children}
    </AlertDialogPrimitive.Action>
  );
});

export type AlertDialogCancelProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Cancel
>;

const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(function AlertDialogCancel({ className, ...rest }, ref) {
  const { size } = useAlertDialogSize("AlertDialogCancel");
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      data-slot="alert-dialog-cancel"
      className={cn(alertDialogCancelVariants({ size }), className)}
      {...rest}
    />
  );
});

type AlertDialogComponent = typeof AlertDialogRoot & {
  Trigger: typeof AlertDialogTrigger;
  Portal: typeof AlertDialogPortal;
  Overlay: typeof AlertDialogOverlay;
  Content: typeof AlertDialogContent;
  Header: typeof AlertDialogHeader;
  Footer: typeof AlertDialogFooter;
  Media: typeof AlertDialogMedia;
  Title: typeof AlertDialogTitle;
  Description: typeof AlertDialogDescription;
  Action: typeof AlertDialogAction;
  Cancel: typeof AlertDialogCancel;
};

export const AlertDialog = AlertDialogRoot as AlertDialogComponent;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Header = AlertDialogHeader;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Media = AlertDialogMedia;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Action = AlertDialogAction;
AlertDialog.Cancel = AlertDialogCancel;

/** shadcn-style names — same as `AlertDialog.Trigger` / `AlertDialog.Content` / … */
export {
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogMedia,
  AlertDialogOverlay,
};
