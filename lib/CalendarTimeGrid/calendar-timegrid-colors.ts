import type { CalendarTimeGridEventColor } from "./calendar-timegrid-types";

/** Timed event block fill (`bg`) and accent (`text` / rail) per color. */
export const CALENDAR_TIMEGRID_EVENT_COLORS: Record<
  CalendarTimeGridEventColor,
  { bg: string; text: string }
> = {
  yellow: { bg: "#efeed4", text: "#8a862f" },
  orange: { bg: "#efe3d4", text: "#8a642f" },
  blue: { bg: "#dce6ec", text: "#2f628a" },
  violet: { bg: "#e5dcec", text: "#352a60" },
  emerald: { bg: "#d0dfd0", text: "#2a602c" },
  sage: { bg: "#b4c5b5", text: "#025406" },
  red: { bg: "#dfd0d0", text: "#602a2a" },
};

/** Accent (text / rail) color for an event color — mirrors the `Badge` accent. */
export function timeGridEventAccentColor(
  color: CalendarTimeGridEventColor,
): string {
  return CALENDAR_TIMEGRID_EVENT_COLORS[color].text;
}
