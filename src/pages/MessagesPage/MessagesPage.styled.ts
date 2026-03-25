import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Paper, Avatar, TextField, IconButton, Chip } from '@mui/material';
import { tc, typography, spacing, borderRadius, transitions } from '@/theme';
import { NAVBAR_HEIGHT } from '@/components/Navbar/Navbar.styled';

export const PageWrapper = styled(Box)`
  display: flex;
  position: fixed;
  top: ${NAVBAR_HEIGHT}px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
    position: relative;
    top: 0;
    margin-top: ${NAVBAR_HEIGHT}px;
    height: calc(100vh - ${NAVBAR_HEIGHT}px);
    min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  }
`;

export const Sidebar = styled(Paper)`
  width: 360px;
  flex-shrink: 0;
  border-radius: 0;
  border-right: 1px solid ${tc((c) => c.grey[100])};
  overflow-y: auto;
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};

  @media (max-width: 900px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${tc((c) => c.grey[100])};
    max-height: 320px;
  }
`;

export const ItemThumbnail = styled('img')`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.grey[100])};
`;

export const ItemThumbnailPlaceholder = styled(Box)`
  width: 100%;
  height: 160px;
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.grey[100])};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tc((c) => c.text.tertiary)};
  font-size: ${typography.fontSize.sm};
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

const statusColorMap: Record<string, { bg: string; color: string }> = {
  pending: { bg: '#fff8e1', color: '#f57f17' },
  accepted: { bg: '#e8f5e9', color: '#2e7d32' },
  rejected: { bg: '#ffebee', color: '#c62828' },
  resolved: { bg: '#f5f5f5', color: '#616161' },
};

const forwardPropStatus = (prop: string) => prop !== 'claimstatus';

export const StatusBadge = styled(Chip, { shouldForwardProp: forwardPropStatus })<StatusBadgeProps>`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.xs};
  background-color: ${({ claimstatus }) => statusColorMap[claimstatus]?.bg || '#f5f5f5'};
  color: ${({ claimstatus }) => statusColorMap[claimstatus]?.color || '#616161'};
  border: none;
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
  border-radius: ${borderRadius.lg};
  background: #2e7d32;
  color: white;

  &:hover {
    background: #1b5e20;
  }
`;

export const RejectButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.lg};
  color: #c62828;
  border-color: #c62828;

  &:hover {
    background: #ffebee;
    border-color: #c62828;
  }
`;

export const ResolveButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.lg};
`;

export const WhatsAppButton = styled(Button)<{
  component?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}>`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.lg};
  background: #25d366;
  color: white;

  &:hover {
    background: #128c7e;
  }
`;

export const ContactNote = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
  text-align: center;
`;

export const ChatPanel = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  background: ${tc((c) => c.background.default)};
`;

export const MessageList = styled(Box)`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: ${spacing[4]} ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
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
  border-radius: ${borderRadius.xl};
  background: ${({ isOwn }) => (isOwn ? '#E1F5EE' : tc((c) => c.grey[100]))};
  color: ${({ isOwn }) => (isOwn ? '#004d40' : tc((c) => c.text.primary))};
  font-size: ${typography.fontSize.sm};
  line-height: 1.5;
  word-break: break-word;
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
`;

export const MessageInputBar = styled(Box)`
  display: flex;
  align-items: flex-end;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  border-top: 1px solid ${tc((c) => c.grey[100])};
  background: ${tc((c) => c.background.paper)};
`;

export const StyledTextField = styled(TextField)`
  flex: 1;

  .MuiOutlinedInput-root {
    border-radius: ${borderRadius.xl};
  }
`;

export const SendButton = styled(IconButton)`
  color: ${tc((c) => c.primary.main)};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    color: ${tc((c) => c.primary.dark)};
  }

  &:disabled {
    color: ${tc((c) => c.text.disabled)};
  }
`;

export const LoadingWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: ${NAVBAR_HEIGHT}px;
  left: 0;
  right: 0;
  bottom: 0;
`;
