import { formatDistance, formatCurrency, truncateText } from '@/utils/format.utils';

describe('format.utils', () => {
  describe('formatDistance', () => {
    it('should return empty string for null', () => {
      expect(formatDistance(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatDistance(undefined)).toBe('');
    });

    it('should format meters under 1000 as meters', () => {
      expect(formatDistance(500)).toBe('500m');
    });

    it('should format 0 meters', () => {
      expect(formatDistance(0)).toBe('0m');
    });

    it('should round meters to nearest integer', () => {
      expect(formatDistance(123.7)).toBe('124m');
    });

    it('should format 1000 meters as 1.0km', () => {
      expect(formatDistance(1000)).toBe('1.0km');
    });

    it('should format kilometers with one decimal place', () => {
      expect(formatDistance(1500)).toBe('1.5km');
    });

    it('should format large distances in kilometers', () => {
      expect(formatDistance(10000)).toBe('10.0km');
    });

    it('should format 999 meters as meters', () => {
      expect(formatDistance(999)).toBe('999m');
    });

    it('should format 2750 meters as 2.8km', () => {
      expect(formatDistance(2750)).toBe('2.8km');
    });
  });

  describe('formatCurrency', () => {
    it('should return empty string for null', () => {
      expect(formatCurrency(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatCurrency(undefined)).toBe('');
    });

    it('should format USD by default', () => {
      const result = formatCurrency(100);
      expect(result).toBe('$100');
    });

    it('should format zero amount', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('should format large amounts with commas', () => {
      const result = formatCurrency(1000000);
      expect(result).toBe('$1,000,000');
    });

    it('should format with EUR currency', () => {
      const result = formatCurrency(100, 'EUR');
      expect(result).toContain('100');
    });

    it('should format with GBP currency', () => {
      const result = formatCurrency(100, 'GBP');
      expect(result).toContain('100');
    });

    it('should not show decimal places', () => {
      const result = formatCurrency(99.99);
      expect(result).toBe('$100');
    });

    it('should format negative amounts', () => {
      const result = formatCurrency(-50);
      expect(result).toBe('-$50');
    });
  });

  describe('truncateText', () => {
    it('should return empty string for null', () => {
      expect(truncateText(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(truncateText(undefined)).toBe('');
    });

    it('should return original text if shorter than maxLength', () => {
      expect(truncateText('Hello', 100)).toBe('Hello');
    });

    it('should return original text if equal to maxLength', () => {
      expect(truncateText('Hello', 5)).toBe('Hello');
    });

    it('should truncate text longer than maxLength', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    it('should use default maxLength of 100', () => {
      const longText = 'a'.repeat(150);
      const result = truncateText(longText);
      expect(result).toHaveLength(103);
      expect(result.endsWith('...')).toBe(true);
    });

    it('should trim trailing whitespace before adding ellipsis', () => {
      expect(truncateText('Hello   World', 8)).toBe('Hello...');
    });

    it('should handle empty string', () => {
      expect(truncateText('')).toBe('');
    });

    it('should handle maxLength of 0', () => {
      expect(truncateText('Hello', 0)).toBe('...');
    });
  });
});
