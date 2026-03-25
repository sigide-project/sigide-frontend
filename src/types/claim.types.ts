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
