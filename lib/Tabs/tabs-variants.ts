import { cva } from "class-variance-authority";

/** Segmented list: 40px row, bg-200, 4px inset padding, 6px radius (Malbec OS Tabs). */
export const tabsListVariants = cva([
  "malbec-font-sans",
  "ui:inline-flex",
  "ui:h-10",
  "ui:w-fit",
  "ui:max-w-full",
  "ui:shrink-0",
  "ui:self-start",
  "ui:items-center",
  "ui:justify-start",
  "ui:rounded-[6px]",
  "ui:bg-background-200",
  "ui:p-1",
  "ui:text-text-default-muted",
]);

export const tabsTriggerVariants = cva([
  "malbec-font-sans",
  "ui:inline-flex",
  "ui:shrink-0",
  "ui:items-center",
  "ui:justify-center",
  "ui:gap-2",
  "ui:whitespace-nowrap",
  "ui:rounded-[4px]",
  "ui:px-3",
  "ui:py-1.5",
  "ui:text-muted-medium",
  "ui:text-text-default",
  "ui:tracking-[-0.42px]",
  "ui:transition-[color,background-color,box-shadow]",
  "ui:outline-none",
  "ui:focus-visible:ring-2",
  "ui:focus-visible:ring-primary",
  "ui:focus-visible:ring-offset-2",
  "ui:focus-visible:ring-offset-background-100",
  "ui:disabled:pointer-events-none",
  "ui:disabled:opacity-50",
  "ui:data-[state=active]:bg-background-100",
  "ui:data-[state=active]:shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]",
]);

/** Panel below triggers; frame does not specify panel chrome — neutral focus ring only. */
export const tabsContentVariants = cva([
  "malbec-font-sans",
  "ui:mt-2",
  "ui:text-sm",
  "ui:text-text-default",
  "ui:outline-none",
  "ui:focus-visible:ring-2",
  "ui:focus-visible:ring-primary",
  "ui:focus-visible:ring-offset-2",
  "ui:focus-visible:ring-offset-background-100",
]);
