import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogin, useRegister, useLogout, useCurrentUser, AUTH_QUERY_KEY } from '@/hooks/useAuth';
import { authApi } from '@/services';
import { useAuthStore } from '@/store';
import React from 'react';

jest.mock('@/services', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getMe: jest.fn(),
  },
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

describe('useAuth hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  describe('useLogin', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call authApi.login on mutate', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
      const mockResponse = {
        data: { success: true, data: { user: mockUser, token: 'test-token' } },
      };
      (authApi.login as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

      result.current.mutate({ email: 'test@example.com', password: 'password' });

      await waitFor(() => {
        expect(authApi.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password',
        });
      });
    });

    it('should update auth store on successful login', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
      const mockResponse = {
        data: { success: true, data: { user: mockUser, token: 'test-token' } },
      };
      (authApi.login as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

      await result.current.mutateAsync({ email: 'test@example.com', password: 'password' });

      await waitFor(() => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.token).toBe('test-token');
      });
    });
  });

  describe('useRegister', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call authApi.register on mutate', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
      const mockResponse = {
        data: { success: true, data: { user: mockUser, token: 'test-token' } },
      };
      (authApi.register as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

      const userData = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };

      result.current.mutate(userData);

      await waitFor(() => {
        expect(authApi.register).toHaveBeenCalledWith(userData);
      });
    });

    it('should update auth store on successful registration', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
      const mockResponse = {
        data: { success: true, data: { user: mockUser, token: 'test-token' } },
      };
      (authApi.register as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

      await result.current.mutateAsync({
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      });

      await waitFor(() => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
      });
    });
  });

  describe('useLogout', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useLogout(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
    });

    it('should call authApi.logout on mutate', async () => {
      (authApi.logout as jest.Mock).mockResolvedValue({ data: { success: true } });

      const { result } = renderHook(() => useLogout(), { wrapper: createWrapper() });

      result.current.mutate();

      await waitFor(() => {
        expect(authApi.logout).toHaveBeenCalled();
      });
    });

    it('should clear auth store on logout', async () => {
      useAuthStore.setState({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test',
          username: 'test',
          createdAt: '',
          updatedAt: '',
        },
        token: 'test-token',
        isAuthenticated: true,
      });

      (authApi.logout as jest.Mock).mockResolvedValue({ data: { success: true } });

      const { result } = renderHook(() => useLogout(), { wrapper: createWrapper() });

      result.current.mutate();

      await waitFor(() => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
      });
    });
  });

  describe('useCurrentUser', () => {
    it('should not fetch when not authenticated', () => {
      const { result } = renderHook(() => useCurrentUser(), { wrapper: createWrapper() });

      expect(result.current.isFetching).toBe(false);
      expect(authApi.getMe).not.toHaveBeenCalled();
    });

    it('should fetch when authenticated', async () => {
      useAuthStore.setState({ isAuthenticated: true, token: 'test-token' });

      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
      (authApi.getMe as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockUser },
      });

      renderHook(() => useCurrentUser(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(authApi.getMe).toHaveBeenCalled();
      });
    });
  });

  describe('AUTH_QUERY_KEY', () => {
    it('should be defined', () => {
      expect(AUTH_QUERY_KEY).toBe('auth');
    });
  });
});
