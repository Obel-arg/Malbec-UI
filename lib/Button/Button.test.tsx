import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buttonVariants } from "../main";
import { Button } from "./Button";

const classesOf = (el: HTMLElement) => el.className.split(/\s+/);

describe("Button", () => {
  it("keeps the brand colour by default", () => {
    render(<Button variant="outline">Exportar</Button>);
    const classes = classesOf(screen.getByRole("button"));
    expect(classes).toContain("ui:border-primary");
    expect(classes).toContain("ui:text-primary");
  });

  it.each(["outline", "ghost"] as const)("tone=neutral turns %s grey", (variant) => {
    render(
      <Button variant={variant} tone="neutral">
        Cancelar
      </Button>,
    );
    const button = screen.getByRole("button");
    const classes = classesOf(button);
    expect(classes).toContain("ui:text-text-default");
    expect(classes).toContain("ui:hover:bg-background-200");
    expect(classes).toContain("ui:focus-visible:ring-malbec-icon");
    expect(classes).not.toContain("ui:text-primary");
    expect(classes).not.toContain("ui:focus-visible:ring-primary");
    expect(button.dataset.tone).toBe("neutral");
    if (variant === "outline") {
      expect(classes).toContain("ui:border-background-300");
      expect(classes).not.toContain("ui:border-primary");
    }
  });

  it("asChild renders the child element with the button styles", () => {
    render(
      <Button asChild variant="outline" tone="neutral">
        <a href="/gastos">Ver gastos</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Ver gastos" });
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("type")).toBeNull();
    expect(classesOf(link)).toContain("ui:border-background-300");
    expect(classesOf(link)).toContain("ui:h-9");
  });

  it("variant=row is a full-width, left-aligned list row", () => {
    render(<Button variant="row">Agregar crédito</Button>);
    const classes = classesOf(screen.getByRole("button"));
    expect(classes).toEqual(expect.arrayContaining(["ui:w-full", "ui:justify-start", "ui:h-auto", "ui:font-normal"]));
    expect(classes).not.toContain("ui:h-9");
    expect(classes).not.toContain("ui:justify-center");
  });

  it("exports buttonVariants for links and other elements", () => {
    const classes = buttonVariants({ variant: "outline", tone: "neutral", size: "md" }).split(/\s+/);
    expect(classes).toContain("ui:border-background-300");
    expect(classes).toContain("ui:h-9");
  });
});
