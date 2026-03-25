import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type {
  Item,
  Claim,
  Message,
  ApiResponse,
  Pagination,
  ItemsQueryParams,
  CreateItemData,
  UpdateItemData,
  CreateClaimData,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  UpdateUserData,
  MyItemsResponse,
  UploadResponse,
  Address,
  CreateAddressData,
  UpdateAddressData,
  PublicUserProfile,
  MessagesResponse,
  Notification,
  NotificationsResponse,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

interface AuthStorageState {
  state: {
    token?: string;
  };
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      try {
        const { state } = JSON.parse(authData) as AuthStorageState;
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch {
        // Invalid JSON in storage, ignore
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const publicPaths = ['/login', '/register', '/auth/callback'];
      if (!publicPaths.includes(currentPath)) {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface ItemsApiResponse {
  success: boolean;
  data: Item[];
  pagination: Pagination;
}

export const itemsApi = {
  getItems: (params: ItemsQueryParams): Promise<AxiosResponse<ItemsApiResponse>> => {
    const queryParams: Record<string, any> = { ...params };
    if (params.tags && params.tags.length > 0) {
      queryParams.tags = params.tags.join(',');
    }
    return api.get('/items', { params: queryParams });
  },

  getMyItems: (): Promise<AxiosResponse<MyItemsResponse>> => api.get('/items/mine'),

  getItem: (id: string): Promise<AxiosResponse<ApiResponse<Item>>> => api.get(`/items/${id}`),

  createItem: (data: CreateItemData): Promise<AxiosResponse<ApiResponse<Item>>> =>
    api.post('/items', data),

  updateItem: (id: string, data: UpdateItemData): Promise<AxiosResponse<ApiResponse<Item>>> =>
    api.patch(`/items/${id}`, data),

  deleteItem: (id: string): Promise<AxiosResponse<void>> => api.delete(`/items/${id}`),

  uploadPhoto: (file: File): Promise<AxiosResponse<ApiResponse<{ url: string }>>> => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post('/items/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const claimsApi = {
  submitClaim: (data: CreateClaimData): Promise<AxiosResponse<{ success: boolean; claim: Claim }>> =>
    api.post('/claims', data),

  getMyClaims: (): Promise<AxiosResponse<{ success: boolean; claims: Claim[] }>> =>
    api.get('/claims/mine'),

  getClaimsOnMyItems: (): Promise<AxiosResponse<{ success: boolean; claims: Claim[] }>> =>
    api.get('/claims/on-my-items'),

  getClaim: (id: string): Promise<AxiosResponse<{ success: boolean; claim: Claim }>> =>
    api.get(`/claims/${id}`),

  acceptClaim: (id: string): Promise<AxiosResponse<{ success: boolean; claim: Claim }>> =>
    api.patch(`/claims/${id}/accept`),

  rejectClaim: (id: string): Promise<AxiosResponse<{ success: boolean; claim: Claim }>> =>
    api.patch(`/claims/${id}/reject`),

  resolveClaim: (id: string): Promise<AxiosResponse<{ success: boolean; claim: Claim }>> =>
    api.patch(`/claims/${id}/resolve`),
};

export const messagesApi = {
  getMessages: (claimId: string): Promise<AxiosResponse<MessagesResponse>> =>
    api.get(`/messages/${claimId}`),

  sendMessage: (claimId: string, content: string): Promise<AxiosResponse<{ success: boolean; message: Message }>> =>
    api.post(`/messages/${claimId}`, { content }),
};

export const notificationsApi = {
  getAll: (): Promise<AxiosResponse<NotificationsResponse>> =>
    api.get('/notifications'),

  markRead: (id: string): Promise<AxiosResponse<{ success: boolean; notification: Notification }>> =>
    api.patch(`/notifications/${id}/read`),

  markAllRead: (): Promise<AxiosResponse<{ success: boolean; updated: number }>> =>
    api.patch('/notifications/read-all'),
};

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/login', credentials),

  register: (userData: RegisterData): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/register', userData),

  logout: (): Promise<AxiosResponse<ApiResponse<void>>> => api.post('/auth/logout'),

  getMe: (): Promise<AxiosResponse<ApiResponse<User>>> => api.get('/users/me'),

  getMeWithToken: (token: string): Promise<AxiosResponse<ApiResponse<User>>> =>
    api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface SetPasswordData {
  newPassword: string;
}

export const usersApi = {
  updateMe: (data: UpdateUserData): Promise<AxiosResponse<ApiResponse<User>>> =>
    api.patch('/users/me', data),

  changePassword: (data: ChangePasswordData): Promise<AxiosResponse<ApiResponse<void>>> =>
    api.post('/users/me/change-password', data),

  hasPassword: (): Promise<AxiosResponse<{ success: boolean; hasPassword: boolean }>> =>
    api.get('/users/me/has-password'),

  setPassword: (data: SetPasswordData): Promise<AxiosResponse<ApiResponse<void>>> =>
    api.post('/users/me/set-password', data),

  getPublicProfile: (
    username: string
  ): Promise<AxiosResponse<{ success: boolean; user: PublicUserProfile }>> =>
    api.get(`/users/profile/${username}`),

  checkUsernameAvailability: (
    username: string
  ): Promise<AxiosResponse<{ success: boolean; available: boolean }>> =>
    api.get(`/users/check-username/${username}`),
};

export const uploadsApi = {
  uploadImage: (file: File): Promise<AxiosResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (url: string): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return api.delete('/uploads', { data: { url } });
  },
};

export const addressesApi = {
  getAddresses: (): Promise<AxiosResponse<ApiResponse<Address[]>>> => api.get('/addresses'),

  getAddress: (id: string): Promise<AxiosResponse<ApiResponse<Address>>> =>
    api.get(`/addresses/${id}`),

  createAddress: (data: CreateAddressData): Promise<AxiosResponse<ApiResponse<Address>>> =>
    api.post('/addresses', data),

  updateAddress: (
    id: string,
    data: UpdateAddressData
  ): Promise<AxiosResponse<ApiResponse<Address>>> => api.patch(`/addresses/${id}`, data),

  deleteAddress: (id: string): Promise<AxiosResponse<ApiResponse<void>>> =>
    api.delete(`/addresses/${id}`),

  setDefaultAddress: (id: string): Promise<AxiosResponse<ApiResponse<Address>>> =>
    api.post(`/addresses/${id}/default`),
};

export interface SavedItemsResponse {
  success: boolean;
  data: Item[];
  pagination: Pagination;
}

export interface SavedItemIdsResponse {
  success: boolean;
  data: string[];
}

export interface SavedStatusResponse {
  success: boolean;
  data: { saved: boolean };
}

export const savedItemsApi = {
  getSavedItems: (page?: number, limit?: number): Promise<AxiosResponse<SavedItemsResponse>> => {
    const params: Record<string, number> = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return api.get('/saved-items', { params });
  },

  getSavedItemIds: (): Promise<AxiosResponse<SavedItemIdsResponse>> => api.get('/saved-items/ids'),

  checkSaved: (itemId: string): Promise<AxiosResponse<SavedStatusResponse>> =>
    api.get(`/saved-items/${itemId}/check`),

  saveItem: (itemId: string): Promise<AxiosResponse<SavedStatusResponse>> =>
    api.post(`/saved-items/${itemId}`),

  unsaveItem: (itemId: string): Promise<AxiosResponse<SavedStatusResponse>> =>
    api.delete(`/saved-items/${itemId}`),
};

export default api;
