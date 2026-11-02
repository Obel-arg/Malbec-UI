import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type Target = string | Record<string, string>;
const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
  exports: Record<string, Target>;
};

describe("package.json exports", () => {
  it("exposes the theme subpaths consumers import", () => {
    expect(Object.keys(pkg.exports)).toEqual(
      expect.arrayContaining([".", "./icons", "./style.css", "./theme", "./theme/presets"]),
    );
  });

  // Needs `pnpm build` first (CI builds before testing). Locally it is skipped without dist/.
  const built = existsSync("dist") || Boolean(process.env.CI);
  const targets = Object.entries(pkg.exports).flatMap(([subpath, target]) =>
    typeof target === "string"
      ? [[subpath, target]]
      : Object.values(target).map((file) => [subpath, file]),
  );

  it.skipIf(!built).each(targets)("%s → %s exists in the build", (_subpath, file) => {
    expect(existsSync(file)).toBe(true);
  });
});
