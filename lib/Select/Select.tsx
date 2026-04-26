"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { readMalbecPopoverExitDurationMs } from "../Popover/popover-variants";
import { cn } from "../utils/cn";
import {
  selectContentVariants,
  selectItemVariants,
  selectPopperWidthVariants,
  selectTriggerVariants,
  selectViewportVariants,
} from "./select-variants";

type SelectMotionContextValue = {
  /** Whether the user considers the select open (matches controlled `open` or internal state). */
  userOpen: boolean;
  /** True while the surface stays mounted for an exit animation after `userOpen` became false. */
  exiting: boolean;
  /** Clears the exit phase after the exit animation ends or is cancelled (matches CSS duration). */
  endExit: () => void;
};

const SelectMotionContext =
  React.createContext<SelectMotionContextValue | null>(null);

function useSelectMotionContext(consumer: string): SelectMotionContextValue {
  const ctx = React.useContext(SelectMotionContext);
  if (!ctx) {
    throw new Error(`${consumer} must be used within Select`);
  }
  return ctx;
}

export type SelectProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
>;

function SelectRoot({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...rest
}: SelectProps) {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(!!defaultOpen);
  const userOpen = isControlled ? openProp : internalOpen;

  const [exiting, setExiting] = React.useState(false);

  const endExit = React.useCallback(() => {
    setExiting(false);
  }, []);

  /** Radix Select can skip `animationend`; keep exit phase bounded to the CSS exit duration. */
  React.useEffect(() => {
    if (!userOpen && exiting) {
      const ms = readMalbecPopoverExitDurationMs() + 48;
      const id = window.setTimeout(endExit, ms);
      return () => window.clearTimeout(id);
    }
  }, [userOpen, exiting, endExit]);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (!isControlled) {
        setInternalOpen(next);
      }
      if (next) {
        setExiting(false);
      } else {
        setExiting(true);
      }
    },
    [isControlled, onOpenChange],
  );

  const motionCtx = React.useMemo(
    () => ({ userOpen, exiting, endExit }),
    [userOpen, exiting, endExit],
  );

  const radixOpen = userOpen || exiting;

  return (
    <SelectMotionContext.Provider value={motionCtx}>
      <SelectPrimitive.Root
        {...rest}
        open={radixOpen}
        onOpenChange={handleOpenChange}
      />
    </SelectMotionContext.Provider>
  );
}
SelectRoot.displayName = "Select";

function isExitTransitionProperty(e: React.TransitionEvent): boolean {
  return e.propertyName === "opacity" || e.propertyName === "transform";
}

export type SelectGroupProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Group
>;

const SelectGroup = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Group>,
  SelectGroupProps
>(function SelectGroup({ className, ...rest }, ref) {
  return (
    <SelectPrimitive.Group
      ref={ref}
      data-slot="select-group"
      className={cn(className)}
      {...rest}
    />
  );
});
SelectGroup.displayName = "Select.Group";

export type SelectValueProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Value
>;

const SelectValue = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Value>,
  SelectValueProps
>(function SelectValue({ className, ...rest }, ref) {
  return (
    <SelectPrimitive.Value
      ref={ref}
      data-slot="select-value"
      className={cn(className)}
      {...rest}
    />
  );
});
SelectValue.displayName = "Select.Value";

export type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
>;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(function SelectTrigger({ className, children, ...rest }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(selectTriggerVariants(), className)}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span className="ui:ml-2 ui:inline-flex ui:size-4 ui:shrink-0 ui:text-text-default ui:opacity-50">
          <ChevronDownIcon className="ui:size-full" />
        </span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "Select.Trigger";

export type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "onTransitionEnd">;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent(
  {
    className,
    children,
    position = "popper",
    side = "bottom",
    align = "start",
    sideOffset = 4,
    onTransitionEnd,
    ...rest
  },
  ref,
) {
  const motion = useSelectMotionContext("Select.Content");
  const exitSurface = !motion.userOpen && motion.exiting;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        data-slot="select-content"
        position={position}
        side={side}
        align={align}
        sideOffset={sideOffset}
        data-malbec-motion={exitSurface ? "exit" : "enter"}
        className={cn(
          selectContentVariants(),
          position === "popper" && selectPopperWidthVariants(),
          exitSurface && "ui:pointer-events-none",
          className,
        )}
        {...rest}
        onTransitionEnd={(e) => {
          if (
            exitSurface &&
            e.target === e.currentTarget &&
            isExitTransitionProperty(e)
          ) {
            motion.endExit();
          }
          onTransitionEnd?.(e);
        }}
      >
        <SelectPrimitive.Viewport
          className={cn(
            position === "popper" && "ui:w-full",
            selectViewportVariants(),
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = "Select.Content";

export type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(function SelectItem({ className, children, ...rest }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(selectItemVariants(), className)}
      {...rest}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "Select.Item";

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type SelectComponent = typeof SelectRoot & {
  Group: typeof SelectGroup;
  Value: typeof SelectValue;
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
};

export const Select = SelectRoot as SelectComponent;
Select.Group = SelectGroup;
Select.Value = SelectValue;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
