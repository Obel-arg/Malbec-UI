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

/**
 * Maps a vertical offset within the time grid to an hour row and :00 / :30
 * (top half of the row → :00, bottom half → :30).
 */
export function slotFromGridClickY(
  offsetY: number,
  startHour: number,
  endHour: number,
  hourHeightPx: number,
): { hour: number; minute: 0 | 30 } {
  const rowCount = endHour - startHour + 1;
  const y = Math.max(0, offsetY);
  const rowIndex = Math.min(Math.floor(y / hourHeightPx), rowCount - 1);
  const withinRow = y - rowIndex * hourHeightPx;
  const minute: 0 | 30 = withinRow < hourHeightPx / 2 ? 0 : 30;
  return { hour: startHour + rowIndex, minute };
}

export function formatSlotTime24h(hour: number, minute: 0 | 30): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

