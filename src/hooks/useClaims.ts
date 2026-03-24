import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { claimsApi } from '@/services';
import type { Claim, CreateClaimData, ClaimStatus } from '@/types';

export const CLAIMS_QUERY_KEY = 'claims';
export const CLAIM_QUERY_KEY = 'claim';

export function useClaims() {
  return useQuery<Claim[]>({
    queryKey: [CLAIMS_QUERY_KEY],
    queryFn: () => claimsApi.getClaims().then((res) => res.data.data),
    staleTime: 1000 * 60 * 2,
  });
}

export function useClaim(id: string | undefined) {
  return useQuery<Claim>({
    queryKey: [CLAIM_QUERY_KEY, id],
    queryFn: () => claimsApi.getClaim(id!).then((res) => res.data.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
}

interface CreateClaimVariables {
  itemId: string;
  data: CreateClaimData;
}

export function useCreateClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, data }: CreateClaimVariables) =>
      claimsApi.createClaim(itemId, data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_QUERY_KEY] });
    },
  });
}

interface UpdateClaimStatusVariables {
  id: string;
  status: ClaimStatus;
}

export function useUpdateClaimStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateClaimStatusVariables) =>
      claimsApi.updateClaimStatus(id, status).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLAIM_QUERY_KEY, variables.id] });
    },
  });
}
