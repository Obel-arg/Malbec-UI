import { cva } from "class-variance-authority";
import type { CSSProperties } from "react";
import type { ToastClassnames } from "sonner";
import { cn } from "../utils/cn";

/**
 * Injected on `<Toaster />` — overrides sonner’s fixed `--width` and `theme` base colors
 * so default toasts can use Malbec surface tokens. Typed toasts (success, error, …) keep
 * sonner’s global theme rules; layout for untyped toasts is in `lib/styles.css`.
 */
export const sonnerToasterStyle = {
  "--width": "384px",
  "--normal-bg": "var(--color-background-100)",
  "--normal-border": "var(--color-background-300)",
  "--normal-text": "var(--color-text-default)",
  "--border-radius": "8px",
} as CSSProperties;

const sonnerContentVariants = cva("ui:min-w-0 ui:flex-1");

const MERGE_KEYS = [
  "toast",
  "title",
  "description",
  "loader",
  "closeButton",
  "cancelButton",
  "actionButton",
  "success",
  "error",
  "info",
  "warning",
  "loading",
  "default",
  "content",
  "icon",
] as const satisfies readonly (keyof ToastClassnames)[];

/**
 * Base class names (merged into every toast). Figma “default” one-line visuals for
 * untyped toasts are mostly in [lib/styles.css](lib/styles.css) under
 * `[data-sonner-toast][data-styled]:not([data-type])` so `toast.success` / `toast.error` stay
 * upstream-styled.
 */
export const sonnerDefaultToastClassNames: ToastClassnames = {
  toast: "malbec-font-sans",
  content: sonnerContentVariants(),
};

export function mergeSonnerToastClassNames(
  base: ToastClassnames,
  ...overrides: (Partial<ToastClassnames> | undefined)[]
): ToastClassnames {
  const out: ToastClassnames = { ...base };
  for (const o of overrides) {
    if (!o) continue;
    for (const k of MERGE_KEYS) {
      const v = o[k];
      if (v != null && v !== "") {
        out[k] = cn(out[k], v);
      }
    }
  }
  return out;
}
