import { motion } from 'framer-motion';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { ChatSummary } from '@/types';
import {
  RowContainer,
  ChatAvatar,
  ContentWrapper,
  TopRow,
  PartyName,
  StatusChip,
  ItemTitle,
  MessagePreview,
  RightSection,
  TimeStamp,
  UnreadBadge,
  DeleteButton,
} from './ChatRow.styled';

export interface ChatRowProps {
  chat: ChatSummary;
  selected: boolean;
  onSelect: (claimId: string) => void;
  onDelete: (claimId: string) => void;
}

const MotionRowContainer = motion.create(RowContainer);

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ChatRow({ chat, selected, onSelect, onDelete }: ChatRowProps) {
  const { other_party, item, last_message, unread_count, status, claim_id } = chat;

  const handleClick = () => {
    onSelect(claim_id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(claim_id);
  };

  const avatarContent = other_party.avatar_url
    ? { src: other_party.avatar_url }
    : { children: other_party.name.charAt(0).toUpperCase() };

  return (
    <MotionRowContainer
      $selected={selected}
      $hasUnread={unread_count > 0}
      onClick={handleClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <ChatAvatar {...avatarContent} />

      <ContentWrapper>
        <TopRow>
          <PartyName>{other_party.name}</PartyName>
          <StatusChip label={status} size="small" $status={status} />
        </TopRow>
        <ItemTitle>{item.title}</ItemTitle>
        <MessagePreview $italic={!last_message}>
          {last_message ? last_message.content : 'No messages yet'}
        </MessagePreview>
      </ContentWrapper>

      <RightSection>
        {last_message && <TimeStamp>{formatRelativeTime(last_message.created_at)}</TimeStamp>}
        {unread_count > 0 && (
          <UnreadBadge badgeContent={unread_count} max={99}>
            <span />
          </UnreadBadge>
        )}
      </RightSection>

      <DeleteButton
        className="delete-button"
        onClick={handleDeleteClick}
        size="small"
        aria-label="Delete chat"
      >
        <DeleteOutlineIcon />
      </DeleteButton>
    </MotionRowContainer>
  );
}

export default ChatRow;
