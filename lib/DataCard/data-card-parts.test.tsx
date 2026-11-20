import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataCard } from "./DataCard";

// Live feedback (MLIVE-393): ~20 panels share the data card's anatomy with free content (lists,
// three figures, a small chart), and a KPI strip needs a chip at the end of the title row.
const classesOf = (el: Element | null) => el?.className.split(/\s+/) ?? [];

describe("DataCard parts", () => {
  it("Frame, Block and Title carry exactly the classes DataCard uses", () => {
    const card = render(<DataCard value="3" label="Shows" />).container;
    const parts = render(
      <DataCard.Frame>
        <DataCard.Title>Próximos shows</DataCard.Title>
        <DataCard.Block>
          <ul>
            <li>Selena Quintanilla</li>
          </ul>
        </DataCard.Block>
      </DataCard.Frame>,
    ).container;

    const frameOf = (c: HTMLElement) => c.querySelector('[data-slot="data-card"], [data-slot="data-card-frame"]');
    expect(classesOf(frameOf(parts)).sort()).toEqual(classesOf(frameOf(card)).sort());
    const blockOf = (c: HTMLElement) => c.querySelector('[data-slot="data-card-block"]');
    expect(classesOf(blockOf(parts)).sort()).toEqual(classesOf(blockOf(card)).sort());
    const titleOf = (c: HTMLElement) => c.querySelector('[data-slot="data-card-title"]');
    expect(classesOf(titleOf(parts)).sort()).toEqual(classesOf(titleOf(card)).sort());
    // The title can sit above the block: the order is the consumer's.
    expect(frameOf(parts)!.firstElementChild).toBe(titleOf(parts));
    expect(screen.getByText("Selena Quintanilla")).toBeTruthy();
  });

  it("keeps the 1.5px ring of the data card (embossed.md §2)", () => {
    const { container } = render(<DataCard.Frame />);
    expect(classesOf(container.firstElementChild)).toContain("ui:shadow-[0_0_0_1.5px_var(--color-background-200)]");
  });

  it("titleAside sits at the end of the title row and doesn't truncate", () => {
    render(<DataCard value="US$ 1.204" label="CPA" titleAside={<span>-85 %</span>} />);
    const aside = screen.getByText("-85 %").parentElement!;
    expect(aside.getAttribute("data-slot")).toBe("data-card-title-aside");
    expect(classesOf(aside)).toEqual(expect.arrayContaining(["ui:ml-auto", "ui:shrink-0"]));
    expect(aside.parentElement!.getAttribute("data-slot")).toBe("data-card-title");
  });
});

describe("DataCard parts asChild", () => {
  it("Frame and Block render as the child element, keeping the classes and the slot", () => {
    const { container } = render(
      <ul>
        <DataCard.Frame asChild>
          <li>
            <DataCard.Block asChild>
              <a href="/propuestas/1">Propuesta Movistar Arena</a>
            </DataCard.Block>
          </li>
        </DataCard.Frame>
      </ul>,
    );
    const frame = container.querySelector("li")!;
    expect(frame.getAttribute("data-slot")).toBe("data-card-frame");
    expect(classesOf(frame)).toContain("ui:rounded-[14px]");
    const block = screen.getByRole("link", { name: "Propuesta Movistar Arena" });
    expect(block.getAttribute("data-slot")).toBe("data-card-block");
    expect(classesOf(block)).toContain("ui:rounded-[10px]");
    expect(container.querySelector("div")).toBeNull();
  });
});

describe("DataCard parts asChild classes", () => {
  it("the child's own classes override the part's, like a className on the part does", () => {
    render(
      <DataCard.Block asChild>
        <a href="/resultados" className="p-0 flex-row">
          Resultados
        </a>
      </DataCard.Block>,
    );
    const classes = classesOf(screen.getByRole("link", { name: "Resultados" }));
    expect(classes).toEqual(expect.arrayContaining(["p-0", "flex-row"]));
    expect(classes).not.toContain("ui:px-4");
    expect(classes).not.toContain("ui:py-3");
    expect(classes).not.toContain("ui:flex-col");
    expect(classes).toContain("ui:rounded-[10px]");
  });
});
