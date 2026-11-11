import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InfoPopover } from "./InfoPopover";

function renderInfo(props: { openOnHover?: boolean } = {}) {
  return render(
    <InfoPopover
      {...props}
      label="Cómo se calcula"
      content={
        <ul>
          <li>Primer criterio.</li>
          <li>Segundo criterio.</li>
        </ul>
      }
    />,
  );
}

describe("InfoPopover", () => {
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

  it("with openOnHover opens on mouse enter, closes on leave, and a click pins it", () => {
    vi.useFakeTimers();
    try {
      renderInfo({ openOnHover: true });
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
