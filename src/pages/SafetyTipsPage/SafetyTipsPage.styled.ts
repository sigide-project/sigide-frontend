import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.background.gradient};
`;

export const HeroSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  padding-top: calc(72px + ${spacing[20]});
  background: ${colors.background.hero};
  text-align: center;
`;

export const HeroTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['5xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing[4]};

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['4xl']};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

export const ContentSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  background: ${colors.background.paper};
  flex: 1;
`;

export const TipsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing[8]};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const TipCard = styled('div')`
  padding: ${spacing[8]};
  background: ${colors.background.gradient};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${colors.grey[100]};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.md};
    border-color: ${colors.primary[200]};
  }
`;

export const TipIcon = styled('div')`
  width: 64px;
  height: 64px;
  margin-bottom: ${spacing[5]};
  border-radius: ${borderRadius.xl};
  background: ${colors.primary[50]};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 2rem;
    color: ${colors.primary.main};
  }
`;

export const TipTitle = styled('h3')`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing[3]};
`;

export const TipDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;
