import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { tc, typography, spacing, borderRadius, transitions } from '@/theme';

export const BellButton = styled(IconButton)`
  color: ${tc((c) => c.text.secondary)};
  transition: color ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    color: ${tc((c) => c.text.primary)};
  }
`;

export const PopoverContent = styled(Box)`
  width: 380px;
  max-height: 480px;
  overflow-y: auto;
`;

export const PopoverHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[3]} ${spacing[4]};
  border-bottom: 1px solid ${tc((c) => c.grey[100])};
`;

export const PopoverTitle = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.primary)};
`;

export const MarkAllReadButton = styled(Button)`
  text-transform: none;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  padding: ${spacing[1]} ${spacing[2]};
`;

interface NotificationRowProps {
  unread?: boolean;
}

const shouldForwardProp = (prop: string) => prop !== 'unread';

export const NotificationRow = styled(Box, { shouldForwardProp })<NotificationRowProps>`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[4]};
  cursor: pointer;
  border-left: ${({ unread }) => (unread ? '2px solid' : '2px solid transparent')};
  border-left-color: ${({ unread }) => (unread ? tc((c) => c.info.main) : 'transparent')};
  transition: background-color ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.grey[50])};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${tc((c) => c.grey[50])};
  }
`;

export const NotificationIconWrapper = styled(Box)`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificationTextWrapper = styled(Box)`
  flex: 1;
  min-width: 0;
`;

export const NotificationText = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.primary)};
  line-height: 1.4;
`;

export const NotificationTime = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
  margin-top: 2px;
`;

export const EmptyState = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[8]};
  color: ${tc((c) => c.text.tertiary)};
  font-size: ${typography.fontSize.sm};
`;
