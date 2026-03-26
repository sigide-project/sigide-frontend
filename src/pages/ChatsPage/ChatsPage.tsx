import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InputAdornment from '@mui/material/InputAdornment';
import { useMyChats, useDeleteChat } from '@/hooks';
import { ChatRow, NavbarSpacer } from '@/components';
import { MessagesPage } from '@/pages';
import {
  PageContainer,
  LeftPanel,
  CollapseToggle,
  PanelHeader,
  HeaderRow,
  PageTitle,
  TotalUnreadBadge,
  CollapsedUnreadBadge,
  SearchField,
  CollapsedIcon,
  ChatList,
  CollapsedChatItem,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtext,
  SkeletonRow,
  SkeletonContent,
  RightPanel,
  PlaceholderState,
  PlaceholderIcon,
  PlaceholderText,
  PlaceholderSubtext,
} from './ChatsPage.styled';

function getInitials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ChatsPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { chats, isLoading } = useMyChats();
  const deleteChat = useDeleteChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const totalUnread = useMemo(() => chats.reduce((sum, c) => sum + c.unread_count, 0), [chats]);

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const query = searchQuery.toLowerCase();
    return chats.filter(
      (chat) =>
        chat.item.title.toLowerCase().includes(query) ||
        chat.other_party.name.toLowerCase().includes(query)
    );
  }, [chats, searchQuery]);

  const handleSelectChat = (claimId: string) => {
    if (isMobile) {
      navigate(`/messages/${claimId}`);
    } else {
      setSelectedClaimId(claimId);
    }
  };

  const handleDeleteClick = (claimId: string) => {
    setDeleteTarget(claimId);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteChat.mutateAsync(deleteTarget);
      if (deleteTarget === selectedClaimId) {
        setSelectedClaimId(null);
      }
      setDeleteTarget(null);
      setSnackbarOpen(true);
    } catch {
      console.error('Failed to delete chat');
    }
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderSkeletons = () => (
    <>
      {[1, 2, 3].map((i) => (
        <SkeletonRow key={i}>
          <Skeleton variant="circular" width={48} height={48} />
          <SkeletonContent>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="80%" height={16} />
            <Skeleton variant="text" width="40%" height={14} />
          </SkeletonContent>
        </SkeletonRow>
      ))}
    </>
  );

  const renderEmptyState = () => (
    <EmptyState>
      <EmptyIcon>
        <ChatBubbleOutlineIcon />
      </EmptyIcon>
      <EmptyTitle>No conversations yet</EmptyTitle>
      <EmptySubtext>When you claim an item or receive a claim, your chats appear here</EmptySubtext>
    </EmptyState>
  );

  const renderChatList = () => (
    <AnimatePresence mode="popLayout">
      {filteredChats.map((chat) => (
        <ChatRow
          key={chat.claim_id}
          chat={chat}
          selected={chat.claim_id === selectedClaimId}
          onSelect={handleSelectChat}
          onDelete={handleDeleteClick}
        />
      ))}
    </AnimatePresence>
  );

  const renderCollapsedChatList = () => (
    <AnimatePresence mode="popLayout">
      {filteredChats.map((chat) => (
        <Tooltip key={chat.claim_id} title={chat.other_party.name} placement="right" arrow>
          <CollapsedChatItem
            $selected={chat.claim_id === selectedClaimId}
            $hasUnread={chat.unread_count > 0}
            onClick={() => handleSelectChat(chat.claim_id)}
          >
            <CollapsedUnreadBadge badgeContent={chat.unread_count} max={9}>
              <Avatar
                src={chat.other_party.avatar_url || undefined}
                sx={{ width: 40, height: 40, fontSize: '0.875rem' }}
              >
                {!chat.other_party.avatar_url && getInitials(chat.other_party.name)}
              </Avatar>
            </CollapsedUnreadBadge>
          </CollapsedChatItem>
        </Tooltip>
      ))}
    </AnimatePresence>
  );

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <NavbarSpacer />
      <PageContainer>
        <LeftPanel $collapsed={sidebarCollapsed && !isMobile}>
          {!isMobile && (
            <CollapseToggle $collapsed={sidebarCollapsed} onClick={toggleSidebar} size="small">
              <ChevronLeftIcon />
            </CollapseToggle>
          )}

          <PanelHeader $collapsed={sidebarCollapsed && !isMobile}>
            <HeaderRow $collapsed={sidebarCollapsed && !isMobile}>
              {sidebarCollapsed && !isMobile ? (
                <Tooltip title={`${totalUnread} unread`} placement="right">
                  <CollapsedIcon>
                    <CollapsedUnreadBadge badgeContent={totalUnread} max={99}>
                      <ForumOutlinedIcon />
                    </CollapsedUnreadBadge>
                  </CollapsedIcon>
                </Tooltip>
              ) : (
                <PageTitle>
                  My chats
                  {totalUnread > 0 && (
                    <TotalUnreadBadge badgeContent={totalUnread} max={99}>
                      <span />
                    </TotalUnreadBadge>
                  )}
                </PageTitle>
              )}
            </HeaderRow>
            <SearchField
              $collapsed={sidebarCollapsed && !isMobile}
              fullWidth
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </PanelHeader>

          <ChatList $collapsed={sidebarCollapsed && !isMobile}>
            {isLoading && renderSkeletons()}
            {!isLoading && filteredChats.length === 0 && !sidebarCollapsed && renderEmptyState()}
            {!isLoading &&
              filteredChats.length > 0 &&
              (sidebarCollapsed && !isMobile ? renderCollapsedChatList() : renderChatList())}
          </ChatList>
        </LeftPanel>

        {!isMobile && (
          <RightPanel>
            {selectedClaimId ? (
              <motion.div
                key={selectedClaimId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <MessagesPage claimId={selectedClaimId} />
              </motion.div>
            ) : (
              <PlaceholderState>
                <PlaceholderIcon>
                  <ForumOutlinedIcon />
                </PlaceholderIcon>
                <PlaceholderText>Select a chat to view messages</PlaceholderText>
                <PlaceholderSubtext>
                  Choose a conversation from the list to start messaging
                </PlaceholderSubtext>
              </PlaceholderState>
            )}
          </RightPanel>
        )}
      </PageContainer>

      <Dialog
        open={!!deleteTarget}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 360,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete conversation?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            This conversation will be removed from your chats. The other person's messages are not
            affected. If they send you a new message, this chat will reappear.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleCancelDelete} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteChat.isPending}
          >
            Delete for me
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          Conversation deleted for you
        </Alert>
      </Snackbar>
    </>
  );
}

export default ChatsPage;
