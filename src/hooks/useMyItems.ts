import { useQuery } from '@tanstack/react-query';
import { itemsApi } from '@/services';
import type { Item } from '@/types';

export const MY_ITEMS_QUERY_KEY = 'my-items';

interface UseMyItemsReturn {
  items: Item[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useMyItems(): UseMyItemsReturn {
  const query = useQuery({
    queryKey: [MY_ITEMS_QUERY_KEY],
    queryFn: () => itemsApi.getMyItems().then((res) => res.data.items),
    staleTime: 1000 * 60 * 2,
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useMyItems;
