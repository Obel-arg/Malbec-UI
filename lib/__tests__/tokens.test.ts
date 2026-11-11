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

  it("matches the Badge component's blue and red", async () => {
    const css = await build(["bg-malbec-badge-blue-bg", "text-malbec-badge-blue-text", "bg-malbec-badge-red-bg", "text-malbec-badge-red-text"]);
    expect(css).toMatch(/--color-malbec-badge-blue-bg:\s*#dce6ec/);
    expect(css).toMatch(/--color-malbec-badge-blue-text:\s*#2f628a/);
    expect(css).toMatch(/--color-malbec-badge-red-bg:\s*#dfd0d0/);
    expect(css).toMatch(/--color-malbec-badge-red-text:\s*#602a2a/);
  });

  it("ships the spec embossed border and divider as utilities", async () => {
    const css = (await build(["border-embossed", "divider-embossed", "hover:border-embossed"])).replace(/\s+/g, " ");
    expect(css).toContain(".border-embossed { border: 1px solid #ffffff; box-shadow: 0 0 0 1px #f1f0ee;");
    expect(css).toContain(".divider-embossed { border-top: 1px solid #eae7e3; box-shadow: inset 0 1.5px 0 #ffffff;");
    expect(css).toMatch(/\.divider-embossed\s*{[^}]*&:first-child|\.divider-embossed:first-child/);
    expect(css).toContain("hover\\:border-embossed");
  });

  it("defines a bg and a text color for every badge tone", async () => {
    const tones = ["green", "yellow", "orange", "purple", "blue", "red", "neutral"];
    const css = await build(tones.flatMap((t) => [`bg-malbec-badge-${t}-bg`, `text-malbec-badge-${t}-text`]));
    for (const t of tones) {
      expect(css).toMatch(new RegExp(`--color-malbec-badge-${t}-bg:\\s*#[0-9a-f]{6}`));
      expect(css).toMatch(new RegExp(`--color-malbec-badge-${t}-text:\\s*#[0-9a-f]{6}`));
    }
  });

  it("ships the scroll utilities", async () => {
    const css = (await build(["scroll-hidden", "scroll-thin"])).replace(/\s+/g, " ");
    expect(css).toMatch(/\.scroll-hidden \{ scrollbar-width: none;/);
    // Nested (`&::-webkit-scrollbar`) or flattened, depending on the app's CSS pipeline.
    expect(css).toMatch(/\.scroll-hidden[^]*?::-webkit-scrollbar \{ display: none;/);
    expect(css).toMatch(/\.scroll-thin \{ scrollbar-width: thin;/);
    expect(css).not.toContain("color-mix(");
  });

  it("ships the suite easings and the wizard step animations with their keyframes", async () => {
    const css = (
      await build(["ease-out-strong", "ease-out-soft", "ease-in-out-layout", "animate-wizard-step-in", "animate-wizard-step-out"])
    ).replace(/\s+/g, " ");
    expect(css).toContain("--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)");
    expect(css).toContain("--ease-out-soft: cubic-bezier(0.32, 0.72, 0, 1)");
    expect(css).toContain("--ease-in-out-layout: cubic-bezier(0.4, 0, 0.2, 1)");
    expect(css).toContain("@keyframes wizard-step-enter");
    expect(css).toContain("@keyframes wizard-step-leave");
    expect(css).toMatch(/\.animate-wizard-step-in \{ animation: var\(--animate-wizard-step-in\)/);
  });
});
