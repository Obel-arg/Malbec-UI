import { cva } from "class-variance-authority";

/** Row of groups + separators: 8px gap per Figma. */
export const inputOtpRootVariants = cva([
  "ui:flex",
  "ui:w-full",
  "ui:items-center",
  "ui:gap-2",
]);

/** One segmented group: outer border + 6px radius. */
export const inputOtpGroupVariants = cva([
  "ui:flex",
  "ui:flex-1",
  "ui:min-w-0",
  "ui:items-center",
  "ui:overflow-hidden",
  "ui:rounded-[6px]",
  "ui:border",
  "ui:border-solid",
  "ui:border-background-300",
  /**
   * Invalid state. `aria-invalid` is mirrored onto the `.group` wrapper rendered by
   * `<InputOtp>` (the underlying `<input>` lives in an absolutely-positioned sibling
   * of the groups, so it can't be targeted via `:has()` from here). Using `outline`
   * for parity with the rest of the form-control library.
   */
  "ui:group-aria-invalid:outline-1",
  "ui:group-aria-invalid:outline-solid",
  "ui:group-aria-invalid:outline-destructive",
  "ui:group-aria-invalid:outline-offset-0",
]);

/**
 * Single character cell. Interior vertical rules: left border on non-first slot
 * inside each `InputOtp.Group`.
 */
export const inputOtpSlotVariants = cva([
  "malbec-font-sans",
  "ui:relative",
  "ui:flex",
  "ui:h-10",
  "ui:min-w-0",
  "ui:flex-1",
  "ui:items-center",
  "ui:justify-center",
  "ui:bg-background-100",
  "ui:px-4",
  "ui:py-2",
  "ui:text-[14px]",
  "ui:leading-5",
  "ui:tracking-[-0.42px]",
  "ui:text-text-default",
  "ui:outline-none",
  "ui:transition-[color,box-shadow]",
  "ui:not-first:border-l",
  "ui:not-first:border-solid",
  "ui:not-first:border-background-300",
  /** Interior focus: thick primary line on the shared divider (not a box ring). */
  "ui:data-primary-left:border-l-2",
  "ui:data-primary-left:border-solid",
  "ui:data-primary-left:border-l-primary",
  "ui:data-primary-left:z-10",
  /** Invalid: turn the inner dividers destructive so the outline reads through the slots. */
  "ui:group-aria-invalid:not-first:border-l-destructive",
]);

/** 16×16 hit area for the dot separator icon. */
export const inputOtpSeparatorVariants = cva([
  "ui:flex",
  "ui:size-4",
  "ui:shrink-0",
  "ui:items-center",
  "ui:justify-center",
  "ui:text-text-default",
]);
