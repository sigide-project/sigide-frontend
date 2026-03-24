import { styled, css } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';
import { breakpoints } from '@/theme/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

export const FeaturesSection = styled('section')`
  padding: ${spacing[24]} ${spacing[6]};
  background: ${colors.background.hero};
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
  color: ${colors.text.primary};
  margin-bottom: ${spacing[4]};

  span {
    background: ${colors.decorative.purple};
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
  color: ${colors.text.secondary};
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
  background: ${colors.background.paper};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.purple.lg};
    border-color: ${colors.primary[200]};
  }

  &:hover .feature-icon {
    transform: scale(1.1) rotate(-5deg);
  }
`;

interface FeatureIconProps {
  color?: string;
}

export const FeatureIcon = styled('div', { shouldForwardProp })<FeatureIconProps>(
  ({ color }) => css`
    width: 64px;
    height: 64px;
    border-radius: ${borderRadius.xl};
    background: ${color || colors.primary[50]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${spacing[5]};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    svg {
      font-size: 2rem;
      color: ${colors.primary.main};
    }
  `
);

export const FeatureTitle = styled('h3')`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing[3]};
`;

export const FeatureDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;
