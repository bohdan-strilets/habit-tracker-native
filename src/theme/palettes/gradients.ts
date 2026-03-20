const canvasLight = ['#eff0f3', '#f2f3f5', '#eef0f3'] as const;
const canvasLightLocations = [0, 0.5, 1] as const;

const canvasDark = ['#1a1a1c', '#1c1c1e', '#18181a'] as const;
const canvasDarkLocations = [0, 0.5, 1] as const;

export const gradientsLight = {
  screen: canvasLight,
  screenLocations: canvasLightLocations,

  header: canvasLight,
  headerLocations: canvasLightLocations,

  primaryButton: ['#62d16c', '#4caf50', '#3d9a42'] as const,
  primaryButtonLocations: [0, 0.42, 1] as const,

  surfaceWash: ['#ffffff', '#f9fafb'] as const,
} as const;

export const gradientsDark = {
  screen: canvasDark,
  screenLocations: canvasDarkLocations,

  header: canvasDark,
  headerLocations: canvasDarkLocations,

  primaryButton: ['#7dd683', '#66bb6a', '#4caf50'] as const,
  primaryButtonLocations: [0, 0.42, 1] as const,

  surfaceWash: ['#2c2c2e', '#1c1c1e'] as const,
} as const;
