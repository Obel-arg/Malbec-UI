import { cva } from "class-variance-authority";

/**
 * Dashed-border container that hosts the upload icon, caption and optional
 * action button. Surface tokens match the rest of the form-control family.
 */
export const fileDropzoneRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:flex-col ui:items-center ui:justify-center",
  "ui:gap-2",
  "ui:w-full",
  "ui:min-h-40",
  "ui:px-3 ui:py-6",
  "ui:rounded-[6px]",
  "ui:border-2 ui:border-dashed ui:border-background-300",
  "ui:bg-background-100",
  "ui:text-center",
  "ui:cursor-pointer",
  "ui:outline-none",
  "ui:transition-[outline-color,opacity]",
  // Accessibility focus indicator — not a visual variant in Figma but required
  // for keyboard users. Matches the 1px background-300 outline used elsewhere.
  "ui:focus-visible:outline-1",
  "ui:focus-visible:outline-solid",
  "ui:focus-visible:outline-background-300",
  "ui:focus-visible:-outline-offset-1",
  "ui:data-disabled:cursor-not-allowed",
  "ui:data-disabled:opacity-50",
  "ui:data-disabled:pointer-events-none",
  /**
   * Invalid state. `aria-invalid` matches when callers pass it to the root
   * directly; the `has-[…]` form picks up `Field` auto-propagation, which
   * targets the inner hidden `<input>` via its native tag selector.
   */
  "ui:aria-invalid:border-destructive",
  "ui:has-[input[aria-invalid='true']]:border-destructive",
]);

export const fileDropzoneIconVariants = cva([
  "ui:inline-flex ui:size-6 ui:shrink-0 ui:items-center ui:justify-center",
  "ui:text-text-default-muted",
  "ui:[&>svg]:size-full",
]);

export const fileDropzoneCaptionVariants = cva([
  "malbec-font-sans",
  "ui:font-normal",
  "ui:text-[14px] ui:leading-5 ui:tracking-[-0.42px]",
  "ui:text-text-default-muted",
  "ui:text-center",
]);

export const fileDropzoneActionVariants = cva([
  "malbec-font-sans",
  "ui:inline-flex ui:items-center ui:justify-center",
  "ui:min-w-[88px]",
  "ui:rounded-[6px]",
  "ui:border ui:border-solid ui:border-background-300",
  "ui:bg-background-100",
  "ui:px-4 ui:py-2",
  "ui:font-normal",
  "ui:text-[12px] ui:leading-[14px] ui:tracking-[-0.36px]",
  "ui:text-text-default",
  "ui:cursor-pointer",
  "ui:outline-none",
  "ui:transition-[opacity,outline-color]",
  "ui:focus-visible:outline-1",
  "ui:focus-visible:outline-solid",
  "ui:focus-visible:outline-background-300",
  "ui:focus-visible:-outline-offset-1",
  "ui:disabled:cursor-not-allowed",
  "ui:disabled:opacity-50",
]);
