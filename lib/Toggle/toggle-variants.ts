import { cva, type VariantProps } from "class-variance-authority";

/**
 * Figma: Toggle/Default, Toggle/Outline, size rows (h-9, h-10, h-11), Toggle/Disabled.
 * `data-state=on` / hover: neutral mapping for a11y — not a separate Figma state.
 */
export const toggleVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex ui:items-center ui:justify-center",
    "ui:rounded-[6px]",
    "ui:transition-[background-color,border-color,color,opacity]",
    "ui:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:opacity-50",
    "ui:disabled:pointer-events-none",
    "ui:hover:bg-background-300/60",
    "ui:text-text-default-muted",
    "ui:hover:text-text-default",
    "ui:data-[state=on]:bg-background-300",
    "ui:data-[state=on]:text-primary",
  ],
  {
    variants: {
      variant: {
        default: "ui:border-transparent",
        outline: "ui:border ui:border-solid ui:border-background-300",
      },
      size: {
        sm: "ui:h-9 ui:px-[10px] ui:py-2",
        md: "ui:h-10 ui:px-3 ui:py-2",
        lg: "ui:h-11 ui:px-5 ui:py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const toggleIconVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:size-4 ui:items-center ui:justify-center ui:[&>svg]:size-full",
);

export type ToggleVariant = NonNullable<
  VariantProps<typeof toggleVariants>["variant"]
>;
export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>["size"]>;
