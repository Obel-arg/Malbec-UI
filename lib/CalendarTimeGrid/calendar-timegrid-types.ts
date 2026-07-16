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
  /**
   * Confirmation state. Defaults to `true` (solid fill). When `false`, the
   * event renders as tentative — no fill, a dashed accent outline.
   */
  confirmed?: boolean;
  /**
   * Support days a show reserves before its date (travel in, load-in). In the
   * day/week grid these render as a thin accent base line across the padding day
   * columns in the all-day strip, clipped to the parent tour's span. Defaults to
   * `0`.
   */
  daysBefore?: number;
  /**
   * Support days a show reserves after its date (rest, travel out). See
   * {@link daysBefore}.
   */
  daysAfter?: number;
}
