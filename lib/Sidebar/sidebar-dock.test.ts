import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  SIDEBAR_DOCK_CLOSE_DELAY_MS,
  SIDEBAR_DOCK_OPEN_DELAY_MS,
  createSidebarHoverIntent,
} from "./sidebar-dock";

describe("sidebar dock hover intent", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const setup = (isHeld = () => false) => {
    const onOpenChange = vi.fn();
    return { onOpenChange, intent: createSidebarHoverIntent({ onOpenChange, isHeld }) };
  };

  it("opens only after the pointer rests on the rail", () => {
    const { intent, onOpenChange } = setup();
    intent.pointerEnter();
    vi.advanceTimersByTime(SIDEBAR_DOCK_OPEN_DELAY_MS - 1);
    expect(onOpenChange).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it("a pointer that only passes by opens nothing", () => {
    const { intent, onOpenChange } = setup();
    intent.pointerEnter();
    intent.pointerLeave();
    vi.runAllTimers();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes after the close delay, unless re-entered", () => {
    const { intent, onOpenChange } = setup();
    intent.openNow();
    intent.pointerLeave();
    vi.advanceTimersByTime(SIDEBAR_DOCK_CLOSE_DELAY_MS - 1);
    intent.pointerEnter();
    vi.runAllTimers();
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    intent.pointerLeave();
    vi.advanceTimersByTime(SIDEBAR_DOCK_CLOSE_DELAY_MS);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("an open dropdown inside the menu keeps it open", () => {
    let held = true;
    const { intent, onOpenChange } = setup(() => held);
    intent.openNow();
    intent.pointerLeave();
    vi.advanceTimersByTime(SIDEBAR_DOCK_CLOSE_DELAY_MS * 3);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    held = false;
    vi.advanceTimersByTime(SIDEBAR_DOCK_CLOSE_DELAY_MS);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("does not unfold while the button is pressed, so the click lands", () => {
    const { intent, onOpenChange } = setup();
    intent.pointerEnter();
    intent.press();
    vi.runAllTimers();
    intent.openNow();
    expect(onOpenChange).not.toHaveBeenCalled();
    intent.release();
    vi.advanceTimersByTime(SIDEBAR_DOCK_OPEN_DELAY_MS);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });
});
