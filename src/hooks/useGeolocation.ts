import { useState, useEffect, useCallback, useMemo } from 'react';
import type { GeoLocation, GeolocationOptions, UseGeolocationReturn } from '@/types';
import { GEOLOCATION_OPTIONS } from '@/constants';

export function useGeolocation(options: GeolocationOptions = {}): UseGeolocationReturn {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<GeolocationPositionError | Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { enableHighAccuracy, timeout, maximumAge } = options;

  const mergedOptions = useMemo(
    () => ({
      enableHighAccuracy: enableHighAccuracy ?? GEOLOCATION_OPTIONS.enableHighAccuracy,
      timeout: timeout ?? GEOLOCATION_OPTIONS.timeout,
      maximumAge: maximumAge ?? GEOLOCATION_OPTIONS.maximumAge,
    }),
    [enableHighAccuracy, timeout, maximumAge]
  );

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation is not supported by your browser'));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
      mergedOptions
    );
  }, [mergedOptions]);

  useEffect(() => {
    getCurrentPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return {
    location,
    error,
    isLoading,
    refresh,
    isSupported: !!navigator.geolocation,
  };
}

export default useGeolocation;
