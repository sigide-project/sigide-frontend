/**
 * Sigide Theme Constants
 * A modern, light purple-themed design system
 */

export const colors = {
  // Primary Purple Palette
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
    main: '#7C3AED',
    light: '#A78BFA',
    dark: '#5B21B6',
  },

  // Secondary - Soft Violet
  secondary: {
    50: '#FDF4FF',
    100: '#FAE8FF',
    200: '#F5D0FE',
    300: '#F0ABFC',
    400: '#E879F9',
    500: '#D946EF',
    600: '#C026D3',
    700: '#A21CAF',
    800: '#86198F',
    900: '#701A75',
    main: '#D946EF',
    light: '#F0ABFC',
    dark: '#A21CAF',
  },

  // Accent - Warm Coral for CTAs
  accent: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    main: '#F97316',
    light: '#FDBA74',
    dark: '#EA580C',
  },

  // Semantic Colors
  lost: {
    main: '#EF4444',
    light: '#FEE2E2',
    dark: '#DC2626',
    gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
  },

  found: {
    main: '#10B981',
    light: '#D1FAE5',
    dark: '#059669',
    gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
  },

  reward: {
    main: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
  },

  // Neutrals
  grey: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },

  // Background Colors
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
    elevated: '#FFFFFF',
    subtle: '#F5F3FF',
    gradient: 'linear-gradient(180deg, #FAFAFA 0%, #F5F3FF 100%)',
    hero: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%)',
    card: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
  },

  // Text Colors
  text: {
    primary: '#18181B',
    secondary: '#52525B',
    tertiary: '#71717A',
    disabled: '#A1A1AA',
    inverse: '#FFFFFF',
  },

  // Status Colors
  success: {
    main: '#10B981',
    light: '#D1FAE5',
    dark: '#059669',
  },

  warning: {
    main: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },

  error: {
    main: '#EF4444',
    light: '#FEE2E2',
    dark: '#DC2626',
  },

  info: {
    main: '#3B82F6',
    light: '#DBEAFE',
    dark: '#2563EB',
  },

  // Decorative
  decorative: {
    purple: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    violet: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
    sunset: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
    aurora: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
  },
} as const;

export const typography = {
  fontFamily: {
    primary: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    display: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.375rem', // 6px
  base: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  // Purple-tinted shadows for cards
  purple: {
    sm: '0 1px 3px 0 rgba(124, 58, 237, 0.1), 0 1px 2px -1px rgba(124, 58, 237, 0.1)',
    base: '0 4px 6px -1px rgba(124, 58, 237, 0.1), 0 2px 4px -2px rgba(124, 58, 237, 0.1)',
    md: '0 10px 15px -3px rgba(124, 58, 237, 0.15), 0 4px 6px -4px rgba(124, 58, 237, 0.1)',
    lg: '0 20px 25px -5px rgba(124, 58, 237, 0.15), 0 8px 10px -6px rgba(124, 58, 237, 0.1)',
    xl: '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
    glow: '0 0 40px rgba(124, 58, 237, 0.2)',
  },
} as const;

export const transitions = {
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
} as const;

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const;

// Animation keyframes for use in styled components
export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeInUp: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  fadeInDown: `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  scaleIn: `
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
  slideInRight: `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  glow: `
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.2); }
      50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.4); }
    }
  `,
} as const;

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  animations,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;

export default theme;
