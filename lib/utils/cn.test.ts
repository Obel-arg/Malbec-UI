import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cn, TEXT_SIZES } from "./cn";

describe("cn type scale", () => {
  it("keeps a custom size when a color follows (Tabs segmented: 14px, not 16px)", () => {
    expect(cn("ui:text-muted-medium", "ui:text-text-default")).toBe(
      "ui:text-muted-medium ui:text-text-default",
    );
  });

  it("keeps a custom size when the host passes an unprefixed color", () => {
    expect(cn("ui:text-xxs", "text-text-default-muted")).toBe(
      "ui:text-xxs text-text-default-muted",
    );
  });

  it("still lets a later size win over an earlier one", () => {
    expect(cn("ui:text-small", "ui:text-lead")).toBe("ui:text-lead");
    expect(cn("ui:text-muted-medium", "ui:text-sm")).toBe("ui:text-sm");
  });

  it("knows every size token declared in styles.css", () => {
    const declared = [...readFileSync("lib/styles.css", "utf8").matchAll(/--text-([a-z0-9-]+):/g)]
      .map((m) => m[1])
      .filter((name) => !/--|line-height|font-weight|letter-spacing/.test(name));
    expect(TEXT_SIZES).toEqual(expect.arrayContaining(declared));
  });
});
