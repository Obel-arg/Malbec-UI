import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  addDays,
  endOfMonth,
  format,
  getDate,
  isSameMonth,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarMonth,
  type CalendarMonthEvent,
} from "../CalendarMonth/CalendarMonth";
import { Tabs } from "../Tabs/Tabs";
import { CalendarDay } from "./CalendarDay";
import { CalendarWeek } from "./CalendarWeek";
import type { CalendarTimeGridEvent } from "./calendar-timegrid-types";

/**
 * Ancla para el story “Week”: qué semana se muestra (eventos demo en abr/may 2026).
 * “Hoy” y “ahora” usan `new Date()` en los renders para no fingir el día 28 fijo.
 */
const demoWeekAnchor = new Date(2026, 3, 28);

/**
 * Demo grid: días antes/después con eventos dispersos; el 29 abr tiene 5 (incl. dos solapados tarde).
 * Mes JS 3 = abril; 4 = mayo.
 *
 * Incluye además eventos `allDay` y multi-día para demostrar el strip superior y las barras
 * que cruzan días/semanas (estilo Google Calendar).
 */
const demoEvents: CalendarTimeGridEvent[] = [
  // —— all-day y multi-día ——
  {
    id: "span-ocupado",
    title: "Ocupado — workshop",
    start: new Date(2026, 3, 27, 0, 0, 0),
    end: new Date(2026, 3, 29, 23, 59, 0),
    color: "yellow",
  },
  {
    id: "span-vacaciones",
    title: "Vacaciones",
    start: new Date(2026, 3, 30, 0, 0, 0),
    end: new Date(2026, 4, 4, 23, 59, 0),
    color: "emerald",
  },
  {
    id: "allday-feriado",
    title: "Feriado nacional",
    start: new Date(2026, 4, 1, 0, 0, 0),
    end: new Date(2026, 4, 1, 23, 59, 0),
    allDay: true,
    color: "red",
  },
  {
    id: "allday-cumple",
    title: "Cumple de Caro",
    start: new Date(2026, 3, 24, 0, 0, 0),
    end: new Date(2026, 3, 24, 23, 59, 0),
    allDay: true,
    color: "violet",
  },
  // —— antes (abr 22–28) ——
  {
    id: "pre-22-a",
    title: "Kickoff Q2",
    start: new Date(2026, 3, 22, 9, 0, 0),
    end: new Date(2026, 3, 22, 10, 0, 0),
    color: "blue",
  },
  {
    id: "pre-22-b",
    title: "1:1 con Nico",
    start: new Date(2026, 3, 22, 16, 30, 0),
    end: new Date(2026, 3, 22, 17, 0, 0),
    color: "red",
  },
  {
    id: "pre-23-a",
    title: "Design review",
    start: new Date(2026, 3, 23, 11, 0, 0),
    end: new Date(2026, 3, 23, 12, 15, 0),
    color: "violet",
  },
  {
    id: "pre-24-a",
    title: "Infra check",
    start: new Date(2026, 3, 24, 8, 30, 0),
    end: new Date(2026, 3, 24, 9, 0, 0),
    color: "orange",
  },
  {
    id: "pre-24-b",
    title: "Cliente — demo",
    start: new Date(2026, 3, 24, 15, 0, 0),
    end: new Date(2026, 3, 24, 16, 0, 0),
    color: "emerald",
  },
  {
    id: "pre-25-a",
    title: "Deep work",
    start: new Date(2026, 3, 25, 10, 0, 0),
    end: new Date(2026, 3, 25, 12, 30, 0),
    color: "blue",
  },
  {
    id: "pre-26-a",
    title: "Standup extendido",
    start: new Date(2026, 3, 26, 9, 0, 0),
    end: new Date(2026, 3, 26, 9, 45, 0),
    color: "emerald",
  },
  {
    id: "pre-26-b",
    title: "Pair malbec-ui",
    start: new Date(2026, 3, 26, 14, 0, 0),
    end: new Date(2026, 3, 26, 17, 30, 0),
    color: "violet",
  },
  {
    id: "pre-27-a",
    title: "Docs API",
    start: new Date(2026, 3, 27, 13, 0, 0),
    end: new Date(2026, 3, 27, 14, 0, 0),
    color: "red",
  },
  {
    id: "pre-28-a",
    title: "Sprint planning",
    start: new Date(2026, 3, 28, 10, 30, 0),
    end: new Date(2026, 3, 28, 12, 0, 0),
    color: "orange",
  },
  {
    id: "pre-28-b",
    title: "Cierre de métricas",
    start: new Date(2026, 3, 28, 17, 0, 0),
    end: new Date(2026, 3, 28, 18, 0, 0),
    color: "blue",
  },
  // —— 29 abr: 5 eventos (3 + 2 solapados) ——
  {
    id: "apr29-morning",
    title: "Standup equipo",
    start: new Date(2026, 3, 29, 8, 0, 0),
    end: new Date(2026, 3, 29, 8, 30, 0),
    color: "emerald",
  },
  {
    id: "apr29-mid",
    title: "Workshop accesibilidad",
    start: new Date(2026, 3, 29, 10, 0, 0),
    end: new Date(2026, 3, 29, 11, 30, 0),
    color: "violet",
  },
  {
    id: "apr29-lunch",
    title: "Almuerzo con Obel",
    start: new Date(2026, 3, 29, 12, 30, 0),
    end: new Date(2026, 3, 29, 13, 45, 0),
    color: "red",
  },
  {
    id: "duki-a",
    title: "Duki AAAAB",
    start: new Date(2026, 3, 29, 18, 30, 0),
    end: new Date(2026, 3, 29, 19, 15, 0),
    color: "emerald",
  },
  {
    id: "duki-b",
    title: "Duki BAAAa",
    start: new Date(2026, 3, 29, 18, 45, 0),
    end: new Date(2026, 3, 29, 19, 30, 0),
    color: "orange",
  },
  // —— 30 abr ——
  {
    id: "duki-c",
    title: "Duki CAAAa",
    start: new Date(2026, 3, 30, 18, 45, 0),
    end: new Date(2026, 3, 30, 19, 30, 0),
    color: "emerald",
  },
  {
    id: "apr30-a",
    title: "Release checklist",
    start: new Date(2026, 3, 30, 9, 30, 0),
    end: new Date(2026, 3, 30, 10, 15, 0),
    color: "blue",
  },
  {
    id: "apr30-b",
    title: "QA regresión",
    start: new Date(2026, 3, 30, 15, 0, 0),
    end: new Date(2026, 3, 30, 16, 30, 0),
    color: "orange",
  },
  // —— después (mayo 1–6) ——
  {
    id: "post-may1-a",
    title: "Town hall",
    start: new Date(2026, 4, 1, 11, 0, 0),
    end: new Date(2026, 4, 1, 12, 0, 0),
    color: "violet",
  },
  {
    id: "post-may1-b",
    title: "Onboarding pasantes",
    start: new Date(2026, 4, 1, 14, 0, 0),
    end: new Date(2026, 4, 1, 16, 0, 0),
    color: "emerald",
  },
  {
    id: "post-may2-a",
    title: "Bug triage",
    start: new Date(2026, 4, 2, 10, 0, 0),
    end: new Date(2026, 4, 2, 10, 45, 0),
    color: "red",
  },
  {
    id: "post-may3-a",
    title: "Arquitectura — ADR",
    start: new Date(2026, 4, 3, 9, 0, 0),
    end: new Date(2026, 4, 3, 10, 30, 0),
    color: "blue",
  },
  {
    id: "post-may3-b",
    title: "Código + café",
    start: new Date(2026, 4, 3, 16, 0, 0),
    end: new Date(2026, 4, 3, 17, 30, 0),
    color: "orange",
  },
  {
    id: "post-may4-a",
    title: "Retrospectiva",
    start: new Date(2026, 4, 4, 15, 0, 0),
    end: new Date(2026, 4, 4, 16, 15, 0),
    color: "emerald",
  },
  {
    id: "post-may5-a",
    title: "Hackathon interno",
    start: new Date(2026, 4, 5, 13, 0, 0),
    end: new Date(2026, 4, 5, 19, 0, 0),
    color: "violet",
  },
  {
    id: "post-may6-a",
    title: "Handoff a soporte",
    start: new Date(2026, 4, 6, 10, 0, 0),
    end: new Date(2026, 4, 6, 11, 0, 0),
    color: "blue",
  },
];

