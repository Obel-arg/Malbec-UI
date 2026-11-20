import { cva } from "class-variance-authority";

export const calendarTimeGridRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:w-full ui:flex-col ui:overflow-hidden",
  "ui:rounded-xl ui:border ui:border-background-300 ui:bg-background-100",
]);

export const calendarTimeGridHeaderRowVariants = cva(
  "ui:flex ui:min-h-11 ui:shrink-0 ui:border-b ui:border-background-300 ui:bg-background-200",
);

export const calendarTimeGridGutterHeaderVariants = cva(
  "ui:flex ui:w-14 ui:shrink-0 ui:items-end ui:justify-end ui:border-r ui:border-background-300 ui:pb-1 ui:pr-2 ui:pt-2",
);

export const calendarTimeGridDayHeaderVariants = cva(
  [
    "ui:flex ui:flex-1 ui:flex-row ui:items-center ui:justify-center ui:gap-1 ui:border-r ui:border-background-300 ui:px-1 ui:py-2",
    "ui:text-[11px] ui:font-medium ui:uppercase ui:leading-none ui:tracking-normal",
  ],
  {
    variants: {
      isToday: {
        true: "ui:text-text-default",
        false: "ui:text-malbec-subtle-text",
      },
      isLast: {
        true: "ui:border-r-0",
        false: "",
      },
    },
    defaultVariants: { isToday: false, isLast: false },
  },
);

export const calendarTimeGridBodyRowVariants = cva(
  "ui:relative ui:flex ui:min-h-0 ui:flex-1 ui:overflow-hidden",
);

export const calendarTimeGridTimeGutterVariants = cva(
  "ui:relative ui:w-14 ui:shrink-0 ui:border-r ui:border-background-300 ui:bg-background-100",
);

export const calendarTimeGridTimeLabelVariants = cva(
  "ui:absolute ui:right-2 ui:-translate-y-1/2 ui:text-right ui:text-[11px] ui:font-normal ui:uppercase ui:leading-none ui:text-malbec-subtle-text",
);

export const calendarTimeGridColumnVariants = cva(
  [
    "ui:relative ui:min-w-0 ui:flex-1 ui:border-r ui:border-background-300 ui:bg-background-100",
  ],
  {
    variants: {
      isLast: {
        true: "ui:border-r-0",
        false: "",
      },
    },
    defaultVariants: { isLast: false },
  },
);

/** Same circular “today” treatment as `CalendarMonth` (not a wide pill). */
export const calendarTimeGridTodayBadgeVariants = cva(
  "ui:inline-flex ui:size-6 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full ui:bg-malbec-icon ui:text-[12px] ui:font-semibold ui:leading-none ui:tabular-nums ui:text-background-100 ui:normal-case",
);

/** Container row holding the gutter label + per-column track for span (all-day / multi-day) bars. */
export const calendarTimeGridAllDayRowVariants = cva(
  "ui:flex ui:shrink-0 ui:border-b ui:border-background-300 ui:bg-background-100",
);

export const calendarTimeGridAllDayGutterVariants = cva(
  "ui:flex ui:w-14 ui:shrink-0 ui:items-start ui:justify-end ui:border-r ui:border-background-300 ui:px-2 ui:pt-1.5 ui:pb-1",
);

/** Per-week (or per-day) track absolutely positioned span bars sit inside. */
export const calendarTimeGridAllDayTrackVariants = cva(
  "ui:relative ui:flex-1",
);

/** Same look as `calendarMonthSpanBarVariants` but locally owned to keep import boundaries clean. */
export const calendarTimeGridAllDayBarVariants = cva(
  [
    "ui:absolute ui:flex ui:items-center ui:gap-1 ui:overflow-hidden",
    "ui:border-transparent ui:px-2 ui:py-0 ui:text-[11px] ui:font-medium ui:leading-[normal] ui:tracking-normal",
    "ui:min-w-0",
  ],
  {
    variants: {
      continuesLeft: {
        true: "ui:rounded-l-none",
        false: "ui:rounded-l-[4px]",
      },
      continuesRight: {
        true: "ui:rounded-r-none",
        false: "ui:rounded-r-[4px]",
      },
      interactive: {
        true: "ui:cursor-pointer ui:hover:brightness-95",
        false: "",
      },
    },
    defaultVariants: {
      continuesLeft: false,
      continuesRight: false,
      interactive: false,
    },
  },
);
