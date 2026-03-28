import { useMutation } from '@tanstack/react-query';
import { usersApi } from '@/services/api';

export function useDeleteAccount() {
  const mutation = useMutation({
    mutationFn: async (): Promise<void> => {
      const response = await usersApi.deleteAccount();
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete account');
      }
    },
  });

  return {
    deleteAccount: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

export default useDeleteAccount;
