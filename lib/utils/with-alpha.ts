/**
 * `#rrggbb` at an alpha, as `rgba()`. Exactly what CSS color mixing with `transparent` gives,
 * without depending on that function: a browser that lacks it drops the whole declaration.
 */
export function withAlpha(hex: string, alpha: number): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
