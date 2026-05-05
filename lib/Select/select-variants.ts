import { cva } from "class-variance-authority";
import { popoverSurfaceTransitionMotionClasses } from "../Popover/popover-variants";

export const selectTriggerVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:h-9 ui:w-full ui:items-center ui:justify-between ui:rounded-md ui:border ui:border-background-300",
  "ui:bg-background-100 ui:px-4 ui:py-2 ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
  "ui:outline-none ui:transition-[opacity,box-shadow]",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
  "ui:cursor-pointer",
  "ui:disabled:cursor-not-allowed",
  "ui:disabled:pointer-events-none ui:disabled:opacity-50",
  "ui:data-placeholder:text-text-default/70",
]);

export const selectContentVariants = cva([
  "malbec-font-sans",
  /** Above modal overlays (`Dialog` / `Sheet` use `z-50`). */
  "ui:z-100 ui:max-h-64 ui:overflow-y-auto ui:overflow-x-hidden",
  "ui:rounded-md ui:border ui:border-background-300 ui:bg-background-100 ui:p-1 dark:ui:bg-background-200",
  /** Popper mode maps this to `--radix-popper-transform-origin`; item-aligned falls back if unset. */
  "ui:origin-(--radix-select-content-transform-origin)",
  ...popoverSurfaceTransitionMotionClasses,
]);

/** Popper content: Radix exposes `--radix-select-trigger-width` so the list matches the trigger. */
export const selectPopperWidthVariants = cva(
  "ui:w-(--radix-select-trigger-width) ui:min-w-(--radix-select-trigger-width) ui:max-w-(--radix-select-trigger-width)",
);

export const selectViewportVariants = cva("ui:p-0");

export const selectItemVariants = cva([
  "ui:relative ui:flex ui:w-full ui:cursor-pointer ui:select-none ui:items-center ui:rounded-sm ui:px-2 ui:py-1.5",
  "ui:data-disabled:cursor-not-allowed",
  "ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default ui:outline-none",
  "ui:data-highlighted:bg-background-200",
  "ui:data-[state=checked]:bg-background-200",
]);
