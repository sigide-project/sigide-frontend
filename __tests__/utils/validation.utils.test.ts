import {
  validateImageFile,
  validateEmail,
  validatePhone,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES,
} from '@/utils/validation.utils';

describe('validation.utils', () => {
  describe('constants', () => {
    it('should have correct MAX_FILE_SIZE (3MB)', () => {
      expect(MAX_FILE_SIZE).toBe(3 * 1024 * 1024);
    });

    it('should have correct ACCEPTED_IMAGE_TYPES', () => {
      expect(ACCEPTED_IMAGE_TYPES).toEqual(['image/jpeg', 'image/jpg', 'image/png']);
    });

    it('should have correct MAX_IMAGES', () => {
      expect(MAX_IMAGES).toBe(2);
    });
  });

  describe('validateImageFile', () => {
    const createMockFile = (type: string, size: number): File => {
      const blob = new Blob([''], { type });
      Object.defineProperty(blob, 'size', { value: size });
      return blob as File;
    };

    it('should return valid for a valid JPEG file', () => {
      const file = createMockFile('image/jpeg', 1024 * 1024);
      const result = validateImageFile(file);
      expect(result).toEqual({ valid: true });
    });

    it('should return valid for a valid JPG file', () => {
      const file = createMockFile('image/jpg', 1024 * 1024);
      const result = validateImageFile(file);
      expect(result).toEqual({ valid: true });
    });

    it('should return valid for a valid PNG file', () => {
      const file = createMockFile('image/png', 1024 * 1024);
      const result = validateImageFile(file);
      expect(result).toEqual({ valid: true });
    });

    it('should return error for unsupported file type', () => {
      const file = createMockFile('image/gif', 1024 * 1024);
      const result = validateImageFile(file);
      expect(result).toEqual({
        valid: false,
        error: 'Only JPG and PNG files are accepted',
      });
    });

    it('should return error for PDF file', () => {
      const file = createMockFile('application/pdf', 1024 * 1024);
      const result = validateImageFile(file);
      expect(result).toEqual({
        valid: false,
        error: 'Only JPG and PNG files are accepted',
      });
    });

    it('should return error for file exceeding MAX_FILE_SIZE', () => {
      const file = createMockFile('image/jpeg', MAX_FILE_SIZE + 1);
      const result = validateImageFile(file);
      expect(result).toEqual({
        valid: false,
        error: 'File size must be under 3 MB',
      });
    });

    it('should return valid for file exactly at MAX_FILE_SIZE', () => {
      const file = createMockFile('image/jpeg', MAX_FILE_SIZE);
      const result = validateImageFile(file);
      expect(result).toEqual({ valid: true });
    });

    it('should return valid for very small file', () => {
      const file = createMockFile('image/png', 100);
      const result = validateImageFile(file);
      expect(result).toEqual({ valid: true });
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return true for email with subdomain', () => {
      expect(validateEmail('test@mail.example.com')).toBe(true);
    });

    it('should return true for email with plus sign', () => {
      expect(validateEmail('test+tag@example.com')).toBe(true);
    });

    it('should return true for email with dots in local part', () => {
      expect(validateEmail('first.last@example.com')).toBe(true);
    });

    it('should return false for email without @', () => {
      expect(validateEmail('testexample.com')).toBe(false);
    });

    it('should return false for email without domain', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    it('should return false for email without local part', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('should return false for email with spaces', () => {
      expect(validateEmail('test @example.com')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('should return false for email without TLD', () => {
      expect(validateEmail('test@example')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should return true for valid US phone number', () => {
      expect(validatePhone('123-456-7890')).toBe(true);
    });

    it('should return true for phone with country code', () => {
      expect(validatePhone('+1234567890')).toBe(true);
    });

    it('should return true for phone with parentheses', () => {
      expect(validatePhone('(123)456-7890')).toBe(true);
    });

    it('should return true for phone with dots', () => {
      expect(validatePhone('123.456.7890')).toBe(true);
    });

    it('should return true for phone with spaces', () => {
      expect(validatePhone('123 456 7890')).toBe(true);
    });

    it('should return false for phone with letters', () => {
      expect(validatePhone('123-ABC-7890')).toBe(false);
    });

    it('should return false for too short phone number', () => {
      expect(validatePhone('12345')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validatePhone('')).toBe(false);
    });

    it('should return true for valid 10 digit phone', () => {
      expect(validatePhone('1234567890')).toBe(true);
    });
  });
});
