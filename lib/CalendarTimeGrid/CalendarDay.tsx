"use client";

import * as React from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "../Button/Button";
import { cn } from "../utils/cn";
import type { CalendarTimeGridEvent } from "./calendar-timegrid-types";
import {
  gridBackgroundStyle,
  layoutTimedEventsForDayColumn,
  timedEventHorizontalStyle,
} from "./calendar-timegrid-layout-utils";
import { CalendarTimeGridNowMarker } from "./CalendarTimeGridNowMarker";
import { formatGmtOffsetLabel, hourRange } from "./calendar-timegrid-utils";
import {
  calendarTimeGridBodyRowVariants,
  calendarTimeGridColumnVariants,
  calendarTimeGridGutterHeaderVariants,
  calendarTimeGridHeaderRowVariants,
  calendarTimeGridRootVariants,
  calendarTimeGridTimeGutterVariants,
  calendarTimeGridTimeLabelVariants,
  calendarTimeGridTodayBadgeVariants,
} from "./calendar-timegrid-variants";
import { CalendarTimeGridEventBlock } from "./CalendarTimeGridEventBlock";

export type CalendarDayProps = Omit<React.ComponentProps<"div">, "children"> & {
  day: Date;
  events?: CalendarTimeGridEvent[];
  locale?: Locale;
  today?: Date | null;
  now?: Date | null;
  /** Omit to derive from the browser offset at `day`. Pass `null` or `""` to hide. */
  timeZoneLabel?: string | null;
  /** First row hour (inclusive), 24h clock. Default `0` (midnight). */
  startHour?: number;
  /** Last row hour (inclusive), 24h clock. Default `23` (full day through 23:00–00:00). */
  endHour?: number;
  hourHeightPx?: number;
  /**
   * When set, the header shows prev/next controls and calls with the new visible day
   * (start-of-day). Controlled: update the `day` prop from this callback.
   */
  onDayChange?: (day: Date) => void;
  onSelectDay?: (day: Date) => void;
  onSelectEvent?: (event: CalendarTimeGridEvent) => void;
};

const CalendarDayRoot = React.forwardRef<HTMLDivElement, CalendarDayProps>(
  function CalendarDayRoot(
    {
      className,
      day: dayProp,
      events = [],
      locale = enUS,
      today: todayProp = new Date(),
      now: nowProp = new Date(),
      timeZoneLabel,
      startHour = 0,
      endHour = 23,
      hourHeightPx = 56,
      onDayChange,
      onSelectDay,
      onSelectEvent,
      ...rest
    },
    ref,
  ) {
    const day = startOfDay(
      dayProp instanceof Date ? dayProp : new Date(dayProp as string | number),
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

    const isTodayCol = today !== null && isSameDay(day, today);
    const dayKey = format(day, "yyyy-MM-dd");

    const dayEvents = React.useMemo(
      () =>
        events.filter((ev) =>
          isSameDay(startOfDay(ev.start), startOfDay(day)),
        ),
      [events, day],
    );

    const selectable = Boolean(onSelectDay);
    const dayLabel = format(day, "PPP", { locale });

    const resolvedTimeZoneLabel = React.useMemo(() => {
      if (timeZoneLabel === null) return null;
      if (timeZoneLabel !== undefined) {
        return timeZoneLabel.length > 0 ? timeZoneLabel : null;
      }
      return formatGmtOffsetLabel(day);
    }, [timeZoneLabel, day]);

    return (
      <div
        ref={ref}
        data-slot="calendar-day"
        className={cn(calendarTimeGridRootVariants(), className)}
        role="region"
        aria-label={dayLabel}
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
          <div className="ui:flex ui:flex-1 ui:flex-col ui:items-center ui:justify-center ui:px-2 ui:py-2">
            {onDayChange ? (
              <div className="ui:flex ui:w-full ui:max-w-full ui:items-center ui:justify-center ui:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Previous day"
                  onClick={() => onDayChange(startOfDay(addDays(day, -1)))}
                >
                  <Button.Icon>
                    <CalendarDayChevronLeftIcon className="ui:size-4" />
                  </Button.Icon>
                </Button>
                <h2 className="malbec-font-sans ui:m-0 ui:min-w-0 ui:flex-1 ui:text-center ui:text-base ui:font-semibold ui:leading-6 ui:text-text-default">
                  {format(day, "PPP", { locale })}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Next day"
                  onClick={() => onDayChange(startOfDay(addDays(day, 1)))}
                >
                  <Button.Icon>
                    <CalendarDayChevronRightIcon className="ui:size-4" />
                  </Button.Icon>
                </Button>
              </div>
            ) : (
              <span className="ui:inline-flex ui:flex-row ui:items-center ui:gap-1.5 ui:text-[11px] ui:font-medium ui:uppercase ui:leading-none ui:tracking-normal">
                <span
                  className={
                    isTodayCol
                      ? "ui:font-semibold ui:text-[#333333]"
                      : "ui:text-[#a0a0a0]"
                  }
                >
                  {format(day, "EEE", { locale })
                    .toUpperCase()
                    .replace(/\.$/, "")}
                </span>
                {isTodayCol ? (
                  <span className={cn(calendarTimeGridTodayBadgeVariants())}>
                    {format(day, "d")}
                  </span>
                ) : (
                  <span className="ui:normal-case ui:tabular-nums ui:text-[#a0a0a0]">
                    {format(day, "d")}
                  </span>
                )}
              </span>
            )}
          </div>
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

          <div
            className={cn(
              calendarTimeGridColumnVariants({ isLast: true }),
              selectable &&
                "ui:cursor-pointer ui:outline-none ui:focus-within:ring-2 ui:focus-within:ring-primary",
            )}
            style={{ minHeight: gridH }}
            tabIndex={selectable ? 0 : undefined}
            onClick={() => selectable && onSelectDay?.(day)}
            onKeyDown={(e) => {
              if (
                selectable &&
                (e.key === "Enter" || e.key === " ") &&
                !e.defaultPrevented
              ) {
                e.preventDefault();
                onSelectDay?.(day);
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
                  dotOnSeparator
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
                    key={ev.id ?? `${dayKey}-${ev.start.toISOString()}`}
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
        </div>
      </div>
    );
  },
);
CalendarDayRoot.displayName = "CalendarDay";

function CalendarDayChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function CalendarDayChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export const CalendarDay = CalendarDayRoot;
