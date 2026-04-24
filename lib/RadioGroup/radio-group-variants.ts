import { cva } from "class-variance-authority";

/** Vertical stack spacing between items (Figma gap-2). */
export const radioGroupRootVariants = cva([
  "malbec-font-sans",
  "ui:flex",
  "ui:flex-col",
  "ui:gap-2",
]);

/**
 * 16×16px circular control: foreground fill, 1px primary border, 12px inner
 * primary dot when checked (leaves a 1px gap to the border).
 */
export const radioGroupItemVariants = cva([
  "malbec-font-sans",
  "ui:box-border",
  "ui:relative",
  "ui:aspect-square",
  "ui:size-4",
  "ui:min-h-4",
  "ui:min-w-4",
  "ui:shrink-0",
  "ui:rounded-full",
  "ui:border",
  "ui:border-solid",
  "ui:border-primary",
  "ui:bg-foreground",
  "ui:p-0",
  "ui:m-0",
  "ui:appearance-none",
  "ui:text-primary",
  "ui:outline-none",
  "ui:transition-[color,background-color,border-color,opacity,box-shadow]",
  "ui:focus-visible:ring-2",
  "ui:focus-visible:ring-primary",
  "ui:focus-visible:ring-offset-2",
  "ui:focus-visible:ring-offset-background-100",
  "ui:disabled:pointer-events-none",
  "ui:disabled:opacity-50",
  "ui:aria-invalid:border-destructive",
  "ui:aria-invalid:ring-2",
  "ui:aria-invalid:ring-destructive/40",
  "ui:aria-invalid:ring-offset-2",
  "ui:aria-invalid:ring-offset-background-100",
]);

export const radioGroupIndicatorVariants = cva([
  "ui:pointer-events-none",
  "ui:absolute",
  "ui:left-1/2",
  "ui:top-1/2",
  "ui:-translate-x-1/2",
  "ui:-translate-y-1/2",
]);

/** Inner filled circle shown when checked. */
export const radioGroupDotVariants = cva([
  "ui:block",
  "ui:size-3",
  "ui:shrink-0",
  "ui:rounded-full",
  "ui:bg-primary",
]);

/**
 * Card-style option: 6px radius, 2px border, padding 16px, gap 12px between icon and label.
 */
export const radioGroupCardVariants = cva(
  [
    "malbec-font-sans",
    "ui:box-border",
    "ui:inline-flex",
    "ui:w-full",
    "ui:min-w-0",
    "ui:flex-col",
    "ui:items-center",
    "ui:justify-center",
    "ui:gap-3",
    "ui:rounded-[6px]",
    "ui:border-2",
    "ui:border-solid",
    "ui:border-background-300",
    "ui:bg-background-100",
    "ui:p-4",
    "ui:text-center",
    "ui:text-sm",
    "ui:leading-tight",
    "ui:text-text-default",
    "ui:outline-none",
    "ui:transition-[border-color,opacity,box-shadow]",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:pointer-events-none",
    "ui:disabled:opacity-50",
    "ui:data-[state=checked]:border-primary",
    "ui:aria-invalid:border-destructive",
    "ui:aria-invalid:ring-2",
    "ui:aria-invalid:ring-destructive/40",
    "ui:aria-invalid:ring-offset-2",
    "ui:aria-invalid:ring-offset-background-100",
  ],
);
