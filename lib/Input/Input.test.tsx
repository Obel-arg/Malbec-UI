import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

const classesOf = (el: HTMLElement) => el.className.split(/\s+/);

describe("Input variants", () => {
  it('variant="search" fills the field with background-200 and hides the native clear button', () => {
    render(
      <Input variant="search" placeholder="Buscar">
        <Input.Icon>⌕</Input.Icon>
      </Input>,
    );
    const wrapper = screen.getByPlaceholderText("Buscar").closest("label")!;
    const classes = classesOf(wrapper);
    expect(classes).toContain("ui:bg-background-200");
    expect(classes).not.toContain("ui:bg-background-100");
    expect(classes).toContain("ui:[&_input::-webkit-search-cancel-button]:appearance-none");
    expect(wrapper.dataset.variant).toBe("search");
  });

  it('variant="bare" drops the field chrome but keeps a focus outline', () => {
    render(<Input variant="bare" placeholder="Monto" />);
    const classes = classesOf(screen.getByPlaceholderText("Monto"));
    expect(classes).toEqual(
      expect.arrayContaining(["ui:h-auto", "ui:p-0", "ui:bg-transparent", "ui:shadow-none", "ui:rounded-none"]),
    );
    expect(classes).not.toContain("ui:h-9");
    expect(classes).not.toContain("ui:px-4");
    expect(classes).toContain("ui:focus-within:outline-background-300");
  });

  it("does not pass variant through to the DOM input", () => {
    render(<Input variant="search" placeholder="Buscar" />);
    expect(screen.getByPlaceholderText("Buscar").getAttribute("variant")).toBeNull();
  });
});
