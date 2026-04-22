# Build component from shadcn docs + Figma (MCP review)

You are implementing a **malbec-ui** component that must follow **shadcn/ui semantics and API expectations** while matching the **Figma frame pixel- and structure-faithfully**. Use **composition** (compound subcomponents + shared context + variant modules) consistent with existing library code.

---

## Inputs (fill in the chat when you run this command)

- **Shadcn docs**: paste the official component doc URL(s) and/or run `pnpm dlx shadcn@latest docs <component>` / `npx shadcn@latest docs <component>` and use the URLs it prints. If the project has `components.json`, prefer registry-aligned behavior from those docs.
- **Figma**: paste the **full frame URL** (design node). Example: `https://www.figma.com/design/<fileKey>/...?node-id=1-234`
  - Extract **`fileKey`** from the path.
  - Extract **`nodeId`** from `node-id=` and convert `-` → `:` (e.g. `1-234` → `1:234`).
  - Branch URLs: if the URL contains `/branch/<branchKey>/`, use **`branchKey` as `fileKey`** (per Figma MCP rules).

---

## Phase 1 — Gather sources

1. **Shadcn**: Read the linked documentation (and examples). Internalize props, accessibility requirements, composition rules (slots, Title/Description patterns, Radix/base expectations), and variant naming. Do **not** copy generic Tailwind from docs blindly—map styles to this repo’s tokens and patterns.
2. **Figma (MCP)**: Before writing code, call the **Figma MCP** tools (read tool schemas first if needed):
   - **`get_design_context`** with `fileKey`, `nodeId`, `clientLanguages=typescript`, `clientFrameworks=react`. Keep screenshot **on** unless context is huge; use it to understand layout, typography, spacing, and states.
   - Optionally **`get_variable_defs`** if the design relies on variables/tokens you should mirror in CSS/Tailwind.
   - Optionally **`get_metadata`** if you need hierarchy or child node names.

Treat Figma-generated code as **reference only**—rebuild using this library’s conventions.

---

## Phase 2 — Align with this repo’s architecture

Study **`lib/Alert/`** and **`lib/Button/`** as templates:

- **`cn`** from `lib/utils/cn` for `className` merging.
- **Variants**: `class-variance-authority` (or project equivalent) in a separate `*-variants.ts` file; export variant types.
- **Composition**: Root + subcomponents (`forwardRef`), optional **React context** when children need parent variant/size (see `Alert`, `Button`).
- **DOM**: Semantic elements; `data-slot="..."`, `data-variant`, `data-size` where it helps Storybook/CSS.
- **Accessibility**: Roles, labels, `aria-*`, keyboard behavior per shadcn/Radix expectations.
- **Exports**: Wire **`lib/main.ts`** (types + components + variant helpers as appropriate).
- **Stories**: Add **`<Component>.stories.tsx`** beside the component (match existing Storybook style). **In Storybook, do not**:
  - replicate the **Figma artboard / frame** layout (no “full frame” or design-board mock, no copy of the doc blurb that exists only in Figma);
  - include **any reference to Figma** in stories—no Figma URLs, no `Figma`, `figma.com`, or “frame” in story `name`/`title`, JSDoc shown by autodocs, or story source meant for design reviews. Visual parity with the design is validated in the agent workflow (Phase 4), not in the stories file.

Prefer **small composable pieces** over one bloated component file.

---

## Phase 3 — Implement

1. Implement the component to satisfy **shadcn docs** (behavior, API shape, a11y).
2. Style to match **Figma** (spacing, radii, borders, typography scale, icon sizes, states). Resolve conflicts by: **behavior/API/docs first**, **visuals from Figma**—use design tokens / CSS variables already in the library when possible.
3. Add or reuse stories that cover the main **variants and states** (independent, neutral titles—see Phase 2 Storybook rules: no Figma in `*.stories.tsx`).

---

## Phase 4 — MCP visual review (required)

1. Call **`get_screenshot`** with the same **`fileKey`** and **`nodeId`** as the design frame.
2. Compare the screenshot to the implemented UI in the **chat** (a plain Storybook canvas view or described markup is fine; **do not** add a special “Figma / frame” story for this).
3. List **concrete deltas** (padding, font size/weight, colors, alignment, gaps, border, shadows, icon alignment) and iterate styles until the build **matches the Figma frame** within normal browser/font rendering tolerance.

If Code Connect is configured for this file, you may also use **`get_context_for_code_connect`** / related tools—still validate visually with **`get_screenshot`**.

---

## Definition of done

- [ ] API and behavior align with **shadcn documentation** for the component family.
- [ ] Visual structure and styling match the **Figma frame** (checked with **`get_screenshot`** against the built component, without relying on a Storybook “design frame” story).
- [ ] Code follows **malbec-ui composition patterns** (variants file, `cn`, compound components, exports).
- [ ] Stories cover the main variants/states, without the Figma frame in Storybook and without Figma references in `*.stories.tsx`.

---

## Notes

- Do not introduce unrelated refactors or new docs outside this workflow.
- If the shadcn CLI or registry is unavailable, rely on the user-provided doc URLs and still complete the Figma MCP review loop.
