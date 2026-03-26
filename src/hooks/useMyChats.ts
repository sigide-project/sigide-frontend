import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { claimsApi, getSocket, isSocketConnected, onSocketConnectionChange } from '@/services';
import { useAuthStore } from '@/store';
import type { MyChatsResponse } from '@/types';

export const MY_CHATS_QUERY_KEY = 'my-chats';

interface ChatListUpdatePayload {
  claim_id: string;
  last_message: {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
  };
}

interface ChatDeletedPayload {
  claim_id: string;
}

export function useMyChats() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [socketConnected, setSocketConnected] = useState(isSocketConnected());

  useEffect(() => {
    const unsubscribe = onSocketConnectionChange((connected) => {
      setSocketConnected(connected);
    });
    return unsubscribe;
  }, []);

  const query = useQuery<MyChatsResponse>({
    queryKey: [MY_CHATS_QUERY_KEY],
    queryFn: () => claimsApi.getMyChats().then((res) => res.data),
    staleTime: 0,
  });

  useEffect(() => {
    if (!socketConnected) return;

    const socket = getSocket();
    if (!socket?.connected) return;

    const handleChatListUpdated = (payload: ChatListUpdatePayload) => {
      queryClient.setQueryData<MyChatsResponse>([MY_CHATS_QUERY_KEY], (old) => {
        if (!old) return old;

        const existingChatIndex = old.chats.findIndex((c) => c.claim_id === payload.claim_id);

        if (existingChatIndex === -1) {
          queryClient.invalidateQueries({ queryKey: [MY_CHATS_QUERY_KEY] });
          return old;
        }

        const updatedChats = [...old.chats];
        const existingChat = updatedChats[existingChatIndex];

        const isFromOtherUser = payload.last_message.sender_id !== user?.id;

        updatedChats[existingChatIndex] = {
          ...existingChat,
          last_message: payload.last_message,
          unread_count: isFromOtherUser ? existingChat.unread_count + 1 : existingChat.unread_count,
        };

        updatedChats.sort((a, b) => {
          if (!a.last_message && !b.last_message) return 0;
          if (!a.last_message) return 1;
          if (!b.last_message) return -1;
          return (
            new Date(b.last_message.created_at).getTime() -
            new Date(a.last_message.created_at).getTime()
          );
        });

        return { ...old, chats: updatedChats };
      });
    };

    const handleChatDeleted = (payload: ChatDeletedPayload) => {
      queryClient.setQueryData<MyChatsResponse>([MY_CHATS_QUERY_KEY], (old) => {
        if (!old) return old;
        return {
          ...old,
          chats: old.chats.filter((c) => c.claim_id !== payload.claim_id),
        };
      });
    };

    const handleClaimUpdated = () => {
      queryClient.invalidateQueries({ queryKey: [MY_CHATS_QUERY_KEY] });
    };

    socket.on('chat_list_updated', handleChatListUpdated);
    socket.on('chat_deleted', handleChatDeleted);
    socket.on('claim_updated', handleClaimUpdated);

    return () => {
      socket.off('chat_list_updated', handleChatListUpdated);
      socket.off('chat_deleted', handleChatDeleted);
      socket.off('claim_updated', handleClaimUpdated);
    };
  }, [socketConnected, queryClient, user?.id]);

  return {
    chats: query.data?.chats ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
