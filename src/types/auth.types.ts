import type { User } from './user.types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  success?: boolean;
  data?: {
    user: User;
    token: string;
  };
  user?: User;
  token?: string;
}
