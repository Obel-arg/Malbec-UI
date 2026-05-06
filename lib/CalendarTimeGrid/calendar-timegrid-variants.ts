import { cva } from "class-variance-authority";

export const calendarTimeGridRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:w-full ui:flex-col ui:overflow-hidden",
  "ui:rounded-xl ui:border ui:border-[#e0e0e0] ui:bg-[#f9f9f9]",
  "ui:shadow-[0_2px_12px_0_rgba(0,0,0,0.07)]",
]);

export const calendarTimeGridHeaderRowVariants = cva(
  "ui:flex ui:min-h-11 ui:shrink-0 ui:border-b ui:border-[#e0e0e0] ui:bg-[#f0f0f0]",
);

export const calendarTimeGridGutterHeaderVariants = cva(
  "ui:flex ui:w-14 ui:shrink-0 ui:items-end ui:justify-end ui:border-r ui:border-[#e0e0e0] ui:pb-1 ui:pr-2 ui:pt-2",
);

export const calendarTimeGridDayHeaderVariants = cva(
  [
    "ui:flex ui:flex-1 ui:flex-row ui:items-center ui:justify-center ui:gap-1 ui:border-r ui:border-[#e0e0e0] ui:px-1 ui:py-2",
    "ui:text-[11px] ui:font-medium ui:uppercase ui:leading-none ui:tracking-normal",
  ],
  {
    variants: {
      isToday: {
        true: "ui:text-[#333333]",
        false: "ui:text-[#a0a0a0]",
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
  "ui:flex ui:min-h-0 ui:flex-1 ui:overflow-hidden",
);

export const calendarTimeGridTimeGutterVariants = cva(
  "ui:relative ui:w-14 ui:shrink-0 ui:border-r ui:border-[#e0e0e0] ui:bg-[#f9f9f9]",
);

export const calendarTimeGridTimeLabelVariants = cva(
  "ui:absolute ui:right-2 ui:-translate-y-1/2 ui:text-right ui:text-[11px] ui:font-normal ui:uppercase ui:leading-none ui:text-[#a0a0a0]",
);

export const calendarTimeGridColumnVariants = cva(
  [
    "ui:relative ui:min-w-0 ui:flex-1 ui:border-r ui:border-[#e0e0e0] ui:bg-[#f9f9f9]",
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
  "ui:inline-flex ui:size-6 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full ui:bg-primary ui:text-[12px] ui:font-semibold ui:leading-none ui:tabular-nums ui:text-primary-foreground ui:normal-case",
);
