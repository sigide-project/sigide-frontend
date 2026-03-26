import { styled, keyframes } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { tc, spacing, borderRadius, transitions, typography, colors } from '@/theme';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`;

interface RowProps {
  $selected?: boolean;
  $hasUnread?: boolean;
}

export const RowContainer = styled(ListItemButton, {
  shouldForwardProp: (prop) => !prop.toString().startsWith('$'),
})<RowProps>`
  position: relative;
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${borderRadius.xl};
  margin-bottom: ${spacing[2]};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
  border-left: 4px solid transparent;
  background: ${({ $hasUnread }) =>
    $hasUnread
      ? `linear-gradient(90deg, ${colors.primary[50]} 0%, transparent 100%)`
      : 'transparent'};
  animation: ${slideIn} 0.3s ${transitions.easing.easeOut} forwards;

  ${({ $selected }) =>
    $selected &&
    `
    border-left-color: ${colors.primary[500]};
    background: linear-gradient(90deg, ${colors.primary[50]} 0%, rgba(245, 243, 255, 0.5) 100%);
    box-shadow: 0 2px 8px rgba(0, 200, 150, 0.1);
  `}

  &:hover {
    background: ${tc((c) => c.grey[50])};
    transform: translateX(2px);

    ${({ $selected }) =>
      $selected &&
      `
      background: linear-gradient(90deg, ${colors.primary[50]} 0%, rgba(245, 243, 255, 0.5) 100%);
    `}
  }

  &:hover .delete-button {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ChatAvatar = styled(Avatar)`
  width: 52px;
  height: 52px;
  background: linear-gradient(
    135deg,
    ${tc((c) => c.primary[100])} 0%,
    ${tc((c) => c.primary[200])} 100%
  );
  color: ${tc((c) => c.primary[700])};
  font-weight: 600;
  font-size: 1.1rem;
  margin-right: ${spacing[3]};
  flex-shrink: 0;
  border: 2px solid ${tc((c) => c.background.paper)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 2px;
`;

export const TopRow = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

export const PartyName = styled('span')`
  font-weight: 500;
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.primary)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusChip = styled(Chip)<{ $status: string }>`
  height: 22px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 6px;

  ${({ $status }) => {
    switch ($status) {
      case 'pending':
        return `
          background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
          color: #92400E;
        `;
      case 'accepted':
        return `
          background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
          color: #065F46;
        `;
      case 'rejected':
        return `
          background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
          color: #991B1B;
        `;
      case 'resolved':
        return `
          background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
          color: #374151;
        `;
      default:
        return `
          background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
          color: #374151;
        `;
    }
  }}
`;

export const ItemTitle = styled('span')`
  font-size: 13px;
  color: ${tc((c) => c.text.secondary)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MessagePreview = styled('span')<{ $italic?: boolean }>`
  font-size: 12px;
  color: ${tc((c) => c.text.tertiary)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
`;

export const RightSection = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing[1]};
  margin-left: ${spacing[2]};
  flex-shrink: 0;
`;

export const TimeStamp = styled('span')`
  font-size: 11px;
  color: ${tc((c) => c.text.tertiary)};
  white-space: nowrap;
`;

export const UnreadBadge = styled(Badge)`
  .MuiBadge-badge {
    background: linear-gradient(135deg, #00c896 0%, #00a67e 100%);
    color: white;
    font-size: 11px;
    font-weight: 700;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 11px;
    box-shadow: 0 2px 6px rgba(0, 200, 150, 0.3);
  }
`;

export const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: ${spacing[2]};
  transform: translateY(-50%) translateX(8px);
  opacity: 0;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};
  padding: ${spacing[1]};
  background: ${tc((c) => c.background.paper)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${borderRadius.lg};

  &:hover {
    background: #fee2e2;
    color: #dc2626;
    transform: translateY(-50%) translateX(0) scale(1.1);
  }

  svg {
    font-size: 18px;
  }
`;
