import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import {
  tc,
  ts,
  typography,
  spacing,
  borderRadius,
  transitions,
  getThemeColors,
  getThemeShadows,
} from '@/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

export const FeedContainer = styled(Box)`
  padding-top: 0;
  padding-bottom: ${spacing[12]};
  position: relative;
  overflow-x: hidden;
  width: 100%;
`;

export const HeroSection = styled(Box)`
  position: relative;
  padding: ${spacing[16]} ${spacing[6]} ${spacing[12]};
  width: 100%;
  background: ${tc((c) => c.background.hero)};
  border-radius: 0 0 ${borderRadius['3xl']} ${borderRadius['3xl']};
  margin-bottom: ${spacing[8]};
  overflow: hidden;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, ${tc((c) => c.primary[200])} 0%, transparent 70%);
    opacity: 0.5;
    animation: ${pulse} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, ${tc((c) => c.secondary[200])} 0%, transparent 70%);
    opacity: 0.4;
    animation: ${pulse} 10s ease-in-out infinite reverse;
  }

  @media (max-width: 600px) {
    padding: ${spacing[10]} ${spacing[4]} ${spacing[8]};
  }
`;

export const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 0 ${spacing[6]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} forwards;

  @media (max-width: 600px) {
    padding: 0 ${spacing[4]};
  }
`;

export const HeroTitle = styled(Typography)`
  font-size: ${typography.fontSize['5xl']};
  font-weight: ${typography.fontWeight.extrabold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[4]};

  span {
    background: ${tc((c) => c.decorative.purple)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 900px) {
    font-size: ${typography.fontSize['4xl']};
  }

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['3xl']};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 600px;

  @media (max-width: 600px) {
    font-size: ${typography.fontSize.base};
  }
`;

export const StatsRow = styled(Box)`
  display: flex;
  gap: ${spacing[6]};
  margin-top: ${spacing[8]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} 0.2s forwards;
  opacity: 0;

  @media (max-width: 600px) {
    gap: ${spacing[4]};
    flex-wrap: wrap;
  }
`;

export const StatItem = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${spacing[4]} ${spacing[6]};
  background: ${tc((c) => c.glass.light)};
  backdrop-filter: blur(10px);
  border-radius: ${borderRadius.xl};
  border: 1px solid ${tc((c) => c.glass.border)};
  box-shadow: ${ts((s) => s.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${ts((s) => s.purple.sm)};
    border-color: ${tc((c) => c.primary[200])};
  }
`;

export const StatValue = styled(Typography)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.primary.main)};
`;

export const StatLabel = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.secondary)};
  font-weight: ${typography.fontWeight.medium};
`;

interface FloatingShapeProps {
  delay?: number;
  size?: number;
  top?: string;
  right?: string;
}

export const FloatingShape = styled(Box, { shouldForwardProp })<FloatingShapeProps>(({
  delay,
  size,
  top,
  right,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    position: absolute;
    width: ${size || 60}px;
    height: ${size || 60}px;
    top: ${top || '20%'};
    right: ${right || '10%'};
    background: ${c.decorative.purple};
    border-radius: ${borderRadius.xl};
    opacity: 0.1;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: ${delay || 0}s;
    z-index: 0;

    @media (max-width: 900px) {
      display: none;
    }
  `;
});

export const ContentSection = styled(Box)`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing[6]};

  @media (max-width: 600px) {
    padding: 0 ${spacing[4]};
  }
`;

export const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[6]};
  animation: ${fadeIn} 0.6s ${transitions.easing.easeOut} forwards;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing[4]};
  }
`;

export const SectionTitle = styled(Typography)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  display: flex;
  align-items: center;
  gap: ${spacing[3]};

  svg {
    color: ${tc((c) => c.primary.main)};
  }
`;

export const FiltersContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};
  padding: ${spacing[6]};
  background: ${tc((c) => c.background.paper)};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.sm)};
  animation: ${fadeInUp} 0.6s ${transitions.easing.easeOut} 0.1s forwards;
  opacity: 0;
`;

export const SearchSortRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[4]};
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ActiveFiltersRow = styled(Box)`
  padding: ${spacing[4]} ${spacing[5]};
  background: ${tc((c) => c.primary[50])};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${tc((c) => c.primary[100])};
  animation: ${fadeIn} 0.3s ${transitions.easing.easeOut} forwards;
`;

export const FilterChip = styled(Chip)`
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[200])};
  font-weight: ${typography.fontWeight.medium};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.primary[300])};
    background: ${tc((c) => c.primary[50])};
  }

  .MuiChip-deleteIcon {
    color: ${tc((c) => c.grey[400])};
    transition: color ${transitions.duration.fast};

    &:hover {
      color: ${tc((c) => c.error.main)};
    }
  }
`;

export const ClearAllChip = styled(Chip)`
  background: transparent;
  border: 2px dashed ${tc((c) => c.grey[300])};
  color: ${tc((c) => c.text.secondary)};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.primary.main)};
    color: ${tc((c) => c.primary.main)};
    background: ${tc((c) => c.primary[50])};
  }
`;

export const ResultsInfo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[6]};
  padding-bottom: ${spacing[4]};
  border-bottom: 2px solid ${tc((c) => c.grey[100])};
  animation: ${fadeIn} 0.6s ${transitions.easing.easeOut} 0.2s forwards;
  opacity: 0;
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

