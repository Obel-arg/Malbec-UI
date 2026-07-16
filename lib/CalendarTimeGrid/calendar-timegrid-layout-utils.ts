import { differenceInCalendarDays, isSameDay, startOfDay } from "date-fns";
import type { CSSProperties } from "react";
import { isMultiDayOrAllDay } from "../CalendarMonth/calendar-span-layout";
import type {
  CalendarTimeGridEvent,
  CalendarTimeGridEventColor,
} from "./calendar-timegrid-types";
import {
  eventHeightPx,
  eventTopPx,
  minutesSinceGridStart,
} from "./calendar-timegrid-utils";

/**
 * Map of tour id → color for span (all-day / multi-day) events that own child
 * shows. A timed event whose `parentId` matches a key inherits that color.
 * Defaults to `"blue"` to match the all-day strip's fallback bar color.
 */
export function buildTourColorMap(
  events: CalendarTimeGridEvent[],
): Map<string, CalendarTimeGridEventColor> {
  const map = new Map<string, CalendarTimeGridEventColor>();
  for (const ev of events) {
    if (!ev.id) continue;
    if (isMultiDayOrAllDay(ev.start, ev.end, ev.allDay)) {
      map.set(ev.id, ev.color ?? "blue");
    }
  }
  return map;
}

/** Height of a show's padding base line (travel / rest support days). */
export const TIMED_PAD_LINE_HEIGHT_PX = 6;
/** Line inset from a padding day's outer column edge (matches event-block pad). */
const TIMED_PAD_OUTER_INSET_PX = 4;
/** Event-block horizontal inset — the show-facing end butts the block's rail here. */
const TIMED_PAD_BLOCK_INSET_PX = 4;

/**
 * One continuous padding run (all `daysBefore` or all `daysAfter` of a show),
 * resolved to CSS against a columns-wide overlay so its show-facing end butts
 * the show block's rail exactly (no gap) and its outer end insets + rounds. `left`
 * / `width` are percentages of the columns area (gutter excluded).
 */
export type TimedPaddingRun = {
  top: number;
  height: number;
  color: CalendarTimeGridEventColor;
  left: string;
  width: string;
  /** Round the outer end; the show-facing end is always square (butts the block). */
  roundLeft: boolean;
  roundRight: boolean;
  key: string;
};

/**
 * Padding runs for every timed show carrying `daysBefore` / `daysAfter`, laid out
 * for a single absolute overlay spanning the day columns (so a run can butt the
 * show block's rail across the column boundary). Percentages are of the columns
 * area — render inside an overlay offset past the time gutter. Works for any
 * column count (7 in `CalendarWeek`, 1 in `CalendarDay`): a run shows whenever a
 * padding day is visible, even if the show's own day is off-view. Clipped to the
 * parent tour's span; shows outside the visible hours cast nothing.
 */