function timeGridEventsToMonthEvents(
  events: CalendarTimeGridEvent[],
): CalendarMonthEvent[] {
  return events.map((ev) => {
    const startDay = startOfDay(ev.start);
    const endDay = startOfDay(ev.end);
    const isSpan = ev.allDay || endDay.getTime() > startDay.getTime();
    return {
      id: ev.id,
      date: startDay,
      endDate: isSpan ? endDay : undefined,
      allDay: ev.allDay,
      time: isSpan ? undefined : format(ev.start, "HH:mm"),
      title: ev.title,
      color: ev.color ?? "emerald",
    };
  });
}

const demoDayWithEvents = new Date(2026, 3, 29);

// —— CalendarMonth showcase (from former CalendarMonth.stories) ——

/** When the Figma “today” was day 14, these are day offsets from that (same 17 events). */
const FROM_TODAY: readonly number[] = [
  -11, -9, -7, -7, -3, 0, 0, 4, 6, 7, 7, 7, 10, 12, 14, 14, 15,
];

/** Day-of-month pattern in a long month; reused for non-current month views. */
const DAY_IN_MONTH: readonly number[] = [
  3, 5, 7, 7, 11, 14, 14, 18, 20, 21, 21, 21, 24, 26, 28, 28, 29,
];

const TEMPLATES: Array<Omit<CalendarMonthEvent, "date" | "id">> = [
  { time: "20:30", title: "Ana Otero", color: "emerald" },
  { time: "21:00", title: "Isla", color: "violet" },
  { time: "22:00", title: "Hijos del Sur", color: "red" },
  { time: "19:30", title: "La Niebla", color: "blue" },
  { time: "20:00", title: "Cielo Roto", color: "orange" },
  { time: "21:15", title: "La Niebla", color: "blue" },
  { time: "23:00", title: "Isla · DJ set", color: "violet" },
  { time: "20:00", title: "Ana Otero", color: "emerald" },
  { time: "22:30", title: "La Niebla", color: "blue" },
  { time: "21:00", title: "Cielo Roto", color: "orange" },
  { time: "19:00", title: "Hijos del Sur", color: "red" },
  { time: "23:30", title: "Isla", color: "violet" },
  { time: "20:00", title: "Ana Otero", color: "emerald" },
  { time: "21:30", title: "La Niebla", color: "blue" },
  { time: "21:15", title: "La Niebla", color: "blue" },
  { time: "18:00", title: "Cielo Roto", color: "orange" },
  { time: "20:30", title: "Isla · Acoustic", color: "violet" },
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

function MonthWithSwitcher() {
  const [month, setMonth] = React.useState(() => startOfMonth(new Date()));
  const events = React.useMemo(() => buildShowcaseEvents(month), [month]);

  return (
    <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,1197px)]">
      {/**
       * Omit `today` so the calendar uses the real current date. When the visible
       * month is the current month, event dates are built from that day; otherwise
       * they use the same day-of-month pattern (clamped) for a full month preview.
       */}
      <CalendarMonth
        month={month}
        events={events}
        locale={es}
        onMonthChange={setMonth}
      />
    </div>
  );
}

