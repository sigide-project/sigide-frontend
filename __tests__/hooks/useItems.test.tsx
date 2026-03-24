import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useItems,
  useItem,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
  useUploadPhoto,
  ITEMS_QUERY_KEY,
  ITEM_QUERY_KEY,
} from '@/hooks/useItems';
import { itemsApi } from '@/services';
import React from 'react';

jest.mock('@/services', () => ({
  itemsApi: {
    getItems: jest.fn(),
    getItem: jest.fn(),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
    uploadPhoto: jest.fn(),
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

describe('useItems hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useItems', () => {
    it('should fetch items with default params', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [{ id: '1', title: 'Test Item' }],
          pagination: { page: 1, limit: 20, total: 1 },
        },
      };
      (itemsApi.getItems as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(itemsApi.getItems).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, limit: 20 })
      );
    });

    it('should fetch items with custom params', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: { page: 2, limit: 10, total: 0 },
        },
      };
      (itemsApi.getItems as jest.Mock).mockResolvedValue(mockResponse);

      const params = {
        lat: 37.7749,
        lng: -122.4194,
        radius: 10,
        type: 'lost' as const,
        category: 'electronics',
        search: 'phone',
        page: 2,
        limit: 10,
      };

      const { result } = renderHook(() => useItems(params), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(itemsApi.getItems).toHaveBeenCalledWith(expect.objectContaining(params));
    });

    it('should return data on success', async () => {
      const mockItems = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
      ];
      const mockResponse = {
        data: {
          success: true,
          data: mockItems,
          pagination: { page: 1, limit: 20, total: 2 },
        },
      };
      (itemsApi.getItems as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.data?.data).toEqual(mockItems);
      });
    });
  });

  describe('useItem', () => {
    it('should not fetch when id is undefined', () => {
      const { result } = renderHook(() => useItem(undefined), { wrapper: createWrapper() });

      expect(result.current.isFetching).toBe(false);
      expect(itemsApi.getItem).not.toHaveBeenCalled();
    });

    it('should fetch item when id is provided', async () => {
      const mockItem = { id: '123', title: 'Test Item' };
      (itemsApi.getItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockItem },
      });

      const { result } = renderHook(() => useItem('123'), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(itemsApi.getItem).toHaveBeenCalledWith('123');
      expect(result.current.data).toEqual(mockItem);
    });
  });

  describe('useCreateItem', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useCreateItem(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    it('should call itemsApi.createItem on mutate', async () => {
      const mockItem = { id: '1', title: 'New Item' };
      (itemsApi.createItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockItem },
      });

      const { result } = renderHook(() => useCreateItem(), { wrapper: createWrapper() });

      const itemData = {
        title: 'New Item',
        description: 'Description',
        type: 'lost' as const,
        category: 'electronics',
        location_name: 'Test Location',
        lost_found_at: new Date().toISOString(),
      };

      await result.current.mutateAsync(itemData);

      expect(itemsApi.createItem).toHaveBeenCalledWith(itemData);
    });
  });

  describe('useUpdateItem', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useUpdateItem(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
    });

    it('should call itemsApi.updateItem on mutate', async () => {
      const mockItem = { id: '1', title: 'Updated Item' };
      (itemsApi.updateItem as jest.Mock).mockResolvedValue({
        data: { success: true, data: mockItem },
      });

      const { result } = renderHook(() => useUpdateItem(), { wrapper: createWrapper() });

      await result.current.mutateAsync({ id: '1', data: { title: 'Updated Item' } });

      expect(itemsApi.updateItem).toHaveBeenCalledWith('1', { title: 'Updated Item' });
    });
  });

  describe('useDeleteItem', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useDeleteItem(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
    });

    it('should call itemsApi.deleteItem on mutate', async () => {
      (itemsApi.deleteItem as jest.Mock).mockResolvedValue({ data: undefined });

      const { result } = renderHook(() => useDeleteItem(), { wrapper: createWrapper() });

      await result.current.mutateAsync('123');

      expect(itemsApi.deleteItem).toHaveBeenCalledWith('123');
    });
  });

  describe('useUploadPhoto', () => {
    it('should return mutation object', () => {
      const { result } = renderHook(() => useUploadPhoto(), { wrapper: createWrapper() });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutateAsync).toBeDefined();
    });

    it('should call itemsApi.uploadPhoto on mutate', async () => {
      const mockUrl = 'http://example.com/photo.jpg';
      (itemsApi.uploadPhoto as jest.Mock).mockResolvedValue({
        data: { success: true, data: { url: mockUrl } },
      });

      const { result } = renderHook(() => useUploadPhoto(), { wrapper: createWrapper() });

      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      await result.current.mutateAsync(file);

      expect(itemsApi.uploadPhoto).toHaveBeenCalledWith(file);
    });
  });

  describe('Query keys', () => {
    it('should have correct ITEMS_QUERY_KEY', () => {
      expect(ITEMS_QUERY_KEY).toBe('items');
    });

    it('should have correct ITEM_QUERY_KEY', () => {
      expect(ITEM_QUERY_KEY).toBe('item');
    });
  });
});
