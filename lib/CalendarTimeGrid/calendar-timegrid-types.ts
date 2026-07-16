import type { CalendarMonthEventColor } from "../CalendarMonth/CalendarMonth";

export type CalendarTimeGridEventColor = CalendarMonthEventColor;

export interface CalendarTimeGridEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  /**
   * All-day event. Rendered in the all-day strip above the time grid (not in
   * the hourly columns). Multi-day events (`end` on a later calendar day than
   * `start`) are treated as all-day automatically.
   */
  allDay?: boolean;
  color?: CalendarTimeGridEventColor;
  /**
   * Links a timed show to its parent tour — the `id` of a multi-day / all-day
   * event in the same list. Child shows inherit their tour's color and carry a
   * leading accent rail, matching the `CalendarMonth` tour/show treatment.
   * Ignored when no span event with a matching `id` is present.
   */
  parentId?: string;
}
