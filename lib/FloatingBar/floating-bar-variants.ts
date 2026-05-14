import { cva } from "class-variance-authority";

export const floatingBarVariants = cva([
  "malbec-font-sans",
  "ui:inline-flex ui:items-center ui:gap-4",
  "ui:rounded-[10px] ui:border ui:border-background-300",
  "ui:bg-background-200 ui:text-text-default",
  "ui:px-5 ui:py-2",
  "ui:shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
  "ui:data-[state=open]:animate-malbec-floating-bar-in",
  "ui:data-[state=closed]:animate-malbec-floating-bar-out",
  "ui:data-[state=closed]:pointer-events-none",
]);

export const floatingBarCountVariants = cva([
  "ui:inline-flex ui:items-center ui:shrink-0",
  "ui:text-[13px] ui:font-medium ui:leading-[1.3] ui:tracking-[-0.48px]",
  "ui:text-text-default ui:whitespace-nowrap",
  "ui:[&>strong]:font-bold ui:[&>b]:font-bold",
]);

export const floatingBarActionsVariants = cva([
  "ui:inline-flex ui:items-center ui:gap-2 ui:shrink-0",
]);

export const floatingBarTriggerVariants = cva(
  [
    "ui:inline-flex ui:items-center ui:justify-center ui:gap-[5px]",
    "ui:rounded-[7px] ui:px-[10px] ui:py-[10px]",
    "ui:text-text-default",
    "ui:text-[13px] ui:font-medium ui:leading-[1.3] ui:tracking-[-0.48px]",
    "ui:whitespace-nowrap ui:select-none ui:cursor-pointer",
    "ui:transition-[background-color,opacity,box-shadow]",
    "ui:outline-none",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-1 ui:focus-visible:ring-offset-background-200",
    "ui:active:opacity-80",
    "ui:disabled:opacity-50 ui:disabled:pointer-events-none",
  ],
  {
    variants: {
      emphasis: {
        default: [
          "ui:bg-transparent",
          "ui:hover:bg-background-100",
          "ui:focus-visible:bg-background-100",
        ],
        strong: [
          "ui:bg-background-100",
          "ui:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_1.2px_rgba(0,0,0,0.2)]",
          "ui:hover:opacity-90",
        ],
      },
    },
    defaultVariants: {
      emphasis: "default",
    },
  },
);

export type FloatingBarTriggerEmphasis = "default" | "strong";

export const floatingBarTriggerIconVariants = cva([
  "ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center",
  "ui:size-[14px]",
  "ui:[&>svg]:size-full",
]);

export const floatingBarTriggerTextVariants = cva([
  "ui:inline-block ui:truncate",
]);

export const floatingBarCloseVariants = cva([
  "ui:inline-flex ui:items-center ui:justify-center ui:shrink-0",
  "ui:size-[12px] ui:p-0",
  "ui:bg-transparent ui:text-text-default ui:cursor-pointer",
  "ui:outline-none ui:rounded-[2px]",
  "ui:transition-opacity",
  "ui:hover:opacity-70 ui:active:opacity-60",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-1 ui:focus-visible:ring-offset-background-200",
  "ui:[&>svg]:size-full",
]);
