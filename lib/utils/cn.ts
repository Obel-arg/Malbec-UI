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
const twMerge = extendTailwindMerge({
  prefix: "ui",
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
