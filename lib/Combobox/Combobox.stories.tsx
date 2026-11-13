import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Combobox, type ComboboxProps } from "./Combobox";

const frameworks = [
  "Next.js",
  "Svelte.js",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

/**
 * Composed API (like `Button`): `<Combobox.Input>`, `<Combobox.Content>`, etc.
 * Registry-style flat names (`ComboboxInput`, …) are also exported from the module.
 *
 * See [shadcn/ui Combobox](https://ui.shadcn.com/docs/components/radix/combobox) for the upstream interaction model.
 * This library implements the popover surface with **Radix** (`@radix-ui/react-popover`).
 *
 * ```tsx
 * <Combobox items={items} className="ui:w-[200px]">
 *   <Combobox.Input placeholder="Select…" />
 *   <Combobox.Content>
 *     <Combobox.List>
 *       {(item) => (
 *         <Combobox.Item key={String(item)} value={item}>
 *           {String(item)}
 *         </Combobox.Item>
 *       )}
 *     </Combobox.List>
 *   </Combobox.Content>
 * </Combobox>
 * ```
 */
const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    autoHighlight: { control: "boolean" },
    multiple: { control: "boolean" },
    mode: { control: "select", options: ["inline", "trigger"] },
  },
  args: {
    items: [...frameworks],
    disabled: false,
    autoHighlight: false,
    multiple: false,
    mode: "inline",
  },
} satisfies Meta<ComboboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Combobox {...args} className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const WithClear: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox items={[...frameworks]} defaultValue="Next.js" className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" showClear />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

const frameworks = ["Next.js", "Svelte.js", "Nuxt.js", "Remix", "Astro"];

function Example() {
  return (
    <Combobox items={frameworks} defaultValue="Next.js" className="w-[200px]">
      <Combobox.Input placeholder="Select a framework" showClear />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
}`,
      },
    },
  },
};

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_200px] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

function FrameworkOptions() {
  return (
    <Combobox.Content>
      <Combobox.Empty>No items found.</Combobox.Empty>
      <Combobox.List>
        {(item) => (
          <Combobox.Item key={String(item)} value={item}>
            {String(item)}
          </Combobox.Item>
        )}
      </Combobox.List>
    </Combobox.Content>
  );
}

export const States: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

const frameworks = ["Next.js", "Svelte.js", "Nuxt.js", "Remix", "Astro"];

const options = (
  <Combobox.Content>
    <Combobox.Empty>No items found.</Combobox.Empty>
    <Combobox.List>
      {(item) => (
        <Combobox.Item key={String(item)} value={item}>
          {String(item)}
        </Combobox.Item>
      )}
    </Combobox.List>
  </Combobox.Content>
);

<Combobox items={frameworks} className="w-[200px]">
  <Combobox.Input placeholder="Select a framework" />
  {options}
</Combobox>

<Combobox items={frameworks} disabled className="w-[200px]">
  <Combobox.Input placeholder="Select a framework" />
  {options}
</Combobox>

<Combobox items={frameworks} className="w-[200px]">
  <Combobox.Input placeholder="Select a framework" aria-invalid />
  {options}
</Combobox>`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      <span className={stateCaption}>Default</span>
      <Combobox items={[...frameworks]} className="ui:w-[200px]">
        <Combobox.Input placeholder="Select a framework" />
        <FrameworkOptions />
      </Combobox>
      <span className={stateCaption}>Disabled</span>
      <Combobox items={[...frameworks]} disabled className="ui:w-[200px]">
        <Combobox.Input placeholder="Select a framework" />
        <FrameworkOptions />
      </Combobox>
      <span className={stateCaption}>Invalid</span>
      <Combobox items={[...frameworks]} className="ui:w-[200px]">
        <Combobox.Input placeholder="Select a framework" aria-invalid />
        <FrameworkOptions />
      </Combobox>
    </div>
  ),
};

export const AutoHighlight: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox items={[...frameworks]} autoHighlight className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

const frameworks = ["Next.js", "Svelte.js", "Nuxt.js", "Remix", "Astro"];

function Example() {
  return (
    <Combobox items={frameworks} autoHighlight className="w-[200px]">
      <Combobox.Input placeholder="Select a framework" />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
}`,
      },
    },
  },
};

export const MultipleWithChips: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox
      multiple
      autoHighlight
      items={[...frameworks]}
      defaultValue={["Next.js"]}
      className="ui:w-[min(320px,100%)]"
    >
      <Combobox.Chips className="ui:max-w-xs">
        <Combobox.Value>
          {(values: unknown[]) => (
            <>
              {values.map((item) => (
                <Combobox.Chip key={String(item)} value={item}>
                  {String(item)}
                </Combobox.Chip>
              ))}
              <Combobox.ChipsInput placeholder="Add framework" />
            </>
          )}
        </Combobox.Value>
      </Combobox.Chips>
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

const frameworks = ["Next.js", "Svelte.js", "Nuxt.js", "Remix", "Astro"];

function Example() {
  return (
    <Combobox
      multiple
      autoHighlight
      items={frameworks}
      defaultValue={["Next.js"]}
      className="w-[min(320px,100%)]"
    >
      <Combobox.Chips className="max-w-xs">
        <Combobox.Value>
          {(values) => (
            <>
              {values.map((item) => (
                <Combobox.Chip key={String(item)} value={item}>
                  {String(item)}
                </Combobox.Chip>
              ))}
              <Combobox.ChipsInput placeholder="Add framework" />
            </>
          )}
        </Combobox.Value>
      </Combobox.Chips>
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
}`,
      },
    },
  },
};

