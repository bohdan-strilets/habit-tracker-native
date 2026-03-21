/** Completion ratio → fill color (GitHub-style greens + empty gray). */
export function heatmapIntensityColor(completed: number, total: number): string {
  if (total <= 0) {
    return '#E5E7EB';
  }
  const ratio = completed / total;
  if (ratio <= 0) {
    return '#E5E7EB';
  }
  if (ratio <= 0.25) {
    return '#DCFCE7';
  }
  if (ratio <= 0.5) {
    return '#86EFAC';
  }
  if (ratio <= 0.75) {
    return '#4ADE80';
  }
  return '#15803D';
}
