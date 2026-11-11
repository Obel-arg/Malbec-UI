import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buttonVariants } from "../main";
import { Button } from "./Button";

const classesOf = (el: HTMLElement) => el.className.split(/\s+/);

describe("Button", () => {
  it('there is no brand tone: outline and ghost are always grey (malbec-ux-ui)', () => {
    render(
      // @ts-expect-error tone="brand" was removed in 2.0: brand colour is for the primary CTA only.
      <Button variant="outline" tone="brand">
        Exportar
      </Button>,
    );
    const classes = classesOf(screen.getByRole("button"));
    expect(classes).not.toContain("ui:border-primary");
    expect(classes).not.toContain("ui:text-primary");
    expect(classes).toContain("ui:border-background-300");
  });

  it('still accepts tone="neutral" (deprecated, no effect) so 1.x call sites compile', () => {
    render(
      <Button variant="ghost" tone="neutral">
        Cancelar
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(classesOf(button)).toContain("ui:text-text-default");
    expect(button.hasAttribute("data-tone")).toBe(false);
  });

  it("is md by default", () => {
    render(<Button>Guardar</Button>);
    const button = screen.getByRole("button");
    expect(button.dataset.size).toBe("md");
    expect(classesOf(button)).toContain("ui:py-[6px]");
  });

  it("secondary is grey by default", () => {
    render(<Button variant="secondary">Duplicar</Button>);
    const classes = classesOf(screen.getByRole("button"));
    expect(classes).toContain("ui:text-text-default");
    expect(classes).not.toContain("ui:text-primary");
  });

  it.each(["outline", "ghost"] as const)("%s is grey by default", (variant) => {
    render(<Button variant={variant}>Cancelar</Button>);
    const button = screen.getByRole("button");
    const classes = classesOf(button);
    expect(classes).toContain("ui:text-text-default");
    expect(classes).toContain("ui:hover:bg-background-200");
    expect(classes).toContain("ui:focus-visible:ring-focus");
    expect(classes).not.toContain("ui:text-primary");
    expect(classes).not.toContain("ui:focus-visible:ring-primary");
    if (variant === "outline") {
      expect(classes).toContain("ui:border-background-300");
      expect(classes).not.toContain("ui:border-primary");
    }
  });

  it("asChild renders the child element with the button styles", () => {
    render(
      <Button asChild variant="outline">
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
    const classes = buttonVariants({ variant: "outline", size: "md" }).split(/\s+/);
    expect(classes).toContain("ui:border-background-300");
    expect(classes).toContain("ui:h-9");
  });
  it('size="sm" falls back to md geometry: malbec-ux-ui never pairs sm with text', () => {
    render(<Button size="sm">Guardar</Button>);
    const classes = classesOf(screen.getByRole("button"));
    expect(classes).toEqual(expect.arrayContaining(["ui:h-9", "ui:px-4", "ui:text-[12px]"]));
    expect(classes).not.toContain("ui:text-[10px]");
  });

  it('size="icon-sm" is a 32px square for compact icon buttons', () => {
    render(
      <Button size="icon-sm" variant="outline" aria-label="Mes anterior">
        <Button.Icon>
          <svg />
        </Button.Icon>
      </Button>,
    );
    const classes = classesOf(screen.getByRole("button", { name: "Mes anterior" }));
    expect(classes).toEqual(expect.arrayContaining(["ui:h-8", "ui:w-8", "ui:p-0"]));
  });
});
