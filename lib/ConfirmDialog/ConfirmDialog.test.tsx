import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("keeps the dialog open while an async confirm runs, then closes", async () => {
    let resolve!: () => void;
    const onConfirm = vi.fn(() => new Promise<void>((r) => (resolve = r)));
    const onOpenChange = vi.fn();
    render(
      <ConfirmDialog open onOpenChange={onOpenChange} title="¿Eliminar el costo?" onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    const pending = screen.getByRole("button", { name: "Confirming…" });
    expect(pending).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveProperty("disabled", true);
    expect(onOpenChange).not.toHaveBeenCalled();

    await act(async () => resolve());
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("stays open when the confirm fails", async () => {
    const onOpenChange = vi.fn();
    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="¿Eliminar?"
        error="No se pudo eliminar."
        onConfirm={() => Promise.reject(new Error("boom"))}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Confirm" })).toHaveProperty("disabled", false));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toBe("No se pudo eliminar.");
  });

  it("requireReason: an empty reason marks the field and says why, it never confirms", async () => {
    const onConfirm = vi.fn();
    render(
      <MalbecLabelsProvider locale="es">
        <ConfirmDialog
          open
          onOpenChange={() => {}}
          title="Rechazar factura"
          tone="destructive"
          requireReason
          confirmLabel="Rechazar"
          onConfirm={onConfirm}
        />
      </MalbecLabelsProvider>,
    );
    const reject = screen.getByRole("button", { name: "Rechazar" });
    expect(reject).toHaveProperty("disabled", false);

    fireEvent.click(reject);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByText("Escribí el motivo para continuar.")).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByLabelText("Motivo").getAttribute("aria-invalid")).toBe("true"),
    );

    fireEvent.change(screen.getByLabelText("Motivo"), { target: { value: "  Monto mal cargado " } });
    await act(async () => {
      fireEvent.click(reject);
    });
    expect(onConfirm).toHaveBeenCalledWith("Monto mal cargado");
  });
});
