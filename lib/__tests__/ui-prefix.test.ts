import { globSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Tailwind 4 only honors a prefix in first position: `ui:hover:x` works,
// `hover:ui:x` and `ui:[&>svg]:ui:x` compile to nothing, silently.
const MISPLACED_PREFIX = /[^\s"'`]*:ui:[^\s"'`]*/g;

const sources = globSync("lib/**/*.{ts,tsx}").filter((f) => !/\.test\.tsx?$/.test(f));

describe("ui: prefix", () => {
  it("is always the first variant of a class", () => {
    const offenders = sources.flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, i) =>
          [...line.matchAll(MISPLACED_PREFIX)].map((m) => `${file}:${i + 1} ${m[0]}`),
        ),
    );
    expect(offenders).toEqual([]);
  });
});
