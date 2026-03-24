import type { ItemOwner } from './user.types';

export type ItemType = 'lost' | 'found';

export type ItemStatus = 'open' | 'claimed' | 'resolved' | 'expired';

export type ItemCategory =
  | 'electronics'
  | 'wallet'
  | 'keys'
  | 'documents'
  | 'bags'
  | 'jewellery'
  | 'pets'
  | 'clothing'
  | 'accessories'
  | 'other';

export type ItemSortBy = 'createdAt' | 'reward_amount' | 'distance' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface Item {
  id: string;
  user_id: string;
  type: ItemType;
  status: ItemStatus;
  title: string;
  description: string;
  category: string;
  image_urls: string[];
  location_name: string;
  reward_amount: string;
  lost_found_at: string;
  createdAt: string;
  updatedAt: string;
  owner: ItemOwner;
  distance?: number;
}

export interface ItemsQueryParams {
  lat?: number;
  lng?: number;
  radius?: number;
  minDistance?: number;
  maxDistance?: number;
  type?: ItemType | null;
  category?: string | null;
  tags?: string[];
  search?: string;
  sortBy?: ItemSortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export interface CreateItemData {
  type: ItemType;
  title: string;
  description: string;
  category: string;
  lat?: number | null;
  lng?: number | null;
  location_name: string;
  image_urls?: string[];
  reward_amount?: number;
  lost_found_at: string;
}

export interface UpdateItemData extends Partial<CreateItemData> {
  status?: ItemStatus;
}

export interface MyItemsResponse {
  items: Item[];
}

export const ITEM_CATEGORIES: { value: ItemCategory; label: string }[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'keys', label: 'Keys' },
  { value: 'documents', label: 'Documents' },
  { value: 'bags', label: 'Bags' },
  { value: 'jewellery', label: 'Jewellery' },
  { value: 'pets', label: 'Pets' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'other', label: 'Other' },
];
