import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/services';
import { useAuthStore } from '@/store';
import { normalizeUser, type ApiUser } from '@/utils';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types';

export const AUTH_QUERY_KEY = 'auth';

export function useLogin() {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authApi.login(credentials).then((res) => res.data),
    onSuccess: (data) => {
      if (data.data) {
        login(data.data.user, data.data.token);
      }
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
}

export function useRegister() {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: (userData) => authApi.register(userData).then((res) => res.data),
    onSuccess: (data) => {
      if (data.data) {
        login(data.data.user, data.data.token);
      }
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      logout();
      queryClient.clear();
    },
  });
}

export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();
  const setUser = useAuthStore.getState().setUser;

  return useQuery<User>({
    queryKey: [AUTH_QUERY_KEY, 'me'],
    queryFn: async () => {
      const res = await authApi.getMe();

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

      const user = normalizeUser(apiUser);
      setUser(user);
      return user;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
}
