import { cva } from "class-variance-authority";

/**
 * Checkbox control: 16×16px, 4px corner radius, primary border when unchecked,
 * primary fill and contrasting check when checked, reduced opacity when disabled.
 */
export const checkboxRootVariants = cva(
  [
    "malbec-font-sans",
    "ui:group",
    "ui:inline-flex",
    "ui:size-4",
    "ui:shrink-0",
    "ui:items-center",
    "ui:justify-center",
    "ui:rounded-[4px]",
    "ui:border",
    "ui:border-solid",
    "ui:border-primary",
    "ui:bg-background-100",
    "ui:text-primary-foreground",
    "ui:outline-none",
    "ui:transition-[color,background-color,border-color,opacity,box-shadow]",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:pointer-events-none",
    "ui:disabled:opacity-50",
    "ui:data-[state=checked]:bg-primary",
    "ui:data-[state=checked]:border-primary",
    "ui:data-[state=indeterminate]:bg-primary",
    "ui:data-[state=indeterminate]:border-primary",
    "ui:aria-invalid:border-destructive",
    "ui:aria-invalid:ring-2",
    "ui:aria-invalid:ring-destructive/40",
    "ui:aria-invalid:ring-offset-2",
    "ui:aria-invalid:ring-offset-background-100",
  ],
);

export const checkboxIndicatorVariants = cva(
  "ui:flex ui:items-center ui:justify-center ui:text-primary-foreground",
);
