import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '@/services';
import type { Message } from '@/types';

export const MESSAGES_QUERY_KEY = 'messages';

export function useMessages(claimId: string | undefined) {
  return useQuery<Message[]>({
    queryKey: [MESSAGES_QUERY_KEY, claimId],
    queryFn: () => messagesApi.getMessages(claimId!).then((res) => res.data.data),
    enabled: !!claimId,
    refetchInterval: 3000,
    staleTime: 0,
  });
}

interface SendMessageVariables {
  claimId: string;
  content: string;
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, content }: SendMessageVariables) =>
      messagesApi.sendMessage(claimId, content).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, variables.claimId] });
    },
  });
}
