import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SVGProps } from "react";
import { Button } from "../Button/Button";
import { Alert, type AlertProps } from "./Alert";
import type { AlertVariant } from "./alert-variants";

const TerminalIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const AlertCircleIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/**
 * `Alert` is a compound component (like `Button`): use `AlertIcon`, `AlertTitle`,
 * `AlertDescription`, and `AlertAction`, or the `Alert.*` subcomponents. Malbec
 * visual tokens follow the Figma [Alert / Malbec OS](https://www.figma.com/design/xpeITaQp7zbkU4htYHvHXo/Malbec-OS-Design-System?node-id=56-395&m=dev) specs.
 */
const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"] satisfies AlertVariant[],
    },
  },
} satisfies Meta<AlertProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="ui:w-full ui:max-w-sm">
      <Alert {...args}>
        <Alert.Icon>
          <TerminalIcon />
        </Alert.Icon>
        <Alert.Title>Heads up!</Alert.Title>
        <Alert.Description>
          You can add components to your app using the cli.
        </Alert.Description>
      </Alert>
    </div>
  ),
};

export const MalbecDestructive: Story = {
  name: "Destructive",
  render: () => (
    <div className="ui:w-full ui:max-w-sm">
      <Alert variant="destructive">
        <Alert.Icon>
          <AlertCircleIcon />
        </Alert.Icon>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          Your session has expired. Please log in again.
        </Alert.Description>
      </Alert>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="ui:w-full ui:max-w-sm">
      <Alert>
        <Alert.Title>Dark mode is now available</Alert.Title>
        <Alert.Description>
          Enable it under your profile settings to get started.
        </Alert.Description>
        <Alert.Action>
          <Button size="sm" variant="primary">
            <Button.Text>Enable</Button.Text>
          </Button>
        </Alert.Action>
      </Alert>
    </div>
  ),
};
