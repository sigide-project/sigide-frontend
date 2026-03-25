import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions } from '@/theme';

export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${tc((c) => c.background.gradient)};
`;

export const HeroSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  padding-top: calc(72px + ${spacing[20]});
  background: ${tc((c) => c.background.hero)};
  text-align: center;
`;

export const HeroTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['5xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[4]};

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['4xl']};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${tc((c) => c.text.secondary)};
  max-width: 600px;
  margin: 0 auto;
`;

export const ContentSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  background: ${tc((c) => c.background.paper)};
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
  background: ${tc((c) => c.background.gradient)};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${tc((c) => c.grey[100])};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${ts((s) => s.md)};
    border-color: ${tc((c) => c.primary[200])};
  }
`;

export const TipIcon = styled('div')`
  width: 64px;
  height: 64px;
  margin-bottom: ${spacing[5]};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.primary[50])};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 2rem;
    color: ${tc((c) => c.primary.main)};
  }
`;

export const TipTitle = styled('h3')`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin: 0 0 ${spacing[3]};
`;

export const TipDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;
