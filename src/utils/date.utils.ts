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
  return format(new Date(date), pattern);
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return '';
  return format(new Date(date), 'MMM d, yyyy h:mm a');
}
