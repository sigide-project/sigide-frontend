import { formatDistanceToNow, format } from 'date-fns';

export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDate(
  date: string | Date | null | undefined,
  pattern = 'MMM d, yyyy'
): string {
  if (!date) return '';
  try {
    return format(new Date(date), pattern);
  } catch {
    return typeof date === 'string' ? date : '';
  }
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return '';
  try {
    return format(new Date(date), 'MMM dd, yyyy • h:mm a');
  } catch {
    return typeof date === 'string' ? date : '';
  }
}

export function formatDateShort(date: string | Date | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateLong(date: string | Date | null | undefined): string {
  if (!date) return '';
  try {
    return format(new Date(date), 'MMMM dd, yyyy');
  } catch {
    return typeof date === 'string' ? date : '';
  }
}

export function formatMonthYear(date: string | Date | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
}

export function formatMonthYearLong(date: string | Date | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
}
