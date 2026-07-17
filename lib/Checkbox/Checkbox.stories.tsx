import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Checkbox, type CheckboxProps } from "./Checkbox";

/**
 * Compound API: pair the control with `<Checkbox.Indicator />` for the checked
 * and indeterminate glyphs (defaults are provided when you omit indicator children).
 *
 * See [shadcn/ui Checkbox](https://ui.shadcn.com/docs/components/radix/checkbox)
 * for controlled state, forms, and accessibility expectations.
 *
 * ```tsx
 * <Checkbox checked={checked} onCheckedChange={setChecked}>
 *   <Checkbox.Indicator />
 * </Checkbox>
 * ```
 */
const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
} satisfies Meta<CheckboxProps>;

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
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(v) => setChecked(v === true)}
      >
        <Checkbox.Indicator />
      </Checkbox>
    );
  },
  args: {
    disabled: false,
    checked: false,
  },
};

export const Unchecked: Story = {
  render: () => (
    <Checkbox defaultChecked={false}>
      <Checkbox.Indicator />
    </Checkbox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from "@obel-arg/malbec-ui";

<Checkbox defaultChecked={false}>
  <Checkbox.Indicator />
</Checkbox>`,
      },
    },
  },
};

export const Checked: Story = {
  render: () => (
    <Checkbox defaultChecked>
      <Checkbox.Indicator />
    </Checkbox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from "@obel-arg/malbec-ui";

<Checkbox defaultChecked>
  <Checkbox.Indicator />
</Checkbox>`,
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Checkbox disabled>
      <Checkbox.Indicator />
    </Checkbox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from "@obel-arg/malbec-ui";

<Checkbox disabled>
  <Checkbox.Indicator />
</Checkbox>`,
      },
    },
  },
};

export const Indeterminate: Story = {
  render: function IndeterminateRender() {
    const [checked, setChecked] = React.useState<"indeterminate" | boolean>(
      "indeterminate",
    );
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={(v) =>
          setChecked(v === "indeterminate" ? "indeterminate" : v === true)
        }
      >
        <Checkbox.Indicator />
      </Checkbox>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Checkbox } from "@obel-arg/malbec-ui";

function IndeterminateExample() {
  const [checked, setChecked] = useState<"indeterminate" | boolean>(
    "indeterminate",
  );

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(v) =>
        setChecked(v === "indeterminate" ? "indeterminate" : v === true)
      }
    >
      <Checkbox.Indicator />
    </Checkbox>
  );
}`,
      },
    },
  },
};

type TriState = false | true | "indeterminate";

function stateLabel(v: TriState) {
  if (v === "indeterminate") return "indeterminate";
  return v ? "checked" : "unchecked";
}

export const SwitchableStates: Story = {
  name: "Switchable states",
  render: function SwitchableStatesRender() {
    const [value, setValue] = React.useState<TriState>(false);

    return (
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-3">
        <Checkbox
          aria-label="Demo checkbox: tap or press Space to cycle state"
          checked={value}
          onCheckedChange={() => {
            setValue((v) => {
              if (v === false) return true;
              if (v === true) return "indeterminate";
              return false;
            });
          }}
        >
          <Checkbox.Indicator />
        </Checkbox>
        <p className="ui:m-0 ui:text-center ui:text-muted ui:text-text-default-muted">
          Each activation cycles{" "}
          <span className="ui:font-medium ui:text-text-default">unchecked</span>
          {" → "}
          <span className="ui:font-medium ui:text-text-default">checked</span>
          {" → "}
          <span className="ui:font-medium ui:text-text-default">
            indeterminate
          </span>
          {" → "}
          <span className="ui:font-medium ui:text-text-default">unchecked</span>.
          Current:{" "}
          <span className="ui:font-medium ui:text-text-default">
            {stateLabel(value)}
          </span>
          .
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Checkbox } from "@obel-arg/malbec-ui";

type TriState = false | true | "indeterminate";

function SwitchableCheckbox() {
  const [value, setValue] = useState<TriState>(false);

  return (
    <Checkbox
      aria-label="Tap or press Space to cycle state"
      checked={value}
      onCheckedChange={() => {
        setValue((v) => {
          if (v === false) return true;
          if (v === true) return "indeterminate";
          return false;
        });
      }}
    >
      <Checkbox.Indicator />
    </Checkbox>
  );
}`,
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="ui:flex ui:max-w-md ui:items-start ui:gap-3">
      <Checkbox id="terms-story">
        <Checkbox.Indicator />
      </Checkbox>
      <div className="ui:flex ui:flex-col ui:gap-1">
        <label
          htmlFor="terms-story"
          className="ui:cursor-pointer ui:text-label-semibold ui:text-text-default"
        >
          Accept terms and conditions
        </label>
        <p className="ui:text-muted ui:text-text-default-muted">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from "@obel-arg/malbec-ui";

<div className="flex max-w-md items-start gap-3">
  <Checkbox id="terms">
    <Checkbox.Indicator />
  </Checkbox>
  <div className="flex flex-col gap-1">
    <label
      htmlFor="terms"
      className="cursor-pointer text-label-semibold text-text-default"
    >
      Accept terms and conditions
    </label>
    <p className="text-muted text-text-default-muted">
      You agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>`,
      },
    },
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="ui:flex ui:items-start ui:gap-3">
      <Checkbox id="invalid-story" aria-invalid>
        <Checkbox.Indicator />
      </Checkbox>
      <label
        htmlFor="invalid-story"
        className="ui:cursor-pointer ui:text-label-semibold ui:text-text-default"
      >
        Required field
      </label>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from "@obel-arg/malbec-ui";

