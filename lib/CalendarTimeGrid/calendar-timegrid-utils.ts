import {
  differenceInMinutes,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
} from "date-fns";

export function buildWeekDays(
  weekAnchor: Date,
  weekStartsOn: 0 | 1,
): Date[] {
  const start = startOfWeek(weekAnchor, { weekStartsOn });
  const end = endOfWeek(weekAnchor, { weekStartsOn });
  return eachDayOfInterval({ start, end });
}

/** Inclusive hour labels, e.g. startHour 0 and endHour 23 → 0…23 (full day). */
export function hourRange(startHour: number, endHour: number): number[] {
  const out: number[] = [];
  for (let h = startHour; h <= endHour; h += 1) out.push(h);
  return out;
}

export function minutesSinceGridStart(
  d: Date,
  gridStartHour: number,
): number {
  return d.getHours() * 60 + d.getMinutes() - gridStartHour * 60;
}

export function eventTopPx(
  start: Date,
  gridStartHour: number,
  hourHeightPx: number,
): number {
  return (minutesSinceGridStart(start, gridStartHour) / 60) * hourHeightPx;
}

export function eventHeightPx(
  start: Date,
  end: Date,
  hourHeightPx: number,
): number {
  return (differenceInMinutes(end, start) / 60) * hourHeightPx;
}

/**
 * Offset local → UTC at instant `at`, as in Figma (`GMT-3`, `GMT+5:30`).
 * Uses the runtime timezone (`Date#getTimezoneOffset`).
 */
export function formatGmtOffsetLabel(at: Date): string {
  const offsetMinutesEastOfUtc = -at.getTimezoneOffset();
  if (offsetMinutesEastOfUtc === 0) return "GMT";
  const sign = offsetMinutesEastOfUtc > 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutesEastOfUtc);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (m === 0) return `GMT${sign}${h}`;
  return `GMT${sign}${h}:${String(m).padStart(2, "0")}`;
}

