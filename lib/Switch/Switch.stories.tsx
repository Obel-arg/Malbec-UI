import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Label } from "../Label/Label";
import { Switch, type SwitchProps } from "./Switch";

/**
 * Binary toggle (`role="switch"`). Pair with [Label](?path=/docs/components-label) via `id` + `htmlFor` when
 * a visible label is required. See [shadcn Switch](https://ui.shadcn.com/docs/components/switch) for forms and a11y.
 *
 * ```tsx
 * <Switch checked={on} onCheckedChange={setOn} />
 * ```
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

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_auto] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

export const States: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { Switch } from "@obel-arg/malbec-ui";

<Switch defaultChecked={false} />
<Switch defaultChecked />
<Switch disabled />
<Switch disabled defaultChecked />
<Switch aria-invalid />`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      <span className={stateCaption}>Off</span>
      <Switch aria-label="Off" defaultChecked={false} />
      <span className={stateCaption}>On</span>
      <Switch aria-label="On" defaultChecked />
      <span className={stateCaption}>Disabled</span>
      <Switch aria-label="Disabled" disabled />
      <span className={stateCaption}>Disabled · on</span>
      <Switch aria-label="Disabled on" disabled defaultChecked />
      <span className={stateCaption}>Invalid</span>
      <Switch aria-label="Invalid" aria-invalid />
    </div>
  ),
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
  parameters: {
    docs: {
      source: {
        code: `import { Switch, Label } from "@obel-arg/malbec-ui";

<div className="flex max-w-md items-center gap-2">
  <Switch id="airplane-mode" defaultChecked={false} />
  <Label htmlFor="airplane-mode" className="mb-0">
    Default
  </Label>
</div>`,
      },
    },
  },
};