<div className="flex items-start gap-3">
  <Checkbox id="required-field" aria-invalid>
    <Checkbox.Indicator />
  </Checkbox>
  <label
    htmlFor="required-field"
    className="cursor-pointer text-label-semibold text-text-default"
  >
    Required field
  </label>
</div>`,
      },
    },
  },
};

export const Group: Story = {
  render: function GroupRender() {
    const [values, setValues] = React.useState({
      disks: true,
      external: false,
      optical: false,
    });

    const toggle =
      (key: keyof typeof values) => (v: boolean | "indeterminate") => {
        if (v === "indeterminate") return;
        setValues((s) => ({ ...s, [key]: v }));
      };

    return (
      <fieldset className="ui:flex ui:flex-col ui:gap-4 ui:border-0 ui:p-0">
        <legend className="ui:mb-1 ui:text-p ui:font-semibold ui:text-text-default">
          Show on the desktop
        </legend>
        <p className="ui:mb-2 ui:text-muted ui:text-text-default-muted">
          Select the items you want to show.
        </p>
        <ul className="ui:m-0 ui:flex ui:list-none ui:flex-col ui:gap-3 ui:p-0">
          <li className="ui:flex ui:items-center ui:gap-3">
            <Checkbox
              id="g-disks"
              checked={values.disks}
              onCheckedChange={toggle("disks")}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <label htmlFor="g-disks" className="ui:text-p ui:text-text-default">
              Hard disks
            </label>
          </li>
          <li className="ui:flex ui:items-center ui:gap-3">
            <Checkbox
              id="g-ext"
              checked={values.external}
              onCheckedChange={toggle("external")}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <label htmlFor="g-ext" className="ui:text-p ui:text-text-default">
              External disks
            </label>
          </li>
          <li className="ui:flex ui:items-center ui:gap-3">
            <Checkbox
              id="g-opt"
              checked={values.optical}
              onCheckedChange={toggle("optical")}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <label htmlFor="g-opt" className="ui:text-p ui:text-text-default">
              CDs, DVDs, and similar
            </label>
          </li>
        </ul>
      </fieldset>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Checkbox } from "@obel-arg/malbec-ui";

function DesktopItems() {
  const [values, setValues] = useState({
    disks: true,
    external: false,
    optical: false,
  });

  const toggle =
    (key: keyof typeof values) => (v: boolean | "indeterminate") => {
      if (v === "indeterminate") return;
      setValues((s) => ({ ...s, [key]: v }));
    };

  return (
    <fieldset className="flex flex-col gap-4 border-0 p-0">
      <legend className="mb-1 text-p font-semibold text-text-default">
        Show on the desktop
      </legend>
      <p className="mb-2 text-muted text-text-default-muted">
        Select the items you want to show.
      </p>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        <li className="flex items-center gap-3">
          <Checkbox
            id="disks"
            checked={values.disks}
            onCheckedChange={toggle("disks")}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <label htmlFor="disks" className="text-p text-text-default">
            Hard disks
          </label>
        </li>
        <li className="flex items-center gap-3">
          <Checkbox
            id="external"
            checked={values.external}
            onCheckedChange={toggle("external")}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <label htmlFor="external" className="text-p text-text-default">
            External disks
          </label>
        </li>
        <li className="flex items-center gap-3">
          <Checkbox
            id="optical"
            checked={values.optical}
            onCheckedChange={toggle("optical")}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <label htmlFor="optical" className="text-p text-text-default">
            CDs, DVDs, and similar
          </label>
        </li>
      </ul>
    </fieldset>
  );
}`,
      },
    },
  },
};
