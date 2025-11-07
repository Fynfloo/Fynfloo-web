// design-system/tokens.ts
export const tokens = {
  // Colors
  color: {
    primary: '#6967c3', // Your brand color
    primaryHover: '#5955a8', // Slightly darker for hover
    secondary: '#666666', // Neutral secondary color
    secondaryHover: '#444444', // Darker for hover
    accent: '#ff4081', // Accent color for CTAs / highlights
    accentHover: '#e73370', // Hover for accent
    background: '#ffffff', // Main page background
    backgroundAlt: '#f7f7f7', // Alternate backgrounds (cards, sections)
    surface: '#ffffff', // Card, modal, panels
    surfaceAlt: '#f3f3f3', // Alternate surface
    textPrimary: '#111111', // Main text color
    textSecondary: '#666666', // Secondary text
    textOnPrimary: '#ffffff', // Text on primary buttons
    textOnAccent: '#ffffff', // Text on accent buttons
    border: '#e0e0e0', // Light border
    borderDark: '#c0c0c0', // Darker border for focus / shadow
  },

  // Spacing (for padding, margin, gaps)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  // Typography
  font: {
    family: {
      base: '"Inter", sans-serif',
      heading: '"Poppins", sans-serif',
      mono: '"Fira Code", monospace',
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '40px',
      '4xl': '48px',
      '5xl': '64px',
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      xs: '16px',
      sm: '20px',
      md: '24px',
      lg: '28px',
      xl: '32px',
      '2xl': '40px',
      '3xl': '48px',
      '4xl': '56px',
      '5xl': '72px',
    },
  },

  // Border radius
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.15)',
    xl: '0 20px 25px rgba(0,0,0,0.2)',
  },

  // Breakpoints
  breakpoint: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    toast: 1400,
  },

  // Transition / Animation durations
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Border widths
  border: {
    thin: '1px',
    normal: '2px',
    thick: '4px',
  },
};
