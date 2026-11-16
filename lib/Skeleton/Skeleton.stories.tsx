import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

/**
 * Loading placeholder in neutral grey. Size it with `className`; `circle` only for avatars.
 *
 * ```tsx
 * <Skeleton className="ui:h-4 ui:w-40" />
 * <Skeleton circle className="ui:size-8" />
 * ```
 */
const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Skeleton } from "@obel-arg/malbec-ui";

<div className="flex items-center gap-3">
  <Skeleton circle className="size-8" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-3 w-32" />
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-3">
      <Skeleton circle className="ui:size-8" />
      <div className="ui:flex ui:flex-col ui:gap-2">
        <Skeleton className="ui:h-4 ui:w-48" />
        <Skeleton className="ui:h-3 ui:w-32" />
      </div>
    </div>
  ),
};
