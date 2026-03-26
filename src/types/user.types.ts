export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar_url?: string | null;
  address?: string | null;
  roles?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ItemOwner {
  id: string;
  username: string;
  name: string;
  avatar_url: string | null;
}

export interface PublicUserProfile {
  id: string;
  username: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  createdAt: string;
  itemsCount: number;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  avatar_url?: string;
  username?: string;
  address?: string;
}
