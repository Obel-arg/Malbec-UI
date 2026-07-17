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
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "@obel-arg/malbec-ui";

function TourCalendar() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const tourStart = new Date(2026, 5, 15);

  // A tour is a multi-day span (it has \`endDate\`). Each show is a timed event
  // that points at the tour via \`parentId\`, so shows render stacked on top of
  // the tour's tinted container instead of as loose pills underneath it.
  const events: CalendarMonthEvent[] = [
    { id: "gira-qa-globo", title: "Gira QA Globo 2026", date: tourStart, endDate: addDays(tourStart, 5), color: "sage" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 0), time: "21:00", title: "QA Globo", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 1), time: "20:00", title: "Noche B", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 2), time: "20:00", title: "noche c", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 3), time: "21:00", title: "QA Globo", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 4), time: "20:00", title: "Noche D", color: "yellow" },
    { parentId: "gira-qa-globo", date: addDays(tourStart, 5), time: "21:00", title: "QA Globo", color: "yellow" },
  ];

  return (
    <CalendarMonth
      month={month}
      events={events}
      locale={es}
      onMonthChange={setMonth}
      onSelectEvent={(ev) => console.log("select", ev.title)}
      weekStartsOn={1}
    />
  );
}`,
      },
    },
  },
};

/**
 * Shows reserve support days around their date — travel in, load-in, rest,
 * travel out — via `daysBefore` / `daysAfter`. Each renders as a thin accent
 * base line butted against the show chip and running through its vertical
 * centre, clipped to the tour's span. Here the opening show travels in a day,
 * the closing show rests a day after, and the middle show pads both sides.
 */
function TourWithPaddingDaysShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(anchor));
  // Tour spans the full week so the padding stays inside the container.
  const tourStart = new Date(2026, 5, 15); // Mon Jun 15
  const events: CalendarMonthEvent[] = [
    {
      id: "gira-andes",
      title: "Gira Andes 2026",
      date: tourStart,
      endDate: addDays(tourStart, 6), // Mon → Sun
      color: "violet",
    },
    {
      parentId: "gira-andes",
      date: addDays(tourStart, 1), // Tue — travels in Mon
      time: "21:00",
      title: "Santiago",
      color: "yellow",
      daysBefore: 1,
    },
    {
      parentId: "gira-andes",
      date: addDays(tourStart, 3), // Thu — pads both sides
      time: "20:00",
      title: "Mendoza",
      color: "yellow",
      daysBefore: 1,
      daysAfter: 1,
    },
    {
      parentId: "gira-andes",
      date: addDays(tourStart, 5), // Sat — rests Sun
      time: "21:00",
      title: "Córdoba",
      color: "yellow",
      daysAfter: 1,
    },
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

export const TourWithPaddingDays: Story = {
  name: "Tour with show padding days (daysBefore / daysAfter)",
  render: () => <TourWithPaddingDaysShowcase />,
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "@obel-arg/malbec-ui";

function TourWithPaddingDays() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const tourStart = new Date(2026, 5, 15); // Mon Jun 15

  // Shows reserve support days around their date (travel in / load-in / rest /
  // travel out) via \`daysBefore\` / \`daysAfter\`. Each renders as a thin accent
  // base line butted against the show chip, clipped to the tour's span.
  const events: CalendarMonthEvent[] = [
    { id: "gira-andes", title: "Gira Andes 2026", date: tourStart, endDate: addDays(tourStart, 6), color: "violet" },
    { parentId: "gira-andes", date: addDays(tourStart, 1), time: "21:00", title: "Santiago", color: "yellow", daysBefore: 1 },
    { parentId: "gira-andes", date: addDays(tourStart, 3), time: "20:00", title: "Mendoza", color: "yellow", daysBefore: 1, daysAfter: 1 },
    { parentId: "gira-andes", date: addDays(tourStart, 5), time: "21:00", title: "Córdoba", color: "yellow", daysAfter: 1 },
  ];

  return (
    <CalendarMonth
      month={month}
      events={events}
      locale={es}
      onMonthChange={setMonth}
      onSelectEvent={(ev) => console.log("select", ev.title)}
      weekStartsOn={1}
    />
  );
}`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "@obel-arg/malbec-ui";

