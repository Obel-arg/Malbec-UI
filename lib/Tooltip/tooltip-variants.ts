import { cva } from "class-variance-authority";

/**
 * Radix Tooltip.Content uses `data-state` = `delayed-open` | `instant-open` | `closed`
 * (not `open`), so motion differs from Popover.
 */
export const tooltipSurfaceMotionClasses = [
  "ui:will-change-[opacity,transform]",
  "ui:data-[state=delayed-open]:animate-[malbec-popover-in_var(--malbec-popover-enter-duration,150ms)_ease-out]",
  "ui:data-[state=instant-open]:animate-[malbec-popover-in_var(--malbec-popover-enter-duration,150ms)_ease-out]",
  "ui:data-[state=closed]:animate-[malbec-popover-out_var(--malbec-popover-exit-duration,120ms)_ease-in]",
] as const;

export const tooltipContentVariants = cva([
  "malbec-font-sans",
  "ui:z-50 ui:w-auto ui:max-w-(--radix-tooltip-content-available-width)",
  "ui:rounded-md ui:border ui:border-background-300 ui:bg-background-100",
  "ui:px-3 ui:py-1.5 ui:text-base ui:leading-6 ui:text-text-default",
  "ui:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] ui:outline-none",
  "ui:origin-(--radix-tooltip-content-transform-origin)",
  ...tooltipSurfaceMotionClasses,
]);
