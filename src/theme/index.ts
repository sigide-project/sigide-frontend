import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors, typography, borderRadius, shadows, transitions } from './theme';

declare module '@mui/material/styles' {
  interface Palette {
    lost: Palette['primary'];
    found: Palette['primary'];
    reward: Palette['primary'];
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    lost?: PaletteOptions['primary'];
    found?: PaletteOptions['primary'];
    reward?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
  }
}

const palette: ThemeOptions['palette'] = {
  primary: {
    main: colors.primary.main,
    light: colors.primary.light,
    dark: colors.primary.dark,
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: colors.secondary.main,
    light: colors.secondary.light,
    dark: colors.secondary.dark,
    contrastText: '#FFFFFF',
  },
  accent: {
    main: colors.accent.main,
    light: colors.accent.light,
    dark: colors.accent.dark,
    contrastText: '#FFFFFF',
  },
  error: {
    main: colors.error.main,
    light: colors.error.light,
    dark: colors.error.dark,
  },
  warning: {
    main: colors.warning.main,
    light: colors.warning.light,
    dark: colors.warning.dark,
  },
  success: {
    main: colors.success.main,
    light: colors.success.light,
    dark: colors.success.dark,
  },
  info: {
    main: colors.info.main,
    light: colors.info.light,
    dark: colors.info.dark,
  },
  grey: colors.grey,
  background: {
    default: colors.background.default,
    paper: colors.background.paper,
  },
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    disabled: colors.text.disabled,
  },
  lost: {
    main: colors.lost.main,
    light: colors.lost.light,
    dark: colors.lost.dark,
  },
  found: {
    main: colors.found.main,
    light: colors.found.light,
    dark: colors.found.dark,
  },
  reward: {
    main: colors.reward.main,
    light: colors.reward.light,
    dark: colors.reward.dark,
  },
};

const muiTypography: ThemeOptions['typography'] = {
  fontFamily: typography.fontFamily.primary,
  h1: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.extrabold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h3: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.snug,
  },
  h4: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.snug,
  },
  h5: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  h6: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  subtitle1: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  subtitle2: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  body1: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.relaxed,
  },
  body2: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.relaxed,
  },
  button: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    textTransform: 'none',
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  overline: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wider,
  },
};

const shape: ThemeOptions['shape'] = {
  borderRadius: 12,
};

const muiShadows: ThemeOptions['shadows'] = [
  'none',
  shadows.xs,
  shadows.sm,
  shadows.base,
  shadows.md,
  shadows.lg,
  shadows.xl,
  shadows.purple.sm,
  shadows.purple.base,
  shadows.purple.md,
  shadows.purple.lg,
  shadows.purple.xl,
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
];

const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        background: colors.background.gradient,
        minHeight: '100vh',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        padding: '12px 24px',
        fontWeight: typography.fontWeight.semibold,
        transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
      contained: {
        background: colors.decorative.purple,
        '&:hover': {
          background: colors.decorative.violet,
          boxShadow: shadows.purple.md,
        },
      },
      containedPrimary: {
        background: colors.decorative.purple,
        '&:hover': {
          background: colors.decorative.violet,
        },
      },
      outlined: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
          backgroundColor: colors.primary[50],
        },
      },
      sizeSmall: {
        padding: '8px 16px',
        fontSize: typography.fontSize.xs,
      },
      sizeLarge: {
        padding: '16px 32px',
        fontSize: typography.fontSize.base,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.xl,
        boxShadow: shadows.sm,
        border: `1px solid ${colors.grey[100]}`,
        transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
        '&:hover': {
          boxShadow: shadows.purple.md,
          borderColor: colors.primary[200],
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: typography.fontWeight.medium,
        borderRadius: borderRadius.full,
      },
      filled: {
        backgroundColor: colors.primary[100],
        color: colors.primary[700],
        '&:hover': {
          backgroundColor: colors.primary[200],
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: borderRadius.lg,
          backgroundColor: colors.background.paper,
          transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
          '&:hover': {
            backgroundColor: colors.grey[50],
          },
          '&.Mui-focused': {
            backgroundColor: colors.background.paper,
            boxShadow: `0 0 0 3px ${colors.primary[100]}`,
          },
          '& fieldset': {
            borderColor: colors.grey[200],
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: colors.primary[300],
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.primary.main,
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius['2xl'],
        boxShadow: shadows.xl,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: borderRadius.xl,
      },
      elevation1: {
        boxShadow: shadows.sm,
      },
      elevation2: {
        boxShadow: shadows.base,
      },
      elevation3: {
        boxShadow: shadows.md,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: shadows.sm,
        borderBottom: `1px solid ${colors.grey[100]}`,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: colors.primary[100],
        color: colors.primary[700],
        fontWeight: typography.fontWeight.semibold,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        fontWeight: typography.fontWeight.medium,
      },
      standardSuccess: {
        backgroundColor: colors.success.light,
        color: colors.success.dark,
      },
      standardError: {
        backgroundColor: colors.error.light,
        color: colors.error.dark,
      },
      standardWarning: {
        backgroundColor: colors.warning.light,
        color: colors.warning.dark,
      },
      standardInfo: {
        backgroundColor: colors.info.light,
        color: colors.info.dark,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: colors.grey[800],
        borderRadius: borderRadius.base,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
        padding: '8px 12px',
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: colors.primary.main,
      },
    },
  },
};

export const theme = createTheme({
  palette,
  typography: muiTypography,
  shape,
  shadows: muiShadows,
  components,
});

export type AppTheme = typeof theme;

export {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  animations,
} from './theme';
export { default as themeConstants } from './theme';

export default theme;
