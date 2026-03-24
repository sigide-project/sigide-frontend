import type { Item } from './item.types';
import type { User } from './user.types';

export type ClaimStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Claim {
  id: string;
  item_id: string;
  item?: Item;
  claimant_id: string;
  claimant?: User;
  status: ClaimStatus;
  proof_description: string;
  proof_photos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateClaimData {
  proof_description: string;
  proof_photos?: string[];
}
