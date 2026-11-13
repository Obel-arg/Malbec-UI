import * as React from "react";
import { cn } from "../utils/cn";

export interface SkeletonProps extends React.ComponentProps<"div"> {
  /** Round placeholder, only for avatars and dots. */
  circle?: boolean;
}

/**
 * Loading placeholder in neutral grey. Never the brand colour at low opacity: that tinted every
 * screen pink while it loaded (Records). 8px radius, the one of the controls. Size it with
 * `className` (`ui:h-4 ui:w-32`).
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { circle = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      data-slot="skeleton"
      className={cn(
        "ui:animate-pulse ui:bg-background-300",
        circle ? "ui:rounded-full" : "ui:rounded-[8px]",
        className,
      )}
      {...rest}
    />
  );
});
Skeleton.displayName = "Skeleton";
