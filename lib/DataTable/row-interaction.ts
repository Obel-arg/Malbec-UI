/**
 * Whether a click or key on a row came from an interactive element inside it (a checkbox, a menu
 * button, a link), which handles it on its own. The row itself has role="button", so a match on
 * the row doesn't count.
 */
export function shouldIgnoreRowInteraction(target: EventTarget | null, row: HTMLElement): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const interactive = target.closest(
    'a, button, input, select, textarea, [role="button"], [data-row-click-ignore]',
  );
  return interactive !== null && interactive !== row;
}
