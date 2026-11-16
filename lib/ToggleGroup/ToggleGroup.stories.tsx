import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ToggleGroup } from "./ToggleGroup";

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

const iconBox =
  "ui:inline-flex ui:shrink-0 ui:size-4 ui:items-center ui:justify-center";

/**
 * `ToggleGroup` uses a compound API: `ToggleGroup.Item` for each option.
 * Pass `type="single"` or `type="multiple"` per your selection model.
 *
 * ```tsx
 * <ToggleGroup type="single" value={value} onValueChange={setValue} aria-label="Text formatting">
 *   <ToggleGroup.Item value="bold" aria-label="Bold">…</ToggleGroup.Item>
 * </ToggleGroup>
 * ```
 */
const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_auto] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

function FormattingItems() {
  return (
    <>
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <span className={iconBox}>
          <BoldIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <span className={iconBox}>
          <ItalicIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={iconBox}>
          <UnderlineIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
    </>
  );
}

export const States: Story = {
  args: { type: "single" as const },
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { ToggleGroup } from "@obel-arg/malbec-ui";

<ToggleGroup type="single" aria-label="Text formatting">
  <ToggleGroup.Item value="bold" aria-label="Bold">
    <BoldIcon /> {/* your icon */}
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Italic">
    <ItalicIcon /> {/* your icon */}
  </ToggleGroup.Item>
  <ToggleGroup.Item value="underline" aria-label="Underline">
    <UnderlineIcon /> {/* your icon */}
  </ToggleGroup.Item>
</ToggleGroup>

// Same items, with a selected value:
<ToggleGroup type="single" aria-label="Text formatting" defaultValue="bold">
  …
</ToggleGroup>

// Same items, disabled:
<ToggleGroup type="single" aria-label="Text formatting" disabled>
  …
</ToggleGroup>`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      <span className={stateCaption}>Default</span>
      <ToggleGroup type="single" aria-label="Text formatting">
        <FormattingItems />
      </ToggleGroup>
      <span className={stateCaption}>Selected</span>
      <ToggleGroup type="single" aria-label="Text formatting" defaultValue="bold">
        <FormattingItems />
      </ToggleGroup>
      <span className={stateCaption}>Disabled</span>
      <ToggleGroup type="single" aria-label="Text formatting" disabled>
        <FormattingItems />
      </ToggleGroup>
    </div>
  ),
};

const VARIANTS = ["default", "outline"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export const AllVariants: Story = {
  name: "Matrix · Variants × sizes",
  args: { type: "single" as const },
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { ToggleGroup } from "@obel-arg/malbec-ui";

// Same items, swap \`variant\` ("default" | "outline") and \`size\` ("sm" | "md" | "lg"):
<ToggleGroup type="single" aria-label="Text formatting" variant="outline" size="sm">
  <ToggleGroup.Item value="bold" aria-label="Bold">
    <BoldIcon /> {/* your icon */}
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Italic">
    <ItalicIcon /> {/* your icon */}
  </ToggleGroup.Item>
  <ToggleGroup.Item value="underline" aria-label="Underline">
    <UnderlineIcon /> {/* your icon */}
  </ToggleGroup.Item>
</ToggleGroup>`,
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
              <ToggleGroup
                key={size}
                type="single"
                aria-label="Text formatting"
                variant={variant}
                size={size}
              >
                <FormattingItems />
              </ToggleGroup>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  ),
};
