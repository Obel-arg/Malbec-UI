import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { Sheet } from "../Sheet/Sheet";
import { Dialog } from "./Dialog";

const slot = (name: string) => {
  const el = document.querySelector<HTMLElement>(`[data-slot="${name}"]`);
  if (!el) throw new Error(`missing [data-slot="${name}"]`);
  return el.className.split(/\s+/);
};

const FLOATING_SHADOW = "ui:shadow-[0_24px_70px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.1)]";
const VEILED_SHADOW = "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]";

describe("Dialog", () => {
  it("has no veil by default and floats the surface on the two-layer shadow, 425px wide", () => {
    render(
      <Dialog open>
        <Dialog.Content aria-describedby={undefined}>
          <Dialog.Title>Editar</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    );
    const overlay = slot("dialog-overlay");
    expect(overlay).toContain("ui:bg-transparent");
    expect(overlay).not.toContain("ui:bg-background-200/60");
    const content = slot("dialog-content");
    expect(content).toContain(FLOATING_SHADOW);
    expect(content).not.toContain(VEILED_SHADOW);
    expect(content).toContain("ui:max-w-[425px]");
  });

  it('overlay="veil" brings back the frosted veil and the short shadow', () => {
    render(
      <Dialog open>
        <Dialog.Content overlay="veil" aria-describedby={undefined}>
          <Dialog.Title>Editar</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    );
    expect(slot("dialog-overlay")).toEqual(
      expect.arrayContaining(["ui:bg-background-200/60", "ui:backdrop-blur-[3.5px]"]),
    );
    const content = slot("dialog-content");
    expect(content).toContain(VEILED_SHADOW);
    expect(content).not.toContain(FLOATING_SHADOW);
  });

  it.each([
    ["sm", "448px"],
    ["md", "560px"],
    ["lg", "640px"],
    ["xl", "880px"],
  ] as const)("size=%s is %s wide and never wider than the viewport", (size, px) => {
    render(
      <Dialog open>
        <Dialog.Content size={size} aria-describedby={undefined}>
          <Dialog.Title>Editar</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    );
    const content = slot("dialog-content");
    expect(content).toContain(`ui:w-[min(calc(100vw-2rem),${px})]`);
    expect(content).toContain("ui:max-w-none");
    expect(content).not.toContain("ui:max-w-[425px]");
  });
});

describe("Sheet", () => {
  it("has no veil by default and casts the shadow away from the edge", () => {
    render(
      <Sheet open>
        <Sheet.Content side="right" aria-describedby={undefined}>
          <Sheet.Title>Detalle</Sheet.Title>
        </Sheet.Content>
      </Sheet>,
    );
    expect(slot("sheet-overlay")).toContain("ui:bg-transparent");
    expect(slot("sheet-content")).toContain(
      "ui:shadow-[-24px_0_70px_rgba(0,0,0,0.12),-8px_0_20px_rgba(0,0,0,0.06)]",
    );
  });

  it('overlay="veil" brings back the veil and the short shadow', () => {
    render(
      <Sheet open>
        <Sheet.Content overlay="veil" aria-describedby={undefined}>
          <Sheet.Title>Detalle</Sheet.Title>
        </Sheet.Content>
      </Sheet>,
    );
    expect(slot("sheet-overlay")).toContain("ui:bg-background-200/60");
    const content = slot("sheet-content");
    expect(content).toContain(VEILED_SHADOW);
    expect(content.some((c) => c.includes("70px"))).toBe(false);
  });

  it("size sets the width of a side sheet", () => {
    render(
      <Sheet open>
        <Sheet.Content size="md" aria-describedby={undefined}>
          <Sheet.Title>Detalle</Sheet.Title>
        </Sheet.Content>
      </Sheet>,
    );
    const content = slot("sheet-content");
    expect(content).toContain("ui:w-[min(100vw,576px)]");
    expect(content).not.toContain("ui:w-[384px]");
  });

  it("Sheet.Body scroll fills the space between header and footer and scrolls", () => {
    render(
      <Sheet open>
        <Sheet.Content aria-describedby={undefined}>
          <Sheet.Title>Detalle</Sheet.Title>
          <Sheet.Body scroll>contenido</Sheet.Body>
        </Sheet.Content>
      </Sheet>,
    );
    expect(slot("sheet-body")).toEqual(
      expect.arrayContaining(["ui:min-h-0", "ui:flex-1", "ui:overflow-y-auto"]),
    );
  });
});

describe("AlertDialog", () => {
  it("has no veil by default", () => {
    render(
      <AlertDialog open>
        <AlertDialog.Content>
          <AlertDialog.Title>¿Borrar?</AlertDialog.Title>
          <AlertDialog.Description>No se puede deshacer.</AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog>,
    );
    expect(slot("alert-dialog-overlay")).toContain("ui:bg-transparent");
    expect(slot("alert-dialog-content")).toContain(FLOATING_SHADOW);
  });

  it('overlay="veil" reaches the overlay that lives inside Content', () => {
    render(
      <AlertDialog open>
        <AlertDialog.Content overlay="veil">
          <AlertDialog.Title>¿Borrar?</AlertDialog.Title>
          <AlertDialog.Description>No se puede deshacer.</AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog>,
    );
    expect(slot("alert-dialog-overlay")).toContain("ui:bg-background-200/60");
    expect(slot("alert-dialog-content")).toContain(VEILED_SHADOW);
  });
});

// Apps target a variant from CSS without depending on DOM order (Live, MLIVE-274).
describe("the overlay carries data-overlay", () => {
  const overlayOf = (name: string) =>
    document.querySelector<HTMLElement>(`[data-slot="${name}"]`)?.dataset.overlay;

  it("Dialog", () => {
    render(
      <Dialog open>
        <Dialog.Content overlay="veil" aria-describedby={undefined}>
          <Dialog.Title>Editar</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    );
    expect(overlayOf("dialog-overlay")).toBe("veil");
  });

  it("Sheet", () => {
    render(
      <Sheet open>
        <Sheet.Content aria-describedby={undefined}>
          <Sheet.Title>Detalle</Sheet.Title>
        </Sheet.Content>
      </Sheet>,
    );
    expect(overlayOf("sheet-overlay")).toBe("none");
  });

  it("AlertDialog", () => {
    render(
      <AlertDialog open>
        <AlertDialog.Content>
          <AlertDialog.Title>¿Borrar?</AlertDialog.Title>
          <AlertDialog.Description>No se puede deshacer.</AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog>,
    );
    expect(overlayOf("alert-dialog-overlay")).toBe("none");
  });
});
