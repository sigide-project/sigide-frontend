import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '@/services';
import type { MessagesResponse } from '@/types';

export const MESSAGES_QUERY_KEY = 'messages';

export function useMessages(claimId: string | undefined) {
  return useQuery<MessagesResponse>({
    queryKey: [MESSAGES_QUERY_KEY, claimId],
    queryFn: () => messagesApi.getMessages(claimId!).then((res) => res.data),
    enabled: !!claimId,
    refetchInterval: 4000,
    staleTime: 0,
  });
}

export function useSendMessage(claimId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      messagesApi.sendMessage(claimId, content).then((res) => res.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, claimId] });
    },
  });
}
