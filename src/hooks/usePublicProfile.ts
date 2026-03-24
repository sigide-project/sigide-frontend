import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/services/api';
import type { PublicUserProfile } from '@/types';

export const PUBLIC_PROFILE_QUERY_KEY = 'publicProfile';

export function usePublicProfile(username: string | undefined) {
  return useQuery<PublicUserProfile | null>({
    queryKey: [PUBLIC_PROFILE_QUERY_KEY, username],
    queryFn: async () => {
      if (!username) return null;
      const response = await usersApi.getPublicProfile(username);
      return response.data.user ?? null;
    },
    enabled: !!username,
  });
}

export function useCheckUsername(username: string | undefined, enabled: boolean = true) {
  return useQuery<boolean>({
    queryKey: ['checkUsername', username],
    queryFn: async () => {
      if (!username) return false;
      const response = await usersApi.checkUsernameAvailability(username);
      return response.data.available;
    },
    enabled: enabled && !!username && username.length >= 3,
  });
}
