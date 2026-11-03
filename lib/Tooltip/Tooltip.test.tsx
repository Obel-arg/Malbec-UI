import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";

const content = () =>
  document.querySelector<HTMLElement>('[data-slot="tooltip-content"]')!.className.split(/\s+/);

const tooltip = (variant?: "light" | "dark") => (
  <Tooltip.Provider>
    <Tooltip open>
      <Tooltip.Trigger>Descargar</Tooltip.Trigger>
      <Tooltip.Content variant={variant}>Descargar PDF</Tooltip.Content>
    </Tooltip>
  </Tooltip.Provider>
);

describe("Tooltip", () => {
  it("stays light by default", () => {
    render(tooltip());
    expect(content()).toContain("ui:bg-background-100");
  });

  it('variant="dark" is la negra: ink surface, light 13px medium text, no border', () => {
    render(tooltip("dark"));
    const classes = content();
    expect(classes).toEqual(
      expect.arrayContaining([
        "ui:bg-malbec-ink",
        "ui:text-background-100",
        "ui:border-0",
        "ui:text-[13px]",
        "ui:font-medium",
        "ui:px-2.5",
      ]),
    );
    expect(classes).not.toContain("ui:bg-background-100");
    expect(classes).not.toContain("ui:text-base");
  });
});
