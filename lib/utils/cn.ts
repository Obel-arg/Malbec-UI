import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Malbec emits Tailwind with the `ui:` prefix. Host apps often use unprefixed
 * utilities (`p-0`, `hover:bg-red-500`). tailwind-merge’s `prefix: "ui"` only
 * parses tokens that *start* with `ui:`, so everything else was treated as
 * external and never conflicted with `ui:px-2` / `ui:py-1`.
 *
 * We prepend a synthetic `ui:` for parsing only: the merge still outputs the
 * **original** token (e.g. `p-0`), so the host’s unprefixed CSS applies, but it
 * wins the same conflict groups as `ui:p-*`.
 */
/**
 * The custom type scale (`--text-*` in styles.css, plus `xxs` that host apps
 * declare). Without it twMerge reads `ui:text-muted-medium` as a color and drops
 * it when a real color class follows, so the text falls back to the inherited size.
 */
export const TEXT_SIZES = [
  "h1",
  "h2",
  "h3-medium",
  "h3-semibold",
  "h4",
  "lead",
  "large",
  "p",
  "blockquote",
  "table-head",
  "table-item",
  "list",
  "code",
  "small",
  "muted",
  "muted-medium",
  "label",
  "label-semibold",
  "xxs",
];

const twMerge = extendTailwindMerge({
  prefix: "ui",
  extend: { theme: { text: TEXT_SIZES } },
  experimentalParseClassName: ({ className, parseClassName }) => {
    if (className.startsWith("ui:")) {
      return parseClassName(className);
    }
    return parseClassName(`ui:${className}`);
  },
});

/**
 * Merges class names with `clsx`, then resolves Tailwind conflicts with
 * `tailwind-merge` (library `ui:` prefix + unprefixed overrides).
 * Pass **last** the classes you want to win.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
