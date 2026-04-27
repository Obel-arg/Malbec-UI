import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Tabs, type TabsProps } from "./Tabs";

/**
 * Layered tab panels with a segmented control. Compose with `Tabs.List`, `Tabs.Trigger`,
 * and `Tabs.Content`. See [shadcn Tabs](https://ui.shadcn.com/docs/components/radix/tabs)
 * for behavior and accessibility.
 *
 * ```tsx
 * <Tabs value={value} onValueChange={setValue}>
 *   <Tabs.List>
 *     <Tabs.Trigger value="a">A</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="a">…</Tabs.Content>
 * </Tabs>
 * ```
 */
const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<TabsProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const [value, setValue] = React.useState("account");

    return (
      <Tabs {...args} value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          Account settings and profile details.
        </Tabs.Content>
        <Tabs.Content value="password">
          Change your password and security options.
        </Tabs.Content>
      </Tabs>
    );
  },
};

export const ThreeTabs: Story = {
  name: "Composition · Three triggers",
  render: () => (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Account panel.</Tabs.Content>
      <Tabs.Content value="password">Password panel.</Tabs.Content>
      <Tabs.Content value="settings">Settings panel.</Tabs.Content>
    </Tabs>
  ),
};

export const Disabled: Story = {
  name: "State · Disabled trigger",
  render: () => (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password" disabled>
          Password
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Account panel.</Tabs.Content>
      <Tabs.Content value="password">Password panel.</Tabs.Content>
    </Tabs>
  ),
};
