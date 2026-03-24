import { renderHook, act, waitFor } from '@testing-library/react';
import { useGeolocation } from '@/hooks/useGeolocation';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};

describe('useGeolocation', () => {
  const originalGeolocation = navigator.geolocation;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeolocation,
      writable: true,
      configurable: true,
    });
  });

  it('should return initial state', () => {
    mockGeolocation.getCurrentPosition.mockImplementation(() => {});

    const { result } = renderHook(() => useGeolocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSupported).toBe(true);
  });

  it('should set location on success', async () => {
    const mockPosition = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 10,
      },
      timestamp: Date.now(),
    };

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toEqual({
      lat: 37.7749,
      lng: -122.4194,
      accuracy: 10,
      timestamp: mockPosition.timestamp,
    });
    expect(result.current.error).toBeNull();
  });

  it('should set error on failure', async () => {
    const mockError = {
      code: 1,
      message: 'User denied geolocation',
    };

    mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
      error(mockError);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('should set error when geolocation is not supported', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Geolocation is not supported by your browser');
    expect(result.current.isSupported).toBe(false);
  });

  it('should use default options', () => {
    mockGeolocation.getCurrentPosition.mockImplementation(() => {});

    renderHook(() => useGeolocation());

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      })
    );
  });

  it('should use custom options', () => {
    mockGeolocation.getCurrentPosition.mockImplementation(() => {});

    const customOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 60000,
    };

    renderHook(() => useGeolocation(customOptions));

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining(customOptions)
    );
  });

  it('should refresh location when refresh is called', async () => {
    const mockPosition = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 10,
      },
      timestamp: Date.now(),
    };

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.refresh();
    });

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(2);
  });

  it('should handle partial custom options', () => {
    mockGeolocation.getCurrentPosition.mockImplementation(() => {});

    renderHook(() => useGeolocation({ timeout: 5000 }));

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 300000,
      })
    );
  });
});
