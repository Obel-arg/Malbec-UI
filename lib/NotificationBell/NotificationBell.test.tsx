import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { NotificationBell } from "./NotificationBell";

const q = (slot: string) => document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

describe("NotificationBell", () => {
  it("up to date: outline, no dot, no ink, plain label", () => {
    render(<NotificationBell unreadCount={0} />);
    const bell = screen.getByRole("button", { name: "Notifications" });
    expect(bell.dataset.unread).toBeUndefined();
    expect(q("notification-bell-dot")).toBeNull();
    expect(q("notification-bell-glyph")!.getAttribute("class")).not.toContain("malbec-ink");
    // The waves stay in the DOM so they can animate in.
    expect(document.querySelectorAll('[data-slot="notification-bell-wave"]')).toHaveLength(2);
  });

  it("with unread: filled in ink, a dot, and the count only in the label", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <NotificationBell unreadCount={120} />
      </MalbecLabelsProvider>,
    );
    const bell = screen.getByRole("button", { name: "Notificaciones (99+)" });
    expect(bell.dataset.unread).toBeDefined();
    expect(q("notification-bell-glyph")!.getAttribute("class")).toContain("ui:text-malbec-ink");
    expect(q("notification-bell-dot")!.getAttribute("aria-hidden")).toBe("true");
    expect(bell.textContent).toBe("");
  });

  it("an arrival shakes the bell and remounts the dot", () => {
    const { rerender } = render(<NotificationBell unreadCount={1} />);
    const firstDot = q("notification-bell-dot");
    expect(q("notification-bell-ring")!.dataset.shaking).toBeUndefined();

    rerender(<NotificationBell unreadCount={2} />);
    expect(q("notification-bell-ring")!.dataset.shaking).toBeDefined();
    expect(q("notification-bell-dot")).not.toBe(firstDot);
  });

  it("reading notifications is not an arrival", () => {
    const { rerender } = render(<NotificationBell unreadCount={3} />);
    const dot = q("notification-bell-dot");
    rerender(<NotificationBell unreadCount={2} />);
    expect(q("notification-bell-ring")!.dataset.shaking).toBeUndefined();
    expect(q("notification-bell-dot")).toBe(dot);
  });
});
