"use client";

import * as React from "react";
import { format, isSameDay, startOfDay } from "date-fns";
import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "../utils/cn";
import type { CalendarTimeGridEvent } from "./calendar-timegrid-types";
import {
  gridBackgroundStyle,
  layoutTimedEventsForDayColumn,
  timedEventHorizontalStyle,
} from "./calendar-timegrid-layout-utils";
import { CalendarTimeGridNowMarker } from "./CalendarTimeGridNowMarker";
import { buildWeekDays, formatGmtOffsetLabel, hourRange } from "./calendar-timegrid-utils";
import {
  calendarTimeGridBodyRowVariants,
  calendarTimeGridColumnVariants,
  calendarTimeGridDayHeaderVariants,
  calendarTimeGridGutterHeaderVariants,
  calendarTimeGridHeaderRowVariants,
  calendarTimeGridRootVariants,
  calendarTimeGridTimeGutterVariants,
  calendarTimeGridTimeLabelVariants,
  calendarTimeGridTodayBadgeVariants,
} from "./calendar-timegrid-variants";
import { CalendarTimeGridEventBlock } from "./CalendarTimeGridEventBlock";

export type CalendarWeekProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Any date inside the week to display. */
  week: Date;
  events?: CalendarTimeGridEvent[];
  weekStartsOn?: 0 | 1;
  locale?: Locale;
  today?: Date | null;
  /** “Now” for the red time marker. Defaults to `new Date()`; pass `null` to hide. */
  now?: Date | null;
  /**
   * Header gutter timezone text. Omit to derive from the browser offset at `week`
   * (handles DST). Pass `null` or `""` to hide.
   */
  timeZoneLabel?: string | null;
  /** First row hour (inclusive), 24h clock. Default `0` (midnight). */
  startHour?: number;
  /** Last row hour (inclusive), 24h clock. Default `23` (full day through 23:00–00:00). */
  endHour?: number;
  hourHeightPx?: number;
  onSelectDay?: (day: Date) => void;
  onSelectEvent?: (event: CalendarTimeGridEvent) => void;
};

