# Build component from shadcn docs + Figma (MCP review)

You are implementing a **malbec-ui** component that must follow **shadcn/ui semantics and API expectations** while matching the **Figma frame pixel- and structure-faithfully**. Use **composition** (compound subcomponents + shared context + variant modules) consistent with existing library code.

**Variants (strict):** Implement **only** variant dimensions and values that appear in the Figma frame (component properties, variant sets, named states, and visible modes). **Do not** add sizes, colors, visual styles, or state branches from shadcn docs, registry defaults, or guesswork when they are **not** present in the design. If shadcn documents more variants than Figma, keep the API compatible where required but map styling to what Figma shows—**omit** visuals for combinations that do not appear in the design rather than inventing them.

**Primitives:** implement behavior and accessibility with **Radix UI** (`@radix-ui/react-*`) only. **Do not** use Base UI (`@base-ui/react`) or other headless stacks for this workflow—even if upstream shadcn docs or CLI output reference Base UI or link to base-ui.com, map the interaction model to **Radix**-based composition (and native elements where Radix has no primitive).

**Compound API (required for stories and primary usage):** attach pieces on the root the same way as **`lib/Button/`** and **`lib/Alert/`** — e.g. `<Button.Icon>`, `<Button.Text>`; for breadcrumbs, `<Breadcrumb.List>`, `<Breadcrumb.Item>`, `<Breadcrumb.Link>`, `<Breadcrumb.Page>`, `<Breadcrumb.Separator>`, `<Breadcrumb.Ellipsis>`. Story source must demonstrate this pattern, not only flat `BreadcrumbList`-style imports. **Public library exports** are only the root component (see **Exports** below); do not add separate top-level exports for flat registry names, internal modules, or types.

---

## Inputs (fill in the chat when you run this command)

- **Shadcn docs**: paste the official component doc URL(s) and/or run `pnpm dlx shadcn@latest docs <component>` / `npx shadcn@latest docs <component>` and use the URLs it prints. If the project has `components.json`, prefer registry-aligned behavior from those docs. Treat docs as **behavior and composition reference**; implementation must still use **Radix** primitives, not Base UI, even when the printed “API” link targets Base UI.
- **Figma**: paste the **full frame URL** (design node). Example: `https://www.figma.com/design/<fileKey>/...?node-id=1-234`
  - Extract **`fileKey`** from the path.
  - Extract **`nodeId`** from `node-id=` and convert `-` → `:` (e.g. `1-234` → `1:234`).
  - Branch URLs: if the URL contains `/branch/<branchKey>/`, use **`branchKey` as `fileKey`** (per Figma MCP rules).

---

## Phase 0 — Primitive dependency check (required, first)

Before gathering sources for the requested component, determine whether it **composes other shadcn/Radix primitives** (e.g. `DatePicker` composes `Popover` + `Calendar`; `Combobox` composes `Popover` + `Command`; `Form` composes `Label`, etc.).

1. From the shadcn docs for the requested component, list every primitive it depends on.
2. For each dependency, check whether it **already exists as a malbec-ui primitive** under `lib/<Primitive>/` with its own variants file, component, stories, and an export in `lib/main.ts`.
   - Only count it as "existing" if it is a **public** malbec-ui component. Internal usage of a Radix package inside another component (e.g. `@radix-ui/react-popover` imported from `Combobox.tsx`) does **not** count.
3. If any dependency is **missing**:
   - **Stop.** Do not start building the requested component.
   - List every missing primitive to the user.
   - **Ask the user to provide a Figma frame URL for each missing primitive.** The user must supply one Figma URL per primitive. Do not guess, do not reuse frames.
   - For each missing primitive, **look up the shadcn docs page** for its Radix implementation (e.g. `https://ui.shadcn.com/docs/components/popover`) so you have docs + Figma before implementing.
4. **Build each missing primitive first**, one at a time, by running the full workflow (Phases 1–4 below) on that primitive: variants file, component(s), stories, `lib/main.ts` export. A primitive is done when it satisfies the same Definition of Done as any other component.
5. Only after **all** dependent primitives are in place may you proceed to build the originally-requested component by composing them.

---

## Phase 1 — Gather sources

1. **Shadcn**: Read the linked documentation (and examples). Internalize props, accessibility requirements, composition rules (slots, Title/Description patterns, **Radix** expectations), and naming that aids API parity. **Do not** treat doc-listed visual variants as a checklist to implement—those apply only when Figma includes them (see **Variants (strict)** above). Do **not** copy generic Tailwind from docs blindly—map styles to this repo’s tokens and patterns. Ignore or translate any Base UI–specific APIs; the deliverable is **Radix-backed** only.
2. **Figma (MCP)**: Before writing code, call the **Figma MCP** tools (read tool schemas first if needed):
   - **`get_design_context`** with `fileKey`, `nodeId`, `clientLanguages=typescript`, `clientFrameworks=react`. Keep screenshot **on** unless context is huge; use it to understand layout, typography, spacing, and states.
   - Optionally **`get_variable_defs`** if the design relies on variables/tokens you should mirror in CSS/Tailwind.
   - Optionally **`get_metadata`** if you need hierarchy or child node names.
   - **Inventory variant axes and values from the frame** (component sets, properties, interactive states). That list is what you implement—nothing beyond it unless required for a11y/behavior with **neutral** styling aligned to the closest Figma state.

