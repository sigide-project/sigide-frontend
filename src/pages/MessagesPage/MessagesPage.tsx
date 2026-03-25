import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useAuthStore } from '@/store';
import {
  useMessages,
  useSendMessage,
  useAcceptClaim,
  useRejectClaim,
  useResolveClaim,
  MESSAGES_QUERY_KEY,
  CLAIMS_ON_MY_ITEMS_QUERY_KEY,
  CLAIMS_MINE_QUERY_KEY,
} from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import type { Message } from '@/types';
import {
  PageWrapper,
  Sidebar,
  ItemThumbnail,
  ItemThumbnailPlaceholder,
  ItemInfoSection,
  SidebarItemTitle,
  ItemLocationText,
  StatusBadge,
  statusLabels,
  OtherPartySection,
  OtherPartyAvatar,
  OtherPartyName,
  ActionButtonsSection,
  AcceptButton,
  RejectButton,
  ResolveButton,
  WhatsAppButton,
  ContactNote,
  ChatPanel,
  MessageList,
  MessageBubbleRow,
  SenderInfo,
  SenderAvatar,
  SenderName,
  MessageBubble,
  MessageMeta,
  MessageTime,
  ClosedBanner,
  MessageInputBar,
  StyledTextField,
  SendButton,
  LoadingWrapper,
} from './MessagesPage.styled';

function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

