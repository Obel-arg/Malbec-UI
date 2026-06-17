import { cva } from "class-variance-authority";

export const calendarMonthRootVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex ui:w-full ui:flex-col ui:overflow-hidden",
    "ui:rounded-xl ui:border ui:border-sidebar-border ui:bg-background-100",
    "ui:shadow-[0_2px_12px_0_rgba(0,0,0,0.07)]",
  ],
);

export const calendarMonthHeaderRowVariants = cva(
  "ui:flex ui:h-10 ui:shrink-0 ui:border-b ui:border-sidebar-border ui:bg-background-200",
);

export const calendarMonthHeaderCellVariants = cva(
  [
    "ui:flex ui:flex-1 ui:items-center ui:justify-center",
    "ui:border-r ui:border-sidebar-border",
    "ui:text-[11px] ui:font-medium ui:uppercase ui:leading-[normal] ui:text-[#a6a6ad]",
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

export const calendarMonthWeekRowVariants = cva(
  "ui:relative ui:flex ui:min-h-[140px] ui:shrink-0",
);

/** Pointer-event-transparent absolute layer used to draw span (multi-day) bars across day cells. */
export const calendarMonthSpanOverlayVariants = cva(
  "ui:pointer-events-none ui:absolute ui:inset-0 ui:z-10",
);

/**
 * Span bar visual. Outer corners flatten when the bar continues into the
 * previous/next week (mirrors Google Calendar's multi-week treatment).
 */
export const calendarMonthSpanBarVariants = cva(
  [
    "ui:pointer-events-auto ui:absolute ui:flex ui:items-center ui:gap-1 ui:overflow-hidden",
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

export const calendarMonthDayCellVariants = cva(
  [
    "ui:relative ui:box-border ui:flex ui:min-w-0 ui:flex-1 ui:flex-col ui:items-stretch",
    "ui:gap-1 ui:overflow-hidden ui:border-r ui:border-t ui:border-sidebar-border ui:p-2",
    "ui:bg-background-100",
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

export const calendarMonthDayNumberRowVariants = cva(
  "ui:flex ui:h-5 ui:shrink-0 ui:items-center ui:justify-between",
);

export const calendarMonthDayNumberTextVariants = cva(
  "ui:text-[12px] ui:font-medium ui:leading-[normal] ui:text-[#1a1a1f]",
  {
    variants: {
      isOutside: {
        true: "ui:font-normal ui:text-[#a6a6ad]",
        false: "",
      },
    },
    defaultVariants: { isOutside: false },
  },
);

export const calendarMonthTodayIndicatorVariants = cva(
  "ui:inline-flex ui:size-6 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full ui:bg-primary ui:text-[12px] ui:font-semibold ui:leading-[normal] ui:text-primary-foreground",
);

export const calendarMonthEventsStackVariants = cva(
  "ui:flex ui:min-w-0 ui:w-full ui:flex-1 ui:flex-col ui:gap-1",
);
