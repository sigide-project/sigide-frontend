import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store';

let socket: Socket | null = null;
const connectionListeners: Set<(connected: boolean) => void> = new Set();

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const notifyListeners = (connected: boolean) => {
  connectionListeners.forEach((listener) => listener(connected));
};

export const connectSocket = (): Socket => {
  if (socket?.connected) return socket;

  const token = useAuthStore.getState().token;

  if (!token) {
    console.warn('[socket] No auth token available, cannot connect');
    throw new Error('No auth token available');
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on('connect', () => {
    notifyListeners(true);
  });

  socket.on('connect_error', (err) => {
    console.error('[socket] error:', err.message);
  });

  socket.on('disconnect', () => {
    notifyListeners(false);
  });

  socket.on('reconnect', () => {
    notifyListeners(true);
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    notifyListeners(false);
  }
};

export const getSocket = (): Socket | null => socket;

export const isSocketConnected = (): boolean => {
  return socket?.connected ?? false;
};

export const onSocketConnectionChange = (listener: (connected: boolean) => void): (() => void) => {
  connectionListeners.add(listener);
  return () => {
    connectionListeners.delete(listener);
  };
};
