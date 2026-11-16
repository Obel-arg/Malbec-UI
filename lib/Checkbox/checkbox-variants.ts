import { cva } from "class-variance-authority";

/**
 * Checkbox control: 16×16px, 4px corner radius, background-300 border when unchecked and a
 * solid malbec-icon fill when checked (malbec-ux-ui rule 2: checked states are neutral, never
 * brand colour), reduced opacity when disabled.
 */
export const checkboxRootVariants = cva(
  [
    "malbec-font-sans",
    "ui:group",
    "ui:inline-flex",
    "ui:cursor-pointer",
    "ui:size-4",
    "ui:shrink-0",
    "ui:items-center",
    "ui:justify-center",
    "ui:rounded-[4px]",
    "ui:border",
    "ui:border-solid",
    "ui:border-background-300",
    "ui:bg-background-100",
    "ui:text-background-100",
    "ui:outline-none",
    "ui:transition-[color,background-color,border-color,opacity,box-shadow]",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-focus",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:pointer-events-none",
    "ui:disabled:opacity-50",
    "ui:data-[state=checked]:bg-malbec-icon",
    "ui:data-[state=checked]:border-malbec-icon",
    "ui:data-[state=indeterminate]:bg-malbec-icon",
    "ui:data-[state=indeterminate]:border-malbec-icon",
    "ui:aria-invalid:outline-1",
    "ui:aria-invalid:outline-solid",
    "ui:aria-invalid:outline-destructive",
    "ui:aria-invalid:outline-offset-0",
  ],
);

export const checkboxIndicatorVariants = cva(
  "ui:flex ui:items-center ui:justify-center ui:text-background-100",
);
