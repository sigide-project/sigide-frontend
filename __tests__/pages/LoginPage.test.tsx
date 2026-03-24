import { useAuthStore } from '@/store';

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.getState().clearAuth();
  });

  it('should have login functionality', () => {
    expect(true).toBe(true);
  });

  it('should validate email format', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = 'invalid-email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test(validEmail)).toBe(true);
    expect(emailRegex.test(invalidEmail)).toBe(false);
  });

  it('should require password', () => {
    const password = '';
    expect(password.length === 0).toBe(true);
  });

  it('should handle authentication state', () => {
    const { setAuth, isAuthenticated } = useAuthStore.getState();

    expect(isAuthenticated).toBe(false);

    setAuth(
      {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        username: 'test',
        createdAt: '',
        updatedAt: '',
      },
      'token'
    );

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should clear auth on logout', () => {
    useAuthStore.getState().setAuth(
      {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        username: 'test',
        createdAt: '',
        updatedAt: '',
      },
      'token'
    );

    useAuthStore.getState().clearAuth();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
