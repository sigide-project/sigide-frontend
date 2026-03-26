import { useMutation, useQueryClient } from '@tanstack/react-query';
import { claimsApi } from '@/services';
import type { MyChatsResponse } from '@/types';
import { MY_CHATS_QUERY_KEY } from './useMyChats';

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (claimId: string) => claimsApi.deleteChat(claimId),
    onSuccess: (_, claimId) => {
      queryClient.setQueryData<MyChatsResponse>([MY_CHATS_QUERY_KEY], (old) => {
        if (!old) return old;
        return {
          ...old,
          chats: old.chats.filter((c) => c.claim_id !== claimId),
        };
      });
    },
  });
}