interface ItemCardWrapperProps {
  index?: number;
}

export const ItemCardWrapper = styled(Box, { shouldForwardProp })<ItemCardWrapperProps>(
  ({ index }) => css`
    animation: ${fadeInUp} 0.5s ${transitions.easing.easeOut} forwards;
    animation-delay: ${(index || 0) * 0.05}s;
    opacity: 0;
  `
);

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[16]} ${spacing[8]};
  text-align: center;
  animation: ${fadeIn} 0.6s ${transitions.easing.easeOut} forwards;
`;

export const EmptyStateIcon = styled(Box)`
  width: 120px;
  height: 120px;
  margin-bottom: ${spacing[6]};
  background: ${tc((c) => c.background.hero)};
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 48px;
    color: ${tc((c) => c.primary[300])};
  }
`;

export const EmptyStateTitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[2]};
`;

export const EmptyStateDescription = styled(Typography)`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  max-width: 400px;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[16]} ${spacing[8]};
  gap: ${spacing[4]};
`;

export const LoadingText = styled(Typography)`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  font-weight: ${typography.fontWeight.medium};
`;

export const SkeletonCard = styled(Box)`
  height: 320px;
  border-radius: ${borderRadius.xl};
  background: linear-gradient(
    90deg,
    ${tc((c) => c.grey[100])} 25%,
    ${tc((c) => c.grey[50])} 50%,
    ${tc((c) => c.grey[100])} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const QuickFilters = styled(Box)`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
  margin-top: ${spacing[6]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} 0.3s forwards;
  opacity: 0;
`;

interface QuickFilterButtonProps {
  active?: boolean;
  variant?: 'lost' | 'found' | 'all';
}

export const QuickFilterButton = styled(Box, { shouldForwardProp })<QuickFilterButtonProps>(({
  active,
  variant,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[3]} ${spacing[5]};
    border-radius: ${borderRadius.full};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    cursor: pointer;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    border: 2px solid transparent;

    ${active
      ? variant === 'lost'
        ? css`
            background: ${c.lost.light};
            color: ${c.lost.dark};
            border-color: ${c.lost.main};
          `
        : variant === 'found'
          ? css`
              background: ${c.found.light};
              color: ${c.found.dark};
              border-color: ${c.found.main};
            `
          : css`
              background: ${c.primary[100]};
              color: ${c.primary[700]};
              border-color: ${c.primary.main};
            `
      : css`
          background: ${c.glass.light};
          color: ${c.text.secondary};
          border-color: ${c.grey[200]};
          backdrop-filter: blur(10px);

          &:hover {
            border-color: ${c.primary[300]};
            color: ${c.primary.main};
            background: ${c.background.paper};
          }
        `}

    svg {
      font-size: 18px;
    }
  `;
});

export const AlertWrapper = styled(Box)`
  margin-bottom: ${spacing[4]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;
