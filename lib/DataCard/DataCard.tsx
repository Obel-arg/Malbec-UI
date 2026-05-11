"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import {
  dataCardPanelVariants,
  dataCardRootVariants,
} from "./data-card-variants";
import type { DataCardAccentSide } from "./data-card-variants";

export interface DataCardProps extends React.ComponentProps<"div"> {
  /** Edge for the thick `primary` accent stripe. */
  accentSide?: DataCardAccentSide;
  /** Class names merged into the inner content panel. */
  panelClassName?: string;
}

/**
 * Presentational shell built as a `primary` outer wrapper with a 4px stripe on the
 * chosen edge, and an inner `background-200` panel with rounded corners that holds
 * the content. `className` styles the outer card; `panelClassName` styles the inner
 * panel.
 */
export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(function DataCard(
  { accentSide = "top", children, className, panelClassName, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="data-card"
      data-accent-side={accentSide}
      className={cn(dataCardRootVariants({ accentSide }), className)}
      {...rest}
    >
      <div
        data-slot="data-card-panel"
        className={cn(dataCardPanelVariants(), panelClassName)}
      >
        {children}
      </div>
    </div>
  );
});

DataCard.displayName = "DataCard";
