import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  notificationsApi,
  getSocket,
  isSocketConnected,
  onSocketConnectionChange,
} from '@/services';
import type { NotificationsResponse, Notification } from '@/types';

export const NOTIFICATIONS_QUERY_KEY = 'notifications';

interface SocketNotification {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

export function useNotifications() {
  const queryClient = useQueryClient();
  const [socketConnected, setSocketConnected] = useState(isSocketConnected());

  useEffect(() => {
    const unsubscribe = onSocketConnectionChange((connected) => {
      setSocketConnected(connected);
    });
    return unsubscribe;
  }, []);

  const query = useQuery<NotificationsResponse>({
    queryKey: [NOTIFICATIONS_QUERY_KEY],
    queryFn: () => notificationsApi.getAll().then((res) => res.data),
    staleTime: 0,
  });

  useEffect(() => {
    if (!socketConnected) return;

    const socket = getSocket();
    if (!socket?.connected) return;

    const handleNewNotification = (notification: SocketNotification) => {
      queryClient.setQueryData<NotificationsResponse>([NOTIFICATIONS_QUERY_KEY], (old) => {
        if (!old) return old;
        const newNotification: Notification = {
          id: notification.id,
          type: notification.type,
          payload: notification.payload,
          read: notification.read,
          createdAt: notification.created_at,
          updatedAt: notification.created_at,
          user_id: '',
        };
        return {
          ...old,
          notifications: [newNotification, ...old.notifications].slice(0, 30),
          unread_count: old.unread_count + 1,
        };
      });
    };

    const handleClaimUpdated = () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    };

    socket.on('new_notification', handleNewNotification);
    socket.on('claim_updated', handleClaimUpdated);

    return () => {
      socket.off('new_notification', handleNewNotification);
      socket.off('claim_updated', handleClaimUpdated);
    };
  }, [socketConnected, queryClient]);

  return query;
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id).then((res) => res.data.notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsApi.markAllRead().then((res) => res.data.updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    },
  });
}
