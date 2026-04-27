import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getDate,
  isSameMonth,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "../Button/Button";
import { CalendarMonth, type CalendarMonthEvent } from "./CalendarMonth";

/** When the Figma “today” was day 14, these are day offsets from that (same 17 events). */
const FROM_TODAY: readonly number[] = [
  -11, -9, -7, -7, -3, 0, 0, 4, 6, 7, 7, 7, 10, 12, 14, 14, 15,
];

/** Day-of-month pattern in a long month; reused for non-current month views. */
const DAY_IN_MONTH: readonly number[] = [
  3, 5, 7, 7, 11, 14, 14, 18, 20, 21, 21, 21, 24, 26, 28, 28, 29,
];

const TEMPLATES: Array<Omit<CalendarMonthEvent, "date" | "id">> = [
  { time: "20:30", title: "Ana Otero", color: "green" },
  { time: "21:00", title: "Isla", color: "purple" },
  { time: "22:00", title: "Hijos del Sur", color: "pink" },
  { time: "19:30", title: "La Niebla", color: "indigo" },
  { time: "20:00", title: "Cielo Roto", color: "amber" },
  { time: "21:15", title: "La Niebla", color: "indigo" },
  { time: "23:00", title: "Isla · DJ set", color: "purple" },
  { time: "20:00", title: "Ana Otero", color: "green" },
  { time: "22:30", title: "La Niebla", color: "indigo" },
  { time: "21:00", title: "Cielo Roto", color: "amber" },
  { time: "19:00", title: "Hijos del Sur", color: "pink" },
  { time: "23:30", title: "Isla", color: "purple" },
  { time: "20:00", title: "Ana Otero", color: "green" },
  { time: "21:30", title: "La Niebla", color: "indigo" },
  { time: "21:15", title: "La Niebla", color: "indigo" },
  { time: "18:00", title: "Cielo Roto", color: "amber" },
  { time: "20:30", title: "Isla · Acoustic", color: "purple" },
];

function dayClamped(visibleMonth: Date, day1Based: number): Date {
  const first = startOfMonth(visibleMonth);
  const lastDay = getDate(endOfMonth(visibleMonth));
  const d = Math.min(Math.max(1, day1Based), lastDay);
  return addDays(first, d - 1);
}

/**
 * In the current calendar month, dates are `startOfDay(today) + offset` (Figma offset from “today”).
 * In other months, the same day-of-month layout is used (clamped) so the board stays full.
 */
function buildShowcaseEvents(visibleMonth: Date): CalendarMonthEvent[] {
  const today0 = startOfDay(new Date());
  const useFromToday = isSameMonth(visibleMonth, today0);
  return TEMPLATES.map((t, i) => ({
    id: String(i + 1),
    date: useFromToday
      ? addDays(today0, FROM_TODAY[i]!)
      : dayClamped(visibleMonth, DAY_IN_MONTH[i]!),
    ...t,
  }));
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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

/**
 * Full-month grid with optional event cards per day. The stories in this file build the event list with `buildShowcaseEvents` / `MonthWithSwitcher`.
 *
 * ```tsx
 * <CalendarMonth
 *   month={visibleMonth}
 *   events={events}
 *   onSelectDay={(day) => { … }}
 * />
 * ```
 */
const meta = {
  title: "Custom/CalendarMonth",
  component: CalendarMonth,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarMonth>;

export default meta;

type Story = StoryObj<typeof meta>;

function MonthWithSwitcher() {
  const [month, setMonth] = React.useState(() => startOfMonth(new Date()));
  const events = React.useMemo(() => buildShowcaseEvents(month), [month]);

  return (
    <div className="ui:mx-auto ui:flex ui:w-full ui:max-w-[min(100%,1197px)] ui:flex-col ui:gap-4">
      <div className="ui:flex ui:items-center ui:justify-center ui:gap-3">
        <Button
          variant="outline"
          size="sm"
          aria-label="Previous month"
          onClick={() => setMonth((m) => addMonths(m, -1))}
        >
          <Button.Icon>
            <ChevronLeftIcon className="ui:size-4" />
          </Button.Icon>
        </Button>
        <h2 className="malbec-font-sans ui:m-0 ui:min-w-[200px] ui:text-center ui:text-base ui:font-semibold ui:leading-6 ui:text-text-default">
          {format(month, "MMMM yyyy", { locale: es })}
        </h2>
        <Button
          variant="outline"
          size="sm"
          aria-label="Next month"
          onClick={() => setMonth((m) => addMonths(m, 1))}
        >
          <Button.Icon>
            <ChevronRightIcon className="ui:size-4" />
          </Button.Icon>
        </Button>
      </div>
      {/**
       * Omit `today` so the calendar uses the real current date. When the visible
       * month is the current month, event dates are built from that day; otherwise
       * they use the same day-of-month pattern (clamped) for a full month preview.
       */}
      <CalendarMonth month={month} events={events} locale={es}>
        <CalendarMonth.Header />
        <CalendarMonth.Body />
      </CalendarMonth>
    </div>
  );
}

const storyMonth = new Date(2020, 0, 1);
const storyEvents = buildShowcaseEvents(storyMonth);

export const Composed: Story = {
  name: "Month grid",
  args: { month: storyMonth, events: storyEvents },
  render: () => <MonthWithSwitcher />,
};
