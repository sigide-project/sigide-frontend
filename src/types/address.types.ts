export interface Address {
  id: string;
  user_id: string;
  label: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  lat: number | null;
  lng: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressData {
  label: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  is_default?: boolean;
  lat?: number;
  lng?: number;
}

export interface UpdateAddressData {
  label?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
  lat?: number;
  lng?: number;
}
