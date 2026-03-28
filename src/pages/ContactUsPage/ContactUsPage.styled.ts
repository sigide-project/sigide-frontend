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

export const ContactGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[12]};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactForm = styled('form')`
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

export const ContactInfo = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

export const InfoCard = styled('div')`
  padding: ${spacing[6]};
  background: ${tc((c) => c.background.gradient)};
  border-radius: ${borderRadius.xl};
  border: 1px solid ${tc((c) => c.grey[100])};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.primary[200])};
    box-shadow: ${ts((s) => s.sm)};
  }
`;

export const InfoIcon = styled('div')`
  width: 48px;
  height: 48px;
  margin-bottom: ${spacing[4]};
  border-radius: ${borderRadius.lg};
  background: ${tc((c) => c.primary[50])};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
    color: ${tc((c) => c.primary.main)};
  }
`;

export const InfoTitle = styled('h3')`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin: 0 0 ${spacing[2]};
`;

export const InfoText = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;

export const InfoLink = styled('a')`
  color: ${tc((c) => c.text.secondary)};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${tc((c) => c.primary.main)};
    text-decoration: underline;
  }
`;
