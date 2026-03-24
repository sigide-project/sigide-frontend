import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
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

export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
  padding: ${spacing[8]};
  background: ${colors.background.gradient};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${colors.grey[100]};
`;

export const FormTitle = styled('h2')`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0;
`;

export const FormDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  margin: 0 0 ${spacing[4]};
`;

export const RatingSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  padding: ${spacing[4]};
  background: ${colors.background.paper};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.grey[100]};
`;

export const RatingLabel = styled('span')`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
`;

export const SubmitButton = styled(Button)`
  padding: ${spacing[4]} ${spacing[8]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  background: ${colors.decorative.purple};
  text-transform: none;
  box-shadow: ${shadows.purple.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background: ${colors.decorative.violet};
    box-shadow: ${shadows.purple.md};
    transform: translateY(-2px);
  }
`;