export const TriggerWithSearchField: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox mode="trigger" items={[...frameworks]} className="ui:w-[200px]">
      <Combobox.Trigger placeholder="Select framework…" />
      <Combobox.Content>
        <Combobox.Input
          filterPlacement="content"
          placeholder="Search framework…"
          showTrigger={false}
        />
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

const frameworks = ["Next.js", "Svelte.js", "Nuxt.js", "Remix", "Astro"];

function Example() {
  return (
    <Combobox mode="trigger" items={frameworks} className="w-[200px]">
      <Combobox.Trigger placeholder="Select framework…" />
      <Combobox.Content>
        <Combobox.Input
          filterPlacement="content"
          placeholder="Search framework…"
          showTrigger={false}
        />
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
}`,
      },
    },
  },
};

type Venue = { value: string; label: string; keywords?: string[] };

const VENUES: Venue[] = [
  { value: "movistar", label: "Movistar Arena", keywords: ["Buenos Aires", "Villa Crespo"] },
  { value: "metropolitano", label: "Metropolitano", keywords: ["Rosario"] },
  { value: "quality", label: "Quality Espacio", keywords: ["Córdoba"] },
  { value: "arena-maipu", label: "Arena Maipú", keywords: ["Mendoza"] },
];

function VenuePicker() {
  const [venues, setVenues] = useState<Venue[]>(VENUES);
  const [value, setValue] = useState<Venue | null>(null);
  return (
    <Combobox
      items={venues}
      value={value}
      onValueChange={(next) => setValue(next as Venue | null)}
      isItemEqualToValue={(a, b) => (a as Venue).value === (b as Venue).value}
      onCreate={(label) => {
        const venue = { value: label.toLowerCase(), label };
        setVenues((prev) => [...prev, venue]);
        setValue(venue);
      }}
      className="ui:w-[280px]"
    >
      <Combobox.Input placeholder="Venue o ciudad" />
      <Combobox.Content>
        <Combobox.List>{(item) => <Combobox.Item value={item} />}</Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
}

/** Items match on their `keywords` too (type "rosario"), and `onCreate` offers the typed text when nothing matches. */
export const KeywordsAndCreate: Story = {
  args: { items: VENUES },
  render: () => <VenuePicker />,
  parameters: {
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

// Items match on their label and on \`keywords\`: "rosario" finds Metropolitano.
const [venues, setVenues] = useState([
  { value: "movistar", label: "Movistar Arena", keywords: ["Buenos Aires", "Villa Crespo"] },
  { value: "metropolitano", label: "Metropolitano", keywords: ["Rosario"] },
]);
const [value, setValue] = useState(null);

<Combobox
  items={venues}
  value={value}
  onValueChange={setValue}
  isItemEqualToValue={(a, b) => a.value === b.value}
  onCreate={(label) => {
    const venue = { value: label.toLowerCase(), label };
    setVenues((prev) => [...prev, venue]);
    setValue(venue);
  }}
>
  <Combobox.Input placeholder="Venue o ciudad" />
  <Combobox.Content>
    <Combobox.List>{(item) => <Combobox.Item value={item} />}</Combobox.List>
  </Combobox.Content>
</Combobox>`,
      },
    },
  },
};

const ARTISTS = Array.from({ length: 60 }, (_, i) => `Artista ${i + 1}`);
const PAGE = 20;

/** Stands in for an API: filters on the "server" and pages by 20. */
function fakeSearch(query: string, page: number): Promise<string[]> {
  const hits = ARTISTS.filter((a) => a.toLowerCase().includes(query.toLowerCase()));
  return new Promise((resolve) =>
    setTimeout(() => resolve(hits.slice(0, (page + 1) * PAGE)), 400),
  );
}

function RemoteArtistPicker() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fakeSearch(query, page).then((next) => {
      if (cancelled) return;
      setItems(next);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [query, page]);

  return (
    <Combobox
      items={items}
      filter={null}
      loading={loading}
      onInputValueChange={(q) => {
        setLoading(true);
        setQuery(q);
        setPage(0);
      }}
      className="ui:w-[280px]"
    >
      <Combobox.Input placeholder="Buscar artista" />
      <Combobox.Content>
        <Combobox.List
          onLoadMore={() => {
            setLoading(true);
            setPage((p) => p + 1);
          }}
        >
          {(item) => <Combobox.Item value={item} />}
        </Combobox.List>
        <Combobox.Empty>Sin resultados</Combobox.Empty>
      </Combobox.Content>
    </Combobox>
  );
}

/** Remote search: `filter={null}` shows what the server returns, `loading` covers the request, and `onLoadMore` fetches the next page. */
export const RemoteSearch: Story = {
  args: { items: [] },
  render: () => <RemoteArtistPicker />,
  parameters: {
    docs: {
      source: {
        code: `import { Combobox } from "@obel-arg/malbec-ui";

const [query, setQuery] = useState("");
const [page, setPage] = useState(0);
const { data = [], isFetching } = useArtistSearch(query, page); // your API, debounced

<Combobox
  items={data}
  filter={null} // the server already filtered
  loading={isFetching}
  onInputValueChange={(q) => {
    setQuery(q);
    setPage(0);
  }}
>
  <Combobox.Input placeholder="Buscar artista" />
  <Combobox.Content>
    <Combobox.List onLoadMore={() => setPage((p) => p + 1)}>
      {(item) => <Combobox.Item value={item} />}
    </Combobox.List>
    <Combobox.Empty>Sin resultados</Combobox.Empty>
  </Combobox.Content>
</Combobox>`,
      },
    },
  },
};
