import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table } from "./Table";

function rect(top: number, height: number): DOMRect {
  return { top, height, bottom: top + height, left: 0, right: 800, width: 800, x: 0, y: top, toJSON: () => ({}) };
}

function setup(stickyHeader: React.ComponentProps<typeof Table>["stickyHeader"], root: HTMLDivElement) {
  render(
    <Table stickyHeader={stickyHeader}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Show</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Rosario</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
    { container: root.appendChild(document.createElement("div")) },
  );
  const th = screen.getByRole("columnheader");
  const thead = th.closest("thead")!;
  const table = th.closest("table")!;
  vi.spyOn(root, "getBoundingClientRect").mockReturnValue(rect(0, 800));
  vi.spyOn(thead, "getBoundingClientRect").mockReturnValue(rect(0, 44));
  const place = (top: number) => {
    vi.spyOn(table, "getBoundingClientRect").mockReturnValue(rect(top, 500));
    act(() => {
      root.dispatchEvent(new Event("scroll"));
    });
  };
  return { th, thead, place };
}

function makeRoot() {
  const root = document.createElement("div");
  document.body.appendChild(root);
  return root;
}

describe("Table stickyHeader={{ scrollRoot }}", () => {
  it("moves the header cells down by how far the table went above the root's top", async () => {
    const root = makeRoot();
    const { th, thead, place } = setup({ scrollRoot: root }, root);
    place(-120);
    await vi.waitFor(() => expect(th.style.transform).toBe("translateY(120px)"));
    expect(thead.hasAttribute("data-pinned")).toBe(true);
  });

  it("stops at the table's last row", async () => {
    const root = makeRoot();
    const { th, place } = setup({ scrollRoot: root }, root);
    place(-480);
    await vi.waitFor(() => expect(th.style.transform).toBe("translateY(456px)"));
  });

  it("lets go while the table's top is still in view", async () => {
    const root = makeRoot();
    const { th, thead, place } = setup({ scrollRoot: root }, root);
    place(-120);
    await vi.waitFor(() => expect(th.style.transform).toBe("translateY(120px)"));
    place(30);
    await vi.waitFor(() => expect(th.style.transform).toBe(""));
    expect(thead.hasAttribute("data-pinned")).toBe(false);
  });

  it("waits while scrollRoot is null", async () => {
    const root = makeRoot();
    const { th, place } = setup({ scrollRoot: null }, root);
    place(-120);
    await new Promise((r) => setTimeout(r, 50));
    expect(th.style.transform).toBe("");
  });

  it("doesn't make the shell scroll vertically, unlike stickyHeader={true}", () => {
    const root = makeRoot();
    const { th } = setup({ scrollRoot: root }, root);
    expect(th.closest("[data-appearance]")!.className).not.toContain("ui:overflow-y-auto");
  });
});
