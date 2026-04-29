"use client";

import React from "react";
import { Spinner } from "../Spinner/Spinner";
import { cn } from "../utils/cn";
import {
  buttonIconVariants,
  buttonSpinnerWrapperVariants,
  buttonTextVariants,
  buttonVariants,
} from "./button-variants";
import type { ButtonSize, ButtonVariant } from "./button-variants";

export type { ButtonSize, ButtonVariant };

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Forwarded to the native button; defaults to "button" to avoid accidental form submits. */
  htmlType?: "button" | "submit" | "reset";
}

type ButtonInternalContext = {
  loading: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
};

const ButtonContext = React.createContext<ButtonInternalContext | null>(null);

function useButtonContext(component: string): ButtonInternalContext {
  const ctx = React.useContext(ButtonContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <Button> component.`,
    );
  }
  return ctx;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonRoot(
    {
      variant = "primary",
      size = "lg",
      loading = false,
      htmlType = "button",
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const classes = cn(buttonVariants({ variant, size }), className);

    const ctx = React.useMemo<ButtonInternalContext>(
      () => ({ loading, variant, size }),
      [loading, variant, size],
    );

    return (
      <ButtonContext.Provider value={ctx}>
        <button
          ref={ref}
          type={htmlType}
          className={classes}
          data-variant={variant}
          data-size={size}
          data-loading={loading || undefined}
          {...rest}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
        >
          {children}
        </button>
      </ButtonContext.Provider>
    );
  },
);

export interface ButtonIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When true, the icon is hidden from assistive tech (purely decorative). */
  decorative?: boolean;
}

const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(
  function ButtonIcon(
    { className, children, decorative = true, ...rest },
    ref,
  ) {
    const { loading, size } = useButtonContext("Button.Icon");

    if (loading) return null;

    return (
      <span
        ref={ref}
        className={cn(buttonIconVariants({ size }), className)}
        aria-hidden={decorative || undefined}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

export type ButtonTextProps = React.HTMLAttributes<HTMLSpanElement>;

const ButtonText = React.forwardRef<HTMLSpanElement, ButtonTextProps>(
  function ButtonText({ className, children, ...rest }, ref) {
    useButtonContext("Button.Text");

    return (
      <span ref={ref} className={cn(buttonTextVariants(), className)} {...rest}>
        {children}
      </span>
    );
  },
);

export interface ButtonSpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Override the default circular spinner. */
  icon?: React.ReactNode;
  /** Hidden from assistive tech when true (default). */
  decorative?: boolean;
}

const ButtonSpinner = React.forwardRef<HTMLSpanElement, ButtonSpinnerProps>(
  function ButtonSpinner({ className, icon, decorative = true, ...rest }, ref) {
    const { loading, size } = useButtonContext("Button.Spinner");

    if (!loading) return null;

    return (
      <span
        ref={ref}
        className={cn(buttonSpinnerWrapperVariants({ size }), className)}
        aria-hidden={decorative || undefined}
        {...rest}
      >
        {icon ?? <Spinner className="ui:size-full" />}
      </span>
    );
  },
);

type ButtonComponent = typeof ButtonRoot & {
  Icon: typeof ButtonIcon;
  Text: typeof ButtonText;
  Spinner: typeof ButtonSpinner;
};

export const Button = ButtonRoot as ButtonComponent;
Button.Icon = ButtonIcon;
Button.Text = ButtonText;
Button.Spinner = ButtonSpinner;
