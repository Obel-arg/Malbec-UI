# Changelog

All notable changes to Malbec UI are documented here.

## v2.0.0 — unreleased

The library's defaults now match the malbec-ux-ui spec approved by Isa. This release changes what you see without any code change on your side. Each section below says what changes on screen, and which overrides you can delete.

### Breaking: modals float without a veil
- **Dialog, Sheet, AlertDialog and Command** render without a veil by default. The overlay element stays, so clicking outside still closes the modal; it is just transparent. The surface lifts off the page on the two-layer shadow `0 24px 70px rgba(0,0,0,.22), 0 8px 20px rgba(0,0,0,.1)`. Side sheets cast that shadow away from their edge.
- `overlay="default"` is now `overlay="veil"`, the 1.x frosted veil (`background-200` at 60% + 3.5px blur, short shadow). Use it only where the design asks for it.
- **What to delete:**
  - `overlay="none"` everywhere. It is the default now.
  - Artist: `floating-dialog-classes`.
  - Publishing: `sheet-no-veil.css`.
  - Live: `modal-classes`, and the ink-at-55% veil in `globals.css:312`, which Isa confirmed against the spec.
- Command: to dim the page behind it, pass `overlayClassName`.
- The overlay element of Dialog, Sheet and AlertDialog now carries `data-overlay="none|veil"`, the same as the content, so CSS can target a variant without `:has()`.

### Breaking: segmented tabs are 40 / 14
- The track is 40px with a 6px radius. The trigger is 14px medium, `px-3 py-1.5`, with a 4px radius; the active tab is `background-100` on a `0 1px 3px rgba(0,0,0,.05)` shadow. Isa confirmed the spec over the 36/13 the apps were using.
- Every tab variant now has a neutral focus ring (`background-300`). The brand-colour ring no longer stays lit on the tab you just clicked.
- **What to delete:**
  - Artist: `segmented-tabs-classes.ts` (36px / 13px).
  - Publishing: `segmented-tabs.ts`, including the `!`.
  - Live: `SEGMENTED_TABS_TRIGGER_CLASS` (`ui:text-sm ui:font-medium`).
  - Records: its `text-xs` trigger.
  - Everywhere: `focus-visible:ring-background-300!` overrides.

### Breaking: chips are 8px and destructive is two-tone
- Every **Badge** goes from a 4px to an 8px radius, the same as `Button` (spec rule 7).
- `variant="destructive"` drops solid red with white text for the spec pair `#dfd0d0` / `#602a2a`, the same as `red`.
- **What to delete:**
  - Publishing: `badge-destructive.css`.
  - Any `rounded-[8px]` you add to a `Badge`.

## v1.15.0 — 2026-11-02

Opt-in variants for seven primitives. Nothing changes on screen until you use a new prop. Each one replaces a recipe the apps were maintaining by hand.

### Added
- **Button**
  - `tone="neutral"` turns `outline` and `ghost` grey: `text-default` text, a `background-300` border on outline, `background-200` hover, `background-300` active and a `malbec-icon` focus ring. It replaces `no-green-button-classes` (Artist, Publishing), `malbecOutlineButtonClass` / `malbecGhostButtonClass` (Live) and Publishing's `button-outline.css` / `button-ghost.css`.
  - `asChild` renders a `Link` or an `<a>` with the button styles.
  - `buttonVariants` is now exported, for elements that can't use `asChild`.
  - `variant="row"` is a full-width, left-aligned row for lists and popovers.
- **Badge**
  - `variant="neutral"` is the system grey pair `#e4e2df` / `#6b6b7a`. It replaces `!bg-malbec-badge-neutral-*`.
  - `size="xs"` gives a 20px chip with 11px text, for dense tables.
  - Colour tones now paint through `--malbec-badge-bg` / `--malbec-badge-fg`, so you can retune a pair from CSS without `!important`. The values are the same as before.
- **Dialog / Sheet / AlertDialog**
  - `size` sets the width.
    - Dialog: `sm` 448, `md` 560, `lg` 640, `xl` 880. The width is capped at the viewport minus 1rem per side, so you can drop the `w-[min(…)] max-w-none` and `max-w-[…]!` overrides.
    - Sheet: `sm` 448, `md` 576, `lg` 672, `xl` 768.
  - `overlay="none"` removes the veil and floats the surface on the two-layer shadow. The overlay element stays, so clicking outside still closes. It replaces `floating-dialog-classes` (Artist), `modal-classes` (Live) and `sheet-no-veil.css` (Publishing).
  - AlertDialog also gets `overlayClassName`.
  - `Sheet.Body scroll` makes the body scroll while the header and footer stay pinned.
