"use client";
/* eslint-disable react-refresh/only-export-components -- one module of chart primitives (constants + SVG parts), as charts.md asks */

import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Chart primitives of the Malbec suite (malbec-ux-ui `references/charts.md`, approved in Records
 * and ported to Publishing). Import them; don't copy them: two screens must not drift visually.
 *
 * Use them with Recharts:
 * - mount `<ChartMarkDefs />` once per screen, outside any `space-y-*` container;
 * - wrap each chart in `<ChartCard>` (dot field + embossed edge);
 * - paint marks with `seriesPaint(i)` / `SINGLE_SERIES_PAINT`, never the brand colour.
 */

// ---------------------------------------------------------------------------
// Two greys, and the difference matters
// ---------------------------------------------------------------------------

/** Cold grey (`#3f3f46`, malbec-icon): chrome and text — grid, crosshair, labels, dot field. Never data. */
export const CHART_INK = "63, 63, 70";
/** Warm grey (background-300 family at the ink's lightness): data marks only. */
export const SERIES_INK = "72, 67, 61";

/** Series scale, deepest first: the biggest entity reads strongest and the long tail fades. */
export const AREA_ALPHAS = [0.92, 0.7, 0.52, 0.36, 0.24, 0.16, 0.11, 0.07] as const;
export const AREA_PALETTE = AREA_ALPHAS.map((alpha) => `rgba(${SERIES_INK}, ${alpha})`);
/** Four-step scale for maps (territories). */
export const TERRITORY_COLOR_SCALE = [0.88, 0.62, 0.38, 0.18].map(
  (alpha) => `rgba(${SERIES_INK}, ${alpha})`,
);
/** Marks with no identity (a single series, bars inside a table). */
export const SERIES_SINGLE = `rgba(${SERIES_INK}, 0.55)`;
/** Empty block of `PctBlocks`. */
export const PCT_BLOCK_EMPTY = `rgba(${SERIES_INK}, 0.07)`;
/** State (> 100% of budget), never a series identity. */
export const OVER_BUDGET = "var(--color-destructive)";

/** Flat colour of entity `index`: same entity, same tone in chart, legend and table. */
export function areaColor(index: number): string {
  return AREA_PALETTE[index % AREA_PALETTE.length];
}

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

export const PLOT_DOT_RADIUS = 1;
export const PLOT_DOT_STEP = 8;
export const PLOT_DOT_OPACITY = 0.05;
export const CHART_GRID_DOT_WIDTH = 2 * PLOT_DOT_RADIUS;
/** `strokeDasharray` + `strokeLinecap="round"` = one dot every 8px, the dot field's step. */
export const CHART_GRID_DASH = `0 ${PLOT_DOT_STEP}`;
export const CHART_GRID = `rgba(${CHART_INK}, 0.28)`;
export const CHART_CROSSHAIR = `rgba(${CHART_INK}, 0.45)`;
export const CHART_LABEL_INK = `rgba(${CHART_INK}, 0.92)`;
export const CHART_HOVER_FILL = `rgba(${CHART_INK}, 0.04)`;
export const CHART_AXIS_TEXT = "var(--color-malbec-muted-text, #8c8c94)";
/** Air between stacked segments: painted with the surface, not drawn as a border. */
export const CHART_SURFACE = "var(--color-background-100)";
export const CHART_TICK = { fill: CHART_AXIS_TEXT, fontSize: 11 } as const;

// ---------------------------------------------------------------------------
// The card: dot field + embossed edge (not a design-system Card)
// ---------------------------------------------------------------------------

/** Paddings are multiples of `PLOT_DOT_STEP` on purpose: they keep the grid on the field's dots. */
export const DOTTED_CARD_CLASS =
  "ui:rounded-2xl ui:border ui:border-white ui:shadow-[0_0_0_1px_var(--color-background-200)] ui:px-4 ui:pb-4 ui:pt-6";
