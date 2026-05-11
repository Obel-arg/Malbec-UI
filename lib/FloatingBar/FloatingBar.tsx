"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils/cn";
import {
  floatingBarActionsVariants,
  floatingBarCloseVariants,
  floatingBarCountVariants,
  floatingBarTriggerIconVariants,
  floatingBarTriggerTextVariants,
  floatingBarTriggerVariants,
  floatingBarVariants,
  type FloatingBarTriggerEmphasis,
} from "./floating-bar-variants";

export interface FloatingBarProps extends React.ComponentProps<"div"> {
  /**
   * Whether the bar is visible. Drives the enter/exit transition — when it
   * flips from `false` to `true` the bar translates up + fades in; when it
   * flips back to `false` it translates down + fades out. Defaults to `true`.
   * Keep the component mounted across both states so the exit animation can
   * play.
   */
  open?: boolean;
}

const FloatingBarRoot = React.forwardRef<HTMLDivElement, FloatingBarProps>(
  function FloatingBarRoot(
    { className, role = "toolbar", open = true, ...rest },
    ref,
  ) {
    const state = open ? "open" : "closed";

    return (
      <div
        ref={ref}
        role={role}
        data-slot="floating-bar"
        data-state={state}
        aria-hidden={state === "closed" || undefined}
        className={cn(floatingBarVariants(), className)}
        {...rest}
      />
    );
  },
);

export type FloatingBarCountProps = React.ComponentProps<"span">;

const FloatingBarCount = React.forwardRef<HTMLSpanElement, FloatingBarCountProps>(
  function FloatingBarCount({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        data-slot="floating-bar-count"
        className={cn(floatingBarCountVariants(), className)}
        {...rest}
      />
    );
  },
);

export type FloatingBarActionsProps = React.ComponentProps<"div">;

const FloatingBarActions = React.forwardRef<HTMLDivElement, FloatingBarActionsProps>(
  function FloatingBarActions({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="floating-bar-actions"
        className={cn(floatingBarActionsVariants(), className)}
        {...rest}
      />
    );
  },
);

export interface FloatingBarTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Render as a custom child element via Radix Slot (e.g. an `<a>` or framework `<Link>`). */
  asChild?: boolean;
  /** Forwarded to the native button; defaults to "button" to avoid accidental form submits. */
  htmlType?: "button" | "submit" | "reset";
  /**
   * Visual emphasis. `"strong"` raises the trigger with a solid surface and
   * shadow — use it for the primary action when one trigger should stand out.
   */
  emphasis?: FloatingBarTriggerEmphasis;
}

const FloatingBarTriggerRoot = React.forwardRef<
  HTMLButtonElement,
  FloatingBarTriggerProps
>(function FloatingBarTriggerRoot(
  {
    asChild = false,
    htmlType = "button",
    emphasis = "default",
    className,
    children,
    ...rest
  },
  ref,
) {
  const Comp: React.ElementType = asChild ? Slot : "button";
  const extra = asChild ? {} : { type: htmlType };

  return (
    <Comp
      ref={ref}
      data-slot="floating-bar-trigger"
      data-emphasis={emphasis}
      className={cn(floatingBarTriggerVariants({ emphasis }), className)}
      {...extra}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export interface FloatingBarTriggerIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** When true, the icon is hidden from assistive tech (purely decorative). */
  decorative?: boolean;
}

const FloatingBarTriggerIcon = React.forwardRef<
  HTMLSpanElement,
  FloatingBarTriggerIconProps
>(function FloatingBarTriggerIcon(
  { className, children, decorative = true, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="floating-bar-trigger-icon"
      className={cn(floatingBarTriggerIconVariants(), className)}
      aria-hidden={decorative || undefined}
      {...rest}
    >
      {children}
    </span>
  );
});

export type FloatingBarTriggerTextProps = React.HTMLAttributes<HTMLSpanElement>;

const FloatingBarTriggerText = React.forwardRef<
  HTMLSpanElement,
  FloatingBarTriggerTextProps
>(function FloatingBarTriggerText({ className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      data-slot="floating-bar-trigger-text"
      className={cn(floatingBarTriggerTextVariants(), className)}
      {...rest}
    />
  );
});

type FloatingBarTriggerComponent = typeof FloatingBarTriggerRoot & {
  Icon: typeof FloatingBarTriggerIcon;
  Text: typeof FloatingBarTriggerText;
};

const FloatingBarTrigger =
  FloatingBarTriggerRoot as FloatingBarTriggerComponent;
FloatingBarTrigger.Icon = FloatingBarTriggerIcon;
FloatingBarTrigger.Text = FloatingBarTriggerText;

export interface FloatingBarCloseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  asChild?: boolean;
  htmlType?: "button" | "submit" | "reset";
  /** Accessible label for the close button. Defaults to "Close". */
  "aria-label"?: string;
  children?: React.ReactNode;
}

const FloatingBarClose = React.forwardRef<HTMLButtonElement, FloatingBarCloseProps>(
  function FloatingBarClose(
    {
      asChild = false,
      htmlType = "button",
      className,
      children,
      "aria-label": ariaLabel = "Close",
      ...rest
    },
    ref,
  ) {
    const Comp: React.ElementType = asChild ? Slot : "button";
    const extra = asChild ? {} : { type: htmlType };

    return (
      <Comp
        ref={ref}
        data-slot="floating-bar-close"
        aria-label={ariaLabel}
        className={cn(floatingBarCloseVariants(), className)}
        {...extra}
        {...rest}
      >
        {children ?? <CloseIcon />}
      </Comp>
    );
  },
);

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

FloatingBarRoot.displayName = "FloatingBar";
FloatingBarCount.displayName = "FloatingBar.Count";
FloatingBarActions.displayName = "FloatingBar.Actions";
FloatingBarTriggerRoot.displayName = "FloatingBar.Trigger";
FloatingBarTriggerIcon.displayName = "FloatingBar.Trigger.Icon";
FloatingBarTriggerText.displayName = "FloatingBar.Trigger.Text";
FloatingBarClose.displayName = "FloatingBar.Close";

type FloatingBarComponent = typeof FloatingBarRoot & {
  Count: typeof FloatingBarCount;
  Actions: typeof FloatingBarActions;
  Trigger: typeof FloatingBarTrigger;
  Close: typeof FloatingBarClose;
};

export const FloatingBar = FloatingBarRoot as FloatingBarComponent;
FloatingBar.Count = FloatingBarCount;
FloatingBar.Actions = FloatingBarActions;
FloatingBar.Trigger = FloatingBarTrigger;
FloatingBar.Close = FloatingBarClose;
