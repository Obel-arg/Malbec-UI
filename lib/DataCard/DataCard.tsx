"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { dataCardRootVariants } from "./data-card-variants";
import type { DataCardAccentSide } from "./data-card-variants";

export interface DataCardProps extends React.ComponentProps<"div"> {
  /** Edge for the thick `primary` accent border (remaining edges use `background-300` at 1px). */
  accentSide?: DataCardAccentSide;
}

/**
 * Presentational shell: background, rounded corners, subtle frame shadow, thin neutral border,
 * and a thick primary accent on one edge. Put any layout (`flex`, grids, etc.) and content
 * inside as `children`.
 */
export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(function DataCard(
  { accentSide = "top", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="data-card"
      data-accent-side={accentSide}
      className={cn(dataCardRootVariants({ accentSide }), className)}
      {...rest}
    />
  );
});

DataCard.displayName = "DataCard";