export function buildTimedPaddingRuns(
  events: CalendarTimeGridEvent[],
  days: Date[],
  startHour: number,
  endHour: number,
  hourHeightPx: number,
): TimedPaddingRun[] {
  if (days.length === 0) return [];
  const dayCount = days.length;
  const rowStart = startOfDay(days[0]!);
  const lastCol = dayCount - 1;
  const w = 100 / dayCount; // percent per column

  // Tour column span + color, keyed by span id, so padding clips to the tour.
  const tourById = new Map<
    string,
    { startCol: number; endCol: number; color: CalendarTimeGridEventColor }
  >();
  for (const ev of events) {
    if (!ev.id) continue;
    if (!isMultiDayOrAllDay(ev.start, ev.end, ev.allDay)) continue;
    tourById.set(ev.id, {
      startCol: differenceInCalendarDays(startOfDay(ev.start), rowStart),
      endCol: differenceInCalendarDays(startOfDay(ev.end), rowStart),
      color: ev.color ?? "blue",
    });
  }

  const runs: TimedPaddingRun[] = [];
  events.forEach((ev, idx) => {
    if (isMultiDayOrAllDay(ev.start, ev.end, ev.allDay)) return;
    const before = Math.floor(ev.daysBefore ?? 0);
    const after = Math.floor(ev.daysAfter ?? 0);
    if (before < 1 && after < 1) return;

    // Vertical level: the show's own block, centred. Time-based, so it is the
    // same in any column — including a padding column whose show is off-view.
    const box = layoutTimedEvent(
      ev,
      startOfDay(ev.start),
      startHour,
      endHour,
      hourHeightPx,
    );
    if (!box) return;
    const top = box.top + box.height / 2 - TIMED_PAD_LINE_HEIGHT_PX / 2;

    const showCol = differenceInCalendarDays(startOfDay(ev.start), rowStart);
    const showVisible = showCol >= 0 && showCol <= lastCol;
    const tour = ev.parentId ? tourById.get(ev.parentId) : undefined;
    const color = tour?.color ?? ev.color ?? "blue";
    const tourStart = tour ? tour.startCol : -Infinity;
    const tourEnd = tour ? tour.endCol : Infinity;
    const keyBase = ev.id ?? `${ev.start.toISOString()}-${idx}`;

    if (before >= 1) {
      const clampStart = Math.max(tourStart, showCol - before);
      const s = Math.max(0, clampStart);
      const e = Math.min(lastCol, showCol - 1);
      if (e >= s) {
        // Outer (left) end: inset + rounded at the true start, else flush.
        const roundLeft = clampStart >= 0;
        const leftPx = roundLeft ? TIMED_PAD_OUTER_INSET_PX : 0;
        // Show-facing (right) end: butt the block's rail, or flush to the view
        // edge when the show sits off-view to the right.
        const rightPct = showVisible ? showCol * w : 100;
        const rightPx = showVisible ? TIMED_PAD_BLOCK_INSET_PX : 0;
        runs.push({
          top,
          height: TIMED_PAD_LINE_HEIGHT_PX,
          color,
          left: `calc(${s * w}% + ${leftPx}px)`,
          width: `calc(${rightPct - s * w}% + ${rightPx - leftPx}px)`,
          roundLeft,
          roundRight: false,
          key: `${keyBase}-before`,
        });
      }
    }

    if (after >= 1) {
      const clampEnd = Math.min(tourEnd, showCol + after);
      const s = Math.max(0, showCol + 1);
      const e = Math.min(lastCol, clampEnd);
      if (e >= s) {
        // Show-facing (left) end: butt the block's right edge, or flush to the
        // view edge when the show sits off-view to the left.
        const leftPct = showVisible ? (showCol + 1) * w : 0;
        const leftPx = showVisible ? -TIMED_PAD_BLOCK_INSET_PX : 0;
        // Outer (right) end: inset + rounded at the true end, else flush.
        const roundRight = clampEnd <= lastCol;
        const rightPct = (e + 1) * w;
        const rightPx = roundRight ? -TIMED_PAD_OUTER_INSET_PX : 0;
        runs.push({
          top,
          height: TIMED_PAD_LINE_HEIGHT_PX,
          color,
          left: `calc(${leftPct}% + ${leftPx}px)`,
          width: `calc(${rightPct - leftPct}% + ${rightPx - leftPx}px)`,
          roundLeft: false,
          roundRight,
          key: `${keyBase}-after`,
        });
      }
    }
  });

  return runs;
}

