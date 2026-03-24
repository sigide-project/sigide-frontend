import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/services';
import { useAuthStore } from '@/store';
import { normalizeUser, type ApiUser } from '@/utils';
import type { UpdateUserData, User } from '@/types';
import { AUTH_QUERY_KEY } from './useAuth';

interface UseUpdateProfileReturn {
  updateProfile: (data: UpdateUserData) => void;
  updateProfileAsync: (data: UpdateUserData) => Promise<User>;
  isPending: boolean;
  error: Error | null;
}

export function useUpdateProfile(): UseUpdateProfileReturn {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateUserData): Promise<User> => {
      const res = await usersApi.updateMe(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = res.data as any;

      let apiUser: ApiUser;
      if (responseData?.data?.user) {
        apiUser = responseData.data.user;
      } else if (responseData?.data) {
        apiUser = responseData.data;
      } else if (responseData?.user) {
        apiUser = responseData.user;
      } else {
        apiUser = responseData;
      }

      return normalizeUser(apiUser);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY, 'me'] });
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export default useUpdateProfile;
