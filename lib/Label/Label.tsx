"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../utils/cn";
import { labelVariants } from "./label-variants";
import type { LabelWeight } from "./label-variants";

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> & {
  weight?: LabelWeight;
};

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(function Label({ className, weight = "regular", ...rest }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      data-weight={weight}
      className={cn(labelVariants({ weight }), className)}
      {...rest}
    />
  );
});

Label.displayName = "Label";
