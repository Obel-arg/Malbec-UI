import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Popover } from "./Popover";

function renderOpen(surface: "popover" | "plain") {
  render(
    <Popover open>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Content surface={surface} data-testid="content">
        Panel
      </Popover.Content>
    </Popover>,
  );
  return screen.getByTestId("content").className;
}

describe("Popover.Content surface", () => {
  it("plain drops the frame but keeps the open/close motion and the floating layer", () => {
    const classes = renderOpen("plain");
    expect(classes).toContain("ui:data-[state=open]:animate-[malbec-popover-in_var(--malbec-popover-enter-duration,150ms)_ease-out]");
    expect(classes).toContain("ui:data-[state=closed]:animate-[malbec-popover-out_var(--malbec-popover-exit-duration,120ms)_ease-in]");
    expect(classes).toContain("ui:z-(--ui-z-floating)");
    expect(classes).not.toContain("ui:border-background-300");
    expect(classes).not.toContain("ui:p-3");
  });

  it("popover keeps frame, motion and layer", () => {
    const classes = renderOpen("popover");
    expect(classes).toContain("ui:border-background-300");
    expect(classes).toContain("ui:z-(--ui-z-floating)");
    expect(classes).toContain("ui:data-[state=open]:animate-[malbec-popover-in_var(--malbec-popover-enter-duration,150ms)_ease-out]");
  });
});
