"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../utils/cn";
import { tooltipContentVariants } from "./tooltip-variants";

const TooltipRoot = TooltipPrimitive.Root;

type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;

const TooltipProvider = function TooltipProvider({
  delayDuration = 200,
  ...rest
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...rest} />
  );
};
TooltipProvider.displayName = "Tooltip.Provider";

type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>;

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(function TooltipTrigger({ className, ...rest }, ref) {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      className={cn("ui:cursor-pointer", className)}
      {...rest}
    />
  );
});
TooltipTrigger.displayName = "Tooltip.Trigger";

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>;

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent(
  {
    className,
    side = "top",
    sideOffset = 4,
    collisionPadding = 8,
    ...rest
  },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(tooltipContentVariants(), className)}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = "Tooltip.Content";

type TooltipComponent = typeof TooltipRoot & {
  Provider: typeof TooltipProvider;
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
};

export const Tooltip = TooltipRoot as TooltipComponent;
Tooltip.Provider = TooltipProvider;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
