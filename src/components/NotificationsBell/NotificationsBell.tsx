import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from '@/hooks';
import type { Notification } from '@/types';
import {
  BellButton,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  MarkAllReadButton,
  NotificationRow,
  NotificationIconWrapper,
  NotificationTextWrapper,
  NotificationText,
  NotificationTime,
  EmptyState,
} from './NotificationsBell.styled';

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

function getNotificationIcon(type: string) {
  switch (type) {
    case 'claim_received':
      return <PersonAddIcon fontSize="small" sx={{ color: '#1976d2' }} />;
    case 'claim_accepted':
      return <CheckCircleIcon fontSize="small" sx={{ color: '#2e7d32' }} />;
    case 'claim_rejected':
      return <CancelIcon fontSize="small" sx={{ color: '#d32f2f' }} />;
    case 'new_message':
      return <ChatBubbleOutlineIcon fontSize="small" sx={{ color: '#00796b' }} />;
    case 'item_resolved':
      return <VerifiedIcon fontSize="small" sx={{ color: '#2e7d32' }} />;
    default:
      return <NotificationsOutlinedIcon fontSize="small" />;
  }
}

function getNotificationTitle(notification: Notification): string {
  const { type, payload } = notification;
  const itemTitle = (payload.item_title as string) || 'an item';
  const senderName = (payload.sender_name as string) || 'Someone';
  const preview = (payload.preview as string) || '';

  switch (type) {
    case 'claim_received':
      return `Someone found your ${itemTitle}`;
    case 'claim_accepted':
      return `Your claim on ${itemTitle} was accepted`;
    case 'claim_rejected':
      return `Your claim on ${itemTitle} was rejected`;
    case 'new_message':
      return `${senderName}: ${preview}`;
    case 'item_resolved':
      return `${itemTitle} has been resolved`;
    default:
      return 'New notification';
  }
}

function getNavigationPath(notification: Notification): string {
  const { type, payload } = notification;
  const claimId = payload.claim_id as string;

  switch (type) {
    case 'claim_received':
    case 'claim_accepted':
    case 'claim_rejected':
    case 'new_message':
      return `/messages/${claimId}`;
    case 'item_resolved':
      return '/profile';
    default:
      return '/profile';
  }
}

export function NotificationsBell() {
  const navigate = useNavigate();
  const { data } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverOpen = Boolean(anchorEl);

  const notifications = data?.notifications || [];
  const unreadCount = data?.unread_count || 0;

  const handleBellClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNotificationClick = useCallback(
    (notification: Notification) => {
      if (!notification.read) {
        markRead.mutate(notification.id);
      }
      handleClose();
      navigate(getNavigationPath(notification));
    },
    [markRead, navigate, handleClose]
  );

  const handleMarkAllRead = useCallback(() => {
    markAllRead.mutate();
  }, [markAllRead]);

  return (
    <>
      <BellButton onClick={handleBellClick} aria-label="Notifications">
        <Badge badgeContent={unreadCount} color="error" variant={unreadCount > 0 ? 'standard' : undefined}>
          <NotificationsOutlinedIcon />
        </Badge>
      </BellButton>

      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { mt: 1.5, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)' },
          },
        }}
      >
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Notifications</PopoverTitle>
            {unreadCount > 0 && (
              <MarkAllReadButton onClick={handleMarkAllRead} size="small">
                Mark all as read
              </MarkAllReadButton>
            )}
          </PopoverHeader>

          {notifications.length === 0 ? (
            <EmptyState>No notifications yet</EmptyState>
          ) : (
            notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                unread={!notification.read}
                onClick={() => handleNotificationClick(notification)}
              >
                <NotificationIconWrapper>
                  {getNotificationIcon(notification.type)}
                </NotificationIconWrapper>
                <NotificationTextWrapper>
                  <NotificationText>{getNotificationTitle(notification)}</NotificationText>
                  <NotificationTime>{getRelativeTime(notification.createdAt)}</NotificationTime>
                </NotificationTextWrapper>
              </NotificationRow>
            ))
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default NotificationsBell;
