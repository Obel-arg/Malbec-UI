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
}
