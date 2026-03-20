export function darkenHex(hex: string, factor: number): string {
  const n = hex.replace('#', '').trim();
  if (n.length !== 6) return hex;
  const r = Math.min(255, Math.round(parseInt(n.slice(0, 2), 16) * factor));
  const g = Math.min(255, Math.round(parseInt(n.slice(2, 4), 16) * factor));
  const b = Math.min(255, Math.round(parseInt(n.slice(4, 6), 16) * factor));
  if ([r, g, b].some((x) => Number.isNaN(x))) return hex;
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}
