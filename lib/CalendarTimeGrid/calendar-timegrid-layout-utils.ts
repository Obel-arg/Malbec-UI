import { isSameDay, startOfDay } from "date-fns";
import type { CSSProperties } from "react";
import type { CalendarTimeGridEvent } from "./calendar-timegrid-types";
import {
  eventHeightPx,
  eventTopPx,
  minutesSinceGridStart,
} from "./calendar-timegrid-utils";

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
