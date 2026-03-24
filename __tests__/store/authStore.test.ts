import { useAuthStore } from '@/store/authStore';
import type { User } from '@/types';

const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  phone: null,
  avatar_url: null,
  roles: ['user'],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should have null user initially', () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
    });

    it('should have null token initially', () => {
      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
    });

    it('should not be authenticated initially', () => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
    });

    it('should not be loading initially', () => {
      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
    });
  });

  describe('setAuth', () => {
    it('should set user and token', () => {
      const { setAuth } = useAuthStore.getState();
      setAuth(mockUser, 'test-token');

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('test-token');
    });

    it('should set isAuthenticated to true when token is provided', () => {
      const { setAuth } = useAuthStore.getState();
      setAuth(mockUser, 'test-token');

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
    });

    it('should set isAuthenticated to false when token is null', () => {
      const { setAuth } = useAuthStore.getState();
      setAuth(mockUser, null);

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
    });

    it('should set isAuthenticated to false when token is empty string', () => {
      const { setAuth } = useAuthStore.getState();
      setAuth(mockUser, '');

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setUser', () => {
    it('should update user without affecting token', () => {
      useAuthStore.setState({ token: 'existing-token', isAuthenticated: true });

      const { setUser } = useAuthStore.getState();
      setUser(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('existing-token');
    });

    it('should set user to null', () => {
      useAuthStore.setState({ user: mockUser });

      const { setUser } = useAuthStore.getState();
      setUser(null);

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      const { setLoading } = useAuthStore.getState();
      setLoading(true);

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(true);
    });

    it('should set loading to false', () => {
      useAuthStore.setState({ isLoading: true });

      const { setLoading } = useAuthStore.getState();
      setLoading(false);

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
    });
  });

  describe('login', () => {
    it('should set user, token, and isAuthenticated', () => {
      const { login } = useAuthStore.getState();
      login(mockUser, 'test-token');

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('test-token');
      expect(state.isAuthenticated).toBe(true);
    });

    it('should set isLoading to false', () => {
      useAuthStore.setState({ isLoading: true });

      const { login } = useAuthStore.getState();
      login(mockUser, 'test-token');

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear user and token', () => {
      useAuthStore.setState({
        user: mockUser,
        token: 'test-token',
        isAuthenticated: true,
      });

      const { logout } = useAuthStore.getState();
      logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
    });

    it('should set isAuthenticated to false', () => {
      useAuthStore.setState({ isAuthenticated: true });

      const { logout } = useAuthStore.getState();
      logout();

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
    });

    it('should set isLoading to false', () => {
      useAuthStore.setState({ isLoading: true });

      const { logout } = useAuthStore.getState();
      logout();

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
    });
  });

  describe('clearAuth', () => {
    it('should clear all auth state', () => {
      useAuthStore.setState({
        user: mockUser,
        token: 'test-token',
        isAuthenticated: true,
        isLoading: true,
      });

      const { clearAuth } = useAuthStore.getState();
      clearAuth();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });

    it('should remove auth-storage from localStorage', () => {
      localStorage.setItem('auth-storage', JSON.stringify({ state: { token: 'test' } }));

      const { clearAuth } = useAuthStore.getState();
      clearAuth();

      expect(localStorage.getItem('auth-storage')).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return token when set', () => {
      useAuthStore.setState({ token: 'test-token' });

      const { getToken } = useAuthStore.getState();
      expect(getToken()).toBe('test-token');
    });

    it('should return null when token is not set', () => {
      const { getToken } = useAuthStore.getState();
      expect(getToken()).toBeNull();
    });
  });

  describe('hasRole', () => {
    it('should return true when user has the role', () => {
      useAuthStore.setState({
        user: { ...mockUser, roles: ['user', 'admin'] },
      });

      const { hasRole } = useAuthStore.getState();
      expect(hasRole('admin')).toBe(true);
    });

    it('should return false when user does not have the role', () => {
      useAuthStore.setState({
        user: { ...mockUser, roles: ['user'] },
      });

      const { hasRole } = useAuthStore.getState();
      expect(hasRole('admin')).toBe(false);
    });

    it('should return false when user is null', () => {
      const { hasRole } = useAuthStore.getState();
      expect(hasRole('admin')).toBe(false);
    });

    it('should return false when user has no roles', () => {
      useAuthStore.setState({
        user: { ...mockUser, roles: undefined },
      });

      const { hasRole } = useAuthStore.getState();
      expect(hasRole('admin')).toBe(false);
    });

    it('should return false when roles is empty array', () => {
      useAuthStore.setState({
        user: { ...mockUser, roles: [] },
      });

      const { hasRole } = useAuthStore.getState();
      expect(hasRole('admin')).toBe(false);
    });
  });

  describe('persistence', () => {
    it('should persist user, token, and isAuthenticated', () => {
      const { login } = useAuthStore.getState();
      login(mockUser, 'test-token');

      const stored = localStorage.getItem('auth-storage');
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed.state.user).toEqual(mockUser);
      expect(parsed.state.token).toBe('test-token');
      expect(parsed.state.isAuthenticated).toBe(true);
    });

    it('should not persist isLoading', () => {
      useAuthStore.setState({ isLoading: true });

      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.state.isLoading).toBeUndefined();
      }
    });
  });
});
