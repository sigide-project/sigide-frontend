import type { User } from './user.types';

export interface Message {
  id: string;
  claim_id: string;
  sender_id: string;
  sender?: User;
  content: string;
  createdAt: string;
}
