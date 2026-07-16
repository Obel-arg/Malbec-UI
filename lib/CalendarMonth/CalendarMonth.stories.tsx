import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays, startOfDay, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "./CalendarMonth";

const meta = {
  title: "Custom/CalendarMonth",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const anchor = new Date(2026, 5, 1); // Jun 2026

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui:mx-auto ui:w-full ui:max-w-[min(100%,1197px)]">
      {children}
    </div>
  );
}

/**
 * A tour with its shows. The tour is a multi-day span (`endDate`); each show is
 * a timed event pointing at the tour via `parentId`. Shows render stacked on
 * top of the tour's tinted container, one column per day, so they read as
 * belonging to the tour instead of as loose pills underneath it.
 */
function TourWithShowsShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(anchor));
  // Tour Mon Jun 15 → Sat Jun 20 2026 (single week row, weekStartsOn=1).
  const tourStart = new Date(2026, 5, 15);
  const events: CalendarMonthEvent[] = [
    {
      id: "gira-qa-globo",
      title: "Gira QA Globo 2026",
      date: tourStart,
      endDate: addDays(tourStart, 5),
      color: "sage",
    },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 0), time: "21:00", title: "QA Globo", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 1), time: "20:00", title: "Noche B", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 2), time: "20:00", title: "noche c", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 3), time: "21:00", title: "QA Globo", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 4), time: "20:00", title: "Noche D", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 5), time: "21:00", title: "QA Globo", color: "yellow" },
  ];

  return (
    <Frame>
      <CalendarMonth
        month={month}
        events={events}
        locale={es}
        onMonthChange={setMonth}
        onSelectEvent={(ev) => console.log("select", ev.title)}
        today={startOfDay(new Date(2026, 5, 16))}
        weekStartsOn={1}
      />
    </Frame>
  );
}

export const TourWithShows: Story = {
  name: "Tour with shows (parentId grouping)",
  render: () => <TourWithShowsShowcase />,
};

/**
 * Two tours overlapping the same days. Each keeps its own container; the
 * variable-height lane packing stacks them vertically so neither collides. The
 * second tour crosses the week boundary (square right edge, continues into the
 * next row).
 */
function OverlappingToursShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(anchor));
  const base = new Date(2026, 5, 15); // Mon Jun 15
  const events: CalendarMonthEvent[] = [
    {
      id: "gira-sur",
      title: "Gira Sur",
      date: base,
      endDate: addDays(base, 4),
      color: "sage",
    },
    { parentId: "gira-sur", date: addDays(base, 0), time: "21:00", title: "Rosario", color: "yellow" },
    { parentId: "gira-sur", date: addDays(base, 1), time: "21:00", title: "Córdoba", color: "yellow" },
    { parentId: "gira-sur", date: addDays(base, 3), time: "20:00", title: "Mendoza", color: "yellow" },
    {
      id: "fecha-europa",
      title: "Fecha Europa",
      date: addDays(base, 2),
      endDate: addDays(base, 7), // spills into next week
      color: "violet",
    },
    { parentId: "fecha-europa", date: addDays(base, 2), time: "19:30", title: "Berlín", color: "orange" },
    { parentId: "fecha-europa", date: addDays(base, 3), time: "18:00", title: "París", color: "orange" },
    { parentId: "fecha-europa", date: addDays(base, 6), time: "20:00", title: "Madrid", color: "orange" },
  ];

  return (
    <Frame>
      <CalendarMonth
        month={month}
        events={events}
        locale={es}
        onMonthChange={setMonth}
        onSelectEvent={(ev) => console.log("select", ev.title)}
        today={startOfDay(new Date(2026, 5, 16))}
        weekStartsOn={1}
      />
    </Frame>
  );
}

export const OverlappingTours: Story = {
  name: "Overlapping tours (variable-height lanes)",
  render: () => <OverlappingToursShowcase />,
};

/**
 * A day under a tour with more shows than fit: extra shows collapse into a
 * `+N` chip inside the container that opens a popover.
 */
function TourWithOverflowShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(anchor));
  const base = new Date(2026, 5, 15);
  const events: CalendarMonthEvent[] = [
    {
      id: "festival",
      title: "Festival Multiescenario",
      date: base,
      endDate: addDays(base, 3),
      color: "orange",
    },
    // Wed has 5 shows → caps at 3 rows with a "+3" overflow chip.
    { parentId: "festival", date: addDays(base, 0), time: "18:00", title: "Apertura", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "16:00", title: "Escenario A", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "18:00", title: "Escenario B", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "20:00", title: "Escenario C", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "22:00", title: "Escenario D", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "23:30", title: "Cierre", color: "yellow" },
  ];

  return (
    <Frame>
      <CalendarMonth
        month={month}
        events={events}
        locale={es}
        onMonthChange={setMonth}
        onSelectEvent={(ev) => console.log("select", ev.title)}
        today={startOfDay(new Date(2026, 5, 16))}
        weekStartsOn={1}
      />
    </Frame>
  );
}

export const TourWithOverflow: Story = {
  name: "Tour with per-day overflow (+N)",
  render: () => <TourWithOverflowShowcase />,
};

/**
 * Regression: childless multi-day spans (no `parentId` children) must still
 * render as plain stacked bars — no container — and timed pills must sit BELOW
 * them. Reproduces the visual issue reported from `Malbec-Artist` (2026-06-17):
 * several tours overlapping in the same week, with `08:00`/`10:00`/`12:00`
 * pills that must stay fully visible under the stack of span bars.
 */
function ManyOverlappingSpansShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(anchor));
  const weekStart = new Date(2026, 5, 1);
  const spans: CalendarMonthEvent[] = [
    { id: "tour-1", title: "Tour Sur — 5 fechas", date: addDays(weekStart, 0), endDate: addDays(weekStart, 4), color: "sage" },
    { id: "tour-2", title: "Residencia Patagonia", date: addDays(weekStart, 1), endDate: addDays(weekStart, 6), color: "sage" },
    { id: "tour-3", title: "Showcase Norte", date: addDays(weekStart, 0), endDate: addDays(weekStart, 3), color: "sage" },
    { id: "tour-4", title: "Pre-producción", date: addDays(weekStart, 2), endDate: addDays(weekStart, 5), color: "sage" },
    { id: "tour-5", title: "Ensayos generales", date: addDays(weekStart, 0), endDate: addDays(weekStart, 6), color: "sage" },
  ];
  const timed: CalendarMonthEvent[] = [
    { id: "p-mar-08", date: addDays(weekStart, 1), time: "08:00", title: "PRUEBA", color: "blue" },
    { id: "p-mar-10", date: addDays(weekStart, 1), time: "10:00", title: "Comidi", color: "orange" },
    { id: "p-mie-10", date: addDays(weekStart, 2), time: "10:00", title: "Ensayo", color: "violet" },
    { id: "p-jue-12", date: addDays(weekStart, 3), time: "12:00", title: "Reunión", color: "emerald" },
  ];

  return (
    <Frame>
      <CalendarMonth
        month={month}
        events={[...spans, ...timed]}
        locale={es}
        onMonthChange={setMonth}
        today={startOfDay(anchor)}
        weekStartsOn={1}
      />
    </Frame>
  );
}

export const ManyOverlappingSpans: Story = {
  name: "Many overlapping spans (regression: childless bars + pills below)",
  render: () => <ManyOverlappingSpansShowcase />,
};
