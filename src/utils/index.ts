// Date utilities
export {
  formatRelativeTime,
  formatDate,
  formatDateTime,
  formatDateShort,
  formatDateLong,
  formatMonthYear,
  formatMonthYearLong,
} from './date.utils';

// Format utilities
export {
  formatDistance,
  formatCurrency,
  truncateText,
  formatWithCommas,
  getInitials,
  capitalizeFirst,
} from './format.utils';

// Validation utilities
export {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES,
  validateImageFile,
  validateEmail,
  validatePhone,
} from './validation.utils';
export type { FileValidationResult } from './validation.utils';

// User utilities
export { normalizeUser } from './user.utils';
export type { ApiUser } from './user.utils';

export { default as ScrollToTop } from './ScrollToTop';
