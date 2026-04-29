import type { CalendarMonthEventColor } from "../CalendarMonth/CalendarMonth";

export type CalendarTimeGridEventColor = CalendarMonthEventColor;

export interface CalendarTimeGridEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  color?: CalendarTimeGridEventColor;
}
