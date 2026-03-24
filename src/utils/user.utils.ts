import type { User } from '@/types';

export interface ApiUser {
  id: string;
  username?: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar_url?: string | null;
  roles?: string[];
  role?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export function normalizeUser(apiUser: ApiUser): User {
  const roles = apiUser.roles || (apiUser.role ? [apiUser.role] : undefined);

  return {
    id: apiUser.id,
    username: apiUser.username || apiUser.id,
    email: apiUser.email,
    name: apiUser.name,
    phone: apiUser.phone,
    avatar_url: apiUser.avatar_url,
    roles,
    createdAt: apiUser.createdAt || apiUser.created_at || '',
    updatedAt: apiUser.updatedAt || apiUser.updated_at || '',
  };
}
