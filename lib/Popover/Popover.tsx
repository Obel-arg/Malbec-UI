"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../utils/cn";
import { popoverContentVariants } from "./popover-variants";

const PopoverRoot = PopoverPrimitive.Root;

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;

const PopoverTrigger = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(function PopoverTrigger({ className, ...rest }, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      className={cn(className)}
      {...rest}
    />
  );
});
PopoverTrigger.displayName = "Popover.Trigger";

export type PopoverAnchorProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
>;

const PopoverAnchor = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Anchor>,
  PopoverAnchorProps
>(function PopoverAnchor({ className, ...rest }, ref) {
  return (
    <PopoverPrimitive.Anchor
      ref={ref}
      data-slot="popover-anchor"
      className={cn(className)}
      {...rest}
    />
  );
});
PopoverAnchor.displayName = "Popover.Anchor";

export type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> & {
  /**
   * `"popover"` — default surface (`popoverContentVariants`).
   * `"plain"` — portal + positioning only; use `className` for chrome (e.g. Combobox).
   */
  surface?: "popover" | "plain";
};

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  {
    className,
    surface = "popover",
    side = "bottom",
    align = "center",
    sideOffset = 4,
    collisionPadding = 8,
    ...rest
  },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="popover-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          surface === "popover" ? popoverContentVariants() : undefined,
          className,
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = "Popover.Content";

type PopoverComponent = typeof PopoverRoot & {
  Trigger: typeof PopoverTrigger;
  Anchor: typeof PopoverAnchor;
  Content: typeof PopoverContent;
};

export const Popover = PopoverRoot as PopoverComponent;
Popover.Trigger = PopoverTrigger;
Popover.Anchor = PopoverAnchor;
Popover.Content = PopoverContent;
