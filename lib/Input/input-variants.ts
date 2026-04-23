import { cva } from "class-variance-authority";

/**
 * Default + disabled are driven by the native `disabled` attribute; file styling
 * uses `::file-selector-button` utilities.
 */
export const inputVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex",
    "ui:h-9",
    "ui:w-full",
    "ui:min-w-0",
    "ui:items-center",
    "ui:border-0",
    "ui:bg-background-100",
    "ui:rounded-[6px]",
    "ui:px-4",
    "ui:py-2",
    "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
    "ui:text-[14px]",
    "ui:leading-5",
    "ui:tracking-[-0.42px]",
    "ui:text-text-default",
    "ui:placeholder:text-text-default-muted",
    "ui:outline-none",
    "ui:transition-[color,box-shadow,opacity]",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:opacity-50",
    "ui:file:mr-2",
    "ui:file:inline-flex",
    "ui:file:cursor-pointer",
    "ui:file:border-0",
    "ui:file:bg-transparent",
    "ui:file:p-0",
    "ui:file:font-medium",
    "ui:file:text-[14px]",
    "ui:file:leading-5",
    "ui:file:tracking-[-0.42px]",
    "ui:file:text-text-default",
  ],
);
