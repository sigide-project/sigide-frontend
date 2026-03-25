import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
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

export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
  padding: ${spacing[8]};
  background: ${tc((c) => c.background.gradient)};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${tc((c) => c.grey[100])};
`;

export const FormTitle = styled('h2')`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin: 0;
`;

export const FormDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  margin: 0 0 ${spacing[4]};
`;

export const SubmitButton = styled(Button)`
  padding: ${spacing[4]} ${spacing[8]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.decorative.purple)};
  text-transform: none;
  box-shadow: ${ts((s) => s.purple.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.decorative.violet)};
    box-shadow: ${ts((s) => s.purple.md)};
    transform: translateY(-2px);
  }
`;
