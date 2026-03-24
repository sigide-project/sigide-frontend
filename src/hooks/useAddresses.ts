import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressesApi } from '@/services/api';
import type { CreateAddressData, UpdateAddressData } from '@/types';

export const ADDRESSES_QUERY_KEY = 'addresses';

export function useAddresses() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [ADDRESSES_QUERY_KEY],
    queryFn: async () => {
      const response = await addressesApi.getAddresses();
      return response.data.data || [];
    },
  });

  return {
    addresses: data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateAddressData) => {
      const response = await addressesApi.createAddress(data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADDRESSES_QUERY_KEY] });
    },
  });

  return {
    createAddress: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateAddressData }) => {
      const response = await addressesApi.updateAddress(id, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADDRESSES_QUERY_KEY] });
    },
  });

  return {
    updateAddress: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await addressesApi.deleteAddress(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADDRESSES_QUERY_KEY] });
    },
  });

  return {
    deleteAddress: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await addressesApi.setDefaultAddress(id);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADDRESSES_QUERY_KEY] });
    },
  });

  return {
    setDefaultAddress: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
