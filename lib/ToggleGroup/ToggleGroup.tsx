"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { toggleVariants } from "../Toggle/toggle-variants";
import type { ToggleSize, ToggleVariant } from "../Toggle/toggle-variants";
import { cn } from "../utils/cn";
import { toggleGroupRootVariants } from "./toggle-group-variants";

type ToggleGroupRootProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

type ToggleGroupContextValue = {
  variant: ToggleVariant;
  size: ToggleSize;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null,
);

function useToggleGroupContext(component: string): ToggleGroupContextValue {
  const ctx = React.useContext(ToggleGroupContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <ToggleGroup> component.`,
    );
  }
  return ctx;
}

const ToggleGroupRoot = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupRootProps
>(function ToggleGroupRoot(
  { className, variant = "default", size = "md", children, ...rest },
  ref,
) {
  const ctx = React.useMemo<ToggleGroupContextValue>(
    () => ({ variant, size }),
    [variant, size],
  );

  return (
    <ToggleGroupContext.Provider value={ctx}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        className={cn(toggleGroupRootVariants(), className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  );
});

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { className, variant: itemVariant, size: itemSize, ...rest },
  ref,
) {
  const { variant, size } = useToggleGroupContext("ToggleGroup.Item");
  const v = itemVariant ?? variant;
  const s = itemSize ?? size;
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      className={cn(toggleVariants({ variant: v, size: s }), className)}
      data-variant={v}
      data-size={s}
      {...rest}
    />
  );
});

type ToggleGroupComponent = typeof ToggleGroupRoot & {
  Item: typeof ToggleGroupItem;
};

export const ToggleGroup = ToggleGroupRoot as ToggleGroupComponent;
ToggleGroup.Item = ToggleGroupItem;

ToggleGroupRoot.displayName = "ToggleGroup";
ToggleGroupItem.displayName = "ToggleGroup.Item";
