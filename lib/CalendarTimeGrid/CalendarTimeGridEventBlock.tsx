"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "../utils/cn";
import type { CalendarTimeGridEventColor } from "./calendar-timegrid-types";
import {
  CALENDAR_TIMEGRID_EVENT_COLORS,
  timeGridUnconfirmedStyle,
} from "./calendar-timegrid-colors";

export type CalendarTimeGridEventBlockProps = {
  title: string;
  start: Date;
  end: Date;
  /** Side-by-side lanes when intervals overlap; >1 tightens type. */
  columnCount?: number;
  color?: CalendarTimeGridEventColor;
  /**
   * When set, draws a leading accent rail flush to the block's left edge (marks
   * a show nested in a tour). The block's `overflow-hidden` clips its corners.
   */
  railColor?: string;
  /** Tentative state: no fill, dashed accent outline. */
  unconfirmed?: boolean;
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
    railColor,
    unconfirmed,
    className,
    style,
    onClick,
    ...rest
  },
  ref,
) {
  const tint = CALENDAR_TIMEGRID_EVENT_COLORS[color];
  const lanes = Math.max(1, columnCount);
  const compact = lanes > 1;
  const veryCompact = lanes >= 3;
  const timeRange = `${format(start, "HH:mm")}–${format(end, "HH:mm")}`;
  return (
    <div
      ref={ref}
      data-slot="calendar-timegrid-event"
      data-unconfirmed={unconfirmed ? "true" : undefined}
      className={cn(
        "ui:pointer-events-auto ui:z-20 ui:overflow-hidden ui:rounded-md ui:p-1",
        railColor && "ui:pl-2",
        className,
      )}
      style={{
        backgroundColor: tint.bg,
        color: tint.text,
        ...(unconfirmed ? timeGridUnconfirmedStyle(color) : null),
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {railColor ? (
        <span
          aria-hidden
          className="ui:absolute ui:inset-y-0 ui:left-0 ui:w-[3px]"
          style={{
            backgroundColor: railColor,
            opacity: unconfirmed ? 0.55 : 1,
          }}
        />
      ) : null}
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
