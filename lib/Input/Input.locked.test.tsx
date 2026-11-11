import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "../Field/Field";
import { Input } from "./Input";

const lockedField = (lockReason?: string) => (
  <Field>
    <Field.Label htmlFor="currency">Moneda</Field.Label>
    <Input id="currency" value="USD" locked lockReason={lockReason} />
  </Field>
);

describe('Input "locked": a value you can see but not edit', () => {
  it("keeps the value in a disabled, read-only input labelled like any field", () => {
    render(lockedField());
    const input = screen.getByLabelText("Moneda") as HTMLInputElement;
    expect(input.value).toBe("USD");
    expect(input.disabled).toBe(true);
    expect(input.readOnly).toBe(true);
    expect(input.closest("[data-slot=input-wrapper]")!.getAttribute("data-locked")).toBe("");
  });

  it("shows a lock at the end of the box, not dimmed like a disabled field", () => {
    render(lockedField());
    const input = screen.getByLabelText("Moneda");
    const wrapper = input.closest("[data-slot=input-wrapper]")!;
    expect(wrapper.querySelector('[data-slot="input-lock"]')).not.toBeNull();
    expect(input.className).toContain("ui:disabled:opacity-100");
  });

  it("ties the reason it is fixed to the field for screen readers", () => {
    render(lockedField("La define el contrato y no se puede cambiar acá."));
    const input = screen.getByLabelText("Moneda");
    const id = input.getAttribute("aria-describedby")!;
    expect(document.getElementById(id)!.textContent).toBe(
      "La define el contrato y no se puede cambiar acá.",
    );
  });

  it("without a reason there is no description", () => {
    render(lockedField());
    expect(screen.getByLabelText("Moneda").getAttribute("aria-describedby")).toBeNull();
  });
});

describe('Input "locked" accessible name', () => {
  it("is the field label only: the reason is a description, not part of the name", () => {
    render(lockedField("La define el contrato."));
    expect(screen.getByRole("textbox", { name: "Moneda" })).toBeTruthy();
  });
});
