"use client";

import * as React from "react";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
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

type CalendarMonthContextValue = {
  month: Date;
  weekStartsOn: 0 | 1;
  today: Date | null;
  locale: Locale;
  weeks: Date[][];
  eventsByDayKey: Map<string, CalendarMonthEvent[]>;
  onSelectDay?: (day: Date) => void;
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
};

function buildWeeks(month: Date, weekStartsOn: 0 | 1): Date[][] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn });
  const days = eachDayOfInterval({ start, end });
  return chunkArray(days, 7);
}

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
      children,
      ...rest
    },
    ref,
  ) {
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
        const list = map.get(k) ?? [];
        list.push(ev);
        map.set(k, list);
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
      }),
      [month, weekStartsOn, today, locale, weeks, eventsByDayKey, onSelectDay],
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
  const list = eventsByDayKey.get(k) ?? [];
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
      {list.length > 0 ? (
        <div className={cn(calendarMonthEventsStackVariants())}>
          {list.map((ev) => (
            <CalendarMonthEventBlock
              key={ev.id ?? `${k}-${ev.time}-${ev.title}`}
              color={ev.color}
              time={ev.time}
              title={ev.title}
            />
          ))}
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
      {time ? <Badge.Text tone="accent">{time}</Badge.Text> : null}
      <Badge.Text className="ui:min-w-0 ui:truncate">{title}</Badge.Text>
    </Badge>
  );
});
CalendarMonthEventBlock.displayName = "CalendarMonth.Event";

const CalendarMonth = Object.assign(CalendarMonthRoot, {
  Header: CalendarMonthHeaderImpl,
  Body: CalendarMonthBodyImpl,
  Week: CalendarMonthWeek,
  Day: CalendarMonthDay,
  Event: CalendarMonthEventBlock,
}) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<CalendarMonthProps> &
    React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof CalendarMonthHeaderImpl;
  Body: typeof CalendarMonthBodyImpl;
  Week: typeof CalendarMonthWeek;
  Day: typeof CalendarMonthDay;
  Event: typeof CalendarMonthEventBlock;
};

export { CalendarMonth };