function getInitials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function MessagesPage() {
  const { claimId } = useParams<{ claimId: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { data, isLoading } = useMessages(claimId);
  const sendMessage = useSendMessage(claimId!);
  const acceptClaim = useAcceptClaim();
  const rejectClaim = useRejectClaim();
  const resolveClaim = useResolveClaim();

  const [messageText, setMessageText] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'reject' | 'resolve';
  }>({ open: false, action: 'reject' });
  const messageEndRef = useRef<HTMLDivElement>(null);
  const prevMessageCount = useRef(0);

  const messages = data?.messages || [];
  const claim = data?.claim;
  const contact = data?.contact;
  const currentUserId = user?.id;

  const isOwner = claim?.owner?.id === currentUserId;
  const isClosed = claim?.status === 'rejected' || claim?.status === 'resolved';

  useEffect(() => {
    if (messages.length !== prevMessageCount.current) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevMessageCount.current = messages.length;
    }
  }, [messages.length]);

  const handleSendMessage = useCallback(async () => {
    const content = messageText.trim();
    if (!content || !claimId) return;

    setMessageText('');
    try {
      await sendMessage.mutateAsync(content);
    } catch {
      setMessageText(content);
    }
  }, [messageText, claimId, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleAccept = useCallback(async () => {
    if (!claimId) return;
    await acceptClaim.mutateAsync(claimId);
    queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, claimId] });
    queryClient.invalidateQueries({ queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY] });
  }, [claimId, acceptClaim, queryClient]);

  const handleConfirmAction = useCallback(async () => {
    if (!claimId) return;

    if (confirmDialog.action === 'reject') {
      await rejectClaim.mutateAsync(claimId);
    } else {
      await resolveClaim.mutateAsync(claimId);
    }

    queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, claimId] });
    queryClient.invalidateQueries({ queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [CLAIMS_MINE_QUERY_KEY] });
    setConfirmDialog({ open: false, action: 'reject' });
  }, [claimId, confirmDialog.action, rejectClaim, resolveClaim, queryClient]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  if (!claim) {
    return (
      <LoadingWrapper>
        <div>Claim not found</div>
      </LoadingWrapper>
    );
  }

  const otherParty = isOwner ? claim.claimant : claim.owner;
  const itemData = claim.item;
  const firstImage = itemData?.image_urls?.[0];

  const shouldShowSenderInfo = (msg: Message, index: number): boolean => {
    if (index === 0) return true;
    return messages[index - 1].sender_id !== msg.sender_id;
  };

  return (
    <>
      <PageWrapper>
        <Sidebar elevation={0}>
          {firstImage ? (
            <ItemThumbnail src={firstImage} alt={itemData.title} />
          ) : (
            <ItemThumbnailPlaceholder>No image</ItemThumbnailPlaceholder>
          )}

          <ItemInfoSection>
            <SidebarItemTitle>{itemData.title}</SidebarItemTitle>
            <div>
              <Chip label={itemData.type} size="small" variant="outlined" />
            </div>
            {itemData.location_name && (
              <ItemLocationText>{itemData.location_name}</ItemLocationText>
            )}
            <StatusBadge
              label={statusLabels[claim.status] || claim.status}
              claimstatus={claim.status}
              size="small"
            />
          </ItemInfoSection>

          {otherParty && (
            <OtherPartySection>
              <OtherPartyAvatar src={otherParty.avatar_url || undefined}>
                {!otherParty.avatar_url && getInitials(otherParty.name)}
              </OtherPartyAvatar>
              <OtherPartyName>{otherParty.name}</OtherPartyName>
            </OtherPartySection>
          )}

          {isOwner && claim.status === 'pending' && (
            <ActionButtonsSection>
              <AcceptButton
                variant="contained"
                fullWidth
                onClick={handleAccept}
                disabled={acceptClaim.isPending}
              >
                {acceptClaim.isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Accept Claim'
                )}
              </AcceptButton>
              <RejectButton
                variant="outlined"
                fullWidth
                onClick={() => setConfirmDialog({ open: true, action: 'reject' })}
                disabled={rejectClaim.isPending}
              >
                Reject Claim
              </RejectButton>
            </ActionButtonsSection>
          )}

          {claim.status === 'accepted' && (isOwner || !isOwner) && (
            <ActionButtonsSection>
              <ResolveButton
                variant="outlined"
                fullWidth
                onClick={() => setConfirmDialog({ open: true, action: 'resolve' })}
                disabled={resolveClaim.isPending}
              >
                Mark as Resolved
              </ResolveButton>
            </ActionButtonsSection>
          )}

          {claim.status === 'accepted' && contact?.whatsapp_url && (
            <ActionButtonsSection>
              <WhatsAppButton
                component="a"
                variant="contained"
                fullWidth
                startIcon={<WhatsAppIcon />}
                href={contact.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </WhatsAppButton>
              <ContactNote>Contact details are only shared after claim is accepted</ContactNote>
            </ActionButtonsSection>
          )}
        </Sidebar>

        <ChatPanel>
          <MessageList>
            {messages.map((msg, index) => {
              const isOwn = msg.sender_id === currentUserId;
              const showSender = !isOwn && shouldShowSenderInfo(msg, index);

              return (
                <MessageBubbleRow key={msg.id} isOwn={isOwn}>
                  {showSender && (
                    <SenderInfo>
                      <SenderAvatar src={msg.sender?.avatar_url || undefined}>
                        {!msg.sender?.avatar_url && getInitials(msg.sender?.name)}
                      </SenderAvatar>
                      <SenderName>{msg.sender?.name}</SenderName>
                    </SenderInfo>
                  )}
                  <MessageBubble isOwn={isOwn}>{msg.content}</MessageBubble>
                  <MessageMeta>
                    <MessageTime>{getRelativeTime(msg.createdAt)}</MessageTime>
                    {isOwn && msg.read_at && (
                      <DoneAllIcon sx={{ fontSize: 14, color: '#00796b' }} />
                    )}
                  </MessageMeta>
                </MessageBubbleRow>
              );
            })}
            <div ref={messageEndRef} />
          </MessageList>

          {isClosed ? (
            <ClosedBanner>This conversation is closed</ClosedBanner>
          ) : (
            <MessageInputBar>
              <StyledTextField
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                multiline
                maxRows={4}
                size="small"
                disabled={isClosed}
              />
              <SendButton
                onClick={handleSendMessage}
                disabled={!messageText.trim() || sendMessage.isPending || isClosed}
                aria-label="Send message"
              >
                <SendIcon />
              </SendButton>
            </MessageInputBar>
          )}
        </ChatPanel>
      </PageWrapper>

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: 'reject' })}
      >
        <DialogTitle>
          {confirmDialog.action === 'reject' ? 'Reject Claim' : 'Mark as Resolved'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.action === 'reject'
              ? 'Are you sure you want to reject this claim? This action cannot be undone.'
              : 'Are you sure you want to mark this exchange as complete? This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, action: 'reject' })}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={confirmDialog.action === 'reject' ? 'error' : 'primary'}
            variant="contained"
          >
            {confirmDialog.action === 'reject' ? 'Reject' : 'Resolve'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MessagesPage;