- **FloatingBar:** `placement="bottom"` pins the bar 40px above the bottom of the content area. It stays centred whether the sidebar is expanded, collapsed or on mobile, and sits under modal overlays. It replaces the `fixed bottom-10 left-[calc(50%+var(--sidebar-width…)/2)] z-120 -translate-x-1/2` chain. Keep the bar inside `Sidebar.Provider`.
- **Tooltip:** `variant="dark"` ("la negra") is for icon-only actions: `malbec-ink` background, 13px medium text, no border. It replaces `TOOLTIP_DARK_CLASS` and the `bg-gray-900` copies. The light tooltip stays the default, for explaining a value.
- **Input**
  - `variant="search"` is the spec searchbar: `background-200` fill, with the native clear button hidden. Set the width yourself: `w-full sm:w-[348px]` in a list.
  - `variant="bare"` drops the box for inline editing; you set the type size. The focus outline stays.
- **Tabs:** `variant="opacity"` is for screen-level tabs: no line and no track, the active tab at 100% and the rest at 40%. It replaces the `opacity-tabs-classes` and `plain-tabs` constants.
- **Sidebar:** `Sidebar.Provider` now exposes `--sidebar-offset`, the space the sidebar currently takes from the content area.

### Not in this release
The veil default, the segmented size (40/14 vs 36/13) and "all tooltips dark" are design decisions pending with Isa for 2.0. Nothing here changes a default.

## v1.14.0 — 2026-11-02

