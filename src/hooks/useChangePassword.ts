import { useMutation, useQuery } from '@tanstack/react-query';
import { usersApi, ChangePasswordData, SetPasswordData } from '@/services/api';

interface UseChangePasswordReturn {
  changePassword: (data: ChangePasswordData) => Promise<void>;
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
  reset: () => void;
}

export function useChangePassword(): UseChangePasswordReturn {
  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordData): Promise<void> => {
      const response = await usersApi.changePassword(data);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to change password');
      }
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

export function useHasPassword() {
  return useQuery({
    queryKey: ['hasPassword'],
    queryFn: async () => {
      const response = await usersApi.hasPassword();
      return response.data.hasPassword;
    },
  });
}

interface UseSetPasswordReturn {
  setPassword: (data: SetPasswordData) => Promise<void>;
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
  reset: () => void;
}

export function useSetPassword(): UseSetPasswordReturn {
  const mutation = useMutation({
    mutationFn: async (data: SetPasswordData): Promise<void> => {
      const response = await usersApi.setPassword(data);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to set password');
      }
    },
  });

  return {
    setPassword: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

export default useChangePassword;
