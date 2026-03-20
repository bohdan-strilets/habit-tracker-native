export const colorsDark = {
  shadow: '#000',

  background: {
    screen: '#1c1c1e',
    surface: '#2c2c2e',
    surfaceMuted: '#3a3a3c',
    input: '#1c1c1e',
    disabled: '#48484a',
    disabledMuted: '#3a3a3c',
    transparent: 'transparent',
  },

  text: {
    primary: '#f2f2f7',
    secondary: '#e5e5ea',
    tertiary: '#d1d1d6',
    muted: '#aeaeb2',
    subtle: '#8e8e93',
    hint: '#636366',
    faint: '#48484a',
    inverse: '#ffffff',
    display: '#ffffff',
  },

  border: {
    default: '#48484a',
    light: '#3a3a3c',
    hairline: '#3a3a3c',
    subtle: '#48484a',
  },

  primary: {
    main: '#66bb6a',
    dark: '#81c784',
    headerTint: '#a5d6a7',
  },

  semantic: {
    successLight: '#1b3d24',
    successDark: '#81c784',
    dangerLight: '#3d1e1e',
    dangerBorder: '#8b4040',
    danger: '#ef9a9a',
    dangerDark: '#ffcdd2',
  },

  tab: {
    active: '#81c784',
    inactive: '#8e8e93',
    hairline: 'rgba(255, 255, 255, 0.12)',
  },

  accent: {
    todayBg: '#1a2740',
    todayLabel: '#90caf9',
  },

  progress: {
    dotEmpty: '#3a3a3c',
    dotEmptyBorder: '#48484a',
    dotDone: '#2e4a32',
    dotDoneBorder: '#4caf50',
    streakRing: '#81c784',
  },
} as const;
