"use client";

import * as React from "react";
import { Cell, Pie, PieChart } from "recharts";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { cn } from "../utils/cn";
import { AREA_ALPHAS, CHART_SURFACE, seriesPaint } from "./chart-style";

export type DonutDatum = { label: string; value: number };

/**
 * The palette doesn't cycle on its own (charts.md §8): beyond `AREA_ALPHAS.length - 1` entities the
 * long tail folds into one last slice, so "Other" gets the lightest tone and never reads as the
 * biggest one.
 */
// eslint-disable-next-line react-refresh/only-export-components -- pure helper, tested on its own
export function foldDonutData(data: readonly DonutDatum[], otherLabel: string): DonutDatum[] {
  const top = AREA_ALPHAS.length - 1;
  if (data.length <= AREA_ALPHAS.length) return [...data];
  const rest = data.slice(top).reduce((sum, item) => sum + item.value, 0);
  return [...data.slice(0, top), { label: otherLabel, value: rest }];
}

export type DonutProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Entities in display order; colour goes by index, deepest first. */
  data: readonly DonutDatum[];
  /** Figure in the centre (the total, already formatted). */
  total?: React.ReactNode;
  /** Caption under the figure. */
  caption?: React.ReactNode;
};

const SIZE = 180;

/**
 * Thin ring (12px), 2° gaps, rounded ends, total in the centre (charts.md §4). Needs
 * `<ChartMarkDefs />` on the screen for the sheen.
 */
export const Donut = React.forwardRef<HTMLDivElement, DonutProps>(function Donut(
  { data, total, caption, className, ...rest },
  ref,
) {
  const { chartOther } = useMalbecLabels();
  const slices = foldDonutData(data, chartOther).filter((item) => item.value > 0);
  return (
    <div
      ref={ref}
      data-slot="donut"
      className={cn("ui:relative ui:size-[180px] ui:shrink-0", className)}
      {...rest}
    >
      <PieChart width={SIZE} height={SIZE}>
        <Pie
          data={slices}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={78}
          outerRadius={90}
          paddingAngle={slices.length > 1 ? 2 : 0}
          cornerRadius={6}
          startAngle={90}
          endAngle={-270}
          stroke={CHART_SURFACE}
          isAnimationActive={false}
        >
          {slices.map((item, index) => (
            <Cell key={item.label} fill={seriesPaint(index)} />
          ))}
        </Pie>
      </PieChart>
      {total != null || caption != null ? (
        <div className="ui:pointer-events-none ui:absolute ui:inset-0 ui:flex ui:flex-col ui:items-center ui:justify-center">
          {total != null ? (
            <span
              data-slot="donut-total"
              className="ui:text-[15px] ui:font-semibold ui:tracking-[-0.45px] ui:tabular-nums ui:text-malbec-ink"
            >
              {total}
            </span>
          ) : null}
          {caption != null ? (
            <span className="ui:text-[11px] ui:text-text-default-muted">{caption}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
