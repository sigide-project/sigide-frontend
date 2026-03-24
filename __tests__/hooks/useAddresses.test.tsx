import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
  ADDRESSES_QUERY_KEY,
} from '@/hooks/useAddresses';
import { addressesApi } from '@/services/api';
import React from 'react';

jest.mock('@/services/api', () => ({
  addressesApi: {
    getAddresses: jest.fn(),
    createAddress: jest.fn(),
    updateAddress: jest.fn(),
    deleteAddress: jest.fn(),
    setDefaultAddress: jest.fn(),
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

describe('useAddresses hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useAddresses', () => {
    it('should fetch addresses', async () => {
      const mockAddresses = [
        { id: '1', label: 'Home', street: '123 Main St' },
        { id: '2', label: 'Work', street: '456 Office Blvd' },
      ];
      (addressesApi.getAddresses as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockAddresses },
      });

      const { result } = renderHook(() => useAddresses(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.addresses).toEqual(mockAddresses);
    });

    it('should return empty array when no addresses', async () => {
      (addressesApi.getAddresses as jest.Mock).mockResolvedValue({
        data: { success: true, data: null },
      });

      const { result } = renderHook(() => useAddresses(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.addresses).toEqual([]);
    });

    it('should handle error state', async () => {
      (addressesApi.getAddresses as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

      const { result } = renderHook(() => useAddresses(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });

    it('should provide refetch function', async () => {
      (addressesApi.getAddresses as jest.Mock).mockResolvedValue({
        data: { success: true, data: [] },
      });

      const { result } = renderHook(() => useAddresses(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.refetch).toBeDefined();
    });
  });

  describe('useCreateAddress', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useCreateAddress(), { wrapper: createWrapper() });

      expect(result.current.createAddress).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call addressesApi.createAddress on mutate', async () => {
      const mockAddress = { id: '1', label: 'Home', street: '123 Main St' };
      (addressesApi.createAddress as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockAddress },
      });

      const { result } = renderHook(() => useCreateAddress(), { wrapper: createWrapper() });

      const addressData = {
        label: 'Home',
        address_line1: '123 Main St',
        city: 'Test City',
        state: 'CA',
        postal_code: '12345',
        country: 'USA',
      };

      await result.current.createAddress(addressData);

      expect(addressesApi.createAddress).toHaveBeenCalledWith(addressData);
    });
  });

  describe('useUpdateAddress', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useUpdateAddress(), { wrapper: createWrapper() });

      expect(result.current.updateAddress).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call addressesApi.updateAddress on mutate', async () => {
      const mockAddress = { id: '1', label: 'Work', street: '123 Main St' };
      (addressesApi.updateAddress as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockAddress },
      });

      const { result } = renderHook(() => useUpdateAddress(), { wrapper: createWrapper() });

      await result.current.updateAddress({ id: '1', data: { label: 'Work' } });

      expect(addressesApi.updateAddress).toHaveBeenCalledWith('1', { label: 'Work' });
    });
  });

  describe('useDeleteAddress', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useDeleteAddress(), { wrapper: createWrapper() });

      expect(result.current.deleteAddress).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call addressesApi.deleteAddress on mutate', async () => {
      (addressesApi.deleteAddress as jest.Mock).mockResolvedValue({
        data: { success: true },
      });

      const { result } = renderHook(() => useDeleteAddress(), { wrapper: createWrapper() });

      await result.current.deleteAddress('123');

      expect(addressesApi.deleteAddress).toHaveBeenCalledWith('123');
    });
  });

  describe('useSetDefaultAddress', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useSetDefaultAddress(), { wrapper: createWrapper() });

      expect(result.current.setDefaultAddress).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call addressesApi.setDefaultAddress on mutate', async () => {
      const mockAddress = { id: '1', label: 'Home', isDefault: true };
      (addressesApi.setDefaultAddress as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockAddress },
      });

      const { result } = renderHook(() => useSetDefaultAddress(), { wrapper: createWrapper() });

      await result.current.setDefaultAddress('1');

      expect(addressesApi.setDefaultAddress).toHaveBeenCalledWith('1');
    });
  });

  describe('Query key', () => {
    it('should have correct ADDRESSES_QUERY_KEY', () => {
      expect(ADDRESSES_QUERY_KEY).toBe('addresses');
    });
  });
});
