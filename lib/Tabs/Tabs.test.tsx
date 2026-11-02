import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs } from "./Tabs";

describe('Tabs variant="opacity"', () => {
  it("has no line, no track and fades the inactive tabs to 40%", () => {
    render(
      <Tabs variant="opacity" defaultValue="resumen">
        <Tabs.List>
          <Tabs.Trigger value="resumen">Resumen</Tabs.Trigger>
          <Tabs.Trigger value="gastos">Gastos</Tabs.Trigger>
        </Tabs.List>
      </Tabs>,
    );
    const list = screen.getByRole("tablist").className.split(/\s+/);
    expect(list).toEqual(expect.arrayContaining(["ui:bg-transparent", "ui:p-0", "ui:gap-6"]));
    expect(list).not.toContain("ui:border-b");
    expect(list).not.toContain("ui:bg-background-200");

    const trigger = screen.getByRole("tab", { name: "Gastos" }).className.split(/\s+/);
    expect(trigger).toEqual(
      expect.arrayContaining([
        "ui:opacity-40",
        "ui:hover:opacity-70",
        "ui:data-[state=active]:opacity-100",
        "ui:text-sm",
        "ui:font-medium",
        "ui:text-text-default",
      ]),
    );
    expect(trigger.some((c) => c.includes("after:"))).toBe(false);
  });
});
