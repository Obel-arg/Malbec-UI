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
