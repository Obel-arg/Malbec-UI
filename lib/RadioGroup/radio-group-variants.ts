import { cva } from "class-variance-authority";

/** Vertical stack spacing between items (Figma gap-2). */
export const radioGroupRootVariants = cva([
  "malbec-font-sans",
  "ui:flex",
  "ui:flex-col",
  "ui:gap-2",
]);

/**
 * 16×16px circular control: background-100 fill (Figma surface), 1px primary
 * border. Checked: radial-gradient (5px radius = 10px dot, then background-100
 * to the inner edge) so the disk is geometrically centered, not a nested span.
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
  "ui:cursor-pointer",
  "ui:rounded-full",
  "ui:border",
  "ui:border-solid",
  "ui:border-primary",
  "ui:bg-background-100",
  "ui:p-0",
  "ui:m-0",
  "ui:appearance-none",
  "ui:text-primary",
  "ui:outline-none",
  "ui:data-[state=checked]:bg-[radial-gradient(circle_at_center,var(--color-primary)_0,var(--color-primary)_5px,var(--color-background-100)_5px)]",
  "ui:transition-[color,background-color,border-color,opacity,box-shadow]",
  "ui:focus-visible:ring-2",
  "ui:focus-visible:ring-primary",
  "ui:focus-visible:ring-offset-2",
  "ui:focus-visible:ring-offset-background-100",
  "ui:disabled:cursor-not-allowed",
  "ui:disabled:pointer-events-none",
  "ui:disabled:opacity-50",
  "ui:aria-invalid:outline-2",
  "ui:aria-invalid:outline-solid",
  "ui:aria-invalid:outline-destructive",
  "ui:aria-invalid:outline-offset-0",
]);

/** Kept for Radix Presence; fill is drawn on the item via radial-gradient. */
export const radioGroupIndicatorVariants = cva(["ui:hidden"]);

/**
 * Card-style option: 6px radius, 2px border, padding 16px, gap 12px between icon and label.
 */
export const radioGroupCardVariants = cva(
  [
    "malbec-font-sans",
    "ui:box-border",
    "ui:inline-flex",
    "ui:cursor-pointer",
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
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:pointer-events-none",
    "ui:disabled:opacity-50",
    "ui:data-[state=checked]:border-primary",
    "ui:aria-invalid:outline-2",
    "ui:aria-invalid:outline-solid",
    "ui:aria-invalid:outline-destructive",
    "ui:aria-invalid:outline-offset-0",
  ],
);
