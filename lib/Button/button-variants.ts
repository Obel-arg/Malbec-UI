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
    "ui:focus-visible:ring-primary",
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
        secondary:
          "ui:bg-background-300 ui:text-primary ui:hover:opacity-90 ui:active:opacity-80",
        ghost:
          "ui:bg-transparent ui:text-primary ui:hover:bg-background-300/60 ui:active:bg-background-300",
        outline:
          "ui:border-[1.5px] ui:border-primary ui:bg-transparent ui:text-primary ui:hover:bg-primary/10 ui:active:bg-primary/15",
        destructive:
          "ui:bg-destructive ui:text-destructive-foreground ui:hover:opacity-90 ui:active:opacity-80",
        link: "ui:bg-transparent ui:text-primary ui:underline-offset-4 ui:hover:underline",
        /** A full-width, left-aligned row inside a list or popover (pick an item, add a credit…). */
        row: "ui:w-full ui:justify-start ui:bg-transparent ui:font-normal ui:text-text-default ui:hover:bg-background-200 ui:active:bg-background-300",
      },
      /**
       * `neutral` (the default) keeps `outline`, `ghost` and `secondary` grey: malbec-ux-ui keeps
       * brand colour for the primary CTA and for state. `brand` paints their text and border in
       * the brand colour, as in 1.x.
       */
      tone: {
        brand: "",
        neutral: "ui:focus-visible:ring-malbec-icon",
      },
      size: {
        sm: "ui:h-8 ui:px-2 ui:py-[6px] ui:text-[10px] ui:leading-4 ui:tracking-[-0.3px]",
        md: "ui:h-9 ui:px-4 ui:py-[6px] ui:text-[12px] ui:leading-5",
        lg: "ui:h-9 ui:px-4 ui:py-2 ui:text-[12px] ui:leading-5",
        icon: "ui:h-9 ui:w-9 ui:p-0 ui:text-[12px]",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        tone: "neutral",
        class:
          "ui:border-background-300 ui:text-text-default ui:hover:bg-background-200 ui:active:bg-background-300",
      },
      {
        variant: "ghost",
        tone: "neutral",
        class: "ui:text-text-default ui:hover:bg-background-200 ui:active:bg-background-300",
      },
      { variant: "secondary", tone: "neutral", class: "ui:text-text-default" },
      // Rows size to their content; this goes last so it beats the size geometry.
      { variant: "row", class: "ui:h-auto ui:px-2 ui:py-1.5" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      tone: "neutral",
    },
  },
);

export const buttonIconVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center ui:[&>svg]:size-full",
  {
    variants: {
      size: {
        sm: "ui:size-3",
        md: "ui:size-4",
        lg: "ui:size-4",
        icon: "ui:size-5",
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
        sm: "ui:size-3",
        md: "ui:size-4",
        lg: "ui:size-4",
        icon: "ui:size-5",
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
export type ButtonTone = NonNullable<VariantProps<typeof buttonVariants>["tone"]>;
