import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMessages, useSendMessage, MESSAGES_QUERY_KEY } from '@/hooks/useMessages';
import { messagesApi, getSocket, isSocketConnected, onSocketConnectionChange } from '@/services';
import React from 'react';

jest.mock('@/services', () => ({
  ...jest.requireActual('@/services'),
  messagesApi: {
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
  },
  getSocket: jest.fn(),
  isSocketConnected: jest.fn(),
  onSocketConnectionChange: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useMessages hooks', () => {
  let mockSocket: {
    connected: boolean;
    emit: jest.Mock;
    on: jest.Mock;
    off: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSocket = {
      connected: true,
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    };
    (getSocket as jest.Mock).mockReturnValue(mockSocket);
    (isSocketConnected as jest.Mock).mockReturnValue(true);
    (onSocketConnectionChange as jest.Mock).mockImplementation(() => jest.fn());
  });

  describe('useMessages', () => {
    it('should NOT have refetchInterval in query config', async () => {
      const mockResponse = {
        data: {
          messages: [],
          claim: { id: 'claim-1', status: 'pending' },
          contact: null,
        },
      };
      (messagesApi.getMessages as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useMessages('claim-1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });

      expect(messagesApi.getMessages).toHaveBeenCalledTimes(1);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      expect(messagesApi.getMessages).toHaveBeenCalledTimes(1);
    }, 10000);

    it('should emit join_claim on mount with correct claimId', async () => {
      const mockResponse = {
        data: {
          messages: [],
          claim: { id: 'claim-123', status: 'pending' },
          contact: null,
        },
      };
      (messagesApi.getMessages as jest.Mock).mockResolvedValue(mockResponse);

      renderHook(() => useMessages('claim-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockSocket.emit).toHaveBeenCalledWith('join_claim', { claimId: 'claim-123' });
      });
    });

    it('should append incoming new_message event to cached messages', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const initialMessages = [
        { id: 'msg-1', content: 'Hello', claim_id: 'claim-1', sender_id: 'user-1' },
      ];

      const mockResponse = {
        data: {
          messages: initialMessages,
          claim: { id: 'claim-1', status: 'pending' },
          contact: null,
        },
      };
      (messagesApi.getMessages as jest.Mock).mockResolvedValue(mockResponse);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useMessages('claim-1'), { wrapper });

      await waitFor(() => {
        expect(result.current.data?.messages).toHaveLength(1);
      });

      const newMessageHandler = mockSocket.on.mock.calls.find(
        ([event]: [string]) => event === 'new_message'
      )?.[1];

      expect(newMessageHandler).toBeDefined();

      act(() => {
        newMessageHandler({
          id: 'msg-2',
          content: 'World',
          claim_id: 'claim-1',
          sender_id: 'user-2',
          read_at: null,
          created_at: new Date().toISOString(),
          sender: { id: 'user-2', name: 'User 2', avatar_url: null },
        });
      });

      await waitFor(() => {
        expect(result.current.data?.messages).toHaveLength(2);
        expect(result.current.data?.messages?.[1]?.content).toBe('World');
      });
    });

    it('should not append duplicate messages (same id received twice)', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const mockResponse = {
        data: {
          messages: [{ id: 'msg-1', content: 'Hello', claim_id: 'claim-1', sender_id: 'user-1' }],
          claim: { id: 'claim-1', status: 'pending' },
          contact: null,
        },
      };
      (messagesApi.getMessages as jest.Mock).mockResolvedValue(mockResponse);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useMessages('claim-1'), { wrapper });

      await waitFor(() => {
        expect(result.current.data?.messages).toHaveLength(1);
      });

      const newMessageHandler = mockSocket.on.mock.calls.find(
        ([event]: [string]) => event === 'new_message'
      )?.[1];

      act(() => {
        newMessageHandler({
          id: 'msg-1',
          content: 'Hello Duplicate',
          claim_id: 'claim-1',
          sender_id: 'user-1',
          read_at: null,
          created_at: new Date().toISOString(),
          sender: { id: 'user-1', name: 'User 1', avatar_url: null },
        });
      });

      await waitFor(() => {
        expect(result.current.data?.messages).toHaveLength(1);
      });
    });

    it('should emit leave_claim and remove listeners on unmount', async () => {
      const mockResponse = {
        data: {
          messages: [],
          claim: { id: 'claim-1', status: 'pending' },
          contact: null,
        },
      };
      (messagesApi.getMessages as jest.Mock).mockResolvedValue(mockResponse);

      const { unmount } = renderHook(() => useMessages('claim-1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockSocket.emit).toHaveBeenCalledWith('join_claim', { claimId: 'claim-1' });
      });

      unmount();

      expect(mockSocket.emit).toHaveBeenCalledWith('leave_claim', { claimId: 'claim-1' });
      expect(mockSocket.off).toHaveBeenCalledWith('new_message', expect.any(Function));
      expect(mockSocket.off).toHaveBeenCalledWith('claim_updated', expect.any(Function));
    });
  });

  describe('useSendMessage', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useSendMessage('claim-1'), {
        wrapper: createWrapper(),
      });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call messagesApi.sendMessage on mutate', async () => {
      const mockMessage = { id: 'msg-1', content: 'Hello', claim_id: 'claim-1' };
      const mockResponse = {
        data: { message: mockMessage },
      };
      (messagesApi.sendMessage as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useSendMessage('claim-1'), {
        wrapper: createWrapper(),
      });

      result.current.mutate('Hello');

      await waitFor(() => {
        expect(messagesApi.sendMessage).toHaveBeenCalledWith('claim-1', 'Hello');
      });
    });
  });

  describe('MESSAGES_QUERY_KEY', () => {
    it('should be defined', () => {
      expect(MESSAGES_QUERY_KEY).toBe('messages');
    });
  });
});
