import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Sidebar, useSidebar } from "./Sidebar";

function mockViewport(mobile: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: mobile,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

function Probe() {
  return <span data-testid="probe">{useSidebar().isMobile ? "mobile" : "desktop"}</span>;
}

const app = (
  <Sidebar.Provider>
    <Probe />
  </Sidebar.Provider>
);

describe("Sidebar useIsMobile", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("hydrates on a mobile viewport without a mismatch, then switches to mobile", async () => {
    // The server has no window, so it always renders the desktop layout.
    mockViewport(false);
    const container = document.createElement("div");
    container.innerHTML = renderToString(app);
    document.body.append(container);

    mockViewport(true);
    const onRecoverableError = vi.fn();
    await act(async () => {
      hydrateRoot(container, app, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.querySelector('[data-testid="probe"]')?.textContent).toBe("mobile");
  });
});

describe('Sidebar collapsible="dock"', () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const dockApp = () => (
    <Sidebar.Provider collapsible="dock" defaultOpen={false}>
      <Sidebar.Gap>
        <Sidebar>
          <Sidebar.Content>
            <a href="#costos">Costos</a>
          </Sidebar.Content>
        </Sidebar>
        <Sidebar.Inset>
          <Sidebar.Trigger />
        </Sidebar.Inset>
      </Sidebar.Gap>
    </Sidebar.Provider>
  );

  it("floats over the content: the dock keeps the rail and focus unfolds the panel", () => {
    mockViewport(false);
    render(dockApp());
    const dock = document.querySelector<HTMLElement>('[data-slot="sidebar-dock"]')!;
    const panel = document.querySelector<HTMLElement>('[data-slot="sidebar"]')!;
    expect(dock.dataset.overlay).toBeDefined();
    expect(panel.dataset.state).toBe("collapsed");

    fireEvent.focus(screen.getByText("Costos"));
    expect(panel.dataset.state).toBe("expanded");
    expect(dock.dataset.open).toBeDefined();
    // Still floating: the content does not move.
    expect(dock.dataset.overlay).toBeDefined();
  });

  it("the trigger pins and unpins the panel", () => {
    mockViewport(false);
    render(dockApp());
    const dock = document.querySelector<HTMLElement>('[data-slot="sidebar-dock"]')!;
    const pin = screen.getByRole("button", { name: "Pin sidebar" });
    expect(pin.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(pin);
    expect(dock.dataset.overlay).toBeUndefined();
    const unpin = screen.getByRole("button", { name: "Unpin sidebar" });
    expect(unpin.getAttribute("aria-pressed")).toBe("true");
    const panel = document.querySelector<HTMLElement>('[data-slot="sidebar"]')!;
    expect(panel.dataset.state).toBe("expanded");
  });

  it('keeps the classic rail without collapsible="dock"', () => {
    mockViewport(false);
    render(
      <Sidebar.Provider>
        <Sidebar />
      </Sidebar.Provider>,
    );
    expect(document.querySelector('[data-slot="sidebar-dock"]')).toBeNull();
  });
});
