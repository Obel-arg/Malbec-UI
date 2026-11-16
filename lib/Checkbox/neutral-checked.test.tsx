import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { Steps } from "../Steps/Steps";
import { Switch } from "../Switch/Switch";

const classesOf = (el: Element) => el.className.split(/\s+/);
const noBrand = (classes: string[]) => classes.filter((c) => /primary/.test(c));

// malbec-ux-ui rule 2: checked / active states are solid malbec-icon, never brand colour.
describe("controls are neutral when checked", () => {
  it("Checkbox", () => {
    render(<Checkbox aria-label="Aceptar" defaultChecked />);
    const classes = classesOf(screen.getByRole("checkbox"));
    expect(classes).toContain("ui:data-[state=checked]:bg-malbec-icon");
    expect(noBrand(classes)).toEqual([]);
  });

  it("Switch", () => {
    render(<Switch aria-label="Activo" defaultChecked />);
    const sw = screen.getByRole("switch");
    expect(noBrand(classesOf(sw))).toEqual([]);
    expect(classesOf(sw.firstElementChild!)).toContain("ui:bg-malbec-icon");
  });

  it("RadioGroup", () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Opción">
        <RadioGroup.Item value="a" aria-label="A" />
      </RadioGroup>,
    );
    const classes = classesOf(screen.getByRole("radio"));
    expect(classes).toContain("ui:data-[state=checked]:border-malbec-icon");
    expect(noBrand(classes)).toEqual([]);
  });

  it("Steps", () => {
    const { container } = render(<Steps total={3} value={1} />);
    const html = container.innerHTML;
    expect(html).toContain("ui:bg-malbec-icon");
    expect(html).not.toContain("ui:bg-primary");
  });
});
