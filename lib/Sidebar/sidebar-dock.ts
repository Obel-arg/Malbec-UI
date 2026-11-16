/**
 * Hover intent for `Sidebar.Provider collapsible="dock"` (ported from Malbec Artist / Live).
 *
 * The rail keeps its gap in the layout and the panel unfolds over the content when the pointer rests
 * on it. Both delays are the design: opening at once makes the menu jump every time the pointer
 * crosses the rail on its way elsewhere, and closing at once pulls it from under the cursor when the
 * pointer moves diagonally from one item to the next. Lives outside React and the DOM so it can be
 * tested with fake timers.
 */

/** How long the pointer has to rest on the rail before the panel unfolds. */
export const SIDEBAR_DOCK_OPEN_DELAY_MS = 120;
/** How long the panel survives after the pointer leaves it. */
export const SIDEBAR_DOCK_CLOSE_DELAY_MS = 260;

export interface SidebarHoverIntentOptions {
  /** Called only when the state changes. */
  onOpenChange: (open: boolean) => void;
  /**
   * `true` while something hanging from the menu must keep it open: a dropdown portalled to `body`
   * lives outside the rail, so reaching it counts as leaving.
   */
  isHeld?: () => boolean;
  openDelayMs?: number;
  closeDelayMs?: number;
}

export interface SidebarHoverIntent {
  pointerEnter: () => void;
  pointerLeave: () => void;
  /** Opens now: the pointer was already inside when the menu started floating, or focus came in. */
  openNow: () => void;
  /**
   * The button went down on the folded rail. Unfolding between `pointerdown` and `pointerup` swaps
   * the icon for the panel row and the browser drops the `click`, so it doesn't open while pressed.
   */
  press: () => void;
  /** The button went up: if the pointer is still inside, wait the open delay again. */
  release: () => void;
  isPressed: () => boolean;
  closeNow: () => void;
  /** Cancels any pending timer without emitting. */
  dispose: () => void;
}

export function createSidebarHoverIntent({
  onOpenChange,
  isHeld,
  openDelayMs = SIDEBAR_DOCK_OPEN_DELAY_MS,
  closeDelayMs = SIDEBAR_DOCK_CLOSE_DELAY_MS,
}: SidebarHoverIntentOptions): SidebarHoverIntent {
  let open = false;
  let pressed = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    if (timer === null) return;
    clearTimeout(timer);
    timer = null;
  };

  const set = (next: boolean) => {
    if (open === next) return;
    open = next;
    onOpenChange(next);
  };

  const scheduleClose = () => {
    cancel();
    timer = setTimeout(() => {
      timer = null;
      // An open dropdown wins over the pointer leaving: ask again later instead of closing.
      if (isHeld?.()) {
        scheduleClose();
        return;
      }
      set(false);
    }, closeDelayMs);
  };

  const scheduleOpen = () => {
    cancel();
    if (open || pressed) return;
    timer = setTimeout(() => {
      timer = null;
      set(true);
    }, openDelayMs);
  };

  return {
    pointerEnter: scheduleOpen,
    pointerLeave() {
      cancel();
      pressed = false;
      // Leaving before the open delay opens nothing: the pointer was only passing by.
      if (open) scheduleClose();
    },
    openNow() {
      cancel();
      if (!pressed) set(true);
    },
    press() {
      if (open) return;
      pressed = true;
      cancel();
    },
    release() {
      if (!pressed) return;
      pressed = false;
      scheduleOpen();
    },
    isPressed: () => pressed,
    closeNow() {
      cancel();
      set(false);
    },
    dispose: cancel,
  };
}

/** A dropdown trigger inside the menu that is open: its content is portalled outside the rail. */
const OPEN_PORTAL_TRIGGER = '[aria-haspopup][aria-expanded="true"]';

export function isSidebarHeld(zone: HTMLElement | null): boolean {
  return Boolean(zone?.querySelector(OPEN_PORTAL_TRIGGER));
}

/** Focus left an element of the floating menu: fold it unless focus, pointer or a dropdown hold it. */
export function shouldCloseOnFocusLeave(zone: HTMLElement | null, next: Node | null): boolean {
  if (!zone) return false;
  if (next && zone.contains(next)) return false;
  if (zone.matches(":hover")) return false;
  return !isSidebarHeld(zone);
}
