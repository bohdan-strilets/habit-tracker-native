export const colors = {
  shadow: '#000',

  background: {
    screen: '#f2f3f5',
    surface: '#fff',
    surfaceMuted: '#f8f9fa',
    input: '#ffffff',
    disabled: '#cfcfcf',
    disabledMuted: '#eee',
    transparent: 'transparent',
  },

  text: {
    primary: '#111',
    secondary: '#222',
    tertiary: '#444',
    muted: '#555',
    subtle: '#666',
    hint: '#888',
    faint: '#999',
    inverse: '#fff',
    display: '#1a1a1a',
  },

  border: {
    default: '#e0e0e0',
    light: '#ddd',
    hairline: '#eee',
    subtle: '#e8e8e8',
  },

  primary: {
    main: '#4CAF50',
    dark: '#2e7d32',
    headerTint: '#1b5e20',
  },

  semantic: {
    successLight: '#e6f7ee',
    successDark: '#1b5e20',
    dangerLight: '#fdecec',
    dangerBorder: '#f0b4b4',
    danger: '#c62828',
    dangerDark: '#b71c1c',
  },

  tab: {
    active: '#2e7d32',
    inactive: '#8e8e93',
    /** iOS light-mode separator on bar top */
    hairline: 'rgba(60, 60, 67, 0.29)',
  },

  accent: {
    todayBg: '#f5f9ff',
    todayLabel: '#1565c0',
  },

  progress: {
    dotEmpty: '#f0f0f0',
    dotEmptyBorder: '#e0e0e0',
    dotDone: '#c8e6c9',
    dotDoneBorder: '#81c784',
    streakRing: '#2e7d32',
  },
} as const;
