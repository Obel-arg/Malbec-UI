import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DropdownMenu } from "./DropdownMenu";

describe("DropdownMenu.Item", () => {
  it("doesn't force justify-between on its children", () => {
    render(
      <DropdownMenu open>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    const item = screen.getByRole("menuitem", { name: "Profile" });
    expect(item.className).not.toContain("justify-between");
  });
});
