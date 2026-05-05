"use client";

import * as React from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "../utils/cn";
import { Badge } from "../Badge/Badge";
import type { BadgeVariant } from "../Badge/badge-variants";
import { Popover } from "../Popover/Popover";
import { Select } from "../Select/Select";
import {
  calendarMonthDayCellVariants,
  calendarMonthDayNumberRowVariants,
  calendarMonthDayNumberTextVariants,
  calendarMonthEventsStackVariants,
  calendarMonthHeaderCellVariants,
  calendarMonthHeaderRowVariants,
  calendarMonthRootVariants,
  calendarMonthTodayIndicatorVariants,
  calendarMonthWeekRowVariants,
} from "./calendar-month-variants";
import { Button } from "../Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarMonthEventColor =
  | "green"
  | "purple"
  | "pink"
  | "indigo"
  | "amber";

/** Accent dots for event pills (matches `--malbec-*` on categorical `Badge` variants). */
const EVENT_PILL_DOT_COLOR: Record<CalendarMonthEventColor, string> = {
  green: "#218c33",
  purple: "#7d3bed",
  pink: "#db2678",
  indigo: "#4f4acc",
  amber: "#d9780a",
};

export interface CalendarMonthEvent {
  id?: string;
  date: Date;
  time?: string;
  title: string;
  color: CalendarMonthEventColor;
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function dayKey(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

const MONTH_DAY_VISIBLE_EVENT_LIMIT = 3;

function compareCalendarMonthEvents(
  a: CalendarMonthEvent,
  b: CalendarMonthEvent,
): number {
  const ta = a.time ?? "";
  const tb = b.time ?? "";
  if (ta !== tb) return ta.localeCompare(tb);
  return a.title.localeCompare(b.title);
}

/** Stable fallback so `map.get(k) ?? …` does not allocate a new `[]` each render. */
const EMPTY_DAY_EVENTS: CalendarMonthEvent[] = [];

type CalendarMonthContextValue = {
  month: Date;
  weekStartsOn: 0 | 1;
  today: Date | null;
  locale: Locale;
  weeks: Date[][];
  eventsByDayKey: Map<string, CalendarMonthEvent[]>;
  onSelectDay?: (day: Date) => void;
  onMonthChange?: (month: Date) => void;
  yearSelectFrom: number;
  yearSelectTo: number;
};

const CalendarMonthContext =
  React.createContext<CalendarMonthContextValue | null>(null);

function useCalendarMonthContext(component: string): CalendarMonthContextValue {
  const ctx = React.useContext(CalendarMonthContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <CalendarMonth> component.`,
    );
  }
  return ctx;
}

export type CalendarMonthProps = React.ComponentProps<"div"> & {
  /** Any date inside the month to render. */
  month: Date;
  events?: CalendarMonthEvent[];
  /** 0 = Sunday, 1 = Monday. Defaults to `1` (MON…SUN). */
  weekStartsOn?: 0 | 1;
  /**
   * Date highlighted as "today". Defaults to `new Date()`; pass `null` to
   * disable the indicator.
   */
  today?: Date | null;
  /** Weekday row labels. Defaults to English short names (MON, TUE, …). */
  locale?: Locale;
  onSelectDay?: (day: Date) => void;
  /**
   * When set, renders a toolbar with month and year `<Select>`s above the grid.
   * Receives `startOfMonth` for the chosen month.
   */
  onMonthChange?: (month: Date) => void;
  /** Inclusive year bounds for the year select. Defaults to visible year −50 … +25 (expanded to include the visible year). */
  yearSelectBounds?: { from: number; to: number };
};

function buildWeeks(month: Date, weekStartsOn: 0 | 1): Date[][] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn });
  const days = eachDayOfInterval({ start, end });
  return chunkArray(days, 7);
}

function resolveYearSelectBounds(
  visibleMonthStart: Date,
  bounds?: { from: number; to: number },
): { from: number; to: number } {
  const visYear = getYear(visibleMonthStart);
  let from = bounds?.from ?? visYear - 50;
  let to = bounds?.to ?? visYear + 25;
  if (from > to) {
    const t = from;
    from = to;
    to = t;
  }
  from = Math.min(from, visYear);
  to = Math.max(to, visYear);
  return { from, to };
}

/** Matches `CalendarWeek` toolbar: `Button variant="outline" size="sm"` (primary border, transparent fill). */
const calendarMonthToolbarSelectTriggerClassName = [
  "ui:h-8 ui:min-h-8 ui:gap-2 ui:rounded-[8px] ui:border-[1.5px] ui:border-primary ui:bg-transparent",
  "ui:px-3 ui:py-[6px] ui:text-xs ui:font-medium ui:leading-4 ui:tracking-[-0.3px] ui:text-primary ui:shadow-none",
  "ui:hover:bg-primary/10 ui:active:bg-primary/15",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
  "[&>span:last-child]:text-primary [&>span:last-child]:opacity-100",
].join(" ");

const CalendarMonthToolbarImpl = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CalendarMonthToolbarImpl({ className, ...rest }, ref) {
  const { month, locale, onMonthChange, yearSelectFrom, yearSelectTo } =
    useCalendarMonthContext("CalendarMonth.Toolbar");

  const y = getYear(month);
  const m = getMonth(month);

  const years = React.useMemo(() => {
    const out: number[] = [];
    for (let yr = yearSelectFrom; yr <= yearSelectTo; yr += 1) out.push(yr);
    return out;
  }, [yearSelectFrom, yearSelectTo]);

  const monthItems = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: String(i),
        label: format(new Date(2024, i, 1), "LLLL", { locale }),
      })),
    [locale],
  );

  if (!onMonthChange) return null;

  const monthAnchor = startOfMonth(month);

  return (
    <div
      ref={ref}
      data-slot="calendar-month-toolbar"
      className={cn(
        "ui:grid ui:w-full ui:grid-cols-[auto_1fr_auto] ui:items-center ui:gap-3 ui:border-b ui:border-[#e0e0e0] ui:bg-[#f0f0f0] ui:px-3 ui:py-2",
        className,
      )}
      {...rest}
    >
      <Button
        variant="outline"
        size="sm"
        aria-label="Previous month"
        className="ui:shrink-0 ui:justify-self-start"
        onClick={() => onMonthChange(startOfMonth(addMonths(monthAnchor, -1)))}
      >
        <Button.Icon>
          <ChevronLeft className="ui:size-4" />
        </Button.Icon>
      </Button>
      <div className="ui:flex ui:min-w-0 ui:items-center ui:justify-center ui:gap-3 ui:justify-self-center">
        <Select
          value={String(m)}
          onValueChange={(v) => {
            const nextM = Number(v);
            onMonthChange(startOfMonth(new Date(y, nextM, 1)));
          }}
        >
          <Select.Trigger
            aria-label="Month"
            className={cn(
              calendarMonthToolbarSelectTriggerClassName,
              "ui:m-0 ui:min-w-[150px] ui:flex-1 ui:text-center ui:text-base ui:font-semibold ui:leading-6 ui:text-text-default ui:border-none ui:capitalize",
            )}
          >
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {monthItems.map((item) => (
              <Select.Item
                className="ui:capitalize"
                key={item.value}
                value={item.value}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Select
          value={String(y)}
          onValueChange={(v) => {
            const nextY = Number(v);
            onMonthChange(startOfMonth(new Date(nextY, m, 1)));
          }}
        >
          <Select.Trigger
            aria-label="Year"
            className={cn(
              calendarMonthToolbarSelectTriggerClassName,
              "ui:m-0 ui:min-w-[75px] ui:flex-1 ui:text-center ui:text-base ui:font-semibold ui:leading-6 ui:text-text-default ui:border-none ui:tabular-nums",
            )}
          >
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {years.map((yr) => (
              <Select.Item key={yr} value={String(yr)}>
                {String(yr)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
      <Button
        variant="outline"
        size="sm"
        aria-label="Next month"
        className="ui:shrink-0 ui:justify-self-end"
        onClick={() => onMonthChange(startOfMonth(addMonths(monthAnchor, 1)))}
      >
        <Button.Icon>
          <ChevronRight className="ui:size-4" />
        </Button.Icon>
      </Button>
    </div>
  );
});
CalendarMonthToolbarImpl.displayName = "CalendarMonth.Toolbar";

const CalendarMonthRoot = React.forwardRef<HTMLDivElement, CalendarMonthProps>(
  function CalendarMonthRoot(
    {
      className,
      month,
      events = [],
      weekStartsOn = 1,
      today: todayProp = new Date(),
      locale = enUS,
      onSelectDay,
      onMonthChange,
      yearSelectBounds,
      children,
      ...rest
    },
    ref,
  ) {
    const monthStart = startOfMonth(
      month instanceof Date ? month : new Date(month as string | number),
    );
    const { from: yearSelectFrom, to: yearSelectTo } = resolveYearSelectBounds(
      monthStart,
      yearSelectBounds,
    );

    const weeks = React.useMemo(
      () => buildWeeks(month, weekStartsOn),
      [month, weekStartsOn],
    );

    const today =
      todayProp == null
        ? null
        : startOfDay(
            todayProp instanceof Date
              ? todayProp
              : new Date(todayProp as string | number),
          );

    const eventsByDayKey = React.useMemo(() => {
      const map = new Map<string, CalendarMonthEvent[]>();
      for (const ev of events) {
        const k = dayKey(
          startOfDay(
            ev.date instanceof Date
              ? ev.date
              : new Date(ev.date as string | number),
          ),
        );
        const prev = map.get(k) ?? [];
        map.set(k, [...prev, ev]);
      }
      return map;
    }, [events]);

    const value = React.useMemo<CalendarMonthContextValue>(
      () => ({
        month,
        weekStartsOn,
        today,
        locale,
        weeks,
        eventsByDayKey,
        onSelectDay,
        onMonthChange,
        yearSelectFrom,
        yearSelectTo,
      }),
      [
        month,
        weekStartsOn,
        today,
        locale,
        weeks,
        eventsByDayKey,
        onSelectDay,
        onMonthChange,
        yearSelectFrom,
        yearSelectTo,
      ],
    );

    return (
      <CalendarMonthContext.Provider value={value}>
        <div
          ref={ref}
          data-slot="calendar-month"
          className={cn(calendarMonthRootVariants(), className)}
          {...rest}
        >
          {children ?? (
            <>
              {onMonthChange ? <CalendarMonthToolbarImpl /> : null}
              <CalendarMonthHeaderImpl />
              <CalendarMonthBodyImpl />
            </>
          )}
        </div>
      </CalendarMonthContext.Provider>
    );
  },
);
CalendarMonthRoot.displayName = "CalendarMonth";

// ——— Header

export type CalendarMonthHeaderProps = React.ComponentProps<"div"> & {
  weekStartsOn?: 0 | 1;
  locale?: Locale;
};

const CalendarMonthHeaderImpl = React.forwardRef<
  HTMLDivElement,
  CalendarMonthHeaderProps
>(function CalendarMonthHeaderImpl(
  { className, weekStartsOn: weekStartsOnProp, locale: localeProp, ...rest },
  ref,
) {
  const ctx = useCalendarMonthContext("CalendarMonth.Header");
  const weekStartsOn = weekStartsOnProp ?? ctx.weekStartsOn;
  const locale = localeProp ?? ctx.locale;
  // Anchor so `startOfWeek` yields the first weekday in order (date arbitrary).
  const labelStart = startOfWeek(new Date(2024, 0, 8), { weekStartsOn });
  const labels = Array.from({ length: 7 }, (_, i) =>
    format(addDays(labelStart, i), "EEE", { locale }).toUpperCase(),
  );

  return (
    <div
      ref={ref}
      data-slot="calendar-month-header"
      className={cn(calendarMonthHeaderRowVariants(), className)}
      {...rest}
    >
      {labels.map((label, i) => (
        <div
          key={label + String(i)}
          className={calendarMonthHeaderCellVariants({
            isLast: i === 6,
          })}
        >
          {label}
        </div>
      ))}
    </div>
  );
});

// ——— Body

export type CalendarMonthBodyProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
};

const CalendarMonthBodyImpl = React.forwardRef<
  HTMLDivElement,
  CalendarMonthBodyProps
>(function CalendarMonthBodyImpl({ className, children, ...rest }, ref) {
  const { locale, month, weeks } =
    useCalendarMonthContext("CalendarMonth.Body");
  const label = format(startOfMonth(month), "MMMM yyyy", { locale });

  return (
    <div
      ref={ref}
      data-slot="calendar-month-body"
      role="grid"
      aria-label={label}
      className={cn("ui:flex ui:flex-col", className)}
      {...rest}
    >
      {children ?? weeks.map((w, i) => <CalendarMonthWeek key={i} days={w} />)}
    </div>
  );
});

// ——— Week

export type CalendarMonthWeekProps = React.ComponentProps<"div"> & {
  days: Date[];
  children?: React.ReactNode;
};

const CalendarMonthWeek = React.forwardRef<
  HTMLDivElement,
  CalendarMonthWeekProps
>(function CalendarMonthWeek({ className, days, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="calendar-month-week"
      role="row"
      className={cn(calendarMonthWeekRowVariants(), className)}
      {...rest}
    >
      {children ??
        days.map((d, i) => (
          <CalendarMonthDay key={dayKey(d)} date={d} isLastInRow={i === 6} />
        ))}
    </div>
  );
});

// ——— Day

export type CalendarMonthDayProps = Omit<
  React.ComponentProps<"div">,
  "onSelect"
> & {
  date: Date;
  isLastInRow?: boolean;
};

const CalendarMonthDay = React.forwardRef<
  HTMLDivElement,
  CalendarMonthDayProps
>(function CalendarMonthDay(
  {
    className,
    date: dateProp,
    isLastInRow = false,
    onKeyDown,
    onClick,
    ...rest
  },
  ref,
) {
  const { month, today, eventsByDayKey, onSelectDay, locale } =
    useCalendarMonthContext("CalendarMonth.Day");
  const day = startOfDay(
    dateProp instanceof Date ? dateProp : new Date(dateProp as string | number),
  );
  const outside = !isSameMonth(day, startOfMonth(month));
  const isToday =
    today !== null && isSameDay(startOfDay(day), startOfDay(today));
  const k = dayKey(day);
  const dayEvents = eventsByDayKey.get(k) ?? EMPTY_DAY_EVENTS;
  const sortedDayEvents =
    dayEvents.length === 0
      ? dayEvents
      : [...dayEvents].sort(compareCalendarMonthEvents);
  const visibleDayEvents = sortedDayEvents.slice(
    0,
    MONTH_DAY_VISIBLE_EVENT_LIMIT,
  );
  const overflowDayEvents = sortedDayEvents.slice(
    MONTH_DAY_VISIBLE_EVENT_LIMIT,
  );
  const selectable = Boolean(onSelectDay);

  const handleActivate = () => {
    onSelectDay?.(day);
  };

  return (
    <div
      ref={ref}
      data-slot="calendar-month-day"
      data-outside={outside ? "true" : undefined}
      data-today={isToday ? "true" : undefined}
      role="gridcell"
      tabIndex={selectable ? 0 : undefined}
      aria-label={format(day, "PPP", { locale })}
      className={cn(
        calendarMonthDayCellVariants({ isLast: isLastInRow }),
        selectable &&
          "ui:cursor-pointer ui:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-1 ui:focus-visible:ring-offset-background-100",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && selectable) handleActivate();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (selectable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleActivate();
        }
      }}
      {...rest}
    >
      <div className={cn(calendarMonthDayNumberRowVariants())}>
        {isToday ? (
          <span
            className={cn(calendarMonthTodayIndicatorVariants())}
            aria-hidden={false}
          >
            {format(day, "d")}
          </span>
        ) : (
          <span
            className={cn(
              calendarMonthDayNumberTextVariants({ isOutside: outside }),
            )}
          >
            {format(day, "d")}
          </span>
        )}
      </div>
      {dayEvents.length > 0 ? (
        <div className={cn(calendarMonthEventsStackVariants())}>
          {visibleDayEvents.map((ev) => (
            <CalendarMonthEventBlock
              key={ev.id ?? `${k}-${ev.time}-${ev.title}`}
              color={ev.color}
              time={ev.time}
              title={ev.title}
            />
          ))}
          {overflowDayEvents.length > 0 ? (
            <Popover>
              <Popover.Trigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ui:w-full ui:p-0 ui:text-left ui:justify-start ui:h-[22px]"
                  aria-label={`${overflowDayEvents.length} more events`}
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  +{overflowDayEvents.length}
                </Button>
              </Popover.Trigger>
              <Popover.Content
                align="start"
                side="bottom"
                sideOffset={6}
                className="ui:flex ui:min-w-[220px] ui:max-w-[min(320px,var(--radix-popover-content-available-width))] ui:flex-col ui:gap-1 ui:p-2"
              >
                {overflowDayEvents.map((ev, i) => (
                  <CalendarMonthEventBlock
                    key={ev.id ?? `${k}-overflow-${i}-${ev.time}-${ev.title}`}
                    color={ev.color}
                    time={ev.time}
                    title={ev.title}
                  />
                ))}
              </Popover.Content>
            </Popover>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

// ——— Event (pill)

export type CalendarMonthEventBlockProps = {
  color: CalendarMonthEventColor;
  time?: string;
  title: string;
  className?: string;
};

const eventPillClassName =
  "ui:h-[22px] ui:min-w-0 ui:max-w-full ui:w-full ui:justify-start ui:gap-[5px] ui:rounded-[4px] ui:border-transparent ui:px-1.5 ui:py-0 ui:text-[10px] ui:font-medium ui:leading-[normal] ui:tracking-normal";

const CalendarMonthEventBlock = React.forwardRef<
  HTMLDivElement,
  CalendarMonthEventBlockProps
>(function CalendarMonthEventBlock(
  { color, time, title, className, ...rest },
  ref,
) {
  return (
    <Badge
      ref={ref}
      data-slot="calendar-month-event"
      variant={color as BadgeVariant}
      className={cn(eventPillClassName, className)}
      {...rest}
    >
      {/**
       * Solid dot: avoid `Badge.Icon` + `badgeIconVariants` (fixed `size-3` / `inline-flex`
       * fights a 6px fill) and avoid Tailwind `bg-(--var)` not resolving. Inline fill is
       * reliable next to the categorical `Badge` tints.
       */}
      <span
        aria-hidden
        className="ui:inline-block ui:h-[6px] ui:min-h-[6px] ui:min-w-[6px] ui:w-[6px] ui:shrink-0 ui:rounded-full"
        style={{ backgroundColor: EVENT_PILL_DOT_COLOR[color] }}
      />
      {time ? (
        <Badge.Text
          tone="accent"
          className="ui:shrink-0 ui:min-w-max ui:overflow-visible ui:whitespace-nowrap ui:tabular-nums"
        >
          {time}
        </Badge.Text>
      ) : null}
      <Badge.Text className="ui:min-w-0 ui:flex-1 ui:truncate">
        {title}
      </Badge.Text>
    </Badge>
  );
});
CalendarMonthEventBlock.displayName = "CalendarMonth.Event";

const CalendarMonth = Object.assign(CalendarMonthRoot, {
  Header: CalendarMonthHeaderImpl,
  Toolbar: CalendarMonthToolbarImpl,
  Body: CalendarMonthBodyImpl,
  Week: CalendarMonthWeek,
  Day: CalendarMonthDay,
  Event: CalendarMonthEventBlock,
}) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<CalendarMonthProps> &
    React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof CalendarMonthHeaderImpl;
  Toolbar: typeof CalendarMonthToolbarImpl;
  Body: typeof CalendarMonthBodyImpl;
  Week: typeof CalendarMonthWeek;
  Day: typeof CalendarMonthDay;
  Event: typeof CalendarMonthEventBlock;
};

export { CalendarMonth };
