import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsApi, ItemsApiResponse } from '@/services';
import type { Item, ItemsQueryParams, CreateItemData, UpdateItemData } from '@/types';

export const ITEMS_QUERY_KEY = 'items';
export const ITEM_QUERY_KEY = 'item';

export function useItems(params: ItemsQueryParams = {}) {
  const {
    lat,
    lng,
    radius,
    minDistance,
    maxDistance,
    type,
    category,
    tags,
    search,
    sortBy,
    sortOrder,
    page = 1,
    limit = 20,
  } = params;

  return useQuery<ItemsApiResponse>({
    queryKey: [
      ITEMS_QUERY_KEY,
      {
        lat,
        lng,
        radius,
        minDistance,
        maxDistance,
        type,
        category,
        tags,
        search,
        sortBy,
        sortOrder,
        page,
        limit,
      },
    ],
    queryFn: () =>
      itemsApi
        .getItems({
          lat,
          lng,
          radius,
          minDistance,
          maxDistance,
          type,
          category,
          tags,
          search,
          sortBy,
          sortOrder,
          page,
          limit,
        })
        .then((res) => res.data),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });
}

export function useItem(id: string | undefined) {
  return useQuery<Item>({
    queryKey: [ITEM_QUERY_KEY, id],
    queryFn: () => itemsApi.getItem(id!).then((res) => res.data.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemData) => itemsApi.createItem(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
    },
  });
}

interface UpdateItemVariables {
  id: string;
  data: UpdateItemData;
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateItemVariables) =>
      itemsApi.updateItem(id, data).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ITEM_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => itemsApi.deleteItem(id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
    },
  });
}

export function useUploadPhoto() {
  return useMutation({
    mutationFn: (file: File) => itemsApi.uploadPhoto(file).then((res) => res.data.data),
  });
}