function MonthPanelControlled({
  month,
  onMonthChange,
  timeGridEvents,
}: {
  month: Date;
  onMonthChange: (next: Date) => void;
  timeGridEvents: CalendarTimeGridEvent[];
}) {
  const atMonthStart = startOfMonth(month);
  const events = React.useMemo(
    () => timeGridEventsToMonthEvents(timeGridEvents),
    [timeGridEvents],
  );

  return (
    <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,1197px)]">
      <CalendarMonth
        month={atMonthStart}
        events={events}
        locale={es}
        onMonthChange={onMonthChange}
      />
    </div>
  );
}

const WEEK_STARTS_ON = 1 as const;

function WeekPanelControlled({
  focus,
  onFocusChange,
}: {
  focus: Date;
  onFocusChange: (next: Date) => void;
}) {
  return (
    <div className="ui:mx-auto ui:flex ui:w-full ui:max-w-[min(100%,1200px)] ui:flex-col">
      <CalendarWeek
        week={focus}
        weekStartsOn={WEEK_STARTS_ON}
        locale={es}
        onSelectDay={({ day, time, date }) => {
          console.log("CalendarWeek click", { day, time, date });
        }}
        onWeekChange={onFocusChange}
        today={new Date()}
        now={new Date()}
        events={demoEvents}
      />
    </div>
  );
}

