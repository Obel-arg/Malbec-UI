import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve(__dirname, "../styles.css"), "utf8");
const tokens = readFileSync(resolve(__dirname, "../tokens.css"), "utf8");

function token(css: string, name: string): string | undefined {
  return new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css)?.[1]?.toLowerCase();
}

// Badge tones moved from inline hex to tokens; the values must stay the ones on screen.
const badgeTones: Record<string, string> = {
  "malbec-badge-red-bg": "#dfd0d0",
  "malbec-badge-red-text": "#602a2a",
  "malbec-badge-yellow-bg": "#efeed4",
  "malbec-badge-yellow-text": "#8a862f",
  "malbec-badge-orange-bg": "#efe3d4",
  "malbec-badge-orange-text": "#8a642f",
  "malbec-badge-blue-bg": "#dce6ec",
  "malbec-badge-blue-text": "#2f628a",
  "malbec-badge-green-bg": "#d0dfd0",
  "malbec-badge-green-text": "#2a602c",
  "malbec-badge-neutral-bg": "#e4e2df",
  "malbec-badge-neutral-text": "#6b6b7a",
  "malbec-badge-violet-bg": "#e5dcec",
  "malbec-badge-violet-text": "#352a60",
  "malbec-badge-sage-bg": "#b4c5b5",
  "malbec-badge-sage-text": "#025406",
};

describe("colour tokens", () => {
  it.each(Object.entries(badgeTones))("%s keeps %s", (name, hex) => {
    expect(token(styles, name)).toBe(hex);
  });

  it("matches tokens.css wherever both files declare a token", () => {
    for (const name of [...Object.keys(badgeTones), "malbec-table-header", "malbec-ink"]) {
      const app = token(tokens, name);
      if (app) expect(token(styles, name)).toBe(app);
    }
  });
});
