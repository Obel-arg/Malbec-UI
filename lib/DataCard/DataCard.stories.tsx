import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays, Equal, MapPin, Tag, Ticket, Users } from "lucide-react";
import { Badge } from "../Badge/Badge";
import { DataCard, type DataCardProps } from "./DataCard";

/**
 * `DataCard` is a **presentational shell** only: `background-200`, `rounded-xl`, a 1px
 * `background-300` frame, a light shadow, and a **4px `primary` accent** on the edge you
 * choose. It renders a single `div` with `children` — no compound slots, no built-in KPI
 * layout. Apps compose grids, flex rows, typography, and icons themselves (see **MetricsRow**
 * for a full example).
 *
 * **`accentSide`** — `"top"` | `"right"` | `"bottom"` | `"left"`. Exactly one edge uses the
 * thick primary border; the others stay the thin neutral border.
 *
 * **Customization** — override padding, width, or accent color hints via `className` (merged
 * with `cn`). Add `aria-label`, `role`, or headings inside `children` when the region needs a
 * name in the accessibility tree.
 *
 * ```tsx
 * <DataCard accentSide="left" className="ui:w-full ui:max-w-md">
 *   <div className="ui:flex ui:flex-col ui:gap-2">
 *     <span className="ui:font-medium">Title</span>
 *     <span className="ui:text-sm ui:text-text-default-muted">Supporting copy</span>
 *   </div>
 * </DataCard>
 * ```
 */
const meta = {
  title: "Components/DataCard",
  component: DataCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<DataCardProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Shell only: consumers supply layout and content. */
export const Default: Story = {
  args: {
    accentSide: "top",
    children: (
      <p className="ui:m-0 ui:text-sm ui:text-text-default-muted">
        Any markup goes here. Override padding with{" "}
        <code className="ui:rounded ui:bg-background-100 ui:px-1">
          className
        </code>{" "}
        if needed.
      </p>
    ),
  },
};

/** Short vertical rules (reference: dividers do not reach card top/bottom). */
function VerticalRule() {
  return (
    <div
      className="ui:h-[56px] ui:w-px ui:shrink-0 ui:self-center ui:bg-background-300"
      aria-hidden
    />
  );
}

function StatBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="ui:flex ui:shrink-0 ui:items-center ui:gap-4">
      <div className="ui:flex ui:size-[34px] ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full ui:border ui:border-dashed ui:border-background-300 ui:text-text-default-muted">
        {icon}
      </div>
      <div className="ui:flex ui:flex-col ui:items-start ui:gap-1.5">
        <span className="ui:text-[15.688px] ui:font-medium ui:leading-[23.533px] ui:tracking-[-0.4707px] ui:text-text-default-muted">
          {label}
        </span>
        <span className="ui:text-[20px] ui:font-semibold ui:leading-7 ui:tracking-[-0.8px] ui:text-text-default">
          {value}
        </span>
      </div>
    </div>
  );
}

const metrics = [
  {
    icon: <Equal className="ui:size-5" strokeWidth={1.5} aria-hidden />,
    label: "Avg. Daily sales",
    value: "1.231",
  },
  {
    icon: <Tag className="ui:size-5" strokeWidth={1.5} aria-hidden />,
    label: "Total sales",
    value: "64.000",
  },
  {
    icon: <Users className="ui:size-5" strokeWidth={1.5} aria-hidden />,
    label: "Cappacity",
    value: "80.000",
  },
  {
    icon: <Ticket className="ui:size-5" strokeWidth={1.5} aria-hidden />,
    label: "Avg. Sold",
    value: "%87",
  },
] as const;

/**
 * Single-row KPI strip: top accent, dashed icon rings, muted labels, vertical dividers.
 * Layout is story-only; `DataCard` stays a shell.
 */
export const MetricsRow: Story = {
  render: function MetricsRowRender() {
    return (
      <DataCard accentSide="top" className="ui:w-full ui:max-w-[960px]">
        <div className="ui:grid ui:w-full ui:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] ui:items-center ui:justify-items-center">
          {metrics.map((m, index) => (
            <div key={m.label} className="ui:contents">
              <div className="ui:flex ui:justify-center">
                <StatBlock icon={m.icon} label={m.label} value={m.value} />
              </div>
              {index < metrics.length - 1 ? <VerticalRule /> : null}
            </div>
          ))}
        </div>
      </DataCard>
    );
  },
};

/**
 * Compact upcoming-show summary: left accent stripe, square cover image, artist name,
 * venue + date rows, and an "Active" pill. Layout is story-only — `DataCard` stays a shell.
 */
export const UpcomingShow: Story = {
  render: function UpcomingShowRender() {
    return (
      <DataCard
        accentSide="left"
        className="ui:max-w-[280px]"
        panelClassName="ui:p-1.5"
      >
        <div className="ui:flex ui:w-full ui:min-w-0 ui:items-center ui:gap-2">
          <div className="ui:relative ui:size-14 ui:shrink-0 ui:overflow-hidden ui:rounded-md ui:bg-background-300">
            <img
              alt="Airbag"
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=112&h=112&fit=crop"
              className="ui:size-full ui:object-cover"
            />
          </div>

          <div className="ui:min-w-0 ui:flex-1 ui:space-y-1 ui:text-left">
            <p className="ui:m-0 ui:truncate ui:text-sm ui:font-medium ui:leading-tight ui:tracking-tight ui:text-text-default">
              Airbag
            </p>
            <div className="ui:flex ui:items-center ui:gap-1.5 ui:text-xs ui:leading-snug ui:text-text-default-muted">
              <MapPin className="ui:size-3 ui:shrink-0" aria-hidden />
              <span className="ui:min-w-0 ui:truncate">River Plate</span>
            </div>
            <div className="ui:flex ui:items-center ui:gap-1.5 ui:text-xs ui:leading-snug ui:text-text-default-muted">
              <CalendarDays className="ui:size-3 ui:shrink-0" aria-hidden />
              <span className="ui:truncate">23/05/2026</span>
            </div>
          </div>

          <div className="ui:shrink-0 ui:self-start">
            <Badge variant="emerald">
              <Badge.Text>Active</Badge.Text>
            </Badge>
          </div>
        </div>
      </DataCard>
    );
  },
};

export const AccentSides: Story = {
  render: function AccentSidesRender() {
    const sides = ["top", "right", "bottom", "left"] as const;
    return (
      <div className="ui:grid ui:max-w-2xl ui:grid-cols-2 ui:gap-4">
        {sides.map((side) => (
          <DataCard key={side} accentSide={side} className="ui:min-h-[100px]">
            <p className="ui:m-0 ui:text-sm ui:capitalize ui:text-text-default">
              accentSide=&quot;{side}&quot;
            </p>
          </DataCard>
        ))}
      </div>
    );
  },
};
