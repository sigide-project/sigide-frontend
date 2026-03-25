import { useEffect } from 'react';
import { useAuthStore } from '@/store';
import { connectSocket, disconnectSocket } from '@/services';

export function useSocket() {
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && token) {
      try {
        connectSocket();
      } catch (error) {
        console.error('[useSocket] Failed to connect:', error);
      }
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, token]);
}