function OverlappingTours() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const base = new Date(2026, 5, 15); // Mon Jun 15

  // Two tours overlapping the same days. Each keeps its own container; the
  // variable-height lane packing stacks them vertically so neither collides.
  // The second tour crosses the week boundary and continues into the next row.
  const events: CalendarMonthEvent[] = [
    { id: "gira-sur", title: "Gira Sur", date: base, endDate: addDays(base, 4), color: "sage" },
    { parentId: "gira-sur", date: addDays(base, 0), time: "21:00", title: "Rosario", color: "yellow" },
    { parentId: "gira-sur", date: addDays(base, 1), time: "21:00", title: "Córdoba", color: "yellow" },
    { parentId: "gira-sur", date: addDays(base, 3), time: "20:00", title: "Mendoza", color: "yellow" },
    { id: "fecha-europa", title: "Fecha Europa", date: addDays(base, 2), endDate: addDays(base, 7), color: "violet" },
    { parentId: "fecha-europa", date: addDays(base, 2), time: "19:30", title: "Berlín", color: "orange" },
    { parentId: "fecha-europa", date: addDays(base, 3), time: "18:00", title: "París", color: "orange" },
    { parentId: "fecha-europa", date: addDays(base, 6), time: "20:00", title: "Madrid", color: "orange" },
  ];

  return (
    <CalendarMonth
      month={month}
      events={events}
      locale={es}
      onMonthChange={setMonth}
      onSelectEvent={(ev) => console.log("select", ev.title)}
      weekStartsOn={1}
    />
  );
}`,
      },
    },
  },
};

/**
 * Unconfirmed (tentative) events render with no fill and a dashed accent
 * outline (`confirmed: false`); a tentative tour also gets a dashed container.
 * Here a confirmed tour has a mix of confirmed / tentative shows, next to a
 * fully tentative tour.
 */
function UnconfirmedShowcase() {
  const [month, setMonth] = React.useState(() => startOfMonth(anchor));
  const base = new Date(2026, 5, 15); // Mon Jun 15
  const events: CalendarMonthEvent[] = [
    {
      id: "gira-confirmada",
      title: "Gira Confirmada",
      date: base,
      endDate: addDays(base, 4),
      color: "sage",
    },
    { parentId: "gira-confirmada", date: addDays(base, 0), time: "21:00", title: "Rosario", color: "yellow" },
    { parentId: "gira-confirmada", date: addDays(base, 1), time: "21:00", title: "Córdoba", color: "yellow" },
    { parentId: "gira-confirmada", date: addDays(base, 3), time: "20:00", title: "Mendoza (tentativa)", color: "yellow", confirmed: false },
    { parentId: "gira-confirmada", date: addDays(base, 4), time: "20:00", title: "Neuquén (tentativa)", color: "yellow", confirmed: false },
    {
      id: "gira-tentativa",
      title: "Gira Tentativa",
      date: addDays(base, 2),
      endDate: addDays(base, 6),
      color: "violet",
      confirmed: false,
    },
    { parentId: "gira-tentativa", date: addDays(base, 2), time: "19:30", title: "Berlín", color: "orange", confirmed: false },
    { parentId: "gira-tentativa", date: addDays(base, 5), time: "18:00", title: "Madrid", color: "orange", confirmed: false },
    // A standalone tentative event (no tour).
    { date: addDays(base, 1), time: "10:00", title: "Reunión a confirmar", color: "blue", confirmed: false },
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

export const Unconfirmed: Story = {
  name: "Unconfirmed / tentative (dashed outline)",
  render: () => <UnconfirmedShowcase />,
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "@obel-arg/malbec-ui";

function TentativeCalendar() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const base = new Date(2026, 5, 15); // Mon Jun 15

  // Unconfirmed events render with no fill and a dashed accent outline
  // (\`confirmed: false\`); a tentative tour also gets a dashed container.
  const events: CalendarMonthEvent[] = [
    { id: "gira-confirmada", title: "Gira Confirmada", date: base, endDate: addDays(base, 4), color: "sage" },
    { parentId: "gira-confirmada", date: addDays(base, 0), time: "21:00", title: "Rosario", color: "yellow" },
    { parentId: "gira-confirmada", date: addDays(base, 3), time: "20:00", title: "Mendoza (tentativa)", color: "yellow", confirmed: false },
    { id: "gira-tentativa", title: "Gira Tentativa", date: addDays(base, 2), endDate: addDays(base, 6), color: "violet", confirmed: false },
    { parentId: "gira-tentativa", date: addDays(base, 2), time: "19:30", title: "Berlín", color: "orange", confirmed: false },
    // A standalone tentative event (no tour).
    { date: addDays(base, 1), time: "10:00", title: "Reunión a confirmar", color: "blue", confirmed: false },
  ];

  return (
    <CalendarMonth
      month={month}
      events={events}
      locale={es}
      onMonthChange={setMonth}
      onSelectEvent={(ev) => console.log("select", ev.title)}
      weekStartsOn={1}
    />
  );
}`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "@obel-arg/malbec-ui";

