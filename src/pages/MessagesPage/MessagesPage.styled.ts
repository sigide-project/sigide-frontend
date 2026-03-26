import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, Button, Paper, Avatar, TextField, IconButton, Chip } from '@mui/material';
import { tc, typography, spacing, borderRadius, transitions } from '@/theme';
import { NAVBAR_HEIGHT } from '@/components/Navbar/Navbar.styled';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const PageWrapper = styled(Box)<{ $embedded?: boolean }>`
  display: flex;
  height: ${({ $embedded }) => ($embedded ? '100%' : `calc(100vh - ${NAVBAR_HEIGHT}px)`)};
  position: ${({ $embedded }) => ($embedded ? 'relative' : 'fixed')};
  top: ${({ $embedded }) => ($embedded ? '0' : `${NAVBAR_HEIGHT}px`)};
  left: ${({ $embedded }) => ($embedded ? '0' : '0')};
  right: ${({ $embedded }) => ($embedded ? '0' : '0')};
  bottom: ${({ $embedded }) => ($embedded ? '0' : '0')};
  overflow: hidden;
  animation: ${fadeIn} 0.3s ${transitions.easing.easeOut} forwards;

  @media (max-width: 900px) {
    flex-direction: column;
    position: fixed;
    top: ${NAVBAR_HEIGHT}px;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
  }
`;

export const Sidebar = styled(Paper)`
  width: 320px;
  flex-shrink: 0;
  border-radius: 0;
  border-right: 1px solid ${tc((c) => c.grey[100])};
  overflow-y: auto;
  padding: ${spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  background: ${tc((c) => c.background.paper)};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${tc((c) => c.grey[300])};
    border-radius: 2px;
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-shrink: 0;
    border-right: none;
    border-bottom: 1px solid ${tc((c) => c.grey[200])};
    max-height: none;
    height: auto;
    overflow-y: visible;
    padding: ${spacing[3]};
  }
`;

export const ItemThumbnail = styled('img')`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: ${borderRadius.lg};
  background: ${tc((c) => c.grey[100])};

  @media (max-width: 900px) {
    height: 100px;
  }
`;

export const ItemThumbnailPlaceholder = styled(Box)`
  width: 100%;
  height: 140px;
  border-radius: ${borderRadius.lg};
  background: ${tc((c) => c.grey[100])};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tc((c) => c.text.tertiary)};
  font-size: ${typography.fontSize.sm};

  @media (max-width: 900px) {
    height: 100px;
  }
`;

export const ItemInfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

export const SidebarItemTitle = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.lg};
  color: ${tc((c) => c.text.primary)};
`;

export const ItemLocationText = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.tertiary)};
`;

interface StatusBadgeProps {
  claimstatus: string;
}

const statusColorMap: Record<string, { bg: string; color: string; gradient: string }> = {
  pending: {
    bg: '#FEF3C7',
    color: '#92400E',
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
  },
  accepted: {
    bg: '#D1FAE5',
    color: '#065F46',
    gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
  },
  rejected: {
    bg: '#FEE2E2',
    color: '#991B1B',
    gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
  },
  resolved: {
    bg: '#E5E7EB',
    color: '#374151',
    gradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
  },
};

const forwardPropStatus = (prop: string) => prop !== 'claimstatus';

export const StatusBadge = styled(Chip, { shouldForwardProp: forwardPropStatus })<StatusBadgeProps>`
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.xs};
  background: ${({ claimstatus }) =>
    statusColorMap[claimstatus]?.gradient || statusColorMap.resolved.gradient};
  color: ${({ claimstatus }) => statusColorMap[claimstatus]?.color || '#616161'};
  border: none;
  padding: ${spacing[1]} 0;
`;

export const statusLabels: Record<string, string> = {
  pending: 'Waiting for owner response',
  accepted: 'Claim accepted',
  rejected: 'Claim rejected',
  resolved: 'Exchange complete',
};

export const OtherPartySection = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} 0;
  border-top: 1px solid ${tc((c) => c.grey[100])};
`;

export const OtherPartyAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  font-size: ${typography.fontSize.sm};
`;

export const OtherPartyName = styled(Typography)`
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.primary)};
`;

export const ActionButtonsSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  padding-top: ${spacing[3]};
  border-top: 1px solid ${tc((c) => c.grey[100])};
`;

export const AcceptButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: ${spacing[3]} ${spacing[4]};
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.35);
    transform: translateY(-1px);
  }
`;

export const RejectButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
  padding: ${spacing[3]} ${spacing[4]};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: #fee2e2;
    border-color: #dc2626;
  }
`;

export const ResolveButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${tc((c) => c.grey[50])};
  border-color: ${tc((c) => c.grey[300])};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.grey[100])};
  }
`;

export const ContactNote = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
  text-align: center;
`;

export const ContactCard = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: ${borderRadius.xl};
  border: 1px solid ${tc((c) => c.grey[200])};
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00c896 0%, #00a67e 100%);
  }
`;

export const ContactCardTitle = styled(Typography)`
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.primary)};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  svg {
    color: #00c896;
  }
`;

export const ContactItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]};
  background: ${tc((c) => c.grey[50])};
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.grey[100])};
  }
`;

export const ContactIcon = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.lg};
  background: linear-gradient(135deg, #00c896 0%, #00a67e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 200, 150, 0.25);
`;