const CalendarWeekRoot = React.forwardRef<HTMLDivElement, CalendarWeekProps>(
  function CalendarWeekRoot(
    {
      className,
      week,
      events = [],
      weekStartsOn = 1,
      locale = enUS,
      today: todayProp = new Date(),
      now: nowProp = new Date(),
      timeZoneLabel,
      startHour = 0,
      endHour = 23,
      hourHeightPx = 56,
      onSelectDay,
      onSelectEvent,
      ...rest
    },
    ref,
  ) {
    const days = React.useMemo(
      () => buildWeekDays(week, weekStartsOn),
      [week, weekStartsOn],
    );
    const hours = React.useMemo(
      () => hourRange(startHour, endHour),
      [startHour, endHour],
    );
    const gridH = (endHour - startHour + 1) * hourHeightPx;

    const today =
      todayProp == null
        ? null
        : startOfDay(
            todayProp instanceof Date
              ? todayProp
              : new Date(todayProp as string | number),
          );

    const now =
      nowProp == null
        ? null
        : nowProp instanceof Date
          ? nowProp
          : new Date(nowProp as string | number);

    const weekLabel = `${format(days[0]!, "PPP", { locale })} – ${format(
      days[6]!,
      "PPP",
      { locale },
    )}`;

    const eventsByDay = React.useMemo(() => {
      const map = new Map<string, CalendarTimeGridEvent[]>();
      for (const ev of events) {
        const k = format(startOfDay(ev.start), "yyyy-MM-dd");
        const list = map.get(k) ?? [];
        list.push(ev);
        map.set(k, list);
      }
      return map;
    }, [events]);

    const resolvedTimeZoneLabel = React.useMemo(() => {
      if (timeZoneLabel === null) return null;
      if (timeZoneLabel !== undefined) {
        return timeZoneLabel.length > 0 ? timeZoneLabel : null;
      }
      const at = week instanceof Date ? week : new Date(week as string | number);
      return formatGmtOffsetLabel(at);
    }, [timeZoneLabel, week]);

    return (
      <div
        ref={ref}
        data-slot="calendar-week"
        className={cn(calendarTimeGridRootVariants(), className)}
        role="region"
        aria-label={weekLabel}
        {...rest}
      >
        <div className={cn(calendarTimeGridHeaderRowVariants())}>
          <div className={cn(calendarTimeGridGutterHeaderVariants())}>
            {resolvedTimeZoneLabel ? (
              <span className="ui:text-[10px] ui:font-medium ui:uppercase ui:leading-none ui:text-[#a0a0a0]">
                {resolvedTimeZoneLabel}
              </span>
            ) : null}
          </div>
          {days.map((day, i) => {
            const isTodayCol = today !== null && isSameDay(day, today);
            return (
              <div
                key={format(day, "yyyy-MM-dd")}
                className={cn(
                  calendarTimeGridDayHeaderVariants({
                    isToday: isTodayCol,
                    isLast: i === 6,
                  }),
                )}
              >
                <span
                  className={cn(
                    isTodayCol && "ui:font-semibold ui:text-[#333333]",
                  )}
                >
                  {format(day, "EEE", { locale }).toUpperCase().replace(/\.$/, "")}
                </span>
                {isTodayCol ? (
                  <span className={cn(calendarTimeGridTodayBadgeVariants())}>
                    {format(day, "d")}
                  </span>
                ) : (
                  <span className="ui:normal-case ui:tabular-nums">
                    {format(day, "d")}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className={cn(calendarTimeGridBodyRowVariants())}>
          <div
            className={cn(calendarTimeGridTimeGutterVariants())}
            style={{ minHeight: gridH }}
          >
            {hours.map((h, i) => {
              const refDate = new Date(2020, 0, 1, h, 0, 0, 0);
              return (
                <span
                  key={h}
                  className={cn(calendarTimeGridTimeLabelVariants())}
                  style={{ top: (i + 0.5) * hourHeightPx }}
                >
                  {format(refDate, "h a", { locale })}
                </span>
              );
            })}
          </div>

          {days.map((day, i) => {
            const key = format(startOfDay(day), "yyyy-MM-dd");
            const dayEvents = eventsByDay.get(key) ?? [];
            const selectable = Boolean(onSelectDay);

            return (
              <div
                key={key}
                className={cn(
                  calendarTimeGridColumnVariants({ isLast: i === 6 }),
                  selectable &&
                    "ui:cursor-pointer ui:outline-none ui:focus-within:ring-2 ui:focus-within:ring-primary",
                )}
                style={{ minHeight: gridH }}
                tabIndex={selectable ? 0 : undefined}
                onClick={() => selectable && onSelectDay?.(startOfDay(day))}
                onKeyDown={(e) => {
                  if (
                    selectable &&
                    (e.key === "Enter" || e.key === " ") &&
                    !e.defaultPrevented
                  ) {
                    e.preventDefault();
                    onSelectDay?.(startOfDay(day));
                  }
                }}
              >
                <div
                  className="ui:pointer-events-none ui:absolute ui:inset-0 ui:z-0"
                  style={gridBackgroundStyle(hourHeightPx)}
                />
                <div className="ui:relative ui:z-10 ui:h-full ui:w-full">
                  {now ? (
                    <CalendarTimeGridNowMarker
                      day={day}
                      now={now}
                      startHour={startHour}
                      endHour={endHour}
                      hourHeightPx={hourHeightPx}
                    />
                  ) : null}
                  {layoutTimedEventsForDayColumn(
                    dayEvents,
                    day,
                    startHour,
                    endHour,
                    hourHeightPx,
                  ).map((item) => {
                    const ev = item.event;
                    return (
                      <CalendarTimeGridEventBlock
                        key={ev.id ?? `${key}-${ev.start.toISOString()}`}
                        title={ev.title}
                        start={ev.start}
                        end={ev.end}
                        columnCount={item.columnCount}
                        color={ev.color}
                        className={cn(
                          "ui:absolute",
                          onSelectEvent && "ui:cursor-pointer",
                        )}
                        style={{
                          top: item.top,
                          height: item.height,
                          ...timedEventHorizontalStyle(
                            item.column,
                            item.columnCount,
                          ),
                        }}
                        onClick={
                          onSelectEvent
                            ? () => {
                                onSelectEvent(ev);
                              }
                            : undefined
                        }
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CalendarWeekRoot.displayName = "CalendarWeek";

export const CalendarWeek = CalendarWeekRoot;