Treat Figma-generated code as **reference only**—rebuild using this library’s conventions.

---

## Phase 2 — Align with this repo’s architecture

Study **`lib/Alert/`** and **`lib/Button/`** as templates:

- **`cn`** from `lib/utils/cn` for `className` merging.
- **Variants**: `class-variance-authority` (or project equivalent) in a separate `*-variants.ts` file. **Define variant keys and options from Figma only** (what the design actually ships); do not extend `cva` with extra `variant`/`size`/state options just because shadcn lists them. Keep variant helpers and any variant-related types **internal** to the component folder; do not export them from **`lib/main.ts`**.
- **Composition**: Root + subcomponents (`forwardRef`) assigned on the root export (`Component.Part = …`), optional **React context** when children need parent variant/size (see `Alert`, `Button`). **Stories** should use the compound JSX form (`<Breadcrumb.List>…`) like **`Button.stories.tsx`**, not flat sibling components only.
- **DOM**: Semantic elements; `data-slot="..."`, `data-variant`, `data-size` where it helps Storybook/CSS.
- **Accessibility**: Roles, labels, `aria-*`, keyboard behavior per shadcn and **Radix** expectations (never Base UI patterns in code).
- **Exports**: From **`lib/main.ts`**, export **only the base (root) component** for the feature—one named export per component family (e.g. `Button`, `DatePicker`). **Do not** export: compound subcomponents as separate entry points, “flat” shadcn-style siblings, **prop types**, **variant types**, **`Props` interfaces**, or anything from `*-variants.ts`. Consumers use the compound API via the root only (e.g. `DatePicker.Trigger`), not separate package exports for internal pieces.
- **Stories**: Add **`<Component>.stories.tsx`** beside the component (match existing Storybook style). **In Storybook, do not**:
  - replicate the **Figma artboard / frame** layout (no “full frame” or design-board mock, no copy of the doc blurb that exists only in Figma);
  - include **any reference to Figma** in stories—no Figma URLs, no `Figma`, `figma.com`, or “frame” in story `name`/`title`, JSDoc shown by autodocs, or story source meant for design reviews. Visual parity with the design is validated in the agent workflow (Phase 4), not in the stories file.

Prefer **small composable pieces** over one bloated component file.

---

## Phase 3 — Implement

1. Implement the component to satisfy **shadcn docs** (behavior, API shape, a11y) using **Radix** primitives only—no `@base-ui/react`.
2. Style to match **Figma** (spacing, radii, borders, typography scale, icon sizes, states **that exist in the frame**). Resolve conflicts by: **behavior/API/docs first**, **visuals from Figma**—use design tokens / CSS variables already in the library when possible. **Do not** add decorative classes, shadows, borders, or state styles that are absent from the design.
3. Add or reuse stories that cover **only** the **variants and states shown in Figma** (independent, neutral titles—see Phase 2 Storybook rules: no Figma in `*.stories.tsx`). Do not add story permutations for combinations the design does not include.

---

## Phase 4 — MCP visual review (required)

1. Call **`get_screenshot`** with the same **`fileKey`** and **`nodeId`** as the design frame.
2. Compare the screenshot to the implemented UI in the **chat** (a plain Storybook canvas view or described markup is fine; **do not** add a special “Figma / frame” story for this).
3. List **concrete deltas** (padding, font size/weight, colors, alignment, gaps, border, shadows, icon alignment) and iterate styles until the build **matches the Figma frame** within normal browser/font rendering tolerance.

If Code Connect is configured for this file, you may also use **`get_context_for_code_connect`** / related tools—still validate visually with **`get_screenshot`**.

---

## Definition of done

- [ ] Phase 0 completed: every dependent primitive either already existed in `lib/` as a public malbec-ui component, or was built first (with its own Figma frame, variants, stories, and `lib/main.ts` export) before the requested component.
- [ ] API and behavior align with **shadcn documentation** for the component family, implemented with **Radix UI** only (no Base UI).
- [ ] Visual structure and styling match the **Figma frame** (checked with **`get_screenshot`** against the built component, without relying on a Storybook “design frame” story).
- [ ] Code follows **malbec-ui composition patterns** (variants file, `cn`, compound components on the root). **`lib/main.ts`** exports only the base component—no internal subcomponents, prop types, or variant exports.
- [ ] Stories cover the variants/states **present in Figma** (no extra permutations), without the Figma frame in Storybook and without Figma references in `*.stories.tsx`.

---

## Notes

- **`lib/main.ts` public API:** one root export per component (compound members hang off that object only). No exported prop types, variant types, or internal subcomponents as separate package exports.
- **Figma is the source of truth for visual variants:** do not add variant options, states, or styling dimensions that the frame does not show (including “helpful” shadcn parity extras).
- Do not introduce unrelated refactors or new docs outside this workflow.
- If the shadcn CLI or registry is unavailable, rely on the user-provided doc URLs and still complete the Figma MCP review loop.
- Do not add or rely on **Base UI**; prefer **`@radix-ui/react-*`** (and small controlled React state) to match documented UX.
