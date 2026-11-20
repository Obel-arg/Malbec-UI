import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as barrel from "../main";
import { Sidebar, useSidebar, type SidebarProviderProps } from "./Sidebar";

// Live feedback (MLIVE-393): a walkthrough opens the dock panel floating from outside, the hover
// must not fold it meanwhile, and a `fixed` card outside the provider needs the sidebar offset.
function mockDesktop() {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

function Walkthrough() {
  const { openOverlay, closeOverlay, overlayOpen } = useSidebar();
  return (
    <>
      <button type="button" onClick={openOverlay}>
        Mostrar menú
      </button>
      <button type="button" onClick={closeOverlay}>
        Ocultar menú
      </button>
      <span data-testid="forced">{String(overlayOpen)}</span>
    </>
  );
}

const app = (props: Partial<SidebarProviderProps> = {}) => (
  <Sidebar.Provider collapsible="dock" defaultOpen={false} {...props}>
    <Sidebar.Gap>
      <Sidebar>
        <Sidebar.Content>
          <a href="#costos">Costos</a>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset>
        <Walkthrough />
      </Sidebar.Inset>
    </Sidebar.Gap>
  </Sidebar.Provider>
);

const dock = () => document.querySelector<HTMLElement>('[data-slot="sidebar-dock"]')!;
const panel = () => document.querySelector<HTMLElement>('[data-slot="sidebar"]')!;

describe("Sidebar dock overlay from outside", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("style");
  });

  it("openOverlay() unfolds the panel floating, and Escape or focus leaving does not fold it", () => {
    mockDesktop();
    render(app());
    expect(panel().dataset.state).toBe("collapsed");

    fireEvent.click(screen.getByRole("button", { name: "Mostrar menú" }));
    expect(panel().dataset.state).toBe("expanded");
    expect(dock().dataset.overlay).toBeDefined();
    expect(screen.getByTestId("forced").textContent).toBe("true");

    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.focus(screen.getByText("Costos"));
    fireEvent.blur(screen.getByText("Costos"), { relatedTarget: document.body });
    expect(panel().dataset.state).toBe("expanded");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar menú" }));
    expect(panel().dataset.state).toBe("collapsed");
    expect(screen.getByTestId("forced").textContent).toBe("false");
  });

  it("controlled overlayOpen floats the panel even when pinned, and gives the content its space back", () => {
    mockDesktop();
    const onOverlayOpenChange = vi.fn();
    const { rerender, container } = render(app({ open: true, overlayOpen: true, onOverlayOpenChange }));
    const provider = container.firstElementChild as HTMLElement;
    expect(panel().dataset.state).toBe("expanded");
    expect(dock().dataset.overlay).toBeDefined();
    expect(provider.style.getPropertyValue("--sidebar-offset")).toBe("var(--sidebar-width-collapsed)");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar menú" }));
    expect(onOverlayOpenChange).toHaveBeenCalledWith(false);
    // Controlled: nothing changes until the parent says so.
    expect(dock().dataset.overlay).toBeDefined();

    rerender(app({ open: true, overlayOpen: false, onOverlayOpenChange }));
    expect(dock().dataset.overlay).toBeUndefined();
    expect(provider.style.getPropertyValue("--sidebar-offset")).toBe("var(--sidebar-width)");
  });
});

describe("Sidebar offsetVariable", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("style");
  });

  it("publishes the space the sidebar takes on <html>, follows pinning and cleans up on unmount", () => {
    mockDesktop();
    const { rerender, unmount } = render(app({ open: false, offsetVariable: "--app-sidebar-offset" }));
    const root = document.documentElement.style;
    expect(root.getPropertyValue("--app-sidebar-offset")).toBe(barrel.SIDEBAR_WIDTH_COLLAPSED);

    act(() => {
      rerender(app({ open: true, offsetVariable: "--app-sidebar-offset" }));
    });
    expect(root.getPropertyValue("--app-sidebar-offset")).toBe(barrel.SIDEBAR_WIDTH);

    unmount();
    expect(root.getPropertyValue("--app-sidebar-offset")).toBe("");
  });

  it("exports the sidebar widths", () => {
    expect(barrel.SIDEBAR_WIDTH).toBe("16rem");
    expect(barrel.SIDEBAR_WIDTH_COLLAPSED).toBe("4rem");
  });
});