### Added
- **`malbec-ui/tokens.css`:** the Malbec system tokens, so apps stop redefining them. Import it after `style.css` in your `globals.css`:
  ```css
  @import "malbec-ui/tokens.css";
  ```
  It gives `text-malbec-ink` (#1a1a1f), `text-malbec-icon` (#3f3f46), `text-malbec-muted-text` (#8c8c94), `text-malbec-table-header` (#6b6b7a) and the badge pairs `bg-malbec-badge-{green,yellow,orange,purple,blue,red,neutral}-bg` / `text-malbec-badge-…-text`.
- **Embossed** utilities from the spec: `border-embossed` (white border + `#f1f0ee` outer ring, no shadow) to close a data surface, and `divider-embossed` (`#eae7e3` top edge + white inset light) between sections. They work with variants (`hover:`, `md:`…). **Live:** your own `.border-embossed` in `globals.css` (`#ddd8d1` border) is unlayered, so it keeps winning until you delete it. The spec version is the one that stays.
- Badge `blue` and `red` match `<Badge variant="blue">` / `variant="red"`. **Artist:** your `blue` (#d4ddef / #2f4a8a) changes to #dce6ec / #2f628a. **Live:** your `red` (#efd4d4 / #8a2f2f) changes to the spec red #dfd0d0 / #602a2a.
- Nothing changes on screen until you import it. Once you do, delete the matching `--color-malbec-*` lines from your own `@theme`; any value you keep in a later `@theme` block still wins. **Artist:** your current ink and muted-text values are off-spec (#18181b and #71717a) and will change to the spec values when you drop them.

## v1.13.3 — 2026-11-02

### Fixes
- **Select:** a long text value now ends in "…" instead of being cut off mid-word. The value slot is `block` + `truncate` when it holds plain text, and keeps its `flex` row when it holds elements (icon + text), so selects with icons look the same as before.
- **Select:** the base value-slot layout now has low specificity, so a plain class such as `[&_[data-slot=select-value]]:flex` overrides it. You can drop `!` overrides you added for this.

## v1.13.2 — 2026-11-02

### Fixes
- **`@obel-arg/malbec-ui/theme` exports again.** In 1.13.1 the `./theme` barrel was published without its exports (ESM and CJS), so `import { MalbecThemeProvider } from "malbec-ui/theme"` failed to bundle with "the module has no exports at all". It now exports `MalbecThemeProvider`, `MalbecThemeContext`, `useTheme`, `TOKEN_NAMES`, `TOKEN_TO_CSS_VAR` and the presets. A post-build check now imports every public entry point before publishing.

### Additions (non-breaking)
- **`DataTable` `onRowClick` receives the event** as an optional third argument: the click, the Enter/Space keydown, or a **middle-click**, which now also triggers it. Use it to open the row elsewhere, for example `event.metaKey || event.ctrlKey || ("button" in event && event.button === 1)`. Two-argument handlers keep working. The event type is exported as `DataTableRowEvent`.

### Tooling
- Dev dependencies patched for 21 advisories (Storybook 10.6.4, Vite 8.3.5, zod 4.6.7, Babel 7.29.7). None were in the published dependencies.
- PRs to `main` are gated on critical/high vulnerabilities (`pnpm audit`).

## v1.13.1 — 2026-11-02

Bug fixes from the UI audit. No API changes. A few styles that were always meant to apply now do, so check the "Visible changes" list.

### Fixes
- **DataTable:** `onRowClick` fires again, both on click and on Enter/Space. Clicks on links, buttons and inputs inside a row are still ignored. Apps can drop row-click workarounds such as Artist's `row-click-table`.
- **Form:** `form-context` and `use-form` are client modules now, so the barrel can be imported from a React Server Component without wrapping the provider.
- **Sidebar:** no more hydration mismatch on mobile viewports. Live can delete `patches/@obel-arg__malbec-ui@1.11.2.patch`.
- **Exports:** `@obel-arg/malbec-ui/theme` (the theme barrel, including `MalbecThemeProvider`) and `@obel-arg/malbec-ui/theme/presets` are public subpaths. This replaces Live's patch.
- **`cn()`:** knows the custom type scale (`text-muted-medium`, `text-small`, `text-xxs`, …). A size class is no longer dropped when a color class follows it.
- **z-index:** overlays, floating surfaces and nested submenus read `--ui-z-overlay` (50), `--ui-z-floating` (100) and `--ui-z-floating-nested` (110). The values are unchanged; override them in your `:root` instead of using `!z-[…]`.

### Visible changes
- **Tabs `segmented`:** the trigger text is 14px, as designed, instead of the inherited 16px. Remove local overrides that forced 14px.
- **DropdownMenu.Item:** no longer applies `justify-between`. `DropdownMenu.Shortcut` stays right-aligned (it uses `ml-auto`). A second child without `ml-auto` now sits next to the label, so drop your `justify-start` overrides.
- **Select:** a long selected value truncates with an ellipsis instead of pushing the chevron out. This is applied from `Select.Trigger`, because Radix ignores `className` on `Select.Value`.
- **35 classes with a misplaced `ui:` prefix now apply:**
  - `DropdownMenu.RadioItem` shows its checked dot.
  - The `Combobox` clear, remove and chip buttons get a hover background and a focus ring.
  - The `Calendar` caption gets a hover background.
  - Charts lose the browser focus outline, axis labels use the muted text token, white strokes on dots and sectors become transparent, and legend and tooltip icons are 10–12px.
  - In dark mode, Select, Popover, DropdownMenu, Table and Calendar use their dark surface tokens.

### Tooling
- Releases ship inside the change PR: bump `package.json`, add a CHANGELOG entry, and merge (see README → Releasing).
- pnpm 11 with a 7-day release quarantine, Vitest, and CI on every PR (build, lint, tests, release check).
- README: install docs use `${NODE_AUTH_TOKEN}` in `~/.npmrc` and a pinned pnpm install.

## v1.13.0 — 2026-10-28

- minor(badge): StatusBadge accepts an explicit tone

## v1.12.0 — 2026-10-28

- docs(badge): default status arg so StatusBadge stories type-check
- docs(badge): add StatusBadge Storybook story
- minor(badge): add canonical status→tone map and StatusBadge

## v1.11.2 — 2026-08-07

- patch(date-picker): close the popover once a selection is complete
- patch(date-picker): derive date defaults from today, not fixed dates
- patch(calendar): bound year-dropdown navigation around today
- docs(stories): show real usage in Storybook code panels

## v1.11.1 — 2026-07-16

- patch(calendar): add show padding days (`daysBefore` / `daysAfter`) — reserved travel / rest days around a show, drawn as a thin accent base line butted against the show chip in the month view, and beside the show at its own time level in the day/week time grid

## v1.11.0 — 2026-07-16

- minor(calendar): group shows under their tour via `parentId` — a tinted container spanning the tour's dates in the month view, and shared tour color + accent rail in the day/week time grid
- minor(calendar): add unconfirmed/tentative event state (`confirmed: false`) rendered as a fill-less, dashed-outline chip for shows and tours

## v1.10.0 — 2026-06-17

- patch(ci): split release workflow into release-PR + publish stages
- minor(inbox): add Inbox compound component matching Figma notification surface
- minor(calendar): support multi-day and all-day events across month/week/day views
- chore(package.json): make public

## v1.9.0 — 2026-05-18

- minor(file-dropzone): add FileDropzone component with disabled and invalid states
- minor(textarea): add Textarea component mirroring Input surface tokens
- patch(form-controls): soften focus ring to 1px background-300, persist on popover open, unify invalid outline to 1px

## v1.8.5 — 2026-05-14

- patch(floating-bar): tweak border tone, bump count/trigger text to 13px, and icon to 14px

## v1.8.4 — 2026-05-12

- patch(form): destructure useForm export and add array-field story with zod 0-100 validation

## v1.8.3 — 2026-05-12

- patch(combobox): open popover when clicking anywhere on trigger row

## v1.8.2 — 2026-05-12

- patch(date-picker): set content background to background-100
- patch(combobox): make chevron button toggle popover open state

## v1.8.1 — 2026-05-11

- patch(theming): use theme tokens for badge fg/accent vars, calendar borders, and timegrid grid lines

## v1.8.0 — 2026-05-11

- minor(floating-bar): add FloatingBar component with animated open/close

## v1.7.7 — 2026-05-11

- patch(data-card): switch accent to stripe wrapper + inner panel, add panelClassName and UpcomingShow story

## v1.7.6 — 2026-05-11

- patch(avatar): export AvatarGroupCount and attach as AvatarGroup.Count

## v1.7.5 — 2026-05-11

- patch(avatar): export AvatarGroup from package entry

## v1.7.4 — 2026-05-08

- patch(combobox): reflect aria-invalid via :has() so Field auto-propagation styles the trigger

## v1.7.3 — 2026-05-08

- patch(forms): tighten invalid outline offset and suppress focus ring when invalid

## v1.7.2 — 2026-05-08

- patch(types): expose component prop types and add invalid-by-default form story

## v1.7.1 — 2026-05-08

- patch(theme): render theme tokens and dark class server-side

## v1.7.0 — 2026-05-08

- minor(form): add Form and Field with TanStack Form integration

## v1.6.0 — 2026-05-07

- minor(ci): enforce commit format and auto-publish

## v1.5.1 — 2026-05-07

- fix(storybook): render version in changelog header

## v1.5.0 — 2026-05-07

- feat(storybook,forms): surface version + changelog and unify invalid outline

## v1.4.9 — 2026-05-07

- refactor(input): update focus styles to use :focus-within for better accessibility

## v1.4.8 — 2026-05-07

- refactor(input): change wrapper from div to label for better semantics

## v1.4.7 — 2026-05-07

- refactor(input): use outline instead of ring for focus indicator

## v1.4.6 — 2026-05-06

- feat(input,combobox): add Input.Icon slots and align Combobox trigger with Input
- feat(badge,calendar): align Badge variants and Calendar today indicator with Figma

## v1.4.5 — 2026-05-05

- Refactor Calendar components: update focus styles for better accessibility, implement mouse down event handling to prevent default actions on non-selectable areas, and add onSelectDay logging for debugging in CalendarDay and CalendarWeek stories.
- Enhance Calendar components: add slot selection functionality by mapping vertical grid clicks to time slots, update onSelectDay prop to include time and date, and introduce utility functions for formatting slot times.
- Update z-index values for UI components: change z-index from 50 to 100 for Combobox, DropdownMenu, Popover, Select, and Tooltip to ensure proper layering above modal overlays.

## v1.4.4 — 2026-05-05

- Update DataTable component: add custom class to Table.Body for improved row styling and hover effects.

## v1.4.3 — 2026-05-05

- Enhance DataTable component: add onRowClick prop for row interaction, refactor row selection handling, and introduce utility function to ignore interactions on specific elements.

## v1.4.2 — 2026-05-05

- Update Dialog component styles and stories: increase padding in dialog content, add Steps component to EditProfile story, and adjust DialogFooter layout with a Cancel button.

## v1.4.1 — 2026-05-05

- Refactor Calendar components: enhance CalendarMonthToolbar with consistent styling, add week navigation to CalendarWeek, and streamline CalendarTimeGrid stories by removing unused icons and improving event handling.

## v1.4.0 — 2026-05-01

- Add DataCard component: create DataCard, its variants, and stories for flexible layout and accent customization

## v1.3.2 — 2026-04-30

_No user-facing changes._

## v1.3.1 — 2026-04-29

- Enhance CalendarMonth component: add navigation buttons for previous and next months, improve layout with grid styling, and update select variants for better visual consistency.

## v1.3.0 — 2026-04-29

- Update Button component styles and props: change default size to 'lg', enhance primary variant with font weight, and simplify Button stories by removing size prop.
- Enhance Calendar components: add CalendarWeek and CalendarDay exports, introduce CalendarTimeGrid utilities and types, and implement CalendarTimeGrid layout components for improved event management.

## v1.2.3 — 2026-04-29

- Add tooltip support to Sidebar components for improved accessibility
- Refactor RadioGroup styles: update radio item background and indicator handling. Remove unused dot variant and adjust checked state styling for improved visual consistency.

## v1.2.2 — 2026-04-28

- Remove shadow styles from DatePicker, Command, and Combobox variants for a cleaner design.

## v1.2.1 — 2026-04-28

- Remove shadow styles from select trigger and content variants for a cleaner design.

## v1.2.0 — 2026-04-28

- Enhance Tabs component with underline variant support and update README for installation instructions. Add new stories for underline navigation and disabled states.
- Added new codeoners
- Add cursor pointer styles to various components for improved user interaction

## v1.1.9 — 2026-04-27

_No user-facing changes._

## v1.1.8 — 2026-04-27

- Refactor SidebarMenuSub component to use a <ul> element for better semantic structure and update sidebarMenuSubRailVariants to include additional utility classes for improved styling.

## v1.1.7 — 2026-04-27

- Enhance Storybook documentation by adding code examples for various components, including Alert, AlertDialog, Avatar, Badge, Calendar, and more. Introduce SortableColumnHeader export in DataTable for improved usability.

## v1.1.6 — 2026-04-27

- Update padding in cardRootVariants from 10 to 6 for improved layout consistency.

## v1.1.5 — 2026-04-26

- Refactor Dialog and Sheet components to ensure unique function identities for Root, Trigger, and Portal. This prevents aliasing issues with Radix components, enhancing modular integrity.

## v1.1.4 — 2026-04-26

- Refactor dialog and sheet components to utilize new animation keyframes and improve motion handling. Remove deprecated dialog motion styles and replace with Tailwind utilities for overlay and content animations. Update imports to use SheetPrimitive for sheet components.

## v1.1.3 — 2026-04-26

- Add rollup-plugin-preserve-directives to package.json and update Vite configuration to utilize it for preserving client/server directives in modules. Mark multiple components as client components by adding "use client" directive.

## v1.1.2 — 2026-04-26

- Refactor package.json and pnpm-lock.yaml to reorganize dependencies and devDependencies; add new packages for enhanced functionality and update Vite configuration to improve module resolution and external dependency handling.

## v1.1.1 — 2026-04-26

- Update Vite configuration to preserve module structure and set root for module output.
- Add CalendarMonth component with variants and Storybook stories; update main exports in `lib/main.ts`, introduce new badge variants in `lib/Badge`, and enhance styling for categorical badges.

## v1.1.0 — 2026-04-25

- Remove custom icons path from TypeScript configurations and Vite build settings to streamline exports and improve clarity.
- Refactor package exports and add custom icons; update package.json to include new icons path, add lucide-react dependency, and enhance README with import instructions for custom icons. Update TypeScript configurations and Vite build settings for improved icon handling.
- Update README.md to clarify npm installation instructions for @obel-arg/malbec-ui, specifying the need for a read-only Personal Access Token for GitHub Packages.
- Enhance Sidebar component with collapsed state support; add new constants for collapsed width, update variants for responsive behavior, and improve Storybook demo with collapse instructions.

## v1.0.0 — 2026-04-24

- Add DataTable component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved table functionality.
- Add DataTable component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved table functionality.
- Add Chart component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved charting functionality.
- Add Card and Steps components with variants and Storybook stories; update main exports in `lib/main.ts` for enhanced UI functionality.
- Add Tooltip component with variants and Storybook stories; update main exports in `lib/main.ts` to include Tooltip for enhanced UI functionality.
- Add Tabs, Toggle, and ToggleGroup components with variants and Storybook stories; update main exports in `lib/main.ts`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced UI functionality.
- Update Vite configuration to exclude Storybook stories from TypeScript declaration generation, preventing TS4023 errors related to unexported types.

## v0.0.7 — 2026-04-24

- Add Switch component with variants and Storybook stories; update main exports in `lib/main.ts`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced toggle functionality.
- Add Sonner component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles for toast notifications in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved notification functionality.
- Add Sidebar component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles for improved usability, and include new dependencies in `package.json` and `pnpm-lock.yaml` for collapsible functionality.
- Add Sheet component with variants and Storybook stories; update main exports in `lib/main.ts` and enhance styles for improved animations and usability.
- Add RadioGroup component with variants and Storybook stories; update main exports in `lib/main.ts` and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced form functionality.
- Add Pagination component with variants and Storybook stories; update main exports in `lib/main.ts` to include Pagination for enhanced navigation functionality.
- Add InputOtp component with variants and Storybook stories; update main exports in `lib/main.ts`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced OTP input functionality.
- Add Input and Label components with variants and Storybook stories; update main exports in `lib/main.ts` and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced form functionality.
- Add ChevronDownIcon component and Dropdown functionality to Calendar; enhance DatePicker with locale support for better internationalization. Update styles and props for improved usability.
- Add DropdownMenu component with variants and Storybook stories; update package.json and pnpm-lock.yaml to include new dependencies.
- Implement dialog component with animations and styles; integrate into Command component for enhanced user experience. Update dialog variants and styles for improved accessibility and visual consistency.

## v0.0.6 — 2026-04-23

- Enhance component library with new Calendar and DatePicker components, including variants and Storybook stories. Update main exports in `lib/main.ts` and add necessary dependencies in `package.json` and `pnpm-lock.yaml` for improved functionality and accessibility.

## v0.0.5 — 2026-04-22

- Refactor main exports to streamline component accessibility; removed unused exports and retained essential components including Button, Alert, AlertDialog, Avatar, Spinner, Breadcrumb, Checkbox, Combobox, and Command.
- Add Command component with variants and Storybook stories; update main exports and include new dependencies in package.json and pnpm-lock.yaml.
- Add Combobox component with variants and Storybook stories; update main exports and include new dependencies in package.json and pnpm-lock.yaml.
- Add Checkbox component with variants and Storybook stories; update package.json and pnpm-lock.yaml to include new dependencies.

## v0.0.4 — 2026-04-22

- Add @storybook/addon-docs to package.json and pnpm-lock.yaml; update Storybook configuration to include the addon for enhanced documentation support.
- Add Breadcrumb component with subcomponents and variants; include associated Storybook stories and update main exports. Enhance Badge component with new Icon and Text subcomponents, and update Badge stories to reflect the new structure.
- Add Badge component with variants and associated Storybook stories; update main exports and package dependencies in package.json and pnpm-lock.yaml.
- Add Avatar component with subcomponents and variants; update main exports and introduce avatar-variants utility. Add Storybook stories for Avatar configurations and update package.json and pnpm-lock.yaml with new dependencies.
- Add AlertDialog component with subcomponents and variants; update main exports and introduce alert-dialog-variants utility. Add Storybook stories for various AlertDialog configurations.
- Implement Alert component with subcomponents and variants; update Button exports and add new alert-variants utility. Modify Storybook preview for improved styling consistency.
- Add Button component with variants and loading state support; introduce Spinner component and utility for class name merging. Update package.json and pnpm-lock.yaml with new dependencies.
- Refactor Storybook preview configuration by replacing preview.ts with preview.tsx, enhancing theming support with MalbecThemeProvider and theme presets. Introduce fontsource declaration for Inter variable font and update styles to apply new font family. Add Button component stories for better documentation and testing.
- Update ESLint configuration to ignore Storybook static files, enhance package.json with new CSS and Storybook dependencies, and implement theme context and provider for improved theming support. Refactor Button component for better styling and add new theme presets and tokens for consistent design.
- Enhance project setup with Storybook integration and Tailwind CSS support. Updated .gitignore to exclude Storybook logs, modified eslint configuration to include Storybook plugin, and added Storybook configuration files. Updated package.json and pnpm-lock.yaml to include Storybook dependencies and scripts for development and building. Introduced Tailwind CSS styles and updated main.ts to import styles.

## v0.0.3 — 2026-04-22

- Update TypeScript definitions path in package.json and disable rollupTypes in vite.config.ts to fix consumer imports.

## v0.0.2 — 2026-04-22

- Update package.json to include pnpm as package manager and add TypeScript definitions. Modify GitHub Actions workflow to use pnpm for dependency installation, building, and publishing.
- Refactor package structure and add GitHub Actions for publishing. Updated package name to @obel-arg/malbec-ui, added .npmrc for GitHub Packages, and enhanced README with installation and publishing instructions. Included vite-plugin-dts for TypeScript definitions and configured GitHub Actions workflow for automated version bumping and publishing.
- init

