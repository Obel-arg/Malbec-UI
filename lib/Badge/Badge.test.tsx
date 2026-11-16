import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

const classesOf = (el: HTMLElement) => el.className.split(/\s+/);

describe("Badge", () => {
  it("has a neutral variant with the system grey pair", () => {
    render(<Badge variant="neutral">Borrador</Badge>);
    const classes = classesOf(screen.getByText("Borrador"));
    expect(classes).toContain("ui:[--malbec-badge-bg:#e4e2df]");
    expect(classes).toContain("ui:[--malbec-badge-fg:#6b6b7a]");
  });

  it("paints colour tones through CSS variables an app can override", () => {
    render(<Badge variant="red">Vencido</Badge>);
    const classes = classesOf(screen.getByText("Vencido"));
    expect(classes).toContain("ui:bg-(--malbec-badge-bg)");
    expect(classes).toContain("ui:text-(--malbec-badge-fg)");
    expect(classes).toContain("ui:[--malbec-badge-bg:#dfd0d0]");
  });

  it("uses the 8px chip radius, never 4px or a capsule", () => {
    render(<Badge>Activo</Badge>);
    const classes = classesOf(screen.getByText("Activo"));
    expect(classes).toContain("ui:rounded-[8px]");
    expect(classes).not.toContain("ui:rounded-[4px]");
  });

  it("destructive is the two-tone red pair, not solid red with white text", () => {
    render(<Badge variant="destructive">Vencido</Badge>);
    const classes = classesOf(screen.getByText("Vencido"));
    expect(classes).toContain("ui:[--malbec-badge-bg:#dfd0d0]");
    expect(classes).toContain("ui:[--malbec-badge-fg:#602a2a]");
    expect(classes).not.toContain("ui:bg-destructive");
  });

  it("size=xs shrinks the chip and keeps md as the default", () => {
    render(
      <>
        <Badge>Normal</Badge>
        <Badge size="xs">Chico</Badge>
      </>,
    );
    const normal = classesOf(screen.getByText("Normal"));
    const xs = classesOf(screen.getByText("Chico"));
    expect(normal).toContain("ui:text-xs");
    expect(normal).toContain("ui:px-2.5");
    expect(xs).toEqual(expect.arrayContaining(["ui:h-5", "ui:px-1.5", "ui:py-0", "ui:text-[11px]"]));
    expect(xs).not.toContain("ui:text-xs");
    expect(xs).not.toContain("ui:px-2.5");
    expect(screen.getByText("Chico").dataset.size).toBe("xs");
  });
});