function CalendarFormatsTabs() {
  const [focus, setFocus] = React.useState(() => startOfDay(new Date()));
  const [tab, setTab] = React.useState("month");

  return (
    <div className="ui:mx-auto ui:flex ui:w-full ui:max-w-[min(100%,1200px)] ui:flex-col ui:gap-4">
      <Tabs value={tab} onValueChange={setTab}>
        <Tabs.List className="ui:w-full ui:max-w-md ui:self-center">
          <Tabs.Trigger value="month">Mes</Tabs.Trigger>
          <Tabs.Trigger value="week">Semana</Tabs.Trigger>
          <Tabs.Trigger value="day">Día</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="month" className="ui:pt-2">
          <MonthPanelControlled
            month={focus}
            onMonthChange={setFocus}
            timeGridEvents={demoEvents}
          />
        </Tabs.Content>
        <Tabs.Content value="week" className="ui:pt-2">
          <WeekPanelControlled focus={focus} onFocusChange={setFocus} />
        </Tabs.Content>
        <Tabs.Content value="day" className="ui:pt-2">
          <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,560px)]">
            <CalendarDay
              day={startOfDay(focus)}
              onDayChange={setFocus}
              locale={es}
              today={new Date()}
              now={new Date()}
              events={demoEvents}
              onSelectDay={({ day, time, date }) => {
                console.log("CalendarDay click", { day, time, date });
              }}
            />
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}

const meta = {
  title: "Custom/CalendarTimeGrid",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function WeekViewWithNavigation() {
  const [week, setWeek] = React.useState(() => demoWeekAnchor);
  return (
    <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,1200px)]">
      <CalendarWeek
        week={week}
        onWeekChange={setWeek}
        locale={es}
        today={new Date()}
        now={new Date()}
        onSelectDay={({ day, time, date }) => {
          console.log("CalendarDay click", { day, time, date });
        }}
        events={demoEvents}
      />
    </div>
  );
}

export const WeekView: Story = {
  name: "Week (calendarWeek)",
  render: () => <WeekViewWithNavigation />,
};

function DayViewWithNavigation() {
  const [day, setDay] = React.useState(() => startOfDay(demoDayWithEvents));
  return (
    <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,560px)]">
      <CalendarDay
        day={day}
        onDayChange={setDay}
        locale={es}
        today={new Date()}
        now={new Date()}
        onSelectDay={({ day, time, date }) => {
          console.log("CalendarDay click", { day, time, date });
        }}
        events={demoEvents}
      />
    </div>
  );
}

export const DayView: Story = {
  name: "Day (calendarDay)",
  render: () => <DayViewWithNavigation />,
};

export const MonthGrid: Story = {
  name: "Month (calendarMonth)",
  render: () => <MonthWithSwitcher />,
};

function MonthMultiDayShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(demoWeekAnchor));
  return (
    <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,1197px)]">
      <CalendarMonth
        month={month}
        events={timeGridEventsToMonthEvents(demoEvents)}
        locale={es}
        onMonthChange={setMonth}
      />
    </div>
  );
}

export const MonthMultiDay: Story = {
  name: "Month — multi-día / all-day",
  render: () => <MonthMultiDayShowcase />,
};

export const FormatsWithTabs: Story = {
  name: "Mes / semana / día (tabs)",
  render: () => <CalendarFormatsTabs />,
};
