import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Steps } from "../Steps/Steps";
import { Card, type CardProps } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<CardProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="ui:w-[500px]">
      <Steps total={3} value={1} />
      <Card.Header>
        <Card.Title>Create project</Card.Title>
        <Card.Description>
          Enter the details below to get started.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="ui:m-0 ui:text-[14px] ui:leading-5 ui:tracking-[-0.42px] ui:text-text-default-muted">
          Form fields and other content go here.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button variant="outline" size="sm">
          <Button.Text>Cancel</Button.Text>
        </Button>
        <Button variant="primary" size="sm">
          <Button.Text>Next</Button.Text>
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card>
      <Steps total={3} value={2} />
      <Card.Header>
        <Card.Title>Configuration</Card.Title>
        <Card.Description>Adjust settings for this step.</Card.Description>
        <Card.Action>
          <Button variant="ghost" size="sm">
            <Button.Text>Help</Button.Text>
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Content>
        <p className="ui:m-0 ui:text-[14px] ui:leading-5 ui:tracking-[-0.42px] ui:text-text-default-muted">
          Main body content.
        </p>
      </Card.Content>
      <Card.Footer>
        <div className="ui:flex ui:gap-2">
          <Button variant="outline" size="sm">
            <Button.Text>Cancel</Button.Text>
          </Button>
          <Button variant="outline" size="sm">
            <Button.Text>Back</Button.Text>
          </Button>
        </div>
        <Button variant="primary" size="sm">
          <Button.Text>Next</Button.Text>
        </Button>
      </Card.Footer>
    </Card>
  ),
};
