import { formatRelativeTime, formatDate, formatDateTime } from '@/utils/date.utils';

describe('date.utils', () => {
  describe('formatRelativeTime', () => {
    it('should return empty string for null', () => {
      expect(formatRelativeTime(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatRelativeTime(undefined)).toBe('');
    });

    it('should format recent date as relative time', () => {
      const recentDate = new Date(Date.now() - 1000 * 60 * 5).toISOString();
      const result = formatRelativeTime(recentDate);
      expect(result).toContain('minutes ago');
    });

    it('should format date from hours ago', () => {
      const hoursAgo = new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString();
      const result = formatRelativeTime(hoursAgo);
      expect(result).toContain('hours ago');
    });

    it('should format date from days ago', () => {
      const daysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString();
      const result = formatRelativeTime(daysAgo);
      expect(result).toContain('days ago');
    });

    it('should handle Date object input', () => {
      const date = new Date(Date.now() - 1000 * 60 * 30);
      const result = formatRelativeTime(date);
      expect(result).toContain('minutes ago');
    });

    it('should include "ago" suffix', () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 10).toISOString();
      const result = formatRelativeTime(pastDate);
      expect(result).toContain('ago');
    });
  });

  describe('formatDate', () => {
    it('should return empty string for null', () => {
      expect(formatDate(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatDate(undefined)).toBe('');
    });

    it('should format date with default pattern', () => {
      const date = '2024-03-15T10:30:00Z';
      const result = formatDate(date);
      expect(result).toBe('Mar 15, 2024');
    });

    it('should format date with custom pattern', () => {
      const date = '2024-03-15T10:30:00Z';
      const result = formatDate(date, 'yyyy-MM-dd');
      expect(result).toBe('2024-03-15');
    });

    it('should handle Date object input', () => {
      const date = new Date('2024-03-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toBe('Mar 15, 2024');
    });

    it('should format date with full month pattern', () => {
      const date = '2024-01-01T00:00:00Z';
      const result = formatDate(date, 'MMMM d, yyyy');
      expect(result).toBe('January 1, 2024');
    });
  });

  describe('formatDateTime', () => {
    it('should return empty string for null', () => {
      expect(formatDateTime(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatDateTime(undefined)).toBe('');
    });

    it('should format date and time', () => {
      const date = '2024-03-15T14:30:00Z';
      const result = formatDateTime(date);
      expect(result).toMatch(/Mar 15, 2024/);
      expect(result).toMatch(/\d{1,2}:\d{2} [AP]M/);
    });

    it('should handle Date object input', () => {
      const date = new Date('2024-03-15T14:30:00Z');
      const result = formatDateTime(date);
      expect(result).toMatch(/Mar 15, 2024/);
    });

    it('should format AM time correctly', () => {
      const date = '2024-03-15T08:30:00Z';
      const result = formatDateTime(date);
      expect(result).toMatch(/[AP]M/);
    });

    it('should format PM time correctly', () => {
      const date = '2024-03-15T20:30:00Z';
      const result = formatDateTime(date);
      expect(result).toMatch(/[AP]M/);
    });
  });
});
