/** Expands #rgb to #rrggbb; returns null if not a valid hex color string. */
function normalizeHexString(input: string): string | null {
  let h = input.replace('#', '').trim().toLowerCase();
  if (h.length === 3 && /^[0-9a-f]{3}$/i.test(h)) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length === 6 && /^[0-9a-f]{6}$/i.test(h)) {
    return h;
  }
  return null;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHexString(hex);
  if (!normalized) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export function hexToRgba(hex: string, alpha: number): string {
  const normalized = normalizeHexString(hex);
  if (!normalized) {
    return `rgba(0,0,0,${alpha})`;
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) {
    return `rgba(0,0,0,${alpha})`;
  }
  return `rgba(${r},${g},${b},${alpha})`;
}
