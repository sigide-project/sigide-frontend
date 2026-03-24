export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp?: number;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export interface UseGeolocationReturn {
  location: GeoLocation | null;
  error: GeolocationPositionError | Error | null;
  isLoading: boolean;
  refresh: () => void;
  isSupported: boolean;
}
