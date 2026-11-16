import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("lib/styles.css", "utf8");
const values = [...css.matchAll(/--color-destructive:\s*(#[0-9a-f]{6});/gi)].map((m) => m[1]);

describe("--color-destructive", () => {
  it("is the same #ef4444 red in light and dark", () => {
    expect(values).toEqual(["#ef4444", "#ef4444"]);
  });
});