export const DOTTED_CARD_STYLE: React.CSSProperties = {
  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CHART_INK}, ${PLOT_DOT_OPACITY}) 0 ${PLOT_DOT_RADIUS}px, transparent ${PLOT_DOT_RADIUS}px)`,
  backgroundSize: `${PLOT_DOT_STEP}px ${PLOT_DOT_STEP}px`,
};

export type ChartCardProps = React.ComponentProps<"div">;

/**
 * The chart block: a dot field with an embossed edge, covering chart, axes and legend. Inside an
 * ancestor with `overflow: hidden`, give the parent `-mx-4 px-4` so the outer ring isn't clipped.
 */
export const ChartCard = React.forwardRef<HTMLDivElement, ChartCardProps>(function ChartCard(
  { className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="chart-card"
      className={cn(DOTTED_CARD_CLASS, className)}
      style={{ ...DOTTED_CARD_STYLE, ...style }}
      {...rest}
    />
  );
});

/** The tooltip card (white is allowed here: the spec's only white surface besides light edges). */
export const TOOLTIP_CARD_CLASS =
  "ui:min-w-[168px] ui:rounded-[10px] ui:border ui:border-background-300 ui:bg-white ui:px-3 ui:py-2.5 ui:shadow-[0_10px_26px_-14px_rgba(26,26,31,0.28)]";

// ---------------------------------------------------------------------------
// Marks: a soft vertical sheen, never a flat fill
// ---------------------------------------------------------------------------

/** Opacity of the top stop, relative to the tone. Same factor for every series keeps the ranking. */
export const SHEEN_TOP_FACTOR = 0.82;
const SINGLE_ALPHA = 0.55; // = SERIES_SINGLE
export const sheenId = (index: number) => `malbec-chart-sheen-${index % AREA_ALPHAS.length}`;
export const SINGLE_SHEEN_ID = "malbec-chart-sheen-single";

/**
 * Gradient defs for every series. Mount ONCE per screen: `url(#…)` resolves per document, so all
 * charts share them. Keep it outside `space-y-*` containers (as a sibling it would add a margin).
 */
export function ChartMarkDefs() {
  const stops = [
    ...AREA_ALPHAS.map((alpha, index) => ({ id: sheenId(index), alpha })),
    { id: SINGLE_SHEEN_ID, alpha: SINGLE_ALPHA },
  ];
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
      <defs>
        {stops.map(({ id, alpha }) => (
          <linearGradient key={id} id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={`rgb(${SERIES_INK})`} stopOpacity={alpha * SHEEN_TOP_FACTOR} />
            <stop offset="100%" stopColor={`rgb(${SERIES_INK})`} stopOpacity={alpha} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

/** SVG `fill` of series `index` (needs `<ChartMarkDefs />`). The palette cycles explicitly. */
export const seriesPaint = (index: number) => `url(#${sheenId(index)})`;
/** SVG `fill` for a single-series chart: the tone carries no identity. */
export const SINGLE_SERIES_PAINT = `url(#${SINGLE_SHEEN_ID})`;

const sheenGradient = (alpha: number) =>
  `linear-gradient(to bottom, rgba(${SERIES_INK}, ${alpha * SHEEN_TOP_FACTOR}), rgba(${SERIES_INK}, ${alpha}))`;

/** CSS twin of `seriesPaint`, for legend swatches and tooltip dots. */
export function legendSwatchStyle(index: number): React.CSSProperties {
  return { backgroundImage: sheenGradient(AREA_ALPHAS[index % AREA_ALPHAS.length]) };
}
/** CSS twin of `SINGLE_SERIES_PAINT`, for non-SVG marks (progress blocks, swatches). */
export const SINGLE_MARK_STYLE: React.CSSProperties = { backgroundImage: sheenGradient(SINGLE_ALPHA) };

/** Rectangle with rounded TOP corners (`r <= 0` gives a plain rectangle). */
export function topCapPath(x: number, y: number, w: number, h: number, r: number): string {
  if (r <= 0) return `M${x} ${y} h${w} v${h} h${-w} Z`;
  const rr = Math.min(r, h, w / 2);
  return `M${x} ${y + h} V${y + rr} Q${x} ${y} ${x + rr} ${y} H${x + w - rr} Q${x + w} ${y} ${x + w} ${y + rr} V${y + h} Z`;
}

/**
 * `shape` for a stacked `Bar`: the rounded cap goes only on the top segment with a value > 0 in
 * that column (Recharts' `radius` would round the wrong one when the last series is 0).
 */
export function makeStackedBarShape(seriesKeys: readonly string[], seriesKey: string) {
  const topFirst = [...seriesKeys].reverse();
  return function StackedBarShape(raw: unknown): React.ReactElement {
    const props = (raw ?? {}) as Record<string, unknown>;
    const [x, y, w, h] = [props.x, props.y, props.width, props.height].map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !(w > 0) || !(h > 0)) return <g />;
    const payload = props.payload as Record<string, unknown> | undefined;
    const topKey = topFirst.find((key) => Number(payload?.[key]) > 0);
    return (
      <path
        d={topCapPath(x, y, w, h, topKey === seriesKey ? 5 : 0)}
        fill={String(props.fill)}
        stroke={CHART_SURFACE}
        strokeWidth={2}
      />
    );
  };
}

// ---------------------------------------------------------------------------
// Grid and axes aligned to the dot field
// ---------------------------------------------------------------------------

const PHASE = PLOT_DOT_STEP / 2;
/** Snap a position to the nearest row/column of the dot field (at most half a step away). */
export const snapToDotGrid = (value: number) =>
  Math.round((value - PHASE) / PLOT_DOT_STEP) * PLOT_DOT_STEP + PHASE;
/** Snap the START of a row upwards, so its first dot stays inside the plot. */
export const snapDotRowStart = (value: number) =>
  Math.ceil((value - PHASE) / PLOT_DOT_STEP) * PLOT_DOT_STEP + PHASE;

type GridLineProps = Partial<Record<"x1" | "y1" | "x2" | "y2" | "x" | "y" | "width" | "height", number | string>>;

/**
 * A grid line drawn as a row of dots on the field's step. Pass it as `horizontal` / `vertical` of
 * `CartesianGrid` (and no `fill` there: the card already has the field). The baseline is skipped.
 */
export function DottedGridLine(props: GridLineProps) {
  const [x1, y1, x2, y2] = [props.x1, props.y1, props.x2, props.y2].map(Number);
  if (![x1, y1, x2, y2].every(Number.isFinite)) return <g />;
  const isHorizontal = y1 === y2;
  const baseline = isHorizontal ? Number(props.y) + Number(props.height) : Number(props.x);
  if (Number.isFinite(baseline) && Math.abs((isHorizontal ? y1 : x1) - baseline) < 1) return <g />;
  const row = snapToDotGrid(isHorizontal ? y1 : x1);
  return (
    <line
      fill="none"
      stroke={CHART_GRID}
      strokeDasharray={CHART_GRID_DASH}
      strokeLinecap="round"
      strokeWidth={CHART_GRID_DOT_WIDTH}
      x1={isHorizontal ? snapDotRowStart(x1) : row}
      x2={isHorizontal ? x2 : row}
      y1={isHorizontal ? row : snapDotRowStart(y1)}
      y2={isHorizontal ? row : y2}
    />
  );
}

/** Axis `tick` moved onto its dot row, so label and guide coincide. `format` is the screen's unit. */
export function makeDottedAxisTick(format: (value: number) => string) {
  return function DottedAxisTick(props: Record<string, unknown>): React.ReactElement {
    const x = Number(props.x);
    const y = Number(props.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return <g />;
    const vertical = props.orientation === "left" || props.orientation === "right" || props.orientation == null;
    const payload = props.payload as { value?: unknown } | undefined;
    return (
      <text
        dominantBaseline={vertical ? "central" : "hanging"}
        fill={CHART_AXIS_TEXT}
        fontSize={CHART_TICK.fontSize}
        textAnchor={(props.textAnchor as React.SVGProps<SVGTextElement>["textAnchor"]) ?? "end"}
        x={vertical ? x : snapToDotGrid(x)}
        y={vertical ? snapToDotGrid(y) : y}
      >
        {format(Number(payload?.value))}
      </text>
    );
  };
}

/**
 * Tooltip `cursor`: a dotted vertical line instead of Recharts' filled band. Bar charts pass the
 * band rect (`x/y/width/height`), line charts pass `points`; both are handled.
 */
export function CrosshairCursor(props: Record<string, unknown>): React.ReactElement | null {
  const points = props.points as Array<{ x: number; y: number }> | undefined;
  const first = points?.[0];
  const last = points?.[points.length - 1];
  const cx = first ? first.x : Number(props.x) + Number(props.width) / 2;
  const ys = first && last ? [first.y, last.y] : [Number(props.y), Number(props.y) + Number(props.height)];
  if (!Number.isFinite(cx) || !ys.every(Number.isFinite)) return null;
  return (
    <line
      stroke={CHART_CROSSHAIR}
      strokeDasharray={CHART_GRID_DASH}
      strokeLinecap="round"
      strokeWidth={CHART_GRID_DOT_WIDTH}
      x1={cx}
      x2={cx}
      y1={Math.min(...ys)}
      y2={Math.max(...ys)}
    />
  );
}
