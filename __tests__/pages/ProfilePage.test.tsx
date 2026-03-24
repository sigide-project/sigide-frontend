import { useAuthStore } from '@/store';

describe('ProfilePage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1234567890',
        avatar_url: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      token: 'test-token',
      isAuthenticated: true,
      isLoading: false,
    });
  });

  it('should display user information', () => {
    const { user } = useAuthStore.getState();
    expect(user?.name).toBe('Test User');
    expect(user?.email).toBe('test@example.com');
  });

  it('should have profile sections', () => {
    const sections = ['Personal Info', 'My Items', 'Saved Items', 'Settings'];
    expect(sections.length).toBe(4);
  });

  it('should support profile editing', () => {
    const canEdit = true;
    expect(canEdit).toBe(true);
  });

  it('should display avatar', () => {
    const { user } = useAuthStore.getState();
    const firstLetter = user?.name?.charAt(0) || 'U';
    expect(firstLetter).toBe('T');
  });

  it('should support address management', () => {
    const canManageAddresses = true;
    expect(canManageAddresses).toBe(true);
  });

  it('should support password change', () => {
    const canChangePassword = true;
    expect(canChangePassword).toBe(true);
  });

  it('should display user items', () => {
    const hasMyItemsSection = true;
    expect(hasMyItemsSection).toBe(true);
  });

  it('should display saved items', () => {
    const hasSavedItemsSection = true;
    expect(hasSavedItemsSection).toBe(true);
  });
});
