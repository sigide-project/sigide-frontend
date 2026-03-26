import type { Item } from './item.types';
import type { User } from './user.types';

export type ClaimStatus = 'pending' | 'accepted' | 'rejected' | 'resolved' | 'disputed';

export interface Claim {
  id: string;
  item_id: string;
  item?: Item;
  claimant_id: string;
  claimant?: User;
  status: ClaimStatus;
  proof_description: string;
  proof_images?: string[];
  resolved_at?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClaimData {
  item_id: string;
  proof_description: string;
  proof_images?: string[];
}

export interface ChatSummary {
  claim_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'resolved';
  item: {
    id: string;
    title: string;
    type: 'lost' | 'found';
    status: string;
    thumbnail_url: string | null;
    location_name: string;
  };
  other_party: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  last_message: {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
  } | null;
  unread_count: number;
}

export interface MyChatsResponse {
  success: boolean;
  chats: ChatSummary[];
}
