import type { ColumnDef } from "@tanstack/react-table";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import { Command } from "../Command/Command";
import { FloatingBar } from "../FloatingBar/FloatingBar";
import { Popover } from "../Popover/Popover";
import {
  ArtistCellContent,
  FechasCellContent,
  MoreActionButton,
  StatusLabel,
} from "../Table/events-sample";
import {
  eventRowsSample,
  type EventRow,
} from "../Table/table-events-sample-data";
import {
  TableStoryHeaderIconArtist,
  TableStoryHeaderIconCalendar,
  TableStoryHeaderIconListStatus,
  TableStoryHeaderIconVenue,
} from "../Table/table-story-header-icons";
import { DataTable, type DataTableProps } from "./DataTable";
import { SortableColumnHeader } from "./sortable-column-header";

/**
 * [TanStack Table](https://tanstack.com/table) wrapper. Build a `ColumnDef[]` (see `useEventColumns` in this
 * file), then pass `data`, `getRowId`, and optional `tableChildrenStart` (e.g. `<colgroup>`) and `rowSelection`.
 *
 * ```tsx
 * <DataTable
 *   tableAppearance="default"
 *   getRowId={(r) => r.id}
 *   columns={columns}
 *   data={rows}
 *   tableChildrenStart={colgroup}
 * />
 * ```
 */
const meta = {
  title: "Components/DataTable",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const colgroup = (
  <colgroup>
    <col className="ui:w-8" />
    <col className="ui:w-[300px] ui:min-w-0" />
    <col className="ui:w-[240px] ui:min-w-0" />
    <col className="ui:min-w-0" />
    <col className="ui:w-[185px] ui:min-w-0" />
    <col className="ui:w-[110px] ui:shrink-0" />
  </colgroup>
);

const colgroupNoSelect = (
  <colgroup>
    <col className="ui:w-[300px] ui:min-w-0" />
    <col className="ui:w-[240px] ui:min-w-0" />
    <col className="ui:min-w-0" />
    <col className="ui:w-[185px] ui:min-w-0" />
    <col className="ui:w-[110px] ui:shrink-0" />
  </colgroup>
);

function useEventColumns() {
  return useMemo<ColumnDef<EventRow>[]>(
    () => [
      {
        id: "artist",
        accessorKey: "artist",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconArtist />
              <span>Artista</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: ({ row }) => (
          <ArtistCellContent
            name={row.original.artist}
            imageUrl={row.original.imageUrl}
          />
        ),
      },
      {
        accessorKey: "venue",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconVenue />
              <span>Venue</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: (ctx) => (
          <span className="ui:font-medium ui:uppercase">
            {String(ctx.getValue())}
          </span>
        ),
      },
      {
        id: "fechas",
        accessorKey: "dateLabel",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconCalendar />
              <span>Fechas</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: ({ row }) => (
          <FechasCellContent
            dateLabel={row.original.dateLabel}
            extraDatesLabel={row.original.extraDatesLabel}
            chipShadow={row.original.dateChipShadow}
          />
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconListStatus />
              <span>Status</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: (ctx) => (
          <div className="ui:inline-flex">
            <StatusLabel status={ctx.row.original.status} />
          </div>
        ),
      },
      {
        id: "actions",
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            className="ui:w-full ui:justify-end"
          >
            <span>Acciones</span>
          </SortableColumnHeader>
        ),
        cell: () => (
          <div className="ui:flex ui:items-center ui:justify-end">
            <MoreActionButton />
          </div>
        ),
        enableSorting: false,
      },
    ],
    [],
  );
}

function DataTableWithColumns(
  props: Pick<
    DataTableProps<EventRow, unknown>,
    "data" | "emptyLabel" | "rowSelection" | "tableChildrenStart"
  >,
) {
  const columns = useEventColumns();
  return (
    <div className="ui:mx-auto ui:max-w-[1085px]">
      <DataTable
        tableChildrenStart={props.tableChildrenStart}
        tableAppearance="default"
        getRowId={(r) => r.id}
        rowSelection={props.rowSelection}
        columns={columns}
        data={props.data}
        emptyLabel={props.emptyLabel}
      />
    </div>
  );
}

export const Events: Story = {
  render: () => (
    <DataTableWithColumns
      data={eventRowsSample}
      tableChildrenStart={colgroup}
    />
  ),
};

const ASSIGNABLE_PEOPLE = [
  "Ana Martínez",
  "Bruno Pérez",
  "Carla Rossi",
  "Diego López",
  "Elena García",
  "Federico Silva",
  "Gabriela Núñez",
];

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

function MultiSelectWithFloatingBar() {
  const columns = useEventColumns();
  // `key` remounts the DataTable to clear its internal selection state when
  // the user dismisses the floating bar — the table doesn't expose an
  // imperative deselect API, so a re-mount is the simplest reset.
  const [resetKey, setResetKey] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  // Keep showing the last non-zero count during the exit animation so the bar
  // doesn't flash "0 Selected" while sliding down.
  const [displayCount, setDisplayCount] = useState(0);
  if (selectedCount > 0 && selectedCount !== displayCount) {
    setDisplayCount(selectedCount);
  }

  return (
    <div className="ui:mx-auto ui:max-w-[1085px]">
      <DataTable
        key={resetKey}
        tableChildrenStart={colgroup}
        tableAppearance="default"
        getRowId={(r) => r.id}
        columns={columns}
        data={eventRowsSample}
        onRowSelectionChange={(rows) => setSelectedCount(rows.length)}
      />
      <div className="ui:fixed ui:left-1/2 ui:bottom-[48px] ui:-translate-x-1/2 ui:z-50">
        <FloatingBar open={selectedCount > 0}>
          <FloatingBar.Count>
            <strong>{displayCount}&nbsp;</strong> Selected
          </FloatingBar.Count>
          <FloatingBar.Actions>
            <Popover>
              <Popover.Trigger asChild>
                <FloatingBar.Trigger emphasis="strong">
                  <FloatingBar.Trigger.Icon>
                    <AssignPeopleIcon />
                  </FloatingBar.Trigger.Icon>
                  <FloatingBar.Trigger.Text>
                    Asignar personas
                  </FloatingBar.Trigger.Text>
                </FloatingBar.Trigger>
              </Popover.Trigger>
              <Popover.Content
                side="top"
                align="start"
                sideOffset={8}
                className="ui:p-0 ui:w-[240px]"
              >
                <Command>
                  <Command.Input placeholder="Buscar persona…" />
                  <Command.List>
                    <Command.Empty>Sin resultados.</Command.Empty>
                    <Command.Group>
                      {ASSIGNABLE_PEOPLE.map((person) => (
                        <Command.Item key={person} value={person}>
                          {person}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  </Command.List>
                </Command>
              </Popover.Content>
            </Popover>
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
          <FloatingBar.Close
            aria-label="Clear selection"
            onClick={() => {
              setSelectedCount(0);
              setResetKey((k) => k + 1);
            }}
          />
        </FloatingBar>
      </div>
    </div>
  );
}

export const MultiSelectWithBar: Story = {
  name: "With FloatingBar on multi-select",
  parameters: { layout: "padded" },
  render: () => <MultiSelectWithFloatingBar />,
};

export const NoRowSelection: Story = {
  name: "Without row checkboxes",
  render: () => (
    <DataTableWithColumns
      data={eventRowsSample}
      rowSelection={false}
      tableChildrenStart={colgroupNoSelect}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTableWithColumns
      data={[]}
      emptyLabel="No rows."
      tableChildrenStart={colgroup}
    />
  ),
};
