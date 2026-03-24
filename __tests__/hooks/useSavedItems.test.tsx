import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useSavedItems,
  useSavedItemIds,
  useIsItemSaved,
  useSaveItem,
  useUnsaveItem,
  useToggleSaveItem,
  SAVED_ITEMS_QUERY_KEY,
  SAVED_ITEM_IDS_QUERY_KEY,
} from '@/hooks/useSavedItems';
import { savedItemsApi } from '@/services';
import React from 'react';

jest.mock('@/services', () => ({
  savedItemsApi: {
    getSavedItems: jest.fn(),
    getSavedItemIds: jest.fn(),
    checkSaved: jest.fn(),
    saveItem: jest.fn(),
    unsaveItem: jest.fn(),
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

describe('useSavedItems hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSavedItems', () => {
    it('should fetch saved items with default params', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [{ id: '1', title: 'Saved Item' }],
          pagination: { page: 1, limit: 20, total: 1 },
        },
      };
      (savedItemsApi.getSavedItems as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useSavedItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(savedItemsApi.getSavedItems).toHaveBeenCalledWith(1, 20);
    });

    it('should fetch saved items with custom params', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: { page: 2, limit: 10, total: 0 },
        },
      };
      (savedItemsApi.getSavedItems as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useSavedItems(2, 10), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(savedItemsApi.getSavedItems).toHaveBeenCalledWith(2, 10);
    });

    it('should return items and pagination', async () => {
      const mockItems = [{ id: '1', title: 'Item 1' }];
      const mockPagination = { page: 1, limit: 20, total: 1 };
      const mockResponse = {
        data: {
          success: true,
          data: mockItems,
          pagination: mockPagination,
        },
      };
      (savedItemsApi.getSavedItems as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useSavedItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.data?.items).toEqual(mockItems);
        expect(result.current.data?.pagination).toEqual(mockPagination);
      });
    });
  });

  describe('useSavedItemIds', () => {
    it('should fetch saved item ids', async () => {
      const mockIds = ['1', '2', '3'];
      (savedItemsApi.getSavedItemIds as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockIds },
      });

      const { result } = renderHook(() => useSavedItemIds(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockIds);
    });
  });

  describe('useIsItemSaved', () => {
    it('should return false when itemId is undefined', () => {
      (savedItemsApi.getSavedItemIds as jest.Mock).mockResolvedValue({
        data: { success: true, data: ['1', '2'] },
      });

      const { result } = renderHook(() => useIsItemSaved(undefined), { wrapper: createWrapper() });

      expect(result.current).toBe(false);
    });

    it('should return true when item is saved', async () => {
      (savedItemsApi.getSavedItemIds as jest.Mock).mockResolvedValue({
        data: { success: true, data: ['1', '2', '3'] },
      });

      const { result } = renderHook(() => useIsItemSaved('2'), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should return false when item is not saved', async () => {
      (savedItemsApi.getSavedItemIds as jest.Mock).mockResolvedValue({
        data: { success: true, data: ['1', '2', '3'] },
      });

      const { result } = renderHook(() => useIsItemSaved('5'), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });

  describe('useSaveItem', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useSaveItem(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call savedItemsApi.saveItem on mutate', async () => {
      (savedItemsApi.saveItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: { saved: true } },
      });

      const { result } = renderHook(() => useSaveItem(), { wrapper: createWrapper() });

      await result.current.mutateAsync('item-123');

      expect(savedItemsApi.saveItem).toHaveBeenCalledWith('item-123');
    });
  });

  describe('useUnsaveItem', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useUnsaveItem(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
    });

    it('should call savedItemsApi.unsaveItem on mutate', async () => {
      (savedItemsApi.unsaveItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: { saved: false } },
      });

      const { result } = renderHook(() => useUnsaveItem(), { wrapper: createWrapper() });

      await result.current.mutateAsync('item-123');

      expect(savedItemsApi.unsaveItem).toHaveBeenCalledWith('item-123');
    });
  });

  describe('useToggleSaveItem', () => {
    it('should return toggleSave function and isPending', () => {
      const { result } = renderHook(() => useToggleSaveItem(), { wrapper: createWrapper() });

      expect(result.current.toggleSave).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call unsaveItem when item is saved', async () => {
      (savedItemsApi.unsaveItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: { saved: false } },
      });

      const { result } = renderHook(() => useToggleSaveItem(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.toggleSave('item-123', true);
      });

      expect(savedItemsApi.unsaveItem).toHaveBeenCalledWith('item-123');
    });

    it('should call saveItem when item is not saved', async () => {
      (savedItemsApi.saveItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: { saved: true } },
      });

      const { result } = renderHook(() => useToggleSaveItem(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.toggleSave('item-123', false);
      });

      expect(savedItemsApi.saveItem).toHaveBeenCalledWith('item-123');
    });
  });

  describe('Query keys', () => {
    it('should have correct SAVED_ITEMS_QUERY_KEY', () => {
      expect(SAVED_ITEMS_QUERY_KEY).toBe('savedItems');
    });

    it('should have correct SAVED_ITEM_IDS_QUERY_KEY', () => {
      expect(SAVED_ITEM_IDS_QUERY_KEY).toBe('savedItemIds');
    });
  });
});
