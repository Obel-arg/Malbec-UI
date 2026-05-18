import { cva, type VariantProps } from "class-variance-authority";

export const datePickerTriggerVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex ui:h-9 ui:w-full ui:items-center ui:rounded-md",
    "ui:bg-background-100 ui:px-4 ui:py-2 ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
    "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
    "ui:outline-none ui:transition-[opacity,box-shadow]",
    "ui:focus-visible:ring-1 ui:focus-visible:ring-background-300",
    // Keep the ring visible while the popover is open — Radix moves focus into
    // the calendar so the trigger no longer matches `:focus-visible`.
    "ui:aria-expanded:ring-1 ui:aria-expanded:ring-background-300",
    "ui:aria-invalid:focus-visible:ring-0",
    "ui:aria-invalid:aria-expanded:ring-0",
    "ui:cursor-pointer",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:pointer-events-none ui:disabled:opacity-50",
    /** Invalid state — set by callers via `aria-invalid` on the trigger button. */
    "ui:aria-invalid:outline-1",
    "ui:aria-invalid:outline-solid",
    "ui:aria-invalid:outline-destructive",
    "ui:aria-invalid:outline-offset-0",
  ],
  {
    variants: {
      state: {
        closed: "",
        open: "",
        "date-range": "",
        preset: "",
        birth: "",
      },
    },
    defaultVariants: {
      state: "closed",
    },
  },
);

export const datePickerLeadingIconVariants = cva(
  "ui:mr-2 ui:inline-flex ui:size-4 ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default",
);

export const datePickerTrailingIconVariants = cva(
  "ui:ml-2 ui:inline-flex ui:size-4 ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default ui:opacity-50",
);

export const datePickerTriggerTextVariants = cva(
  "ui:min-w-0 ui:flex-1 ui:truncate ui:text-left ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
);

export type DatePickerState = NonNullable<
  VariantProps<typeof datePickerTriggerVariants>["state"]
>;
