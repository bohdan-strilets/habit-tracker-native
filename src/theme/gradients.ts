/**
 * Soft, low-contrast stops (Apple-like system surfaces / filled controls).
 */

/** Shared canvas — header + scroll body use the same stops so there’s no “white strip”. */
const canvas = ['#eff0f3', '#f2f3f5', '#eef0f3'] as const;
const canvasLocations = [0, 0.5, 1] as const;

export const gradients = {
  screen: canvas,
  screenLocations: canvasLocations,

  header: canvas,
  headerLocations: canvasLocations,

  /** Primary CTA — light cap, rich mid (subtle vertical gloss) */
  primaryButton: ['#62d16c', '#4caf50', '#3d9a42'] as const,
  primaryButtonLocations: [0, 0.42, 1] as const,

  /** Full-screen gates (loading / error) */
  surfaceWash: ['#ffffff', '#f9fafb'] as const,
} as const;
