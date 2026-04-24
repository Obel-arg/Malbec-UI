import { cva, type VariantProps } from "class-variance-authority";

/** Backdrop: dim + frosted glass over the page (not in the Figma card spec). */
export const alertDialogOverlayVariants = cva(
  [
    "ui:fixed ui:inset-0 ui:z-50",
    "ui:bg-background-200/60",
    "ui:backdrop-blur-[3.5px]",
    "ui:transition-opacity",
  ],
);

/**
 * Figma: Malbec OS Alert Dialog (node 56:608) — 512px max, 24px padding, 16px main gap,
 * 8px title→description, 8px between footer buttons, 8px radius, soft shadow.
 */
export const alertDialogContentVariants = cva(
  [
    "ui:malbec-font-sans",
    "ui:fixed ui:top-1/2 ui:left-1/2 ui:z-50",
    "ui:grid ui:w-full ui:translate-x-[-50%] ui:translate-y-[-50%]",
    "ui:gap-4",
    "ui:rounded-lg",
    "ui:border ui:border-background-300/30",
    "ui:bg-background-100",
    "ui:p-6",
    "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
    "ui:transition-[opacity,transform] ui:duration-200",
  ],
  {
    variants: {
      size: {
        default: "ui:max-w-lg",
        // Compact dialog: Figma / mobile — more rounded panel, full-width footer stack, primary on top
        sm: "ui:max-w-sm ui:gap-4 ui:rounded-xl ui:p-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const alertDialogHeaderVariants = cva(
  "ui:flex ui:flex-col ui:items-stretch ui:gap-0 ui:text-left",
);

export const alertDialogFooterVariants = cva("ui:w-full", {
  variants: {
    size: {
      /** 56:608: cancel + action in a row, end-aligned */
      default:
        "ui:flex ui:flex-row ui:items-center ui:justify-end ui:gap-2",
      /** Stacked full-width: put `<Action/>` first, then `<Cancel/>` in markup (primary on top) */
      sm: "ui:flex ui:w-full ui:flex-col ui:gap-2",
    },
  },
  defaultVariants: { size: "default" },
});

export const alertDialogTitleVariants = cva(
  "ui:text-left ui:font-semibold ui:text-text-default",
  {
    variants: {
      size: {
        default: "ui:text-[18px] ui:leading-7",
        sm: "ui:text-base ui:leading-6",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export const alertDialogDescriptionVariants = cva(
  "ui:text-left ui:text-sm ui:leading-5",
  {
    variants: {
      size: {
        default: "ui:pt-2 ui:text-text-default",
        sm: "ui:pt-1.5 ui:text-text-default-muted",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export const alertDialogMediaVariants = cva(
  "ui:mb-4 ui:flex ui:shrink-0 ui:items-center ui:justify-center",
);

/** Figma “Button Outline” — border background-300, fill background-100, neutral text. */
export const alertDialogCancelVariants = cva(
  [
    "ui:malbec-font-sans",
    "ui:inline-flex ui:items-center ui:justify-center",
    "ui:shrink-0",
    "ui:rounded-lg ui:border-[1.5px] ui:border-background-300",
    "ui:bg-background-100",
    "ui:px-4 ui:py-[6px]",
    "ui:text-sm ui:font-medium ui:leading-5 ui:tracking-[-0.3px] ui:text-text-default",
    "ui:whitespace-nowrap",
    "ui:outline-none ui:transition-[opacity,background-color,border-color]",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
  ],
  {
    variants: {
      size: {
        default: "",
        sm: "ui:w-full ui:shrink-0 ui:px-3 ui:py-2 ui:whitespace-normal",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/** Figma “Button Primary” in the frame (primary fill, 14px medium). */
export const alertDialogActionVariants = cva(
  [
    "ui:malbec-font-sans",
    "ui:inline-flex ui:items-center ui:justify-center",
    "ui:shrink-0",
    "ui:rounded-lg",
    "ui:px-4 ui:py-2",
    "ui:text-sm ui:font-medium ui:leading-5",
    "ui:whitespace-nowrap",
    "ui:outline-none ui:transition-[opacity,background-color]",
    "ui:hover:opacity-90 ui:active:opacity-80",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
  ],
  {
    variants: {
      variant: {
        default: "ui:bg-primary ui:text-primary-foreground",
        destructive: "ui:bg-destructive ui:text-destructive-foreground",
      },
      size: {
        default: "ui:min-w-18",
        sm: "ui:w-full ui:min-w-0 ui:justify-center ui:py-2.5 ui:whitespace-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type AlertDialogSize = NonNullable<
  VariantProps<typeof alertDialogContentVariants>["size"]
>;

export type AlertDialogActionVariant = NonNullable<
  VariantProps<typeof alertDialogActionVariants>["variant"]
>;
