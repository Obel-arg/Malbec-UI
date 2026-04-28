import { cva } from "class-variance-authority";

export type TabsVariant = "segmented" | "underline";

/** Supports segmented tabs and underline navigation tabs. */
export const tabsListVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex",
    "ui:w-fit",
    "ui:max-w-full",
    "ui:shrink-0",
    "ui:self-start",
    "ui:items-center",
    "ui:justify-start",
    "ui:text-text-default-muted",
  ],
  {
    variants: {
      variant: {
        segmented: "ui:h-10 ui:rounded-[8px] ui:bg-background-200 ui:p-1",
        underline:
          "ui:h-11 ui:gap-4 ui:rounded-none ui:border-b ui:border-background-300 ui:bg-transparent ui:p-0",
      },
    },
    defaultVariants: {
      variant: "segmented",
    },
  },
);

export const tabsTriggerVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex",
    "ui:shrink-0",
    "ui:items-center",
    "ui:justify-center",
    "ui:gap-2",
    "ui:whitespace-nowrap",
    "ui:text-muted-medium",
    "ui:tracking-[-0.42px]",
    "ui:transition-[color,background-color,box-shadow,border-color]",
    "ui:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:cursor-pointer",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:pointer-events-none",
    "ui:disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        segmented:
          "ui:h-full ui:rounded-[6px] ui:px-2.5 ui:py-0 ui:font-normal ui:text-text-default ui:data-[state=active]:bg-background-100 ui:data-[state=active]:shadow-[0_1px_2px_0_rgba(0,0,0,0.04)]",
        underline:
          "ui:relative ui:-mb-px ui:rounded-none ui:px-1 ui:py-3 ui:text-sm ui:font-medium ui:text-text-default-muted ui:hover:text-text-default ui:after:pointer-events-none ui:after:absolute ui:after:left-0 ui:after:right-0 ui:after:-bottom-px ui:after:h-[3px] ui:after:bg-background-300 ui:after:opacity-0 ui:after:content-[''] ui:data-[state=active]:text-text-default ui:data-[state=active]:after:opacity-100",
      },
    },
    defaultVariants: {
      variant: "segmented",
    },
  },
);

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
