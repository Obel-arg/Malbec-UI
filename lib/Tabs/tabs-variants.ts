import { cva } from "class-variance-authority";

/**
 * `underline` is kept so apps don't break, but since 3.0 it renders exactly like `opacity`
 * (chosen in the 3.0 workshop): no rail and no indicator; the active tab at 100%, the rest at 40%.
 */
export type TabsVariant = "segmented" | "underline" | "opacity";

const opacityListClass = "ui:h-auto ui:gap-6 ui:rounded-none ui:bg-transparent ui:p-0";
const opacityTriggerClass =
  "ui:rounded-none ui:px-1 ui:py-3 ui:text-sm ui:font-medium ui:text-text-default ui:opacity-40 ui:transition-opacity ui:hover:opacity-70 ui:data-[state=active]:opacity-100";

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
        /** malbec-ux-ui: 40px track, 6px radius. */
        segmented: "ui:h-10 ui:rounded-[6px] ui:bg-background-200 ui:p-1",
        /** Same as `opacity` since 3.0. */
        underline: opacityListClass,
        /** Screen-level tabs (malbec-ux-ui): no line, no track; the active one at 100%, the rest at 40%. */
        opacity: opacityListClass,
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
    // Neutral focus ring: a brand ring stays lit on the tab you just clicked.
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-background-300",
    "ui:cursor-pointer",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:pointer-events-none",
    "ui:disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        segmented:
          "ui:h-full ui:rounded-[4px] ui:px-3 ui:py-1.5 ui:font-medium ui:text-text-default ui:data-[state=active]:bg-background-100 ui:data-[state=active]:shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]",
        /** Same as `opacity` since 3.0. */
        underline: opacityTriggerClass,
        opacity: opacityTriggerClass,
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
  "ui:focus-visible:ring-focus",
  "ui:focus-visible:ring-offset-2",
  "ui:focus-visible:ring-offset-background-100",
]);
