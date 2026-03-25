import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, Button, Paper, Avatar } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions } from '@/theme';

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
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.md)};
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
  border-bottom: 1px solid ${tc((c) => c.grey[100])};
  margin-bottom: ${spacing[5]};
`;

export const OwnerAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  background: ${tc((c) => c.decorative.purple)};
  color: ${tc((c) => c.text.inverse)};
  border: 3px solid ${tc((c) => c.background.paper)};
  box-shadow: ${ts((s) => s.purple.sm)};
`;

export const OwnerName = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  font-size: ${typography.fontSize.lg};
`;

export const OwnerLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
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
  background: ${tc((c) => c.decorative.purple)};
  color: ${tc((c) => c.text.inverse)};
  box-shadow: ${ts((s) => s.purple.sm)};

  &:hover {
    background: ${tc((c) => c.decorative.violet)};
    box-shadow: ${ts((s) => s.purple.md)};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(ActionButton)`
  background: ${tc((c) => c.background.paper)};
  color: ${tc((c) => c.primary.main)};
  border: 2px solid ${tc((c) => c.primary[200])};

  &:hover {
    background: ${tc((c) => c.primary[50])};
    border-color: ${tc((c) => c.primary.main)};
  }
`;

export const ActionButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

export const ShareButton = styled(ActionButton)`
  background: ${tc((c) => c.grey[100])};
  color: ${tc((c) => c.text.secondary)};
  border: 1px solid ${tc((c) => c.grey[200])};

  &:hover {
    background: ${tc((c) => c.grey[200])};
    color: ${tc((c) => c.text.primary)};
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
  border-top: 1px solid ${tc((c) => c.grey[100])};
  margin-top: ${spacing[5]};
`;

export const DateRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateLabel = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.tertiary)};
  font-weight: ${typography.fontWeight.medium};
`;

export const DateValue = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
`;
