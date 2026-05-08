"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "../utils/cn";
import {
  inputOtpGroupVariants,
  inputOtpRootVariants,
  inputOtpSeparatorVariants,
  inputOtpSlotVariants,
} from "./input-otp-variants";

type InputOtpGroupBounds = { start: number; end: number };

const InputOtpGroupBoundsContext = React.createContext<InputOtpGroupBounds>({
  start: 0,
  end: Number.MAX_SAFE_INTEGER,
});

function DotFilled() {
  /** ~34.17% inset in a 16px box → ~5.1px outer diameter */
  return (
    <svg
      className="ui:block ui:size-[5.5px] ui:shrink-0"
      viewBox="0 0 10 10"
      aria-hidden
    >
      <circle cx="5" cy="5" r="3.15" fill="currentColor" />
    </svg>
  );
}

export type InputOtpProps = React.ComponentPropsWithoutRef<typeof OTPInput>;

const InputOtpRoot = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  InputOtpProps
>(function InputOtpRoot({ containerClassName, className, ...props }, ref) {
  /**
   * `aria-invalid` is forwarded to the hidden `<input>` for accessibility AND mirrored
   * onto the outer wrapper so descendant Groups can pick it up via `group-aria-invalid:`.
   * The library's `<input>` lives in an absolutely-positioned sibling of the groups,
   * so a `:has()`-based selector on the group itself can't see it.
   */
  const ariaInvalid = props["aria-invalid"];
  return (
    <div
      data-slot="input-otp"
      className="ui:group ui:contents"
      aria-invalid={ariaInvalid}
    >
      <OTPInput
        ref={ref}
        containerClassName={cn(inputOtpRootVariants(), containerClassName)}
        className={cn("ui:disabled:cursor-not-allowed", className)}
        {...props}
      />
    </div>
  );
});

InputOtpRoot.displayName = "InputOtp";

export interface InputOtpSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOtpSlot = React.forwardRef<HTMLDivElement, InputOtpSlotProps>(
  function InputOtpSlot({ index, className, ...props }, ref) {
    const ctx = React.useContext(OTPInputContext);
    const { start: groupStartIndex, end: groupEndIndex } = React.useContext(
      InputOtpGroupBoundsContext,
    );
    const slot = ctx?.slots?.[index];

    if (!ctx?.slots) {
      throw new Error("<InputOtp.Slot> must be used inside <InputOtp>.");
    }

    if (!slot) {
      throw new Error(
        `<InputOtp.Slot index={${index}}> is out of range for this <InputOtp>.`,
      );
    }

    const slots = ctx.slots;
    const nextIndex = index + 1;

    const nextIsInFollowingGroup =
      nextIndex < slots.length && nextIndex > groupEndIndex;

    /** Last cell of this group while caret/selection is in the next group — no primary on this closing edge. */
    const suppressClosingEdgeForFollowingGroup =
      index === groupEndIndex &&
      nextIsInFollowingGroup &&
      slots[nextIndex]?.isActive === true;

    const prevIndex = index - 1;

    const emphasizeLeftDivider =
      index > groupStartIndex &&
      index <= groupEndIndex &&
      !suppressClosingEdgeForFollowingGroup &&
      (slot.isActive || slots[prevIndex]?.isActive === true);

    return (
      <div
        ref={ref}
        data-slot="input-otp-slot"
        data-active={slot.isActive || undefined}
        data-primary-left={emphasizeLeftDivider || undefined}
        className={cn(inputOtpSlotVariants(), className)}
        {...props}
      >
        {slot.char != null ? (
          slot.char
        ) : slot.placeholderChar != null ? (
          <span className="ui:text-text-default-muted">
            {slot.placeholderChar}
          </span>
        ) : null}
        {slot.hasFakeCaret ? (
          <div className="ui:pointer-events-none ui:absolute ui:inset-0 ui:flex ui:items-center ui:justify-center">
            <div className="ui:h-4 ui:w-px ui:animate-pulse ui:bg-text-default" />
          </div>
        ) : null}
      </div>
    );
  },
);

InputOtpSlot.displayName = "InputOtp.Slot";

function isOtpSlotElement(
  child: React.ReactElement,
  SlotType: typeof InputOtpSlot,
): boolean {
  if (child.type === SlotType) return true;
  const type = child.type as { displayName?: string } | string;
  if (typeof type === "function" || typeof type === "object") {
    return type != null && type.displayName === InputOtpSlot.displayName;
  }
  return false;
}

function scanSlotIndexBounds(
  SlotType: typeof InputOtpSlot,
  node: React.ReactNode,
): { min: number | null; max: number | null } {
  let min: number | null = null;
  let max: number | null = null;

  const visit = (n: React.ReactNode) => {
    React.Children.forEach(n, (child) => {
      if (!React.isValidElement(child)) return;
      const props = child.props as { children?: React.ReactNode };

      if (child.type === React.Fragment) {
        visit(props.children);
        return;
      }

      if (isOtpSlotElement(child, SlotType)) {
        const idx = (props as InputOtpSlotProps).index;
        if (typeof idx === "number") {
          min = min === null ? idx : Math.min(min, idx);
          max = max === null ? idx : Math.max(max, idx);
        }
        return;
      }

      if (props.children) {
        visit(props.children);
      }
    });
  };

  visit(node);
  return { min, max };
}

export type InputOtpGroupProps = React.ComponentPropsWithoutRef<"div">;

const InputOtpGroup = React.forwardRef<
  HTMLDivElement,
  InputOtpGroupProps
>(function InputOtpGroup({ className, children, ...props }, ref) {
  const bounds = React.useMemo(() => {
    const { min, max } = scanSlotIndexBounds(InputOtpSlot, children);
    /** If we can't see Slot elements (rare), don't collapse end to 0 — that hides all focus borders. */
    if (min === null && max === null) {
      return { start: 0, end: Number.MAX_SAFE_INTEGER };
    }
    return {
      start: min ?? 0,
      end: max ?? min ?? Number.MAX_SAFE_INTEGER,
    } satisfies InputOtpGroupBounds;
  }, [children]);

  return (
    <InputOtpGroupBoundsContext.Provider value={bounds}>
      <div
        ref={ref}
        role="group"
        data-slot="input-otp-group"
        className={cn(inputOtpGroupVariants(), className)}
        {...props}
      >
        {children}
      </div>
    </InputOtpGroupBoundsContext.Provider>
  );
});

InputOtpGroup.displayName = "InputOtp.Group";

export type InputOtpSeparatorProps = React.ComponentPropsWithoutRef<"div">;

const InputOtpSeparator = React.forwardRef<
  HTMLDivElement,
  InputOtpSeparatorProps
>(function InputOtpSeparator({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="presentation"
      data-slot="input-otp-separator"
      className={cn(inputOtpSeparatorVariants(), className)}
      aria-hidden
      {...props}
    >
      {children ?? <DotFilled />}
    </div>
  );
});

InputOtpSeparator.displayName = "InputOtp.Separator";

type InputOtpComponent = typeof InputOtpRoot & {
  Group: typeof InputOtpGroup;
  Slot: typeof InputOtpSlot;
  Separator: typeof InputOtpSeparator;
};

export const InputOtp = InputOtpRoot as InputOtpComponent;
InputOtp.Group = InputOtpGroup;
InputOtp.Slot = InputOtpSlot;
InputOtp.Separator = InputOtpSeparator;
