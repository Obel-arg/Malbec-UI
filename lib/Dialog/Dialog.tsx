"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../utils/cn";
import {
  dialogActionVariants,
  dialogBodyVariants,
  dialogCloseIconVariants,
  dialogCloseVariants,
  dialogContentVariants,
  dialogDescriptionVariants,
  dialogFooterVariants,
  dialogHeaderVariants,
  dialogInlineFieldVariants,
  dialogInlineInputVariants,
  dialogInlineLabelVariants,
  dialogOverlayVariants,
  dialogTitleVariants,
} from "./dialog-variants";

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

/**
 * Wrap Radix's `Root` (and friends) so the `Dialog` namespace owns a unique
 * function identity. Reusing `DialogPrimitive.Root` directly would alias the
 * same object as `Sheet` (which is also Radix Dialog under the hood), causing
 * `Sheet.Content = …` to overwrite `Dialog.Content` at module load.
 */
function DialogRoot(props: DialogProps) {
  return <DialogPrimitive.Root {...props} />;
}
DialogRoot.displayName = "Dialog";

const DialogTrigger = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(function DialogTrigger({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      className={cn("ui:cursor-pointer", className)}
      {...rest}
    />
  );
});
DialogTrigger.displayName = "Dialog.Trigger";

function DialogPortal(
  props: React.ComponentProps<typeof DialogPrimitive.Portal>,
) {
  return <DialogPrimitive.Portal {...props} />;
}
DialogPortal.displayName = "Dialog.Portal";

export type DialogOverlayProps = React.ComponentProps<
  typeof DialogPrimitive.Overlay
>;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(function DialogOverlay({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(dialogOverlayVariants(), className)}
      {...rest}
    />
  );
});

export interface DialogContentProps extends React.ComponentProps<
  typeof DialogPrimitive.Content
> {
  showCloseButton?: boolean;
  /** Merged after default overlay styles. */
  overlayClassName?: string;
  /** When true, default dialog padding and shape classes are omitted; use `className` for the full surface. */
  unstyled?: boolean;
  /** Passed to `Dialog.Portal` (`container` in Radix Portal). */
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>["container"];
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    className,
    children,
    showCloseButton = false,
    overlayClassName,
    unstyled,
    container,
    ...rest
  },
  ref,
) {
  return (
    <DialogPortal container={container}>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(!unstyled && dialogContentVariants(), className)}
        {...rest}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={dialogCloseVariants()}
            aria-label="Close dialog"
          >
            <DialogCloseIcon />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-header"
        className={cn(dialogHeaderVariants(), className)}
        {...rest}
      />
    );
  },
);

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(dialogFooterVariants(), className)}
        {...rest}
      />
    );
  },
);

export type DialogActionProps = React.ComponentProps<"button">;

const DialogAction = React.forwardRef<HTMLButtonElement, DialogActionProps>(
  function DialogAction({ type = "button", className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="dialog-action"
        className={cn(dialogActionVariants(), className)}
        {...rest}
      />
    );
  },
);

export type DialogTitleProps = React.ComponentProps<
  typeof DialogPrimitive.Title
>;

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(function DialogTitle({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn(dialogTitleVariants(), className)}
      {...rest}
    />
  );
});

export type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn(dialogDescriptionVariants(), className)}
      {...rest}
    />
  );
});

export type DialogCloseProps = React.ComponentProps<
  typeof DialogPrimitive.Close
>;

const DialogClose = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Close>,
  DialogCloseProps
>(function DialogClose({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      data-slot="dialog-close"
      className={cn(dialogCloseVariants(), className)}
      {...rest}
    />
  );
});

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-body"
        className={cn(dialogBodyVariants(), className)}
        {...rest}
      />
    );
  },
);

export type DialogInlineFieldProps = React.HTMLAttributes<HTMLDivElement>;

const DialogInlineField = React.forwardRef<
  HTMLDivElement,
  DialogInlineFieldProps
>(function DialogInlineField({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="dialog-inline-field"
      className={cn(dialogInlineFieldVariants(), className)}
      {...rest}
    />
  );
});

export type DialogInlineLabelProps = React.ComponentProps<"label">;

const DialogInlineLabel = React.forwardRef<
  HTMLLabelElement,
  DialogInlineLabelProps
>(function DialogInlineLabel({ className, ...rest }, ref) {
  return (
    <label
      ref={ref}
      data-slot="dialog-inline-label"
      className={cn(dialogInlineLabelVariants(), className)}
      {...rest}
    />
  );
});

export type DialogInlineInputProps = React.ComponentProps<"input">;

const DialogInlineInput = React.forwardRef<
  HTMLInputElement,
  DialogInlineInputProps
>(function DialogInlineInput({ className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      data-slot="dialog-inline-input"
      className={cn(dialogInlineInputVariants(), className)}
      {...rest}
    />
  );
});

export interface DialogCloseIconProps extends React.ComponentProps<"svg"> {
  decorative?: boolean;
}

const DialogCloseIcon = React.forwardRef<SVGSVGElement, DialogCloseIconProps>(
  function DialogCloseIcon({ className, decorative = true, ...rest }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(dialogCloseIconVariants(), className)}
        aria-hidden={decorative || undefined}
        {...rest}
      >
        <path
          d="M4 4L12 12M12 4L4 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  },
);

type DialogComponent = typeof DialogRoot & {
  Trigger: typeof DialogTrigger;
  Portal: typeof DialogPortal;
  Overlay: typeof DialogOverlay;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Footer: typeof DialogFooter;
  Action: typeof DialogAction;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Close: typeof DialogClose;
  CloseIcon: typeof DialogCloseIcon;
  Body: typeof DialogBody;
  InlineField: typeof DialogInlineField;
  InlineLabel: typeof DialogInlineLabel;
  InlineInput: typeof DialogInlineInput;
};

export const Dialog = DialogRoot as DialogComponent;
Dialog.Trigger = DialogTrigger;
Dialog.Portal = DialogPortal;
Dialog.Overlay = DialogOverlay;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Action = DialogAction;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;
Dialog.CloseIcon = DialogCloseIcon;
Dialog.Body = DialogBody;
Dialog.InlineField = DialogInlineField;
Dialog.InlineLabel = DialogInlineLabel;
Dialog.InlineInput = DialogInlineInput;

/** shadcn-style names — same as `Dialog.Trigger` / `Dialog.Content` / … */
export {
  DialogPrimitive,
  DialogPortal,
  DialogTrigger,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogAction,
  DialogTitle,
  DialogDescription,
};
