import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Toggle, type ToggleProps } from "./Toggle";

function BoldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
      <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
    </svg>
  );
}

function ItalicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

function UnderlineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );
}

/**
 * `Toggle` is a two-state button. Compose icon content with `<Toggle.Icon>`.
 * Pair with a visible label or `aria-label` when the control is icon-only.
 *
 * ```tsx
 * <Toggle aria-label="Bold" size="md" variant="default">
 *   <Toggle.Icon>…</Toggle.Icon>
 * </Toggle>
 * ```
 */
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    "aria-label": "Bold",
    variant: "default" satisfies ToggleProps["variant"],
    size: "md" satisfies ToggleProps["size"],
    disabled: false,
  },
  render: (args) => (
    <Toggle {...args}>
      <Toggle.Icon>
        <BoldIcon />
      </Toggle.Icon>
    </Toggle>
  ),
};

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_auto] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

export const States: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { Toggle } from "@obel-arg/malbec-ui";

<Toggle aria-label="Bold">
  <Toggle.Icon>
    <BoldIcon /> {/* your icon */}
  </Toggle.Icon>
</Toggle>

<Toggle aria-label="Bold" defaultPressed>
  <Toggle.Icon>
    <BoldIcon /> {/* your icon */}
  </Toggle.Icon>
</Toggle>

<Toggle aria-label="Bold" disabled>
  <Toggle.Icon>
    <BoldIcon /> {/* your icon */}
  </Toggle.Icon>
</Toggle>

<Toggle aria-label="Bold" disabled defaultPressed>
  <Toggle.Icon>
    <BoldIcon /> {/* your icon */}
  </Toggle.Icon>
</Toggle>`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      <span className={stateCaption}>Off</span>
      <Toggle aria-label="Bold">
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <span className={stateCaption}>On</span>
      <Toggle aria-label="Bold" defaultPressed>
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <span className={stateCaption}>Disabled</span>
      <Toggle aria-label="Bold" disabled>
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <span className={stateCaption}>Disabled · on</span>
      <Toggle aria-label="Bold" disabled defaultPressed>
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
    </div>
  ),
};

const VARIANTS = ["default", "outline"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export const AllVariants: Story = {
  name: "Matrix · Variants × sizes",
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { Toggle } from "@obel-arg/malbec-ui";

// Same composition, swap \`variant\` ("default" | "outline") and \`size\` ("sm" | "md" | "lg"):
<Toggle aria-label="Bold" variant="default" size="sm">
  <Toggle.Icon>
    <BoldIcon /> {/* your icon */}
  </Toggle.Icon>
</Toggle>

<Toggle aria-label="Bold" variant="outline" size="lg">
  <Toggle.Icon>
    <BoldIcon /> {/* your icon */}
  </Toggle.Icon>
</Toggle>`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      {VARIANTS.map((variant) => (
        <React.Fragment key={variant}>
          <span className={`${stateCaption} ui:capitalize`}>{variant}</span>
          <div className="ui:flex ui:items-center ui:gap-4">
            {SIZES.map((size) => (
              <div key={size} className="ui:inline-flex ui:items-center ui:gap-1">
                <Toggle aria-label="Bold" variant={variant} size={size}>
                  <Toggle.Icon>
                    <BoldIcon />
                  </Toggle.Icon>
                </Toggle>
                <Toggle aria-label="Italic" variant={variant} size={size}>
                  <Toggle.Icon>
                    <ItalicIcon />
                  </Toggle.Icon>
                </Toggle>
                <Toggle aria-label="Underline" variant={variant} size={size}>
                  <Toggle.Icon>
                    <UnderlineIcon />
                  </Toggle.Icon>
                </Toggle>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  ),
};
