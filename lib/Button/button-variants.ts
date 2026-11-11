import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex ui:items-center ui:justify-center",
    "ui:gap-2",
    "ui:rounded-[8px]",
    "ui:font-medium",
    "ui:tracking-[-0.36px]",
    "ui:whitespace-nowrap",
    "ui:select-none",
    "ui:cursor-pointer",
    "ui:transition-[opacity,background-color,border-color,color]",
    "ui:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-focus",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:opacity-50",
    "ui:disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "ui:bg-primary ui:text-primary-foreground ui:font-semibold ui:hover:opacity-90 ui:active:opacity-80",
        /** `secondary`, `ghost` and `outline` are grey: malbec-ux-ui keeps brand colour for the primary CTA. */
        secondary:
          "ui:bg-background-300 ui:text-text-default ui:hover:opacity-90 ui:active:opacity-80",
        ghost:
          "ui:bg-transparent ui:text-text-default ui:hover:bg-background-200 ui:active:bg-background-300",
        outline:
          "ui:border-[1.5px] ui:border-background-300 ui:bg-transparent ui:text-text-default ui:hover:bg-background-200 ui:active:bg-background-300",
        destructive:
          "ui:bg-destructive ui:text-destructive-foreground ui:hover:opacity-90 ui:active:opacity-80",
        link: "ui:bg-transparent ui:text-primary ui:underline-offset-4 ui:hover:underline",
        /** A full-width, left-aligned row inside a list or popover (pick an item, add a credit…). */
        row: "ui:w-full ui:justify-start ui:bg-transparent ui:font-normal ui:text-text-default ui:hover:bg-background-200 ui:active:bg-background-300",
      },
      size: {
        /**
         * @deprecated malbec-ux-ui never pairs `sm` with text, so it renders as `md`. For a compact
         * icon-only button use `icon-sm`.
         */
        sm: "ui:h-9 ui:px-4 ui:py-[6px] ui:text-[12px] ui:leading-5",
        md: "ui:h-9 ui:px-4 ui:py-[6px] ui:text-[12px] ui:leading-5",
        lg: "ui:h-9 ui:px-4 ui:py-2 ui:text-[12px] ui:leading-5",
        icon: "ui:h-9 ui:w-9 ui:p-0 ui:text-[12px]",
        /** 32px square for compact icon-only buttons (calendar arrows, toolbars). */
        "icon-sm": "ui:h-8 ui:w-8 ui:p-0 ui:text-[12px]",
      },
    },
    compoundVariants: [
      // Rows size to their content; this goes last so it beats the size geometry.
      { variant: "row", class: "ui:h-auto ui:px-2 ui:py-1.5" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export const buttonIconVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center ui:[&>svg]:size-full",
  {
    variants: {
      size: {
        sm: "ui:size-4",
        md: "ui:size-4",
        lg: "ui:size-4",
        icon: "ui:size-5",
        "icon-sm": "ui:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const buttonTextVariants = cva("ui:inline-block ui:truncate");

export const buttonSpinnerWrapperVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center",
  {
    variants: {
      size: {
        sm: "ui:size-4",
        md: "ui:size-4",
        lg: "ui:size-4",
        icon: "ui:size-5",
        "icon-sm": "ui:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;
/** @deprecated 2.0 removed the brand tone; `neutral` is the only look and has no effect. */
export type ButtonTone = "neutral";
