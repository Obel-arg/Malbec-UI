import { readFileSync } from "node:fs";
import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";

// Apps import `malbec-ui/tokens.css` into their own (unprefixed) Tailwind build, so
// `text-malbec-ink` etc. must compile there to the approved malbec-ux-ui values.
async function build(candidates: string[]) {
  const tokens = readFileSync("lib/tokens.css", "utf8");
  const compiler = await compile(`${tokens}\n@tailwind utilities;`);
  return compiler.build(candidates);
}

describe("tokens.css", () => {
  it("generates unprefixed malbec-* utilities with the spec values", async () => {
    const css = await build([
      "text-malbec-ink",
      "text-malbec-icon",
      "text-malbec-muted-text",
      "text-malbec-table-header",
      "bg-malbec-badge-red-bg",
    ]);
    expect(css).toMatch(/--color-malbec-ink:\s*#1a1a1f/);
    expect(css).toMatch(/--color-malbec-icon:\s*#3f3f46/);
    expect(css).toMatch(/--color-malbec-muted-text:\s*#8c8c94/);
    expect(css).toMatch(/--color-malbec-table-header:\s*#6b6b7a/);
    expect(css).toMatch(/\.text-malbec-ink\s*{\s*color:\s*var\(--color-malbec-ink\)/);
    expect(css).toMatch(/\.bg-malbec-badge-red-bg\s*{/);
  });

  it("defines a bg and a text color for every badge tone", async () => {
    const tones = ["green", "yellow", "orange", "purple", "blue", "red", "neutral"];
    const css = await build(tones.flatMap((t) => [`bg-malbec-badge-${t}-bg`, `text-malbec-badge-${t}-text`]));
    for (const t of tones) {
      expect(css).toMatch(new RegExp(`--color-malbec-badge-${t}-bg:\\s*#[0-9a-f]{6}`));
      expect(css).toMatch(new RegExp(`--color-malbec-badge-${t}-text:\\s*#[0-9a-f]{6}`));
    }
  });
});
