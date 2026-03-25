import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi, getSocket, isSocketConnected, onSocketConnectionChange } from '@/services';
import type { MessagesResponse, Message } from '@/types';
import { CLAIMS_MINE_QUERY_KEY, CLAIMS_ON_MY_ITEMS_QUERY_KEY } from './useClaims';

export const MESSAGES_QUERY_KEY = 'messages';

interface SocketSender {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface SocketMessage {
  id: string;
  claim_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
  sender: SocketSender | null;
}

export function useMessages(claimId: string | undefined) {
  const queryClient = useQueryClient();
  const [socketConnected, setSocketConnected] = useState(isSocketConnected());

  useEffect(() => {
    const unsubscribe = onSocketConnectionChange((connected) => {
      setSocketConnected(connected);
    });
    return unsubscribe;
  }, []);

  const query = useQuery<MessagesResponse>({
    queryKey: [MESSAGES_QUERY_KEY, claimId],
    queryFn: () => messagesApi.getMessages(claimId!).then((res) => res.data),
    enabled: !!claimId,
    staleTime: 0,
  });

  useEffect(() => {
    if (!claimId || !socketConnected) return;

    const socket = getSocket();
    if (!socket?.connected) return;

    socket.emit('join_claim', { claimId });

    const handleNewMessage = (message: SocketMessage) => {
      queryClient.setQueryData<MessagesResponse>([MESSAGES_QUERY_KEY, claimId], (old) => {
        if (!old) return old;
        const alreadyExists = old.messages?.some((m) => m.id === message.id);
        if (alreadyExists) return old;
        const newMessage: Message = {
          id: message.id,
          claim_id: message.claim_id,
          sender_id: message.sender_id,
          content: message.content,
          read_at: message.read_at,
          createdAt: message.created_at,
          sender: message.sender
            ? {
                id: message.sender.id,
                username: '',
                email: '',
                name: message.sender.name,
                avatar_url: message.sender.avatar_url,
                createdAt: '',
                updatedAt: '',
              }
            : undefined,
        };
        return {
          ...old,
          messages: [...(old.messages || []), newMessage],
        };
      });
    };

    const handleClaimUpdated = () => {
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, claimId] });
      queryClient.invalidateQueries({ queryKey: [CLAIMS_MINE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY] });
    };

    socket.on('new_message', handleNewMessage);
    socket.on('claim_updated', handleClaimUpdated);

    return () => {
      socket.emit('leave_claim', { claimId });
      socket.off('new_message', handleNewMessage);
      socket.off('claim_updated', handleClaimUpdated);
    };
  }, [claimId, socketConnected, queryClient]);

  return query;
}

export function useSendMessage(claimId: string) {
  return useMutation({
    mutationFn: (content: string) =>
      messagesApi.sendMessage(claimId, content).then((res) => res.data.message),
  });
}
