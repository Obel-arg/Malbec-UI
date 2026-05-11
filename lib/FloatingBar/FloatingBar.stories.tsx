import type { Meta, StoryObj } from "@storybook/react-vite";
import { FloatingBar } from "./FloatingBar";

/**
 * `FloatingBar` is a compound/composition component for surfacing contextual
 * actions on top of a surface — most commonly when rows in a multi-select
 * `DataTable` are checked. Its contents are fully user-composed; you choose
 * what counts/badges/triggers to show, and the bar normalizes their styling.
 *
 * ```tsx
 * <FloatingBar>
 *   <FloatingBar.Count>
 *     <strong>2</strong> Selected
 *   </FloatingBar.Count>
 *   <FloatingBar.Actions>
 *     <FloatingBar.Trigger>
 *       <FloatingBar.Trigger.Icon><AssignIcon /></FloatingBar.Trigger.Icon>
 *       <FloatingBar.Trigger.Text>Asignar personas</FloatingBar.Trigger.Text>
 *     </FloatingBar.Trigger>
 *   </FloatingBar.Actions>
 *   <FloatingBar.Close aria-label="Clear selection" />
 * </FloatingBar>
 * ```
 */
const meta = {
  title: "Components/FloatingBar",
  component: FloatingBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FloatingBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const AssignPeopleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6" />
    <path d="M22 11h-6" />
  </svg>
);

const SquarePenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const Playground: Story = {
  render: () => (
    <FloatingBar>
      <FloatingBar.Count>
        <strong>2&nbsp;</strong>
        <span>Selected</span>
      </FloatingBar.Count>
      <FloatingBar.Actions>
        <FloatingBar.Trigger emphasis="strong">
          <FloatingBar.Trigger.Icon>
            <AssignPeopleIcon />
          </FloatingBar.Trigger.Icon>
          <FloatingBar.Trigger.Text>Asignar personas</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
        <FloatingBar.Trigger>
          <FloatingBar.Trigger.Icon>
            <SquarePenIcon />
          </FloatingBar.Trigger.Icon>
          <FloatingBar.Trigger.Text>Editar</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
        <FloatingBar.Trigger>
          <FloatingBar.Trigger.Icon>
            <TrashIcon />
          </FloatingBar.Trigger.Icon>
          <FloatingBar.Trigger.Text>Borrar</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
      </FloatingBar.Actions>
      <FloatingBar.Close aria-label="Clear selection" />
    </FloatingBar>
  ),
};

export const TextOnlyTriggers: Story = {
  name: "Composition · Text-only triggers",
  render: () => (
    <FloatingBar>
      <FloatingBar.Count>
        <strong>2&nbsp;</strong>
        <span>Selected</span>
      </FloatingBar.Count>
      <FloatingBar.Actions>
        <FloatingBar.Trigger>
          <FloatingBar.Trigger.Text>Approve</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
        <FloatingBar.Trigger>
          <FloatingBar.Trigger.Text>Archive</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
      </FloatingBar.Actions>
      <FloatingBar.Close />
    </FloatingBar>
  ),
};

export const WithoutClose: Story = {
  name: "Composition · No close",
  render: () => (
    <FloatingBar>
      <FloatingBar.Count>
        <strong>2&nbsp;</strong>
        <span>Selected</span>
      </FloatingBar.Count>
      <FloatingBar.Actions>
        <FloatingBar.Trigger>
          <FloatingBar.Trigger.Icon>
            <SquarePenIcon />
          </FloatingBar.Trigger.Icon>
          <FloatingBar.Trigger.Text>Editar</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
      </FloatingBar.Actions>
    </FloatingBar>
  ),
};

export const DisabledTrigger: Story = {
  name: "State · Disabled trigger",
  render: () => (
    <FloatingBar>
      <FloatingBar.Count>
        <strong>2&nbsp;</strong>
        <span>Selected</span>
      </FloatingBar.Count>
      <FloatingBar.Actions>
        <FloatingBar.Trigger>
          <FloatingBar.Trigger.Icon>
            <SquarePenIcon />
          </FloatingBar.Trigger.Icon>
          <FloatingBar.Trigger.Text>Editar</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
        <FloatingBar.Trigger disabled>
          <FloatingBar.Trigger.Icon>
            <TrashIcon />
          </FloatingBar.Trigger.Icon>
          <FloatingBar.Trigger.Text>Borrar</FloatingBar.Trigger.Text>
        </FloatingBar.Trigger>
      </FloatingBar.Actions>
      <FloatingBar.Close />
    </FloatingBar>
  ),
};
