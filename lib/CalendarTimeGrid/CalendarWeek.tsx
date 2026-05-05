"use client";

import * as React from "react";
import {
  addWeeks,
  endOfWeek,
  format,
  isSameDay,
  startOfDay,
  startOfWeek,
} from "date-fns";
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
import {
  buildWeekDays,
  formatGmtOffsetLabel,
  formatSlotTime24h,
  hourRange,
  slotFromGridClickY,
} from "./calendar-timegrid-utils";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarWeekProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
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
  /**
   * When set, the toolbar shows prev/next week controls. Controlled: update the `week` prop
   * from this callback (any date in the visible week is fine).
   */
  onWeekChange?: (week: Date) => void;
  /** Week range title row above the day headers. Default `true`. */
  showWeekToolbar?: boolean;
  onSelectDay?: ({
    day,
    time,
    date,
  }: {
    day: Date;
    time: string;
    date: string;
  }) => void;
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
      onWeekChange,
      showWeekToolbar = true,
      onSelectDay,
      onSelectEvent,
      ...rest
    },
    ref,
  ) {
    const weekAnchor = React.useMemo(
      () =>
        startOfWeek(
          week instanceof Date ? week : new Date(week as string | number),
          { weekStartsOn },
        ),
      [week, weekStartsOn],
    );

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

    const weekRangeEnd = endOfWeek(weekAnchor, { weekStartsOn });
    const weekRangeLabel =
      weekAnchor.getFullYear() === weekRangeEnd.getFullYear()
        ? `${format(weekAnchor, "d MMM", { locale })} – ${format(weekRangeEnd, "d MMM yyyy", { locale })}`
        : `${format(weekAnchor, "d MMM yyyy", { locale })} – ${format(weekRangeEnd, "d MMM yyyy", { locale })}`;

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
      const at =
        week instanceof Date ? week : new Date(week as string | number);
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
        {showWeekToolbar ? (
          <div
            className={cn(
              "ui:flex ui:shrink-0 ui:items-center ui:justify-center ui:gap-3 ui:border-b ui:border-[#e0e0e0] ui:bg-[#f0f0f0] ui:px-3 ui:py-2",
            )}
          >
            <Button
              variant="outline"
              size="sm"
              aria-label="Previous week"
              disabled={!onWeekChange}
              onClick={() => onWeekChange?.(addWeeks(weekAnchor, -1))}
            >
              <Button.Icon>
                <CalendarWeekChevronLeftIcon className="ui:size-4" />
              </Button.Icon>
            </Button>
            <h2 className="malbec-font-sans ui:m-0 ui:min-w-[200px] ui:flex-1 ui:text-center ui:text-base ui:font-semibold ui:leading-6 ui:text-text-default">
              {weekRangeLabel}
            </h2>
            <Button
              variant="outline"
              size="sm"
              aria-label="Next week"
              disabled={!onWeekChange}
              onClick={() => onWeekChange?.(addWeeks(weekAnchor, 1))}
            >
              <Button.Icon>
                <CalendarWeekChevronRightIcon className="ui:size-4" />
              </Button.Icon>
            </Button>
          </div>
        ) : null}
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
                  {format(day, "EEE", { locale })
                    .toUpperCase()
                    .replace(/\.$/, "")}
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
                onClick={(e) => {
                  const d = startOfDay(day);
                  const y =
                    e.clientY - e.currentTarget.getBoundingClientRect().top;
                  const { hour, minute } = slotFromGridClickY(
                    y,
                    startHour,
                    endHour,
                    hourHeightPx,
                  );
                  const time = formatSlotTime24h(hour, minute);
                  if (selectable)
                    onSelectDay?.({
                      day: d,
                      time,
                      date: format(d, "yyyy-MM-dd"),
                    });
                }}
                onKeyDown={(e) => {
                  if (
                    selectable &&
                    (e.key === "Enter" || e.key === " ") &&
                    !e.defaultPrevented
                  ) {
                    e.preventDefault();
                    onSelectDay?.({
                      day: startOfDay(day),
                      time: formatSlotTime24h(0, 0),
                      date: format(startOfDay(day), "yyyy-MM-dd"),
                    });
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

function CalendarWeekChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ChevronLeft {...props} />;
}

function CalendarWeekChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ChevronRight {...props} />;
}

export const CalendarWeek = CalendarWeekRoot;
