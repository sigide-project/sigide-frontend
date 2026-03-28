import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExploreIcon from '@mui/icons-material/Explore';
import type { Item } from '@/types';
import { SavedItemCard } from './SavedItemCard';
import {
  SavedItemsSectionContainer,
  SectionTitle,
  ItemsGrid,
  EmptyState,
  EmptyStateText,
  SkeletonContainer,
} from './SavedItemsSection.styled';

interface SavedItemsSectionProps {
  items: Item[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRemoveItem: (itemId: string) => Promise<void>;
}

export function SavedItemsSection({
  items,
  isLoading,
  isError,
  error,
  onRemoveItem,
}: SavedItemsSectionProps) {
  const navigate = useNavigate();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const handleRemove = async (itemId: string) => {
    setRemovingItemId(itemId);
    try {
      await onRemoveItem(itemId);
    } finally {
      setRemovingItemId(null);
    }
  };

  return (
    <SavedItemsSectionContainer>
      <SectionTitle>Saved Items</SectionTitle>

      {isLoading ? (
        <SkeletonContainer>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={280} />
          ))}
        </SkeletonContainer>
      ) : isError ? (
        <Alert severity="error">{error?.message || 'Failed to load saved items'}</Alert>
      ) : items.length === 0 ? (
        <EmptyState>
          <BookmarkIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <EmptyStateText>You haven&apos;t saved any items yet.</EmptyStateText>
          <EmptyStateText style={{ marginTop: 8, fontSize: '0.9rem' }}>
            Browse items and click &quot;Save Item&quot; to add them here.
          </EmptyStateText>
          <Button
            variant="contained"
            startIcon={<ExploreIcon />}
            onClick={() => navigate('/feed')}
            sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Browse Feed
          </Button>
        </EmptyState>
      ) : (
        <ItemsGrid>
          {items.map((item) => (
            <SavedItemCard
              key={item.id}
              item={item}
              onRemove={() => handleRemove(item.id)}
              isRemoving={removingItemId === item.id}
            />
          ))}
        </ItemsGrid>
      )}
    </SavedItemsSectionContainer>
  );
}

export default SavedItemsSection;
