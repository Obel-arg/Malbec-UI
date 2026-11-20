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
  /** Percentage, 0–100. Above 100 all blocks light up; `over` says what that means. */
  value: number;
  /**
   * What going past 100% means. `bad` (a cap: budget, CPA ≤ US$4) turns the blocks into the
   * over-budget red. `good` (a minimum: ROAS ≥ 3x) keeps them in the series tone. @default "bad"
   */
  over?: "bad" | "good";
};

/**
 * Progress inside tables as 10 discrete blocks of 10% (charts.md §4): lighter than a continuous
 * fill and countable at a glance. Pair it with the number; it does not replace it.
 */
export const PctBlocks = React.forwardRef<HTMLDivElement, PctBlocksProps>(function PctBlocks(
  { value, over: overMeaning = "bad", className, ...rest },
  ref,
) {
  const filled = pctBlocksFilled(value);
  const exceeded = value > 100;
  const over = exceeded && overMeaning === "bad";
  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${Math.round(value)}%`}
      data-slot="pct-blocks"
      // `data-over` keeps meaning "in the red state"; `data-exceeded` is past 100% either way.
      data-over={over || undefined}
      data-exceeded={exceeded ? overMeaning : undefined}
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
