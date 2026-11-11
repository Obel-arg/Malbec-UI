import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("is an h2 with the number muted, never in the brand colour", () => {
    render(<SectionHeading number="01" title="Identidad" />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.textContent).toBe("01Identidad");
    const number = screen.getByText("01");
    expect(number.className).toContain("ui:text-text-default-muted");
    expect(number.className).not.toMatch(/primary|cta/);
    // No eyebrow: no uppercase + tracking label.
    expect(h2.innerHTML).not.toContain("uppercase");
  });

  it("with toggle, the whole row is a button inside the heading", () => {
    const onToggle = vi.fn();
    render(
      <SectionHeading
        number="02"
        title="Presupuesto"
        toggle={{ open: false, controls: "budget", onToggle }}
      />,
    );
    const button = screen.getByRole("button", { name: "02Presupuesto" });
    expect(button.closest("h2")).not.toBeNull();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.getAttribute("aria-controls")).toBe("budget");
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
