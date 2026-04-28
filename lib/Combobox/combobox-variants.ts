import { cva, type VariantProps } from "class-variance-authority";
import { popoverSurfaceMotionClasses } from "../Popover/popover-variants";

/** Closed trigger / anchor row — matches design system combobox field. */
export const comboboxTriggerRowVariants = cva(
  [
    "malbec-font-sans",
    "ui:relative",
    "ui:flex",
    "ui:h-10",
    "ui:w-full",
    "ui:min-w-0",
    "ui:max-w-full",
    "ui:items-center",
    "ui:justify-between",
    "ui:gap-2",
    "ui:rounded-md",
    "ui:bg-background-100",
    "ui:px-4",
    "ui:py-2",
    "ui:text-sm",
    "ui:font-normal",
    "ui:leading-tight",
    "ui:text-text-default",
    "ui:outline-none",
    "ui:transition-[color,box-shadow,opacity]",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:cursor-pointer",
    "ui:data-disabled:cursor-not-allowed",
    "ui:data-disabled:pointer-events-none",
    "ui:data-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
        invalid:
          "ui:ring-2 ui:ring-destructive ui:ring-offset-2 ui:ring-offset-background-100",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type ComboboxTriggerRowVariant = NonNullable<
  VariantProps<typeof comboboxTriggerRowVariants>["variant"]
>;

/** Filter row inside the popover (search). */
export const comboboxFilterRowVariants = cva(
  [
    "malbec-font-sans",
    "ui:relative",
    "ui:flex",
    "ui:w-full",
    "ui:items-center",
    "ui:border-b",
    "ui:border-background-200",
    "ui:py-2",
    "ui:pl-8",
    "ui:pr-3",
    "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
    "ui:rounded-t-md",
  ],
  {
    variants: {
      tone: {
        default: "ui:bg-background-100",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export const comboboxFilterInputVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex-1",
    "ui:min-w-0",
    "ui:border-0",
    "ui:bg-transparent",
    "ui:p-0",
    "ui:text-sm",
    "ui:font-normal",
    "ui:leading-tight",
    "ui:text-text-default",
    "ui:outline-none",
    "ui:placeholder:text-text-default-muted",
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxContentVariants = cva(
  [
    "malbec-font-sans",
    "ui:box-border",
    "ui:z-50",
    "ui:overflow-hidden",
    "ui:rounded-md",
    "ui:bg-background-100",
    "ui:text-text-default",
    "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
    "ui:origin-(--radix-popover-content-transform-origin)",
    ...popoverSurfaceMotionClasses,
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxListVariants = cva(
  [
    "malbec-font-sans",
    "ui:max-h-[min(280px,var(--radix-popover-content-available-height))]",
    "ui:overflow-y-auto",
    "ui:p-1",
    "ui:outline-none",
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxItemVariants = cva(
  [
    "malbec-font-sans",
    "ui:relative",
    "ui:flex",
    "ui:w-full",
    "ui:cursor-pointer",
    "ui:select-none",
    "ui:items-center",
    "ui:justify-center",
    "ui:rounded-sm",
    "ui:px-2",
    "ui:py-1.5",
    "ui:text-sm",
    "ui:font-normal",
    "ui:leading-tight",
    "ui:text-text-default",
    "ui:outline-none",
    "ui:data-disabled:cursor-not-allowed",
    "ui:data-disabled:pointer-events-none",
    "ui:data-disabled:opacity-50",
    "ui:data-highlighted:bg-background-200",
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxEmptyVariants = cva(
  [
    "malbec-font-sans",
    "ui:px-2",
    "ui:py-6",
    "ui:text-center",
    "ui:text-sm",
    "ui:text-text-default-muted",
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxSeparatorVariants = cva(
  ["ui:-mx-1", "ui:my-1", "ui:h-px", "ui:bg-background-200"],
  { variants: {}, defaultVariants: {} },
);

export const comboboxGroupLabelVariants = cva(
  [
    "malbec-font-sans",
    "ui:px-2",
    "ui:py-1.5",
    "ui:text-xs",
    "ui:font-medium",
    "ui:text-text-default-muted",
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxChipVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex",
    "ui:max-w-full",
    "ui:items-center",
    "ui:gap-1",
    "ui:rounded-sm",
    "ui:border",
    "ui:border-background-300",
    "ui:bg-background-200",
    "ui:px-2",
    "ui:py-1",
    "ui:text-xs",
    "ui:font-medium",
    "ui:text-text-default",
  ],
  { variants: {}, defaultVariants: {} },
);