export const ContactContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`;

export const ContactLabel = styled(Typography)`
  font-size: 11px;
  font-weight: ${typography.fontWeight.medium};
  color: ${tc((c) => c.text.tertiary)};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ContactValue = styled(Typography)`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.primary)};
  font-weight: ${typography.fontWeight.semibold};
  word-break: break-word;
  line-height: 1.4;
`;

export const ContactFooter = styled(Typography)`
  font-size: 11px;
  color: ${tc((c) => c.text.tertiary)};
  text-align: center;
  margin-top: ${spacing[1]};
  padding: ${spacing[2]} ${spacing[3]};
  background: ${tc((c) => c.grey[50])};
  border-radius: ${borderRadius.md};
`;

export const ChatPanel = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  background: linear-gradient(
    180deg,
    ${tc((c) => c.background.default)} 0%,
    ${tc((c) => c.grey[50])} 100%
  );
  overflow: hidden;

  @media (max-width: 900px) {
    flex: 1;
    min-height: 0;
  }
`;

export const MessageList = styled(Box)`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  padding: ${spacing[4]} ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${tc((c) => c.grey[300])};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${tc((c) => c.grey[400])};
  }

  @media (max-width: 900px) {
    padding: ${spacing[3]} ${spacing[4]};
  }
`;

interface MessageBubbleProps {
  isOwn: boolean;
}

const forwardPropOwn = (prop: string) => prop !== 'isOwn';

export const MessageBubbleRow = styled(Box, {
  shouldForwardProp: forwardPropOwn,
})<MessageBubbleProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  align-self: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
`;

export const SenderInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  margin-bottom: 4px;
`;

export const SenderAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  font-size: 11px;
`;

export const SenderName = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${tc((c) => c.text.tertiary)};
`;

export const MessageBubble = styled(Box, { shouldForwardProp: forwardPropOwn })<MessageBubbleProps>`
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${({ isOwn }) =>
    isOwn
      ? `${borderRadius.xl} ${borderRadius.xl} ${borderRadius.sm} ${borderRadius.xl}`
      : `${borderRadius.xl} ${borderRadius.xl} ${borderRadius.xl} ${borderRadius.sm}`};
  background: ${({ isOwn }) =>
    isOwn ? 'linear-gradient(135deg, #00C896 0%, #00A67E 100%)' : tc((c) => c.grey[100])};
  color: ${({ isOwn }) => (isOwn ? 'white' : tc((c) => c.text.primary))};
  font-size: ${typography.fontSize.sm};
  line-height: 1.5;
  word-break: break-word;
  box-shadow: ${({ isOwn }) =>
    isOwn ? '0 2px 8px rgba(0, 200, 150, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)'};
`;

export const MessageMeta = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  margin-top: 2px;
  padding: 0 ${spacing[1]};
`;

export const MessageTime = styled(Typography)`
  font-size: 11px;
  color: ${tc((c) => c.text.tertiary)};
`;

export const ClosedBanner = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[4]};
  background: ${tc((c) => c.grey[50])};
  border-top: 1px solid ${tc((c) => c.grey[100])};
  color: ${tc((c) => c.text.tertiary)};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  flex-shrink: 0;
`;

export const MessageInputBar = styled(Box)`
  display: flex;
  align-items: flex-end;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  border-top: 1px solid ${tc((c) => c.grey[100])};
  background: ${tc((c) => c.background.paper)};
  flex-shrink: 0;

  @media (max-width: 900px) {
    padding: ${spacing[2]} ${spacing[3]};
  }
`;

export const StyledTextField = styled(TextField)`
  flex: 1;

  .MuiOutlinedInput-root {
    border-radius: ${borderRadius.xl};
    background: ${tc((c) => c.grey[50])};
    transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

    &:hover {
      background: ${tc((c) => c.grey[100])};
    }

    &.Mui-focused {
      background: ${tc((c) => c.background.paper)};
      box-shadow: 0 0 0 2px ${tc((c) => c.primary[100])};
    }

    fieldset {
      border-color: transparent;
    }

    &:hover fieldset {
      border-color: transparent;
    }

    &.Mui-focused fieldset {
      border-color: ${tc((c) => c.primary[300])};
    }
  }
`;

export const SendButton = styled(IconButton)`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #00c896 0%, #00a67e 100%);
  color: white;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: linear-gradient(135deg, #00a67e 0%, #008f6b 100%);
    transform: scale(1.05);
  }

  &:disabled {
    background: ${tc((c) => c.grey[200])};
    color: ${tc((c) => c.text.disabled)};
    transform: none;
  }
`;

export const LoadingWrapper = styled(Box)<{ $embedded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $embedded }) => ($embedded ? '100%' : `calc(100vh - ${NAVBAR_HEIGHT}px)`)};
  position: ${({ $embedded }) => ($embedded ? 'relative' : 'fixed')};
  top: ${({ $embedded }) => ($embedded ? '0' : `${NAVBAR_HEIGHT}px`)};
  left: 0;
  right: 0;
  bottom: ${({ $embedded }) => ($embedded ? '0' : '0')};
`;

export const MobileHeader = styled(Box)`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[2]} ${spacing[3]};
    background: ${tc((c) => c.background.paper)};
    border-bottom: 1px solid ${tc((c) => c.grey[100])};
    flex-shrink: 0;
  }
`;

export const MobileItemInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex: 1;
  min-width: 0;
`;

export const MobileItemImage = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.md};
  object-fit: cover;
  flex-shrink: 0;
`;

export const MobileItemDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const MobileItemTitle = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MobileItemStatus = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
`;
