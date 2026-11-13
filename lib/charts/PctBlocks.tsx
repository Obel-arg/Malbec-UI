import * as React from "react";
import { cn } from "../utils/cn";
import { OVER_BUDGET, PCT_BLOCK_EMPTY, SINGLE_MARK_STYLE } from "./chart-style";

const BLOCKS = 10;

/** How many of the 10 blocks a percentage lights up (> 100% lights all of them, as state). */
// eslint-disable-next-line react-refresh/only-export-components -- pure helper, tested on its own
export function pctBlocksFilled(percent: number): number {
  if (!Number.isFinite(percent) || percent <= 0) return 0;
  return Math.min(BLOCKS, Math.round(percent / 10));
}

export type PctBlocksProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Percentage, 0–100. Above 100 all blocks turn into the over-budget state. */
  value: number;
};

/**
 * Progress inside tables as 10 discrete blocks of 10% (charts.md §4): lighter than a continuous
 * fill and countable at a glance. Pair it with the number; it does not replace it.
 */
export const PctBlocks = React.forwardRef<HTMLDivElement, PctBlocksProps>(function PctBlocks(
  { value, className, ...rest },
  ref,
) {
  const filled = pctBlocksFilled(value);
  const over = value > 100;
  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${Math.round(value)}%`}
      data-slot="pct-blocks"
      data-over={over || undefined}
      className={cn("ui:flex ui:w-20 ui:gap-[2px]", className)}
      {...rest}
    >
      {Array.from({ length: BLOCKS }, (_, index) => (
        <span
          key={index}
          data-filled={index < filled || undefined}
          className="ui:h-2 ui:flex-1 ui:rounded-[2px]"
          style={
            index >= filled
              ? { backgroundColor: PCT_BLOCK_EMPTY }
              : over
                ? { backgroundColor: OVER_BUDGET }
                : SINGLE_MARK_STYLE
          }
        />
      ))}
    </div>
  );
});
