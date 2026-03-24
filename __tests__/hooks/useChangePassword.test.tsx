import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useChangePassword, useHasPassword, useSetPassword } from '@/hooks/useChangePassword';
import { usersApi } from '@/services/api';
import React from 'react';

jest.mock('@/services/api', () => ({
  usersApi: {
    changePassword: jest.fn(),
    hasPassword: jest.fn(),
    setPassword: jest.fn(),
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

describe('useChangePassword hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useChangePassword', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() => useChangePassword(), { wrapper: createWrapper() });

      expect(result.current.changePassword).toBeDefined();
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.reset).toBeDefined();
    });

    it('should call usersApi.changePassword on mutate', async () => {
      (usersApi.changePassword as jest.Mock).mockResolvedValue({
        data: { success: true },
      });

      const { result } = renderHook(() => useChangePassword(), { wrapper: createWrapper() });

      await result.current.changePassword({
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      });

      expect(usersApi.changePassword).toHaveBeenCalledWith({
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      });
    });

    it('should set isSuccess to true on success', async () => {
      (usersApi.changePassword as jest.Mock).mockResolvedValue({
        data: { success: true },
      });

      const { result } = renderHook(() => useChangePassword(), { wrapper: createWrapper() });

      await result.current.changePassword({
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should throw error when response is not successful', async () => {
      (usersApi.changePassword as jest.Mock).mockResolvedValue({
        data: { success: false, message: 'Invalid password' },
      });

      const { result } = renderHook(() => useChangePassword(), { wrapper: createWrapper() });

      await expect(
        result.current.changePassword({
          currentPassword: 'wrongPassword',
          newPassword: 'newPassword',
        })
      ).rejects.toThrow('Invalid password');
    });

    it('should reset state when reset is called', async () => {
      (usersApi.changePassword as jest.Mock).mockResolvedValue({
        data: { success: true },
      });

      const { result } = renderHook(() => useChangePassword(), { wrapper: createWrapper() });

      await result.current.changePassword({
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      result.current.reset();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(false);
      });
    });
  });

  describe('useHasPassword', () => {
    it('should fetch hasPassword status', async () => {
      (usersApi.hasPassword as jest.Mock).mockResolvedValue({
        data: { success: true, hasPassword: true },
      });

      const { result } = renderHook(() => useHasPassword(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(true);
    });

    it('should return false when user has no password', async () => {
      (usersApi.hasPassword as jest.Mock).mockResolvedValue({
        data: { success: true, hasPassword: false },
      });

      const { result } = renderHook(() => useHasPassword(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(false);
    });
  });

  describe('useSetPassword', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() => useSetPassword(), { wrapper: createWrapper() });

      expect(result.current.setPassword).toBeDefined();
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.reset).toBeDefined();
    });

    it('should call usersApi.setPassword on mutate', async () => {
      (usersApi.setPassword as jest.Mock).mockResolvedValue({
        data: { success: true },
      });

      const { result } = renderHook(() => useSetPassword(), { wrapper: createWrapper() });

      await result.current.setPassword({ newPassword: 'newPassword123' });

      expect(usersApi.setPassword).toHaveBeenCalledWith({ newPassword: 'newPassword123' });
    });

    it('should set isSuccess to true on success', async () => {
      (usersApi.setPassword as jest.Mock).mockResolvedValue({
        data: { success: true },
      });

      const { result } = renderHook(() => useSetPassword(), { wrapper: createWrapper() });

      await result.current.setPassword({ newPassword: 'newPassword123' });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should throw error when response is not successful', async () => {
      (usersApi.setPassword as jest.Mock).mockResolvedValue({
        data: { success: false, message: 'Password too weak' },
      });

      const { result } = renderHook(() => useSetPassword(), { wrapper: createWrapper() });

      await expect(result.current.setPassword({ newPassword: '123' })).rejects.toThrow(
        'Password too weak'
      );
    });
  });
});
