import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Label } from "../Label/Label";
import { Switch, type SwitchProps } from "./Switch";

/**
 * Binary toggle (`role="switch"`). Pair with [Label](?path=/docs/components-label) via `id` + `htmlFor` when
 * a visible label is required. See [shadcn Switch](https://ui.shadcn.com/docs/components/switch) for forms and a11y.
 */
const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
} satisfies Meta<SwitchProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const [checked, setChecked] = React.useState(
      typeof args.checked === "boolean" ? args.checked : false,
    );
    React.useEffect(() => {
      if (typeof args.checked === "boolean") setChecked(args.checked);
    }, [args.checked]);

    return (
      <Switch
        {...args}
        checked={checked}
        onCheckedChange={(v) => setChecked(v)}
      />
    );
  },
  args: {
    disabled: false,
    checked: false,
  },
};

export const Off: Story = {
  render: () => <Switch defaultChecked={false} />,
};

export const On: Story = {
  render: () => <Switch defaultChecked />,
};

export const Disabled: Story = {
  render: () => <Switch disabled />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="ui:flex ui:max-w-md ui:items-center ui:gap-2">
      <Switch id="switch-story" defaultChecked={false} />
      <Label htmlFor="switch-story" className="ui:mb-0">
        Default
      </Label>
    </div>
  ),
};
