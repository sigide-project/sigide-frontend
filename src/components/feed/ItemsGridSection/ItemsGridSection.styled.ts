import { styled, css } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import {
  tc,
  typography,
  spacing,
  borderRadius,
  transitions,
  getThemeColors,
  getThemeShadows,
} from '@/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

export const ResultsInfo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[6]};
  padding-bottom: ${spacing[4]};
  border-bottom: 2px solid ${tc((c) => c.grey[100])};
`;

export const ResultsCount = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.secondary)};
  font-weight: ${typography.fontWeight.medium};

  strong {
    color: ${tc((c) => c.text.primary)};
    font-weight: ${typography.fontWeight.bold};
  }
`;

export const ViewToggle = styled(Box)`
  display: flex;
  gap: ${spacing[1]};
  padding: ${spacing[1]};
  background: ${tc((c) => c.grey[100])};
  border-radius: ${borderRadius.lg};
`;

interface ViewToggleButtonProps {
  active?: boolean;
}

export const ViewToggleButton = styled(IconButton, { shouldForwardProp })<ViewToggleButtonProps>(({
  active,
  theme,
}) => {
  const c = getThemeColors(theme);
  const s = getThemeShadows(theme);
  return css`
    padding: ${spacing[2]};
    border-radius: ${borderRadius.base};
    color: ${active ? c.primary.main : c.grey[400]};
    background: ${active ? c.background.paper : 'transparent'};
    box-shadow: ${active ? s.sm : 'none'};
    transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

    &:hover {
      background: ${active ? c.background.paper : c.grey[200]};
    }
  `;
});

interface ItemsGridProps {
  viewMode?: 'grid' | 'list';
}

export const ItemsGrid = styled(Box, { shouldForwardProp })<ItemsGridProps>(
  ({ viewMode }) => css`
    display: grid;
    gap: ${spacing[6]};

    ${viewMode === 'list'
      ? css`
          grid-template-columns: 1fr;
        `
      : css`
          grid-template-columns: repeat(1, 1fr);

          @media (min-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
          }

          @media (min-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
          }

          @media (min-width: 1200px) {
            grid-template-columns: repeat(3, 1fr);
          }
        `}
  `
);

export const ItemCardWrapper = styled(Box)`
  will-change: opacity, transform;
`;