export function gridBackgroundStyle(hourHeightPx: number): CSSProperties {
  return {
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent ${hourHeightPx - 1}px, var(--color-background-300) ${hourHeightPx - 1}px, var(--color-background-300) ${hourHeightPx}px)`,
  };
}

export function layoutTimedEvent(
  ev: CalendarTimeGridEvent,
  columnDay: Date,
  startHour: number,
  endHour: number,
  hourHeightPx: number,
): { top: number; height: number } | null {
  if (!isSameDay(startOfDay(ev.start), startOfDay(columnDay))) return null;
  const gridH = (endHour - startHour + 1) * hourHeightPx;
  let top = eventTopPx(ev.start, startHour, hourHeightPx);
  let height = Math.max(eventHeightPx(ev.start, ev.end, hourHeightPx), 24);
  const bottom = top + height;
  if (bottom <= 0 || top >= gridH) return null;
  top = Math.max(0, top);
  height = Math.min(bottom, gridH) - top;
  height = Math.max(height, 22);
  return { top, height };
}

export function nowMarkerTopPx(
  day: Date,
  now: Date,
  startHour: number,
  endHour: number,
  hourHeightPx: number,
): number | null {
  if (!isSameDay(startOfDay(day), startOfDay(now))) return null;
  const mins = minutesSinceGridStart(now, startHour);
  if (mins < 0 || mins > (endHour - startHour + 1) * 60) return null;
  return (mins / 60) * hourHeightPx;
}

function eventsTimeOverlap(
  a: CalendarTimeGridEvent,
  b: CalendarTimeGridEvent,
): boolean {
  return (
    a.start.getTime() < b.end.getTime() && b.start.getTime() < a.end.getTime()
  );
}

function clusterOverlappingEvents(
  events: CalendarTimeGridEvent[],
): CalendarTimeGridEvent[][] {
  const n = events.length;
  if (n === 0) return [];
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (i: number): number => {
    if (parent[i] !== i) parent[i] = find(parent[i]!);
    return parent[i]!;
  };
  const union = (i: number, j: number) => {
    const ri = find(i);
    const rj = find(j);
    if (ri !== rj) parent[ri] = rj;
  };
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (eventsTimeOverlap(events[i]!, events[j]!)) union(i, j);
    }
  }
  const buckets = new Map<number, CalendarTimeGridEvent[]>();
  for (let i = 0; i < n; i++) {
    const r = find(i);
    const arr = buckets.get(r) ?? [];
    arr.push(events[i]!);
    buckets.set(r, arr);
  }
  return [...buckets.values()];
}

function maxConcurrentEvents(cluster: CalendarTimeGridEvent[]): number {
  const points: { t: number; d: number }[] = [];
  for (const ev of cluster) {
    points.push({ t: ev.start.getTime(), d: 1 });
    points.push({ t: ev.end.getTime(), d: -1 });
  }
  points.sort((a, b) => (a.t === b.t ? b.d - a.d : a.t - b.t));
  let cur = 0;
  let max = 0;
  for (const p of points) {
    cur += p.d;
    max = Math.max(max, cur);
  }
  return Math.max(max, 1);
}

function assignOverlapColumns(
  cluster: CalendarTimeGridEvent[],
): Map<CalendarTimeGridEvent, number> {
  const sorted = [...cluster].sort(
    (a, b) =>
      a.start.getTime() - b.start.getTime() ||
      b.end.getTime() - a.end.getTime(),
  );
  const lastEndByCol: number[] = [];
  const map = new Map<CalendarTimeGridEvent, number>();
  for (const ev of sorted) {
    const s = ev.start.getTime();
    const e = ev.end.getTime();
    let c = 0;
    while (c < lastEndByCol.length && lastEndByCol[c]! > s) c++;
    if (c === lastEndByCol.length) lastEndByCol.push(e);
    else lastEndByCol[c] = e;
    map.set(ev, c);
  }
  return map;
}

export type TimedEventLayout = {
  event: CalendarTimeGridEvent;
  top: number;
  height: number;
  column: number;
  columnCount: number;
};

/** Side-by-side columns when intervals overlap (same day column). */
export function layoutTimedEventsForDayColumn(
  dayEvents: CalendarTimeGridEvent[],
  columnDay: Date,
  startHour: number,
  endHour: number,
  hourHeightPx: number,
): TimedEventLayout[] {
  const placed: Array<{
    event: CalendarTimeGridEvent;
    top: number;
    height: number;
  }> = [];
  for (const ev of dayEvents) {
    const box = layoutTimedEvent(
      ev,
      columnDay,
      startHour,
      endHour,
      hourHeightPx,
    );
    if (box) placed.push({ event: ev, ...box });
  }
  if (placed.length === 0) return [];

  const events = placed.map((p) => p.event);
  const clusters = clusterOverlappingEvents(events);
  const columnByEvent = new Map<CalendarTimeGridEvent, number>();
  const columnCountByEvent = new Map<CalendarTimeGridEvent, number>();

  for (const cluster of clusters) {
    const maxC = maxConcurrentEvents(cluster);
    const cols = assignOverlapColumns(cluster);
    for (const ev of cluster) {
      columnByEvent.set(ev, cols.get(ev)!);
      columnCountByEvent.set(ev, maxC);
    }
  }

  return placed.map(({ event, top, height }) => ({
    event,
    top,
    height,
    column: columnByEvent.get(event)!,
    columnCount: columnCountByEvent.get(event)!,
  }));
}

/** `left` / `width` for absolute event blocks; `pad` = inset from day column edges, `gap` between lanes. */
export function timedEventHorizontalStyle(
  column: number,
  columnCount: number,
  padPx = 4,
  gapPx = 2,
): Pick<CSSProperties, "left" | "width"> {
  if (columnCount <= 1) {
    return {
      left: padPx,
      width: `calc(100% - ${2 * padPx}px)`,
    };
  }
  const totalGaps = (columnCount - 1) * gapPx;
  return {
    left: `calc(${padPx}px + ${column} * ((100% - ${2 * padPx}px - ${totalGaps}px) / ${columnCount} + ${gapPx}px))`,
    width: `calc((100% - ${2 * padPx}px - ${totalGaps}px) / ${columnCount})`,
  };
}
