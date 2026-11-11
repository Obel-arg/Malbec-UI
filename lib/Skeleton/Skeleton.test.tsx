import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

const classesOf = (el: Element) => el.className.split(/\s+/);

describe("Skeleton", () => {
  it("is a neutral grey placeholder with the controls' 8px radius, hidden from screen readers", () => {
    const { container } = render(<Skeleton className="ui:h-4 ui:w-32" />);
    const el = container.firstElementChild!;
    expect(classesOf(el)).toEqual(
      expect.arrayContaining(["ui:bg-background-300", "ui:rounded-[8px]", "ui:animate-pulse", "ui:h-4"]),
    );
    expect(el.className).not.toMatch(/primary|accent/);
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("circle is round, for avatars", () => {
    const { container } = render(<Skeleton circle className="ui:size-8" />);
    expect(classesOf(container.firstElementChild!)).toContain("ui:rounded-full");
  });
});
