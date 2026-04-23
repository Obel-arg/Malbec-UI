import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../utils/cn";
import {
  checkboxIndicatorVariants,
  checkboxRootVariants,
} from "./checkbox-variants";

function CheckGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MinusGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

const CheckboxRoot = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function CheckboxRoot({ className, children, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(checkboxRootVariants(), className)}
      {...props}
    >
      {children}
    </CheckboxPrimitive.Root>
  );
});
CheckboxRoot.displayName = "Checkbox";

export type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Indicator
> & {
  /** Icon shown when checked or indeterminate; defaults to a check mark. */
  children?: React.ReactNode;
};

const CheckboxIndicator = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Indicator>,
  CheckboxIndicatorProps
>(function CheckboxIndicator({ className, children, ...props }, ref) {
  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      data-slot="checkbox-indicator"
      className={cn(checkboxIndicatorVariants(), className)}
      {...props}
    >
      {children ?? (
        <>
          <CheckGlyph className="ui:size-3 ui:hidden ui:group-data-[state=checked]:block" />
          <MinusGlyph className="ui:size-3 ui:hidden ui:group-data-[state=indeterminate]:block" />
        </>
      )}
    </CheckboxPrimitive.Indicator>
  );
});
CheckboxIndicator.displayName = "Checkbox.Indicator";

type CheckboxComponent = typeof CheckboxRoot & {
  Indicator: typeof CheckboxIndicator;
};

export const Checkbox = CheckboxRoot as CheckboxComponent;
Checkbox.Indicator = CheckboxIndicator;

/** Registry-style alias — same as `Checkbox.Indicator`. */
export { CheckboxIndicator };
