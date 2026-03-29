import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/services';

export const STATS_QUERY_KEY = ['stats'] as const;

export function useStats() {
  return useQuery({
    queryKey: STATS_QUERY_KEY,
    queryFn: () => statsApi.getPublicStats().then((res) => res.data.data),
    staleTime: 5 * 60 * 1000,
  });
}
