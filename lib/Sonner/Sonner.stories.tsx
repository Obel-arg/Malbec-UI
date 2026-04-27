import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Sonner, type SonnerProps } from "./Sonner";

/**
 * Mount `<Sonner />` once and call `Sonner.toast()` from your app. See [Sonner](https://sonner.emilkowal.ski/).
 *
 * ```tsx
 * <>
 *   <Sonner />
 *   <Button onClick={() => Sonner.toast("Done")}>Show toast</Button>
 * </>
 * ```
 */
const meta = {
  title: "Components/Sonner",
  component: Sonner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<SonnerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Sonner />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          Sonner.toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => {},
            },
          })
        }
      >
        <Button.Text>Show toast</Button.Text>
      </Button>
    </>
  ),
};
