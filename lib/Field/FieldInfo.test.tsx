import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { Input } from "../Input/Input";
import { Field } from "./Field";

function renderInfo(props: { infoOnHover?: boolean } = {}) {
  return render(
    <Field>
      <Field.Label
        htmlFor="fee"
        {...props}
        infoLabel="Cómo se calcula"
        info={
          <ul>
            <li>Primer criterio.</li>
            <li>Segundo criterio.</li>
          </ul>
        }
      >
        Comisión
      </Field.Label>
      <Input id="fee" defaultValue="12%" />
    </Field>,
  );
}

describe("Field.Label info", () => {
  it("keeps the input's name to the label text: the i is a sibling, not inside the <label>", () => {
    renderInfo();
    expect(screen.getByRole("textbox", { name: "Comisión" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Cómo se calcula" }).closest("label")).toBeNull();
  });

  it("names the button from MalbecLabelsProvider when infoLabel is not given", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <Field>
          <Field.Label htmlFor="fee" info="Se aplica sobre el neto.">
            Comisión
          </Field.Label>
          <Input id="fee" />
        </Field>
      </MalbecLabelsProvider>,
    );
    expect(screen.getByRole("button", { name: "Más información" })).toBeTruthy();
  });

  it("keeps the text out of the DOM until the i is clicked", () => {
    renderInfo();
    expect(screen.queryByText("Primer criterio.")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Cómo se calcula" }));
    expect(screen.getByText("Primer criterio.")).toBeTruthy();
  });

  it("is a native button with a short name; Escape closes it", async () => {
    renderInfo();
    const trigger = screen.getByRole("button", { name: "Cómo se calcula" });
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.getAttribute("type")).toBe("button");
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(screen.getByText("Primer criterio.").closest('[data-slot="info-popover-content"]')!, {
      key: "Escape",
    });
    await waitFor(() => expect(screen.queryByText("Primer criterio.")).toBeNull());
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("with infoOnHover opens on mouse enter, closes on leave, and a click pins it", () => {
    vi.useFakeTimers();
    try {
      renderInfo({ infoOnHover: true });
      const trigger = screen.getByRole("button", { name: "Cómo se calcula" });
      fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(200));
      expect(screen.getByText("Primer criterio.")).toBeTruthy();
      fireEvent.pointerLeave(trigger, { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(250));
      expect(screen.queryByText("Primer criterio.")).toBeNull();

      fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(200));
      fireEvent.click(trigger);
      fireEvent.pointerLeave(trigger, { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(250));
      expect(screen.getByText("Primer criterio.")).toBeTruthy();
    } finally {
      vi.useRealTimers();
    }
  });
});
