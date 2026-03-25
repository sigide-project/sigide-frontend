import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { claimsApi } from '@/services';
import type { Claim, CreateClaimData } from '@/types';

export const CLAIMS_QUERY_KEY = 'claims';
export const CLAIM_QUERY_KEY = 'claim';
export const CLAIMS_MINE_QUERY_KEY = 'claims-mine';
export const CLAIMS_ON_MY_ITEMS_QUERY_KEY = 'claims-on-my-items';

export function useClaims() {
  return useQuery<Claim[]>({
    queryKey: [CLAIMS_QUERY_KEY],
    queryFn: () => claimsApi.getMyClaims().then((res) => res.data.claims),
    staleTime: 1000 * 60 * 2,
  });
}

export function useClaim(id: string | undefined) {
  return useQuery<Claim>({
    queryKey: [CLAIM_QUERY_KEY, id],
    queryFn: () => claimsApi.getClaim(id!).then((res) => res.data.claim),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
}

export function useMyClaims() {
  return useQuery<Claim[]>({
    queryKey: [CLAIMS_MINE_QUERY_KEY],
    queryFn: () => claimsApi.getMyClaims().then((res) => res.data.claims),
    staleTime: 1000 * 60 * 2,
  });
}

export function useClaimsOnMyItems() {
  return useQuery<Claim[]>({
    queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY],
    queryFn: () => claimsApi.getClaimsOnMyItems().then((res) => res.data.claims),
    staleTime: 1000 * 60 * 2,
  });
}

export function useClaimSubmit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClaimData) =>
      claimsApi.submitClaim(data).then((res) => res.data.claim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_MINE_QUERY_KEY] });
    },
  });
}

export function useCreateClaim() {
  return useClaimSubmit();
}

export function useUpdateClaimStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      if (status === 'accepted') return claimsApi.acceptClaim(id).then((res) => res.data.claim);
      if (status === 'rejected') return claimsApi.rejectClaim(id).then((res) => res.data.claim);
      return claimsApi.resolveClaim(id).then((res) => res.data.claim);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLAIM_QUERY_KEY, variables.id] });
    },
  });
}

export function useAcceptClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      claimsApi.acceptClaim(id).then((res) => res.data.claim),
    onSuccess: (_data, _id) => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY] });
    },
  });
}

export function useRejectClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      claimsApi.rejectClaim(id).then((res) => res.data.claim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY] });
    },
  });
}

export function useResolveClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      claimsApi.resolveClaim(id).then((res) => res.data.claim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLAIMS_MINE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLAIMS_ON_MY_ITEMS_QUERY_KEY] });
    },
  });
}
