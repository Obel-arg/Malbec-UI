import { cva, type VariantProps } from "class-variance-authority";

export const datePickerTriggerVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex ui:h-9 ui:w-full ui:items-center ui:rounded-md ui:border ui:border-background-300",
    "ui:bg-background-100 ui:px-4 ui:py-2 ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
    "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
    "ui:outline-none ui:transition-[opacity,box-shadow]",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
    "ui:disabled:pointer-events-none ui:disabled:opacity-50",
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
