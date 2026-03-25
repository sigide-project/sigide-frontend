import type { Theme } from '@mui/material/styles';
import { colors as lightColors, darkColors, shadows as lightShadows, darkShadows } from './theme';

type ThemeColors = typeof lightColors | typeof darkColors;
type ThemeShadows = typeof lightShadows | typeof darkShadows;

function resolveColors(theme: { palette: { mode: string } }): ThemeColors {
  return theme.palette.mode === 'dark' ? darkColors : lightColors;
}

function resolveShadows(theme: { palette: { mode: string } }): ThemeShadows {
  return theme.palette.mode === 'dark' ? darkShadows : lightShadows;
}

/**
 * Theme-aware color accessor for MUI styled-component template literals.
 *
 * Usage:
 *   color: ${tc(c => c.text.primary)};
 *   background: ${tc(c => c.background.hero)};
 */
export function tc(fn: (colors: ThemeColors) => string) {
  return ({ theme }: { theme: Theme }) => fn(resolveColors(theme));
}

/**
 * Theme-aware shadow accessor for MUI styled-component template literals.
 *
 * Usage:
 *   box-shadow: ${ts(s => s.purple.md)};
 */
export function ts(fn: (shadows: ThemeShadows) => string) {
  return ({ theme }: { theme: Theme }) => fn(resolveShadows(theme));
}

/**
 * Get the full theme-aware colors object inside a styled callback.
 * Useful when you need multiple color references in one callback.
 *
 * Usage inside styled(Component)(({ theme }) => { const c = getThemeColors(theme); ... })
 */
export function getThemeColors(theme: Theme): ThemeColors {
  return resolveColors(theme);
}

/**
 * Get the full theme-aware shadows object inside a styled callback.
 */
export function getThemeShadows(theme: Theme): ThemeShadows {
  return resolveShadows(theme);
}
