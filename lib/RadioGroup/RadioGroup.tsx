"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../utils/cn";
import {
  radioGroupCardVariants,
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
  radioGroupRootVariants,
} from "./radio-group-variants";

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

const RadioGroupRoot = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroupRoot({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn(radioGroupRootVariants(), className)}
      {...props}
    />
  );
});
RadioGroupRoot.displayName = "RadioGroup";

export type RadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  "children"
>;

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(radioGroupIndicatorVariants())}
      />
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = "RadioGroup.Item";

export type RadioGroupCardProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

const RadioGroupCard = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupCardProps
>(function RadioGroupCard({ className, children, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-card"
      className={cn(radioGroupCardVariants(), className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupCard.displayName = "RadioGroup.Card";

type RadioGroupComponent = typeof RadioGroupRoot & {
  Item: typeof RadioGroupItem;
  Card: typeof RadioGroupCard;
};

export const RadioGroup = RadioGroupRoot as RadioGroupComponent;
RadioGroup.Item = RadioGroupItem;
RadioGroup.Card = RadioGroupCard;
