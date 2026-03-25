import { styled, css } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions, getThemeColors } from '@/theme';
import { breakpoints } from '@/theme/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

export const FeaturesSection = styled('section')`
  padding: ${spacing[24]} ${spacing[6]};
  background: ${tc((c) => c.background.hero)};
  position: relative;

  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing[16]} ${spacing[4]};
  }
`;

export const SectionHeader = styled('div')`
  text-align: center;
  max-width: 640px;
  margin: 0 auto ${spacing[12]};

  @media (max-width: ${breakpoints.sm}) {
    margin-bottom: ${spacing[8]};
  }
`;

export const SectionTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[4]};

  span {
    background: ${tc((c) => c.decorative.purple)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize['3xl']};
  }
`;

export const SectionSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.lg};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize.base};
  }
`;

export const FeaturesGrid = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing[8]};

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[6]};
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${spacing[4]};
  }
`;

export const FeatureCard = styled('div')`
  padding: ${spacing[8]};
  background: ${tc((c) => c.background.paper)};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${ts((s) => s.purple.lg)};
    border-color: ${tc((c) => c.primary[200])};
  }

  &:hover .feature-icon {
    transform: scale(1.1) rotate(-5deg);
  }
`;

interface FeatureIconProps {
  color?: string;
}

export const FeatureIcon = styled('div', { shouldForwardProp })<FeatureIconProps>(({
  color,
  theme,
}) => {
  const c = getThemeColors(theme);
  const isDark = theme.palette.mode === 'dark';
  return css`
    width: 64px;
    height: 64px;
    border-radius: ${borderRadius.xl};
    background: ${color || c.primary[50]};
    ${isDark && 'opacity: 0.15;'}
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${spacing[5]};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    svg {
      font-size: 2rem;
      color: ${c.primary.main};
      ${isDark && 'opacity: 1; filter: brightness(1.5);'}
    }
  `;
});

export const FeatureTitle = styled('h3')`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin: 0 0 ${spacing[3]};
`;

export const FeatureDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;
