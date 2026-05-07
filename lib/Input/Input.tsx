"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { inputVariants } from "./input-variants";

export type InputIconProps = React.ComponentPropsWithoutRef<"span"> & {
  side?: "start" | "end";
};

const InputIcon = React.forwardRef<HTMLSpanElement, InputIconProps>(
  function InputIcon({ side = "start", className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        data-slot="input-icon"
        data-side={side}
        aria-hidden
        className={cn(
          "ui:inline-flex ui:size-4 ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default ui:opacity-50",
          className,
        )}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
InputIcon.displayName = "Input.Icon";

export type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  children?: React.ReactNode;
};

type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Icon: typeof InputIcon;
};

const InputBase = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", children, ...rest },
  ref,
) {
  const icons = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<InputIconProps> =>
      React.isValidElement(child) &&
      (child.type as { displayName?: string }).displayName === "Input.Icon",
  );

  if (icons.length === 0) {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputVariants(), className)}
        {...rest}
      />
    );
  }

  const startIcons = icons.filter((c) => (c.props.side ?? "start") === "start");
  const endIcons = icons.filter((c) => c.props.side === "end");

  return (
    <label
      data-slot="input-wrapper"
      className={cn(
        inputVariants(),
        "ui:gap-2 ui:cursor-text ui:focus-within:outline-primary",
        className,
      )}
    >
      {startIcons}
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className="ui:flex-1 ui:min-w-0 ui:border-0 ui:bg-transparent ui:p-0 ui:text-[14px] ui:leading-5 ui:tracking-[-0.42px] ui:text-text-default ui:outline-none ui:placeholder:text-text-default-muted ui:disabled:cursor-not-allowed ui:disabled:opacity-50"
        {...rest}
      />
      {endIcons}
    </label>
  );
}) as InputComponent;

InputBase.displayName = "Input";
InputBase.Icon = InputIcon;

export const Input = InputBase;
