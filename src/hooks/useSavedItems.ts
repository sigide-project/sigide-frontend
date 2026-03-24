import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  savedItemsApi,
  SavedItemsResponse,
  SavedItemIdsResponse,
  SavedStatusResponse,
} from '@/services';
import type { Item, Pagination } from '@/types';
import type { AxiosResponse } from 'axios';

export const SAVED_ITEMS_QUERY_KEY = 'savedItems';
export const SAVED_ITEM_IDS_QUERY_KEY = 'savedItemIds';

export function useSavedItems(page = 1, limit = 20) {
  return useQuery<{ items: Item[]; pagination: Pagination }>({
    queryKey: [SAVED_ITEMS_QUERY_KEY, { page, limit }],
    queryFn: () =>
      savedItemsApi.getSavedItems(page, limit).then((res: AxiosResponse<SavedItemsResponse>) => ({
        items: res.data.data,
        pagination: res.data.pagination,
      })),
    staleTime: 1000 * 60 * 2,
  });
}

export function useSavedItemIds() {
  return useQuery<string[]>({
    queryKey: [SAVED_ITEM_IDS_QUERY_KEY],
    queryFn: () =>
      savedItemsApi
        .getSavedItemIds()
        .then((res: AxiosResponse<SavedItemIdsResponse>) => res.data.data),
    staleTime: 1000 * 60 * 2,
  });
}

export function useIsItemSaved(itemId: string | undefined) {
  const { data: savedIds = [] } = useSavedItemIds();
  return itemId ? savedIds.includes(itemId) : false;
}

export function useSaveItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) =>
      savedItemsApi.saveItem(itemId).then((res: AxiosResponse<SavedStatusResponse>) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SAVED_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [SAVED_ITEM_IDS_QUERY_KEY] });
    },
  });
}

export function useUnsaveItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) =>
      savedItemsApi.unsaveItem(itemId).then((res: AxiosResponse<SavedStatusResponse>) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SAVED_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [SAVED_ITEM_IDS_QUERY_KEY] });
    },
  });
}

export function useToggleSaveItem() {
  const { mutateAsync: saveItem, isPending: isSaving } = useSaveItem();
  const { mutateAsync: unsaveItem, isPending: isUnsaving } = useUnsaveItem();

  const toggleSave = async (itemId: string, isSaved: boolean) => {
    if (isSaved) {
      await unsaveItem(itemId);
    } else {
      await saveItem(itemId);
    }
  };

  return {
    toggleSave,
    isPending: isSaving || isUnsaving,
  };
}
