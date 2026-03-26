import { createTheme, ThemeOptions } from '@mui/material/styles';
import {
  colors,
  darkColors,
  typography,
  borderRadius,
  shadows,
  darkShadows,
  transitions,
} from './theme';

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

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions['palette'] => {
  const themeColors = mode === 'dark' ? darkColors : colors;

  return {
    mode,
    primary: {
      main: themeColors.primary.main,
      light: themeColors.primary.light,
      dark: themeColors.primary.dark,
      contrastText: mode === 'dark' ? '#18181B' : '#FFFFFF',
    },
    secondary: {
      main: themeColors.secondary.main,
      light: themeColors.secondary.light,
      dark: themeColors.secondary.dark,
      contrastText: mode === 'dark' ? '#18181B' : '#FFFFFF',
    },
    accent: {
      main: themeColors.accent.main,
      light: themeColors.accent.light,
      dark: themeColors.accent.dark,
      contrastText: mode === 'dark' ? '#18181B' : '#FFFFFF',
    },
    error: {
      main: themeColors.error.main,
      light: themeColors.error.light,
      dark: themeColors.error.dark,
    },
    warning: {
      main: themeColors.warning.main,
      light: themeColors.warning.light,
      dark: themeColors.warning.dark,
    },
    success: {
      main: themeColors.success.main,
      light: themeColors.success.light,
      dark: themeColors.success.dark,
    },
    info: {
      main: themeColors.info.main,
      light: themeColors.info.light,
      dark: themeColors.info.dark,
    },
    grey: themeColors.grey,
    background: {
      default: themeColors.background.default,
      paper: themeColors.background.paper,
    },
    text: {
      primary: themeColors.text.primary,
      secondary: themeColors.text.secondary,
      disabled: themeColors.text.disabled,
    },
    lost: {
      main: themeColors.lost.main,
      light: themeColors.lost.light,
      dark: themeColors.lost.dark,
    },
    found: {
      main: themeColors.found.main,
      light: themeColors.found.light,
      dark: themeColors.found.dark,
    },
    reward: {
      main: themeColors.reward.main,
      light: themeColors.reward.light,
      dark: themeColors.reward.dark,
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  };
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

const getMuiShadows = (mode: 'light' | 'dark'): ThemeOptions['shadows'] => {
  const themeShadows = mode === 'dark' ? darkShadows : shadows;
  return [
    'none',
    themeShadows.xs,
    themeShadows.sm,
    themeShadows.base,
    themeShadows.md,
    themeShadows.lg,
    themeShadows.xl,
    themeShadows.purple.sm,
    themeShadows.purple.base,
    themeShadows.purple.md,
    themeShadows.purple.lg,
    themeShadows.purple.xl,
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
};

const getComponents = (mode: 'light' | 'dark'): ThemeOptions['components'] => {
  const themeColors = mode === 'dark' ? darkColors : colors;
  const themeShadows = mode === 'dark' ? darkShadows : shadows;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
        },
        body: {
          background: themeColors.background.gradient,
          minHeight: '100vh',
          transition: 'background 0.3s ease-in-out',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: themeColors.background.default,
          borderRadius: '4px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: `linear-gradient(180deg, ${themeColors.primary[400]}, ${themeColors.primary[600]})`,
          borderRadius: '4px',
          border: `2px solid ${themeColors.background.default}`,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: `linear-gradient(180deg, ${themeColors.primary[300]}, ${themeColors.primary[500]})`,
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${themeColors.primary[400]} ${themeColors.background.default}`,
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
          background: themeColors.decorative.purple,
          '&:hover': {
            background: themeColors.decorative.violet,
            boxShadow: themeShadows.purple.md,
          },
        },
        containedPrimary: {
          background: themeColors.decorative.purple,
          '&:hover': {
            background: themeColors.decorative.violet,
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: themeColors.primary[50],
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
          boxShadow: themeShadows.sm,
          border: `1px solid ${themeColors.grey[100]}`,
          backgroundColor: themeColors.background.paper,
          transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
          '&:hover': {
            boxShadow: themeShadows.purple.md,
            borderColor: themeColors.primary[200],
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
          backgroundColor: themeColors.primary[100],
          color: themeColors.primary[700],
          '&:hover': {
            backgroundColor: themeColors.primary[200],
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
            backgroundColor: themeColors.background.paper,
            transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
            '&:hover': {
              backgroundColor: themeColors.grey[50],
            },
            '&.Mui-focused': {
              backgroundColor: themeColors.background.paper,
              boxShadow: `0 0 0 3px ${themeColors.primary[100]}`,
            },
            '& fieldset': {
              borderColor: themeColors.grey[200],
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: themeColors.primary[300],
            },
            '&.Mui-focused fieldset': {
              borderColor: themeColors.primary.main,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius['2xl'],
          boxShadow: themeShadows.xl,
          backgroundColor: themeColors.background.paper,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'background-color 0.2s ease-in-out',
        },
        rounded: {
          borderRadius: borderRadius.xl,
        },
        elevation1: {
          boxShadow: themeShadows.sm,
        },
        elevation2: {
          boxShadow: themeShadows.base,
        },
        elevation3: {
          boxShadow: themeShadows.md,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(24, 24, 27, 0.85)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: themeShadows.sm,
          borderBottom: `1px solid ${themeColors.grey[100]}`,
          transition: 'background-color 0.2s ease-in-out',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.primary[100],
          color: themeColors.primary[700],
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
          backgroundColor: themeColors.success.light,
          color: mode === 'dark' ? themeColors.success.main : themeColors.success.dark,
        },
        standardError: {
          backgroundColor: themeColors.error.light,
          color: mode === 'dark' ? themeColors.error.main : themeColors.error.dark,
        },
        standardWarning: {
          backgroundColor: themeColors.warning.light,
          color: mode === 'dark' ? themeColors.warning.main : themeColors.warning.dark,
        },
        standardInfo: {
          backgroundColor: themeColors.info.light,
          color: mode === 'dark' ? themeColors.info.main : themeColors.info.dark,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' ? themeColors.grey[200] : themeColors.grey[800],
          color: mode === 'dark' ? themeColors.text.primary : '#FFFFFF',
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
          color: themeColors.primary.main,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: themeColors.primary.main,
            '& + .MuiSwitch-track': {
              backgroundColor: themeColors.primary.main,
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: themeColors.background.paper,
          border: `1px solid ${themeColors.grey[100]}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: themeColors.primary[50],
          },
          '&.Mui-selected': {
            backgroundColor: themeColors.primary[100],
            '&:hover': {
              backgroundColor: themeColors.primary[200],
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: themeColors.primary[50],
          },
          '&.Mui-selected': {
            backgroundColor: themeColors.primary[100],
            '&:hover': {
              backgroundColor: themeColors.primary[200],
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: themeColors.background.paper,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `all ${transitions.duration.fast} ${transitions.easing.easeInOut}`,
          '&:hover': {
            backgroundColor: themeColors.primary[50],
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: getDesignTokens(mode),
    typography: muiTypography,
    shape,
    shadows: getMuiShadows(mode),
    components: getComponents(mode),
  });

export const theme = createAppTheme('light');

export type AppTheme = ReturnType<typeof createAppTheme>;

export {
  colors,
  darkColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  darkShadows,
  transitions,
  animations,
} from './theme';
export { default as themeConstants } from './theme';
export { tc, ts, getThemeColors, getThemeShadows } from './themeUtils';

export default theme;
