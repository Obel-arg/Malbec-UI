import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as api from "../main";
import * as form from "../form";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const main = readFileSync("lib/main.ts", "utf8");

describe("@tanstack/react-form is an optional peer (2.0)", () => {
  it("is marked optional in peerDependenciesMeta", () => {
    expect(pkg.peerDependencies["@tanstack/react-form"]).toBeDefined();
    expect(pkg.peerDependenciesMeta?.["@tanstack/react-form"]?.optional).toBe(true);
  });

  it("the main barrel never imports the Form module, so it loads without the package", () => {
    expect(main).not.toMatch(/\.\/Form\//);
    for (const name of ["Form", "useForm", "withForm", "withFieldGroup"]) {
      expect(api).not.toHaveProperty(name);
    }
  });

  it("malbec-ui/form exports the form API", () => {
    for (const name of ["Form", "useForm", "withForm", "withFieldGroup"]) {
      expect(form).toHaveProperty(name);
    }
    expect(pkg.exports["./form"]).toEqual({
      types: "./dist/lib/form.d.ts",
      import: "./dist/form.js",
      require: "./dist/form.cjs",
    });
  });
});
