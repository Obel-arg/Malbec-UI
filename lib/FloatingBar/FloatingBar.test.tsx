import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "../Sidebar/Sidebar";
import { FloatingBar } from "./FloatingBar";

const desktop = () =>
  (window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

describe("FloatingBar placement", () => {
  it("stays inline by default", () => {
    render(<FloatingBar>1 seleccionado</FloatingBar>);
    expect(screen.getByRole("toolbar").className).not.toContain("ui:fixed");
  });

  it('placement="bottom" pins it to the bottom, centred on the content area, under modals', () => {
    render(<FloatingBar placement="bottom">1 seleccionado</FloatingBar>);
    const bar = screen.getByRole("toolbar");
    const classes = bar.className.split(/\s+/);
    expect(classes).toEqual(
      expect.arrayContaining([
        "ui:fixed",
        "ui:bottom-10",
        "ui:left-[calc(50%+var(--sidebar-offset,0px)/2)]",
        "ui:-translate-x-1/2",
        "ui:z-[calc(var(--ui-z-overlay)-1)]",
      ]),
    );
    expect(bar.dataset.placement).toBe("bottom");
  });
});

describe("Sidebar --sidebar-offset", () => {
  const offsetOf = (open: boolean) => {
    desktop();
    const { container } = render(
      <Sidebar.Provider open={open}>
        <span />
      </Sidebar.Provider>,
    );
    return (container.firstElementChild as HTMLElement).style.getPropertyValue("--sidebar-offset");
  };

  it("is the expanded width when the sidebar is open", () => {
    expect(offsetOf(true)).toBe("var(--sidebar-width)");
  });

  it("is the collapsed width when it is closed", () => {
    expect(offsetOf(false)).toBe("var(--sidebar-width-collapsed)");
  });
});
