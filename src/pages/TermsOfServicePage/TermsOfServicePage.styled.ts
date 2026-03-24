import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colors, typography, spacing } from '@/theme';

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
  padding: ${spacing[16]} ${spacing[6]};
  background: ${colors.background.paper};
  flex: 1;
`;

export const LastUpdated = styled('p')`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.tertiary};
  margin-bottom: ${spacing[8]};
`;

export const Section = styled('section')`
  margin-bottom: ${spacing[10]};
`;

export const SectionTitle = styled('h2')`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing[4]};
`;

export const Paragraph = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0 0 ${spacing[4]};
`;

export const List = styled('ul')`
  margin: 0;
  padding-left: ${spacing[6]};
`;

export const ListItem = styled('li')`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing[2]};
`;
