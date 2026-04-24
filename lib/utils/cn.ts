import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Prefix is the string before the first `:` (tailwind-merge adds `:` itself). */
const twMerge = extendTailwindMerge({ prefix: "ui" });

/**
 * Merges class names with `clsx`, then resolves Tailwind conflicts with
 * `tailwind-merge` (configured for this library’s `ui:` prefix).
 * Pass **last** the classes you want to win; consumers can override defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