function FestivalCalendar() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const base = new Date(2026, 5, 15);

  // A day with more shows than fit: extra shows collapse into a \`+N\` chip
  // inside the container that opens a popover.
  const events: CalendarMonthEvent[] = [
    { id: "festival", title: "Festival Multiescenario", date: base, endDate: addDays(base, 3), color: "orange" },
    { parentId: "festival", date: addDays(base, 0), time: "18:00", title: "Apertura", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "16:00", title: "Escenario A", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "18:00", title: "Escenario B", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "20:00", title: "Escenario C", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "22:00", title: "Escenario D", color: "yellow" },
    { parentId: "festival", date: addDays(base, 2), time: "23:30", title: "Cierre", color: "yellow" },
  ];

  return (
    <CalendarMonth
      month={month}
      events={events}
      locale={es}
      onMonthChange={setMonth}
      onSelectEvent={(ev) => console.log("select", ev.title)}
      weekStartsOn={1}
    />
  );
}`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarMonth, type CalendarMonthEvent } from "@obel-arg/malbec-ui";

function OverlappingSpansCalendar() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const weekStart = new Date(2026, 5, 1);

  // Childless multi-day spans (no \`parentId\` children) render as plain stacked
  // bars — no container — and timed pills sit BELOW the stack of span bars.
  const events: CalendarMonthEvent[] = [
    { id: "tour-1", title: "Tour Sur — 5 fechas", date: addDays(weekStart, 0), endDate: addDays(weekStart, 4), color: "sage" },
    { id: "tour-2", title: "Residencia Patagonia", date: addDays(weekStart, 1), endDate: addDays(weekStart, 6), color: "sage" },
    { id: "tour-3", title: "Showcase Norte", date: addDays(weekStart, 0), endDate: addDays(weekStart, 3), color: "sage" },
    { id: "tour-4", title: "Pre-producción", date: addDays(weekStart, 2), endDate: addDays(weekStart, 5), color: "sage" },
    { id: "tour-5", title: "Ensayos generales", date: addDays(weekStart, 0), endDate: addDays(weekStart, 6), color: "sage" },
    { id: "p-mar-08", date: addDays(weekStart, 1), time: "08:00", title: "PRUEBA", color: "blue" },
    { id: "p-mar-10", date: addDays(weekStart, 1), time: "10:00", title: "Comidi", color: "orange" },
    { id: "p-mie-10", date: addDays(weekStart, 2), time: "10:00", title: "Ensayo", color: "violet" },
    { id: "p-jue-12", date: addDays(weekStart, 3), time: "12:00", title: "Reunión", color: "emerald" },
  ];

  return (
    <CalendarMonth
      month={month}
      events={events}
      locale={es}
      onMonthChange={setMonth}
      weekStartsOn={1}
    />
  );
}`,
      },
    },
  },
};
