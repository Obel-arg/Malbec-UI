"use client";

import * as React from "react";
import { cn } from "../utils/cn";

export type SpinnerProps = React.SVGProps<SVGSVGElement>;

/**
 * Default circular indeterminate loader (Figma: loader-2). Inherits `currentColor` from
 * context. Without `className`, defaults to `ui:size-4` for a sensible standalone size;
 * use `className` (e.g. `ui:size-full`) to fill a parent.
 */
export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  function Spinner({ className, ...rest }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "ui:inline-block",
          "ui:animate-spin",
          "ui:text-current",
          "ui:size-4",
          className,
        )}
        aria-hidden
        focusable="false"
        {...rest}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    );
  },
);

Spinner.displayName = "Spinner";
