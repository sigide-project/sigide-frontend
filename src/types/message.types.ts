import type { User } from './user.types';

export interface Message {
  id: string;
  claim_id: string;
  sender_id: string;
  sender?: User;
  content: string;
  read_at?: string | null;
  createdAt: string;
}

export interface ClaimParty {
  id: string;
  name: string;
  avatar_url: string | null;
  rating?: number;
}

export interface MessagesResponse {
  success: boolean;
  messages: Message[];
  claim: {
    id: string;
    status: string;
    item: {
      id: string;
      title: string;
      type: string;
      status: string;
      location_name?: string;
      image_urls?: string[];
    };
    claimant: ClaimParty;
    owner: ClaimParty;
  };
  contact?: {
    phone: string | null;
    address: string | null;
  } | null;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  payload: Record<string, unknown>;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  unread_count: number;
}
