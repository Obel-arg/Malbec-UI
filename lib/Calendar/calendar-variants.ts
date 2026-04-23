import { cva } from "class-variance-authority";

export const calendarNavButtonVariants = cva([
  /** Match shadcn range calendar nav: ghost icon buttons (no boxed chrome). */
  "ui:inline-flex ui:size-7 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-md ui:bg-transparent ui:p-0 ui:text-text-default ui:outline-none",
  "ui:opacity-50 ui:transition-opacity ui:hover:opacity-100 ui:focus-visible:opacity-100",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-white dark:ui:focus-visible:ring-offset-background-200",
  "ui:disabled:pointer-events-none ui:disabled:opacity-30",
]);

export const calendarDayButtonBaseVariants = cva([
  "ui:inline-flex ui:size-9 ui:items-center ui:justify-center ui:rounded-md",
  "ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
  "ui:outline-none ui:transition-[opacity,background-color,color]",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
  "ui:disabled:pointer-events-none ui:disabled:opacity-50",
]);
