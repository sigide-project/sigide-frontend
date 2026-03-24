import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { usersApi } from '@/services';
import { useAuthStore } from '@/store';
import React from 'react';

jest.mock('@/services', () => ({
  usersApi: {
    updateMe: jest.fn(),
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

describe('useUpdateProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      token: 'test-token',
      isAuthenticated: true,
      isLoading: false,
    });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    expect(result.current.updateProfile).toBeDefined();
    expect(result.current.updateProfileAsync).toBeDefined();
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call usersApi.updateMe on mutate', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      name: 'Updated Name',
    };
    (usersApi.updateMe as jest.Mock).mockResolvedValue({
      data: { success: true, data: mockUser },
    });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    await result.current.updateProfileAsync({ name: 'Updated Name' });

    expect(usersApi.updateMe).toHaveBeenCalledWith({ name: 'Updated Name' });
  });

  it('should update auth store on success', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      name: 'Updated Name',
    };
    (usersApi.updateMe as jest.Mock).mockResolvedValue({
      data: { success: true, data: mockUser },
    });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    await result.current.updateProfileAsync({ name: 'Updated Name' });

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.user?.name).toBe('Updated Name');
    });
  });

  it('should handle nested data response', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      name: 'Updated Name',
    };
    (usersApi.updateMe as jest.Mock).mockResolvedValue({
      data: { success: true, data: { user: mockUser } },
    });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    await result.current.updateProfileAsync({ name: 'Updated Name' });

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.user?.name).toBe('Updated Name');
    });
  });

  it('should handle user response format', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      name: 'Updated Name',
    };
    (usersApi.updateMe as jest.Mock).mockResolvedValue({
      data: { success: true, user: mockUser },
    });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    await result.current.updateProfileAsync({ name: 'Updated Name' });

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.user?.name).toBe('Updated Name');
    });
  });

  it('should set error on failure', async () => {
    const error = new Error('Update failed');
    (usersApi.updateMe as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    try {
      await result.current.updateProfileAsync({ name: 'Updated Name' });
    } catch {
      // Expected error
    }

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });

  it('should update multiple fields', async () => {
    const mockUser = {
      id: '1',
      username: 'newusername',
      email: 'test@example.com',
      name: 'New Name',
      phone: '+1234567890',
    };
    (usersApi.updateMe as jest.Mock).mockResolvedValue({
      data: { success: true, data: mockUser },
    });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    await result.current.updateProfileAsync({
      name: 'New Name',
      username: 'newusername',
      phone: '+1234567890',
    });

    expect(usersApi.updateMe).toHaveBeenCalledWith({
      name: 'New Name',
      username: 'newusername',
      phone: '+1234567890',
    });
  });
});
