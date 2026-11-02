// Post-build smoke test: import every public subpath by package name (self-reference
// through package.json "exports"), ESM and CJS, and check the names consumers rely on.
// tsc can't catch this: dist/lib/**/*.d.ts can be right while a JS barrel is empty.
// Run after `pnpm build`: node scripts/smoke-exports.mjs
import { readFileSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";

// Consumers load the package through a bundler that handles CSS imports (fonts, styles).
// Plain Node can't, so stub them out: only the JS exports are under test here.
registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".css")) return { format: "module", source: "", shortCircuit: true };
    return nextLoad(url, context);
  },
});

const require = createRequire(import.meta.url);
const PKG = "@obel-arg/malbec-ui";

const EXPECTED = {
  "": ["Button", "DataTable", "MalbecThemeProvider", "useTheme", "themes"],
  "/icons": ["Settings2", "ChevronDown"],
  "/theme": [
    "MalbecThemeProvider",
    "MalbecThemeContext",
    "useTheme",
    "TOKEN_NAMES",
    "TOKEN_TO_CSS_VAR",
    "live",
    "malbecRecords",
    "management",
    "publishing",
    "booking",
  ],
  "/theme/presets": ["live", "malbecRecords", "management", "publishing", "booking"],
};

const failures = [];
for (const [subpath, names] of Object.entries(EXPECTED)) {
  const id = PKG + subpath;
  const loaders = { esm: () => import(id), cjs: async () => require(id) };
  for (const [format, load] of Object.entries(loaders)) {
    try {
      const mod = await load();
      const missing = names.filter((n) => mod[n] === undefined);
      if (missing.length) failures.push(`${format} ${id}: missing ${missing.join(", ")}`);
      else console.log(`ok   ${format} ${id}`);
    } catch (err) {
      failures.push(`${format} ${id}: ${err.message.split("\n")[0]}`);
    }
  }
}

// CSS subpaths: resolvable through "exports" and non-empty.
for (const [subpath, marker] of Object.entries({ "/style.css": "ui\\:", "/tokens.css": "--color-malbec-ink" })) {
  try {
    const css = readFileSync(require.resolve(PKG + subpath), "utf8");
    if (css.includes(marker)) console.log(`ok   css ${PKG + subpath}`);
    else failures.push(`css ${PKG + subpath}: missing ${marker}`);
  } catch (err) {
    failures.push(`css ${PKG + subpath}: ${err.message.split("\n")[0]}`);
  }
}

for (const f of failures) console.error(`FAIL ${f}`);
process.exit(failures.length ? 1 : 0);
