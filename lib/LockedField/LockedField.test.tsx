import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LockedField } from "./LockedField";

describe("LockedField", () => {
  it("shows the value in a disabled, read-only input labelled like any field", () => {
    render(<LockedField id="currency" label="Moneda" value="USD" />);
    const input = screen.getByLabelText("Moneda") as HTMLInputElement;
    expect(input.value).toBe("USD");
    expect(input.disabled).toBe(true);
    expect(input.readOnly).toBe(true);
  });

  it("ties the reason it is fixed to the field for screen readers", () => {
    render(
      <LockedField
        id="currency"
        label="Moneda"
        value="USD"
        hint="La define el contrato y no se puede cambiar acá."
      />,
    );
    const input = screen.getByLabelText("Moneda");
    expect(input.getAttribute("aria-describedby")).toBe("currency-hint");
    expect(document.getElementById("currency-hint")!.textContent).toBe(
      "La define el contrato y no se puede cambiar acá.",
    );
  });

  it("without hint there is no description", () => {
    render(<LockedField id="currency" label="Moneda" value="USD" />);
    expect(screen.getByLabelText("Moneda").getAttribute("aria-describedby")).toBeNull();
  });
});
