import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Artist,
  BookOpen,
  Bot,
  CalendarCustom,
  ListStatus,
  Settings2,
  Stadium,
  TerminalSquare,
  Ticket,
  type CustomIconProps,
} from "./custom";

type CustomIcon = ForwardRefExoticComponent<
  Omit<CustomIconProps, "ref"> & RefAttributes<SVGSVGElement>
>;

const CUSTOM_ICONS: { name: string; Icon: CustomIcon }[] = [
  { name: "Artist", Icon: Artist },
  { name: "Stadium", Icon: Stadium },
  { name: "CalendarCustom", Icon: CalendarCustom },
  { name: "ListStatus", Icon: ListStatus },
  { name: "TerminalSquare", Icon: TerminalSquare },
  { name: "Ticket", Icon: Ticket },
  { name: "BookOpen", Icon: BookOpen },
  { name: "Bot", Icon: Bot },
  { name: "Settings2", Icon: Settings2 },
];

const meta = {
  title: "Icons/Custom",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  name: "Custom icons",
  render: () => (
    <div className="ui:min-h-screen ui:bg-background-100 ui:p-8">
      <div className="ui:mx-auto ui:max-w-4xl">
        <h1 className="ui:mb-6 ui:text-lg ui:font-semibold ui:text-text-default">
          Custom icons
        </h1>
        <p className="ui:mb-8 ui:text-sm ui:text-text-default-muted">
          From <code className="ui:rounded ui:bg-background-200 ui:px-1.5 ui:py-0.5 ui:text-xs">@obel-arg/malbec-ui/icons/custom</code>{" "}
          (file-named icons that may overlap Lucide live on this entry only).
        </p>
        <ul
          className="ui:grid ui:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] ui:gap-4"
          role="list"
        >
          {CUSTOM_ICONS.map(({ name, Icon }) => (
            <li
              key={name}
              className="ui:flex ui:flex-col ui:items-center ui:gap-3 ui:rounded-lg ui:border ui:border-background-300 ui:bg-background-200 ui:p-6"
              role="listitem"
            >
              <div className="ui:flex ui:h-12 ui:w-12 ui:items-center ui:justify-center ui:text-text-default">
                <Icon className="ui:block ui:h-8 ui:w-8" aria-hidden />
              </div>
              <span className="ui:text-center ui:font-mono ui:text-xs ui:text-text-default-muted">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),
};
