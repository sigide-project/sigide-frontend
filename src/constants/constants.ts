import type { ItemType, ClaimStatus, GeoLocation } from '@/types';

export const ITEM_TYPES: Record<ItemType, ItemType> = {
  lost: 'lost',
  found: 'found',
} as const;

export const CLAIM_STATUS: Record<ClaimStatus, ClaimStatus> = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  resolved: 'resolved',
  disputed: 'disputed',
} as const;

export const DEFAULT_RADIUS_KM = 10;
export const MAX_RADIUS_KM = 50;
export const MIN_RADIUS_KM = 1;

export const DEFAULT_CENTER: Pick<GeoLocation, 'lat' | 'lng'> = {
  lat: 37.7749,
  lng: -122.4194,
};

export const POLLING_INTERVAL_MS = 3000;

export const API_STALE_TIMES = {
  SHORT: 1000 * 60 * 2, // 2 minutes
  MEDIUM: 1000 * 60 * 5, // 5 minutes
  LONG: 1000 * 60 * 10, // 10 minutes
} as const;

export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000 * 60 * 5, // 5 minutes
} as const;
