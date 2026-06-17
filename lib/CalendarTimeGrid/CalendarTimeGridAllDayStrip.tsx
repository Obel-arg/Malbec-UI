"use client";

import * as React from "react";
import { Badge } from "../Badge/Badge";
import type { BadgeVariant } from "../Badge/badge-variants";
import {
  clipDayRangeToRow,
  isMultiDayOrAllDay,
  layoutCalendarSpans,
  type CalendarSpanLayout,
} from "../CalendarMonth/calendar-span-layout";
import { cn } from "../utils/cn";
import type { CalendarTimeGridEvent } from "./calendar-timegrid-types";
import {
  calendarTimeGridAllDayBarVariants,
  calendarTimeGridAllDayGutterVariants,
  calendarTimeGridAllDayRowVariants,
  calendarTimeGridAllDayTrackVariants,
} from "./calendar-timegrid-variants";
import { differenceInCalendarDays, startOfDay } from "date-fns";

const ALL_DAY_BAR_HEIGHT_PX = 22;
const ALL_DAY_BAR_GAP_PX = 4;
const ALL_DAY_BAR_ROW_PX = ALL_DAY_BAR_HEIGHT_PX + ALL_DAY_BAR_GAP_PX;
/** Top inset before the first bar so the strip never looks crammed. */
const ALL_DAY_BAR_TOP_INSET_PX = 4;
/** Bottom inset after the last bar (mirrors top). */
const ALL_DAY_BAR_BOTTOM_INSET_PX = 4;
/** Horizontal indent of bars from the leftmost / rightmost column edges. */
const ALL_DAY_BAR_HORIZONTAL_INSET_PX = 4;
/** Minimum visible strip height when there are no events (still hints “drop here”). */
const ALL_DAY_STRIP_MIN_HEIGHT_PX = 24;

export type CalendarTimeGridAllDayStripProps = {
  /** Consecutive days the strip covers (1 for `CalendarDay`, 7 for `CalendarWeek`). */
  days: Date[];
  events: CalendarTimeGridEvent[];
  /** Label shown in the gutter cell. Defaults to `"all-day"`. Pass empty string to hide. */
  label?: string;
  onSelectEvent?: (event: CalendarTimeGridEvent) => void;
  className?: string;
};

/**
 * Renders the row of all-day / multi-day events above the time grid, with the
 * same Google Calendar pattern: bars span multiple columns, square edges
 * indicate continuation outside the visible range.
 */
export function CalendarTimeGridAllDayStrip({
  days,
  events,
  label = "all-day",
  onSelectEvent,
  className,
}: CalendarTimeGridAllDayStripProps) {
  const spanEvents = React.useMemo(
    () => events.filter((ev) => isMultiDayOrAllDay(ev.start, ev.end, ev.allDay)),
    [events],
  );

  const layout = React.useMemo<CalendarSpanLayout<CalendarTimeGridEvent>>(() => {
    if (days.length === 0 || spanEvents.length === 0) {
      return { layout: [], lanes: 0 };
    }
    const rowStart = days[0]!;
    const segments = spanEvents
      .map((ev) => {
        const clip = clipDayRangeToRow(ev.start, ev.end, rowStart, days.length);
        return clip ? { event: ev, ...clip } : null;
      })
      .filter(
        (
          s,
        ): s is {
          event: CalendarTimeGridEvent;
          startIdx: number;
          endIdx: number;
        } => s !== null,
      );
    return layoutCalendarSpans(segments);
  }, [days, spanEvents]);

  const stripHeight =
    layout.lanes === 0
      ? ALL_DAY_STRIP_MIN_HEIGHT_PX
      : layout.lanes * ALL_DAY_BAR_ROW_PX -
        ALL_DAY_BAR_GAP_PX +
        ALL_DAY_BAR_TOP_INSET_PX +
        ALL_DAY_BAR_BOTTOM_INSET_PX;

  const dayCount = days.length;
  const widthPctPerDay = 100 / Math.max(1, dayCount);

  return (
    <div
      data-slot="calendar-timegrid-all-day-row"
      className={cn(calendarTimeGridAllDayRowVariants(), className)}
    >
      <div
        className={cn(calendarTimeGridAllDayGutterVariants())}
        style={{ minHeight: stripHeight }}
      >
        {label ? (
          <span className="ui:text-[10px] ui:font-medium ui:uppercase ui:leading-none ui:text-[#a0a0a0]">
            {label}
          </span>
        ) : null}
      </div>
      <div
        className={cn(calendarTimeGridAllDayTrackVariants())}
        style={{ minHeight: stripHeight }}
      >
        {/** Column separators behind bars, only meaningful when there is more than one column. */}
        {dayCount > 1 ? (
          <div className="ui:pointer-events-none ui:absolute ui:inset-0 ui:grid ui:grid-cols-7">
            {Array.from({ length: dayCount }, (_, i) => (
              <div
                key={i}
                className={cn(
                  i < dayCount - 1 ? "ui:border-r ui:border-[#e0e0e0]" : "",
                )}
              />
            ))}
          </div>
        ) : null}
        {layout.layout.map((item) => {
          const ev = item.event;
          const rowStart = startOfDay(days[0]!);
          const rowEnd = startOfDay(days[dayCount - 1]!);
          const continuesLeft =
            differenceInCalendarDays(startOfDay(ev.start), rowStart) < 0;
          const continuesRight =
            differenceInCalendarDays(startOfDay(ev.end), rowEnd) > 0;
          const span = item.endIdx - item.startIdx + 1;
          const leftPct = item.startIdx * widthPctPerDay;
          const widthPct = span * widthPctPerDay;
          const interactive = Boolean(onSelectEvent);

          return (
            <Badge
              key={
                ev.id ??
                `span-${ev.start.toISOString()}-${item.lane}-${ev.title}`
              }
              data-slot="calendar-timegrid-all-day-bar"
              variant={(ev.color ?? "blue") as BadgeVariant}
              onClick={
                interactive
                  ? (e) => {
                      e.stopPropagation();
                      onSelectEvent?.(ev);
                    }
                  : undefined
              }
              className={cn(
                calendarTimeGridAllDayBarVariants({
                  continuesLeft,
                  continuesRight,
                  interactive,
                }),
              )}
              style={{
                top:
                  ALL_DAY_BAR_TOP_INSET_PX + item.lane * ALL_DAY_BAR_ROW_PX,
                height: ALL_DAY_BAR_HEIGHT_PX,
                left: `calc(${leftPct}% + ${
                  continuesLeft ? 0 : ALL_DAY_BAR_HORIZONTAL_INSET_PX
                }px)`,
                width: `calc(${widthPct}% - ${
                  (continuesLeft ? 0 : ALL_DAY_BAR_HORIZONTAL_INSET_PX) +
                  (continuesRight ? 0 : ALL_DAY_BAR_HORIZONTAL_INSET_PX)
                }px)`,
              }}
            >
              <Badge.Text
                tone="accent"
                className="ui:min-w-0 ui:flex-1 ui:truncate ui:text-left"
              >
                {ev.title}
              </Badge.Text>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
