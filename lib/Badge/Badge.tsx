import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils/cn";
import { badgeVariants } from "./badge-variants";
import type { BadgeVariant } from "./badge-variants";

export type { BadgeVariant } from "./badge-variants";

export interface BadgeProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  variant?: BadgeVariant;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  { className, variant = "default", asChild = false, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...rest}
    />
  );
});

Badge.displayName = "Badge";

export { Badge };
