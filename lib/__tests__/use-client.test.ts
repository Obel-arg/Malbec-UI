import { globSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// A module that creates a context or calls a hook at load time breaks when the
// barrel is imported from a React Server Component, unless it is a client module.
const CLIENT_ONLY =
  /\b(createContext|createFormHookContexts|createFormHook)\s*\(|\buse[A-Z]\w*\s*\(|\bReact\.use[A-Z]\w*\s*\(/;

const code = (file: string) =>
  readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

const sources = globSync("lib/**/*.{ts,tsx}").filter(
  (f) => !/\.(test|stories)\.tsx?$|\.d\.ts$|__tests__|storybook\//.test(f),
);

describe('"use client" directive', () => {
  it.each(sources.filter((f) => CLIENT_ONLY.test(code(f))))(
    "%s is a client module",
    (file) => {
      expect(readFileSync(file, "utf8").trimStart().startsWith('"use client"')).toBe(true);
    },
  );
});
