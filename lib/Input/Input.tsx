"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import { Tooltip } from "../Tooltip/Tooltip";
import { cn } from "../utils/cn";
import { inputVariants, type InputVariant } from "./input-variants";

export type { InputVariant };

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
  /** `search` for searchbars, `bare` for inline editing without a box. */
  variant?: InputVariant;
  /**
   * A value you can see but not edit: the same box, disabled and read-only, with a lock at the
   * end. Takes the same place and geometry as the editable fields next to it.
   */
  locked?: boolean;
  /**
   * Why it is locked. Goes in the lock's tooltip, not as a line below, and is tied to the input
   * (`aria-describedby`) so screen readers read it.
   */
  lockReason?: string;
};

type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Icon: typeof InputIcon;
};

const InputBase = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    type = "text",
    variant = "default",
    locked = false,
    lockReason,
    children,
    "aria-describedby": describedByProp,
    ...rest
  },
  ref,
) {
  const reasonId = React.useId();
  const lockedProps = locked
    ? { disabled: true, readOnly: true }
    : {};
  const describedBy =
    [describedByProp, locked && lockReason ? reasonId : undefined].filter(Boolean).join(" ") ||
    undefined;

  const lockIcon = locked ? (
    <InputIcon key="lock" side="end" data-slot="input-lock" className="ui:opacity-100 ui:text-text-default-muted">
      {lockReason ? (
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <span className="ui:flex ui:cursor-default">
                <Lock className="ui:size-3.5" />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content>{lockReason}</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      ) : (
        <Lock className="ui:size-3.5" />
      )}
    </InputIcon>
  ) : null;

  const icons = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<InputIconProps> =>
      React.isValidElement(child) &&
      (child.type as { displayName?: string }).displayName === "Input.Icon",
  );

  if (lockIcon) icons.push(lockIcon);

  if (icons.length === 0) {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-variant={variant}
        className={cn(inputVariants({ variant }), className)}
        aria-describedby={describedBy}
        {...rest}
      />
    );
  }

  const startIcons = icons.filter((c) => (c.props.side ?? "start") === "start");
  const endIcons = icons.filter((c) => c.props.side === "end");

  const wrapper = (
    <label
      data-slot="input-wrapper"
      data-variant={variant}
      data-locked={locked ? "" : undefined}
      className={cn(
        inputVariants({ variant }),
        "ui:gap-2 ui:cursor-text",
        locked && "ui:cursor-default",
        className,
      )}
    >
      {startIcons}
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "ui:flex-1 ui:min-w-0 ui:border-0 ui:bg-transparent ui:p-0 ui:text-[14px] ui:leading-5 ui:tracking-[-0.42px] ui:text-text-default ui:outline-none ui:placeholder:text-text-default-muted ui:disabled:cursor-not-allowed ui:disabled:opacity-50",
          locked && "ui:truncate ui:text-text-default-muted ui:disabled:cursor-default ui:disabled:opacity-100",
        )}
        aria-describedby={describedBy}
        {...rest}
        {...lockedProps}
      />
      {endIcons}
    </label>
  );

  if (!(locked && lockReason)) return wrapper;
  return (
    <>
      {wrapper}
      <span id={reasonId} className="ui:sr-only">
        {lockReason}
      </span>
    </>
  );
}) as InputComponent;

InputBase.displayName = "Input";
InputBase.Icon = InputIcon;

export const Input = InputBase;
