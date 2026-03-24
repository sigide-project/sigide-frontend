import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMyItems, MY_ITEMS_QUERY_KEY } from '@/hooks/useMyItems';
import { itemsApi } from '@/services';
import React from 'react';

jest.mock('@/services', () => ({
  itemsApi: {
    getMyItems: jest.fn(),
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

describe('useMyItems', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    (itemsApi.getMyItems as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useMyItems(), { wrapper: createWrapper() });

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.refetch).toBeDefined();
  });

  it('should fetch my items', async () => {
    const mockItems = [
      { id: '1', title: 'My Item 1' },
      { id: '2', title: 'My Item 2' },
    ];
    (itemsApi.getMyItems as jest.Mock).mockResolvedValue({
      data: { success: true, items: mockItems },
    });

    const { result } = renderHook(() => useMyItems(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.items).toEqual(mockItems);
    expect(itemsApi.getMyItems).toHaveBeenCalled();
  });

  it('should return empty array when no items', async () => {
    (itemsApi.getMyItems as jest.Mock).mockResolvedValue({
      data: { success: true, items: [] },
    });

    const { result } = renderHook(() => useMyItems(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.items).toEqual([]);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch items');
    (itemsApi.getMyItems as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useMyItems(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should provide refetch function', async () => {
    (itemsApi.getMyItems as jest.Mock).mockResolvedValue({
      data: { success: true, items: [] },
    });

    const { result } = renderHook(() => useMyItems(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should return items with null data', async () => {
    (itemsApi.getMyItems as jest.Mock).mockResolvedValue({
      data: { success: true, items: null },
    });

    const { result } = renderHook(() => useMyItems(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.items).toEqual([]);
  });

  describe('Query key', () => {
    it('should have correct MY_ITEMS_QUERY_KEY', () => {
      expect(MY_ITEMS_QUERY_KEY).toBe('my-items');
    });
  });
});
