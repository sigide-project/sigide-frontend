import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, Button, Paper, Avatar } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

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

export const SidebarCard = styled(Paper)`
  padding: ${spacing[6]};
  border-radius: ${borderRadius['2xl']};
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.md};
  position: sticky;
  top: ${spacing[6]};
  animation: ${fadeInUp} 0.6s ${transitions.easing.easeOut} 0.2s forwards;
  opacity: 0;
`;

export const OwnerSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding-bottom: ${spacing[5]};
  border-bottom: 1px solid ${colors.grey[100]};
  margin-bottom: ${spacing[5]};
`;

export const OwnerAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  background: ${colors.decorative.purple};
  color: ${colors.text.inverse};
  border: 3px solid ${colors.background.paper};
  box-shadow: ${shadows.purple.sm};
`;

export const OwnerName = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.lg};
`;

export const OwnerLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  font-weight: ${typography.fontWeight.medium};
`;

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${borderRadius.xl};
  font-size: ${typography.fontSize.base};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
`;

export const ContactButton = styled(ActionButton)`
  background: ${colors.decorative.purple};
  color: ${colors.text.inverse};
  box-shadow: ${shadows.purple.sm};

  &:hover {
    background: ${colors.decorative.violet};
    box-shadow: ${shadows.purple.md};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(ActionButton)`
  background: ${colors.background.paper};
  color: ${colors.primary.main};
  border: 2px solid ${colors.primary[200]};

  &:hover {
    background: ${colors.primary[50]};
    border-color: ${colors.primary.main};
  }
`;

export const ActionButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

export const ShareButton = styled(ActionButton)`
  background: ${colors.grey[100]};
  color: ${colors.text.secondary};
  border: 1px solid ${colors.grey[200]};

  &:hover {
    background: ${colors.grey[200]};
    color: ${colors.text.primary};
  }

  svg {
    margin-right: ${spacing[2]};
  }
`;

export const DateInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  padding-top: ${spacing[5]};
  border-top: 1px solid ${colors.grey[100]};
  margin-top: ${spacing[5]};
`;

export const DateRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateLabel = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.tertiary};
  font-weight: ${typography.fontWeight.medium};
`;

export const DateValue = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
`;
