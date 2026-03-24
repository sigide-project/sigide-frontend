import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from './FeedEmptyState.styled';

interface FeedEmptyStateProps {
  hasActiveFilters: boolean;
}

export function FeedEmptyState({ hasActiveFilters }: FeedEmptyStateProps) {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <SearchOffIcon />
      </EmptyStateIcon>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>
        {hasActiveFilters
          ? "Try adjusting your filters or search terms to find what you're looking for."
          : 'No items have been posted yet. Be the first to help someone find their lost item!'}
      </EmptyStateDescription>
    </EmptyState>
  );
}

export default FeedEmptyState;
