import * as React from "react";
import { DialogPrimitive } from "../Dialog/Dialog";
import { cn } from "../utils/cn";
import {
  sheetActionVariants,
  sheetBodyVariants,
  sheetCloseIconVariants,
  sheetCloseVariants,
  sheetContentVariants,
  sheetDescriptionVariants,
  sheetFooterVariants,
  sheetHeaderVariants,
  sheetInlineFieldVariants,
  sheetInlineInputVariants,
  sheetInlineLabelVariants,
  sheetOverlayVariants,
  sheetTitleVariants,
} from "./sheet-variants";

const SheetRoot = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;

export type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export type SheetOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  SheetOverlayProps
>(function SheetOverlay({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(sheetOverlayVariants(), className)}
      {...rest}
    />
  );
});

export interface SheetContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
  /** Merged after default overlay styles. */
  overlayClassName?: string;
  /** When true, default sheet padding and shape classes are omitted; use `className` for the full surface. */
  unstyled?: boolean;
  /** Passed to `Sheet.Portal` (`container` in Radix Portal). */
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>["container"];
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(function SheetContent(
  {
    className,
    children,
    side = "right",
    showCloseButton = true,
    overlayClassName,
    unstyled,
    container,
    ...rest
  },
  ref,
) {
  return (
    <SheetPortal container={container}>
      <SheetOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        data-side={side}
        className={cn(!unstyled && sheetContentVariants({ side }), className)}
        {...rest}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="sheet-close"
            className={sheetCloseVariants()}
            aria-label="Close sheet"
          >
            <SheetCloseIcon />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
});

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  function SheetHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sheet-header"
        className={cn(sheetHeaderVariants(), className)}
        {...rest}
      />
    );
  },
);

export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  function SheetFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sheet-footer"
        className={cn(sheetFooterVariants(), className)}
        {...rest}
      />
    );
  },
);

export type SheetActionProps = React.ComponentProps<"button">;

const SheetAction = React.forwardRef<HTMLButtonElement, SheetActionProps>(
  function SheetAction({ type = "button", className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="sheet-action"
        className={cn(sheetActionVariants(), className)}
        {...rest}
      />
    );
  },
);

export type SheetTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  SheetTitleProps
>(function SheetTitle({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn(sheetTitleVariants(), className)}
      {...rest}
    />
  );
});

export type SheetDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  SheetDescriptionProps
>(function SheetDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="sheet-description"
      className={cn(sheetDescriptionVariants(), className)}
      {...rest}
    />
  );
});

export type SheetCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

const SheetClose = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Close>,
  SheetCloseProps
>(function SheetClose({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      data-slot="sheet-close"
      className={cn(sheetCloseVariants(), className)}
      {...rest}
    />
  );
});

export type SheetBodyProps = React.HTMLAttributes<HTMLDivElement>;

const SheetBody = React.forwardRef<HTMLDivElement, SheetBodyProps>(function SheetBody(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="sheet-body"
      className={cn(sheetBodyVariants(), className)}
      {...rest}
    />
  );
});

export type SheetInlineFieldProps = React.HTMLAttributes<HTMLDivElement>;

const SheetInlineField = React.forwardRef<HTMLDivElement, SheetInlineFieldProps>(
  function SheetInlineField({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sheet-inline-field"
        className={cn(sheetInlineFieldVariants(), className)}
        {...rest}
      />
    );
  },
);

export type SheetInlineLabelProps = React.ComponentProps<"label">;

const SheetInlineLabel = React.forwardRef<HTMLLabelElement, SheetInlineLabelProps>(
  function SheetInlineLabel({ className, ...rest }, ref) {
    return (
      <label
        ref={ref}
        data-slot="sheet-inline-label"
        className={cn(sheetInlineLabelVariants(), className)}
        {...rest}
      />
    );
  },
);

export type SheetInlineInputProps = React.ComponentProps<"input">;

const SheetInlineInput = React.forwardRef<HTMLInputElement, SheetInlineInputProps>(
  function SheetInlineInput({ className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        data-slot="sheet-inline-input"
        className={cn(sheetInlineInputVariants(), className)}
        {...rest}
      />
    );
  },
);

export interface SheetCloseIconProps extends React.ComponentProps<"svg"> {
  decorative?: boolean;
}

const SheetCloseIcon = React.forwardRef<SVGSVGElement, SheetCloseIconProps>(
  function SheetCloseIcon({ className, decorative = true, ...rest }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sheetCloseIconVariants(), className)}
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

type SheetComponent = typeof SheetRoot & {
  Trigger: typeof SheetTrigger;
  Portal: typeof SheetPortal;
  Overlay: typeof SheetOverlay;
  Content: typeof SheetContent;
  Header: typeof SheetHeader;
  Footer: typeof SheetFooter;
  Action: typeof SheetAction;
  Title: typeof SheetTitle;
  Description: typeof SheetDescription;
  Close: typeof SheetClose;
  CloseIcon: typeof SheetCloseIcon;
  Body: typeof SheetBody;
  InlineField: typeof SheetInlineField;
  InlineLabel: typeof SheetInlineLabel;
  InlineInput: typeof SheetInlineInput;
};

export const Sheet = SheetRoot as SheetComponent;
Sheet.Trigger = SheetTrigger;
Sheet.Portal = SheetPortal;
Sheet.Overlay = SheetOverlay;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Footer = SheetFooter;
Sheet.Action = SheetAction;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;
Sheet.Close = SheetClose;
Sheet.CloseIcon = SheetCloseIcon;
Sheet.Body = SheetBody;
Sheet.InlineField = SheetInlineField;
Sheet.InlineLabel = SheetInlineLabel;
Sheet.InlineInput = SheetInlineInput;

/** shadcn-style names — same as `Sheet.Trigger` / `Sheet.Content` / … */
export {
  SheetPortal,
  SheetTrigger,
  SheetOverlay,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetAction,
  SheetTitle,
  SheetDescription,
};
