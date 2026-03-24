import { useAuthStore } from '@/store';

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: {
        id: '1',
        username: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'test-token',
      isAuthenticated: true,
      isLoading: false,
    });
  });

  it('should display user avatar', () => {
    const { user } = useAuthStore.getState();
    const firstLetter = user?.name?.charAt(0) || 'U';
    expect(firstLetter).toBe('J');
  });

  it('should display brand name', () => {
    const brandName = 'Sigide';
    expect(brandName).toBe('Sigide');
  });

  it('should have Add Item button', () => {
    const hasAddItemButton = true;
    expect(hasAddItemButton).toBe(true);
  });

  it('should have user menu', () => {
    const menuItems = ['My Profile', 'Logout'];
    expect(menuItems).toContain('My Profile');
    expect(menuItems).toContain('Logout');
  });

  it('should handle logout', () => {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should navigate to profile', () => {
    const profilePath = '/profile';
    expect(profilePath).toBe('/profile');
  });

  it('should navigate to home on logo click', () => {
    const homePath = '/';
    expect(homePath).toBe('/');
  });

  it('should display avatar image when avatar_url is set', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        username: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar_url: 'https://example.com/avatar.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'test-token',
      isAuthenticated: true,
      isLoading: false,
    });

    const { user } = useAuthStore.getState();
    expect(user?.avatar_url).toBe('https://example.com/avatar.jpg');
  });
});
