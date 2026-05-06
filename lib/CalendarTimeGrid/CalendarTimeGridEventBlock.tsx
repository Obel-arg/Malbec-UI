"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "../utils/cn";
import type { CalendarTimeGridEventColor } from "./calendar-timegrid-types";

const EVENT_BLOCK: Record<
  CalendarTimeGridEventColor,
  { bg: string; text: string }
> = {
  yellow: { bg: "#efeed4", text: "#8a862f" },
  orange: { bg: "#efe3d4", text: "#8a642f" },
  blue: { bg: "#dce6ec", text: "#2f628a" },
  violet: { bg: "#e5dcec", text: "#352a60" },
  emerald: { bg: "#d0dfd0", text: "#2a602c" },
  sage: { bg: "#b4c5b5", text: "#025406" },
  red: { bg: "#dfd0d0", text: "#602a2a" },
};

export type CalendarTimeGridEventBlockProps = {
  title: string;
  start: Date;
  end: Date;
  /** Side-by-side lanes when intervals overlap; >1 tightens type. */
  columnCount?: number;
  color?: CalendarTimeGridEventColor;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const CalendarTimeGridEventBlock = React.forwardRef<
  HTMLDivElement,
  CalendarTimeGridEventBlockProps
>(function CalendarTimeGridEventBlock(
  {
    title,
    start,
    end,
    columnCount = 1,
    color = "emerald",
    className,
    style,
    onClick,
    ...rest
  },
  ref,
) {
  const tint = EVENT_BLOCK[color];
  const lanes = Math.max(1, columnCount);
  const compact = lanes > 1;
  const veryCompact = lanes >= 3;
  const timeRange = `${format(start, "HH:mm")}–${format(end, "HH:mm")}`;
  return (
    <div
      ref={ref}
      data-slot="calendar-timegrid-event"
      className={cn(
        "ui:pointer-events-auto ui:z-20 ui:overflow-hidden ui:rounded-md ui:p-1",
        className,
      )}
      style={{
        backgroundColor: tint.bg,
        color: tint.text,
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      <div
        className={cn(
          "ui:font-semibold ui:leading-tight ui:truncate",
          veryCompact && "ui:text-[10px]",
          compact && !veryCompact && "ui:text-[11px]",
          !compact && "ui:text-[13px] ui:leading-none",
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "ui:mt-px ui:font-normal ui:leading-none ui:opacity-95 ui:tabular-nums ui:whitespace-nowrap ui:overflow-hidden ui:text-ellipsis",
          veryCompact && "ui:text-[9px]",
          compact && !veryCompact && "ui:text-[10px]",
          !compact && "ui:text-[11px]",
        )}
      >
        {timeRange}
      </div>
    </div>
  );
});
