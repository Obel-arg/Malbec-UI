import { cva } from "class-variance-authority";

/** CSS custom properties (defaults in `lib/styles.css` `:root`) — override in the host app. */
export const MALBEC_POPOVER_ENTER_DURATION_VAR =
  "--malbec-popover-enter-duration" as const;
export const MALBEC_POPOVER_EXIT_DURATION_VAR =
  "--malbec-popover-exit-duration" as const;

function parseCssTimeToMs(value: string): number | null {
  const v = value.trim();
  if (!v) return null;
  const ms = /^([\d.]+)ms$/i.exec(v);
  if (ms) return Math.round(Number(ms[1]));
  const s = /^([\d.]+)s$/i.exec(v);
  if (s) return Math.round(Number(s[1]) * 1000);
  return null;
}

/**
 * Reads `--malbec-popover-exit-duration` from computed styles (for JS fallbacks).
 * Defaults to `120` when unset or invalid.
 */
export function readMalbecPopoverExitDurationMs(
  root?: Element | null,
): number {
  if (typeof document === "undefined") return 120;
  const el = root ?? document.documentElement;
  const raw = getComputedStyle(el)
    .getPropertyValue(MALBEC_POPOVER_EXIT_DURATION_VAR)
    .trim();
  return parseCssTimeToMs(raw) ?? 120;
}

/**
 * Scale + fade open/close, driven by Radix `data-[state]` on the surface.
 * Keyframes in `styles.css` read `--radix-popper-transform-origin` (Popover, Combobox,
 * Select popper mode all expose it via Popper). Durations use `var(--malbec-popover-*-duration)`.
 */
export const popoverSurfaceOpenMotionClasses = [
  "ui:will-change-[opacity,transform]",
  "ui:data-[state=open]:animate-[malbec-popover-in_var(--malbec-popover-enter-duration,150ms)_ease-out]",
] as const;

/**
 * Shared base class for transition-based surfaces (e.g. Radix Select).
 * Actual transition + `@starting-style` rules live in `lib/styles.css`, keyed on
 * `data-malbec-motion`. Transitions smoothly interrupt when `enter` flips to `exit`.
 */
export const popoverSurfaceTransitionMotionClasses = [
  "ui:will-change-[opacity,transform]",
] as const;

export const popoverSurfaceMotionClasses = [
  ...popoverSurfaceOpenMotionClasses,
  "ui:data-[state=closed]:animate-[malbec-popover-out_var(--malbec-popover-exit-duration,120ms)_ease-in]",
] as const;

export const popoverContentVariants = cva([
  "malbec-font-sans",
  /** Intrinsic width; match trigger via `ui:w-(--radix-popover-trigger-width)` when needed. */
  "ui:z-50 ui:w-auto ui:max-w-(--radix-popover-content-available-width) ui:rounded-md ui:border ui:border-background-300 ui:bg-white ui:p-3",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)] ui:outline-none",
  "dark:ui:bg-background-200",
  "ui:origin-(--radix-popover-content-transform-origin)",
  ...popoverSurfaceMotionClasses,
]);
