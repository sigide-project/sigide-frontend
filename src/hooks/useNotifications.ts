import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '@/services';
import type { NotificationsResponse } from '@/types';

export const NOTIFICATIONS_QUERY_KEY = 'notifications';

export function useNotifications() {
  return useQuery<NotificationsResponse>({
    queryKey: [NOTIFICATIONS_QUERY_KEY],
    queryFn: () => notificationsApi.getAll().then((res) => res.data),
    refetchInterval: 30000,
    staleTime: 0,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      notificationsApi.markRead(id).then((res) => res.data.notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      notificationsApi.markAllRead().then((res) => res.data.updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    },
  });
}
