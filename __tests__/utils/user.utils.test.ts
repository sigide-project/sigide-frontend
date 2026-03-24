import { normalizeUser, type ApiUser } from '@/utils/user.utils';

describe('user.utils', () => {
  describe('normalizeUser', () => {
    it('should normalize basic user data', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };

      const result = normalizeUser(apiUser);

      expect(result).toEqual({
        id: '123',
        username: '123',
        email: 'test@example.com',
        name: 'Test User',
        phone: undefined,
        avatar_url: undefined,
        roles: undefined,
        createdAt: '',
        updatedAt: '',
      });
    });

    it('should use username when provided', () => {
      const apiUser: ApiUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
      };

      const result = normalizeUser(apiUser);

      expect(result.username).toBe('testuser');
    });

    it('should fall back to id when username is not provided', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };

      const result = normalizeUser(apiUser);

      expect(result.username).toBe('123');
    });

    it('should handle phone field', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1234567890',
      };

      const result = normalizeUser(apiUser);

      expect(result.phone).toBe('+1234567890');
    });

    it('should handle null phone field', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        phone: null,
      };

      const result = normalizeUser(apiUser);

      expect(result.phone).toBeNull();
    });

    it('should handle avatar_url field', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg',
      };

      const result = normalizeUser(apiUser);

      expect(result.avatar_url).toBe('https://example.com/avatar.jpg');
    });

    it('should handle roles array', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        roles: ['user', 'admin'],
      };

      const result = normalizeUser(apiUser);

      expect(result.roles).toEqual(['user', 'admin']);
    });

    it('should convert single role to array', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'admin',
      };

      const result = normalizeUser(apiUser);

      expect(result.roles).toEqual(['admin']);
    });

    it('should prefer roles array over single role', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        roles: ['user', 'moderator'],
        role: 'admin',
      };

      const result = normalizeUser(apiUser);

      expect(result.roles).toEqual(['user', 'moderator']);
    });

    it('should handle createdAt field', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2024-01-01T00:00:00Z',
      };

      const result = normalizeUser(apiUser);

      expect(result.createdAt).toBe('2024-01-01T00:00:00Z');
    });

    it('should handle created_at field (snake_case)', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        created_at: '2024-01-01T00:00:00Z',
      };

      const result = normalizeUser(apiUser);

      expect(result.createdAt).toBe('2024-01-01T00:00:00Z');
    });

    it('should prefer createdAt over created_at', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2024-02-01T00:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      };

      const result = normalizeUser(apiUser);

      expect(result.createdAt).toBe('2024-02-01T00:00:00Z');
    });

    it('should handle updatedAt field', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        updatedAt: '2024-01-15T00:00:00Z',
      };

      const result = normalizeUser(apiUser);

      expect(result.updatedAt).toBe('2024-01-15T00:00:00Z');
    });

    it('should handle updated_at field (snake_case)', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        updated_at: '2024-01-15T00:00:00Z',
      };

      const result = normalizeUser(apiUser);

      expect(result.updatedAt).toBe('2024-01-15T00:00:00Z');
    });

    it('should handle rating field', () => {
      const apiUser: ApiUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        rating: 4.5,
      };

      const result = normalizeUser(apiUser);

      expect(result).toBeDefined();
    });

    it('should handle complete user data', () => {
      const apiUser: ApiUser = {
        id: '123',
        username: 'johndoe',
        email: 'john@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        avatar_url: 'https://example.com/avatar.jpg',
        roles: ['user', 'admin'],
        rating: 4.8,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      };

      const result = normalizeUser(apiUser);

      expect(result).toEqual({
        id: '123',
        username: 'johndoe',
        email: 'john@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        avatar_url: 'https://example.com/avatar.jpg',
        roles: ['user', 'admin'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      });
    });
  });
});
