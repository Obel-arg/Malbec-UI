import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { inboxItemHoverBarVariants } from "../Inbox/inbox-variants";
import { Input } from "../Input/Input";

const classes = (s: string) => s.split(/\s+/);

/** Things that only a mouse could reach: hover-only bars and tooltips that ignore a tap. */
describe("reachable with a finger", () => {
  it("Input locked shows its reason on a tap, and a second tap hides it", () => {
    render(<Input aria-label="Moneda" defaultValue="USD" locked lockReason="La define el contrato." />);
    const lock = document.querySelector('[data-slot="input-lock"] [data-lock-trigger]')!;
    expect(lock).not.toBeNull();
    const tap = () => {
      fireEvent.pointerDown(lock, { pointerType: "touch" });
      fireEvent.click(lock);
    };
    tap();
    expect(screen.getAllByText("La define el contrato.").some((n) => n.closest('[data-slot="tooltip-content"], [role="tooltip"]'))).toBe(true);
    tap();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("Inbox row actions are always visible, in the row's flow, on touch screens", () => {
    const c = classes(inboxItemHoverBarVariants());
    expect(c).toContain("ui:pointer-coarse:opacity-100");
    expect(c).toContain("ui:pointer-coarse:pointer-events-auto");
    expect(c).toContain("ui:pointer-coarse:static");
  });

  it("a touch on a DropdownMenu sub-trigger doesn't fake a mouse hover", () => {
    render(
      <DropdownMenu open>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Nested</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    const sub = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')!;
    const moves = vi.fn();
    sub.addEventListener("pointermove", moves);
    fireEvent.pointerEnter(sub, { pointerType: "touch" });
    expect(moves).not.toHaveBeenCalled();
    fireEvent.pointerEnter(sub, { pointerType: "mouse" });
    expect(moves).toHaveBeenCalled();
  });
});
