import { differenceInCalendarDays, startOfDay } from "date-fns";

export type CalendarSpanInput<E> = {
  event: E;
  /** Inclusive start day index within the row (0-based). */
  startIdx: number;
  /** Inclusive end day index within the row (0-based). */
  endIdx: number;
};

export type CalendarSpanLayoutItem<E> = CalendarSpanInput<E> & {
  lane: number;
};

export type CalendarSpanLayout<E> = {
  layout: CalendarSpanLayoutItem<E>[];
  lanes: number;
};

/**
 * Pack span segments into lanes (rows) using greedy first-fit. Segments are
 * sorted by start ascending, then by length descending so the longest bars
 * stick to the top lanes (matches Google Calendar). Stable on `event.id`.
 */
export function layoutCalendarSpans<E extends { id?: string }>(
  items: CalendarSpanInput<E>[],
): CalendarSpanLayout<E> {
  if (items.length === 0) return { layout: [], lanes: 0 };

  const sorted = [...items].sort((a, b) => {
    if (a.startIdx !== b.startIdx) return a.startIdx - b.startIdx;
    const aLen = a.endIdx - a.startIdx;
    const bLen = b.endIdx - b.startIdx;
    if (aLen !== bLen) return bLen - aLen;
    return (a.event.id ?? "").localeCompare(b.event.id ?? "");
  });

  /** Per-lane: last occupied day index. -1 = empty. */
  const laneEndIdx: number[] = [];
  const layout: CalendarSpanLayoutItem<E>[] = [];

  for (const item of sorted) {
    let lane = laneEndIdx.findIndex((end) => end < item.startIdx);
    if (lane === -1) {
      lane = laneEndIdx.length;
      laneEndIdx.push(item.endIdx);
    } else {
      laneEndIdx[lane] = item.endIdx;
    }
    layout.push({ ...item, lane });
  }

  return { layout, lanes: laneEndIdx.length };
}

/**
 * Clip an inclusive day range to a row of consecutive days. Returns the
 * 0-based start/end indices within the row, or `null` if the range falls
 * entirely outside the row.
 */
export function clipDayRangeToRow(
  eventStart: Date,
  eventEndInclusive: Date,
  rowStartDay: Date,
  rowDayCount: number,
): { startIdx: number; endIdx: number } | null {
  const evStart = startOfDay(eventStart);
  const evEnd = startOfDay(eventEndInclusive);
  if (evEnd < evStart) return null;

  const rowStart = startOfDay(rowStartDay);
  const startIdx = Math.max(0, differenceInCalendarDays(evStart, rowStart));
  const endIdx = Math.min(
    rowDayCount - 1,
    differenceInCalendarDays(evEnd, rowStart),
  );
  if (endIdx < 0 || startIdx > rowDayCount - 1 || startIdx > endIdx) {
    return null;
  }
  return { startIdx, endIdx };
}

export type CalendarGroupInput<E> = {
  /** The span (tour) event that heads the group. */
  event: E;
  /** Inclusive start day index within the row (0-based). */
  startIdx: number;
  /** Inclusive end day index within the row (0-based). */
  endIdx: number;
  /**
   * Stacked child rows to reserve below the header (0 = header only, i.e. a
   * plain span with no children). One "row" == one pill row.
   */
  childRows: number;
};

export type CalendarGroupLayoutItem<E> = CalendarGroupInput<E> & {
  lane: number;
  /** Row offset of this group's header within the week's group stack. */
  topRow: number;
  /** Total rows the group occupies: header (1) + `childRows`. */
  rowSpan: number;
};

export type CalendarGroupLayout<E> = {
  layout: CalendarGroupLayoutItem<E>[];
  /** Total stacked rows reserved by every group in this row. */
  totalRows: number;
};

/**
 * Pack tour groups (a span header + its stacked child rows) into lanes using
 * greedy first-fit, generalized to **variable lane heights**. Groups that
 * overlap horizontally land in different lanes and stack vertically; each lane
 * is as tall as its tallest group. Sorted by start ascending, then length
 * descending so the longest bars stick to the top lanes (matches Google
 * Calendar). Stable on `event.id`.
 */
export function layoutCalendarGroups<E extends { id?: string }>(
  items: CalendarGroupInput<E>[],
): CalendarGroupLayout<E> {
  if (items.length === 0) return { layout: [], totalRows: 0 };

  const withSpan = items.map((it) => ({
    ...it,
    rowSpan: 1 + Math.max(0, it.childRows),
  }));

  const sorted = [...withSpan].sort((a, b) => {
    if (a.startIdx !== b.startIdx) return a.startIdx - b.startIdx;
    const aLen = a.endIdx - a.startIdx;
    const bLen = b.endIdx - b.startIdx;
    if (aLen !== bLen) return bLen - aLen;
    return (a.event.id ?? "").localeCompare(b.event.id ?? "");
  });

  /** Per-lane: last occupied day index. -1 = empty. */
  const laneEndIdx: number[] = [];
  /** Per-lane: tallest group in the lane (rows). */
  const laneRowSpan: number[] = [];
  const assigned: (Omit<CalendarGroupLayoutItem<E>, "topRow"> & {
    lane: number;
  })[] = [];

  for (const item of sorted) {
    let lane = laneEndIdx.findIndex((end) => end < item.startIdx);
    if (lane === -1) {
      lane = laneEndIdx.length;
      laneEndIdx.push(item.endIdx);
      laneRowSpan.push(item.rowSpan);
    } else {
      laneEndIdx[lane] = item.endIdx;
      laneRowSpan[lane] = Math.max(laneRowSpan[lane]!, item.rowSpan);
    }
    assigned.push({ ...item, lane });
  }

  /** Cumulative row offset at the top of each lane. */
  const laneTopRow: number[] = [];
  let acc = 0;
  for (let l = 0; l < laneRowSpan.length; l += 1) {
    laneTopRow.push(acc);
    acc += laneRowSpan[l]!;
  }

  const layout: CalendarGroupLayoutItem<E>[] = assigned.map((it) => ({
    ...it,
    topRow: laneTopRow[it.lane]!,
  }));

  return { layout, totalRows: acc };
}

/**
 * `true` when the event's start..end (inclusive) covers a full calendar day
 * range, either explicitly via `allDay`, or implicitly via spanning multiple
 * calendar days.
 */
export function isMultiDayOrAllDay(
  start: Date,
  endInclusive: Date,
  allDay: boolean | undefined,
): boolean {
  if (allDay) return true;
  return (
    differenceInCalendarDays(startOfDay(endInclusive), startOfDay(start)) > 0
  );
}
