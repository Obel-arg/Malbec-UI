import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "./ConfirmDialog";

// Live feedback (MLIVE-393): size, a pending label per action, a trigger slot, an explicit way to
// stay open, and the reason field's own props.
describe("ConfirmDialog options", () => {
  it("size passes through to the AlertDialog", () => {
    render(<ConfirmDialog open onOpenChange={() => {}} size="sm" title="¿Eliminar?" onConfirm={() => {}} />);
    expect(screen.getByRole("alertdialog").getAttribute("data-size")).toBe("sm");
  });

  it("confirmingLabel replaces the generic pending text", async () => {
    let resolve!: () => void;
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="¿Eliminar el costo?"
        confirmLabel="Eliminar"
        confirmingLabel="Eliminando…"
        onConfirm={() => new Promise<void>((r) => (resolve = r))}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.getByRole("button", { name: "Eliminando…" })).toHaveProperty("disabled", true);
    await act(async () => resolve());
  });

  it("trigger opens it without the consumer holding open state", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        trigger={<button type="button">Mover</button>}
        title="¿Mover el show?"
        confirmLabel="Mover ahora"
        onConfirm={onConfirm}
      />,
    );
    expect(screen.queryByRole("alertdialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Mover" }));
    expect(screen.getByRole("alertdialog")).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Mover ahora" }));
    });
    expect(onConfirm).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });

  it("onConfirm returning false keeps it open without throwing", async () => {
    const onOpenChange = vi.fn();
    render(<ConfirmDialog open onOpenChange={onOpenChange} title="¿Rechazar?" onConfirm={async () => false} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    });
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveProperty("disabled", false);
  });

  it("reasonProps and reasonHint reach the reason field", () => {
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Rechazar factura"
        requireReason
        reasonLabel="Motivo"
        reasonHint="Lo ve el proveedor."
        reasonProps={{ maxLength: 280, rows: 2, autoFocus: true }}
        onConfirm={() => {}}
      />,
    );
    const field = screen.getByLabelText("Motivo") as HTMLTextAreaElement;
    expect(field.maxLength).toBe(280);
    expect(field.rows).toBe(2);
    expect(document.activeElement).toBe(field);
    const hint = screen.getByText("Lo ve el proveedor.");
    expect(field.getAttribute("aria-describedby")?.split(" ")).toContain(hint.id);
  });
});
