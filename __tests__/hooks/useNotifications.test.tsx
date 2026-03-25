import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  NOTIFICATIONS_QUERY_KEY,
} from '@/hooks/useNotifications';
import {
  notificationsApi,
  getSocket,
  isSocketConnected,
  onSocketConnectionChange,
} from '@/services';
import React from 'react';

jest.mock('@/services', () => ({
  ...jest.requireActual('@/services'),
  notificationsApi: {
    getAll: jest.fn(),
    markRead: jest.fn(),
    markAllRead: jest.fn(),
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

describe('useNotifications hooks', () => {
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

  describe('useNotifications', () => {
    it('should NOT have refetchInterval in query config', async () => {
      const mockResponse = {
        data: {
          notifications: [],
          unread_count: 0,
        },
      };
      (notificationsApi.getAll as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useNotifications(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });

      expect(notificationsApi.getAll).toHaveBeenCalledTimes(1);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      expect(notificationsApi.getAll).toHaveBeenCalledTimes(1);
    }, 10000);

    it('should prepend incoming new_notification to cached list', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const initialNotifications = [
        { id: 'notif-1', type: 'claim_received', payload: {}, read: false },
      ];

      const mockResponse = {
        data: {
          notifications: initialNotifications,
          unread_count: 1,
        },
      };
      (notificationsApi.getAll as jest.Mock).mockResolvedValue(mockResponse);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useNotifications(), { wrapper });

      await waitFor(() => {
        expect(result.current.data?.notifications).toHaveLength(1);
      });

      const newNotificationHandler = mockSocket.on.mock.calls.find(
        ([event]: [string]) => event === 'new_notification'
      )?.[1];

      expect(newNotificationHandler).toBeDefined();

      act(() => {
        newNotificationHandler({
          id: 'notif-2',
          type: 'new_message',
          payload: { claim_id: 'claim-1' },
          read: false,
          created_at: new Date().toISOString(),
        });
      });

      await waitFor(() => {
        expect(result.current.data?.notifications).toHaveLength(2);
        expect(result.current.data?.notifications?.[0]?.id).toBe('notif-2');
      });
    });

    it('should increment unread_count when new_notification arrives', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const mockResponse = {
        data: {
          notifications: [],
          unread_count: 5,
        },
      };
      (notificationsApi.getAll as jest.Mock).mockResolvedValue(mockResponse);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useNotifications(), { wrapper });

      await waitFor(() => {
        expect(result.current.data?.unread_count).toBe(5);
      });

      const newNotificationHandler = mockSocket.on.mock.calls.find(
        ([event]: [string]) => event === 'new_notification'
      )?.[1];

      act(() => {
        newNotificationHandler({
          id: 'notif-new',
          type: 'claim_accepted',
          payload: {},
          read: false,
          created_at: new Date().toISOString(),
        });
      });

      await waitFor(() => {
        expect(result.current.data?.unread_count).toBe(6);
      });
    });

    it('should remove listener on unmount', async () => {
      const mockResponse = {
        data: {
          notifications: [],
          unread_count: 0,
        },
      };
      (notificationsApi.getAll as jest.Mock).mockResolvedValue(mockResponse);

      const { unmount } = renderHook(() => useNotifications(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockSocket.on).toHaveBeenCalledWith('new_notification', expect.any(Function));
      });

      unmount();

      expect(mockSocket.off).toHaveBeenCalledWith('new_notification', expect.any(Function));
      expect(mockSocket.off).toHaveBeenCalledWith('claim_updated', expect.any(Function));
    });
  });

  describe('useMarkNotificationRead', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useMarkNotificationRead(), {
        wrapper: createWrapper(),
      });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call notificationsApi.markRead on mutate', async () => {
      const mockNotification = { id: 'notif-1', type: 'claim_received', read: true };
      const mockResponse = {
        data: { notification: mockNotification },
      };
      (notificationsApi.markRead as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useMarkNotificationRead(), {
        wrapper: createWrapper(),
      });

      result.current.mutate('notif-1');

      await waitFor(() => {
        expect(notificationsApi.markRead).toHaveBeenCalledWith('notif-1');
      });
    });
  });

  describe('useMarkAllNotificationsRead', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useMarkAllNotificationsRead(), {
        wrapper: createWrapper(),
      });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call notificationsApi.markAllRead on mutate', async () => {
      const mockResponse = {
        data: { updated: 5 },
      };
      (notificationsApi.markAllRead as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useMarkAllNotificationsRead(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(notificationsApi.markAllRead).toHaveBeenCalled();
      });
    });
  });

  describe('NOTIFICATIONS_QUERY_KEY', () => {
    it('should be defined', () => {
      expect(NOTIFICATIONS_QUERY_KEY).toBe('notifications');
    });
  });
});
