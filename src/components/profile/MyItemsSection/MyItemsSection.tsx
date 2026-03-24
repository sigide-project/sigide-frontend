import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import type { Item } from '@/types';
import { ProfileItemCard } from '../ProfileItemCard';
import {
  MyItemsSectionContainer,
  SectionTitle,
  ItemsGrid,
  EmptyState,
  EmptyStateText,
  AddFirstItemButton,
  SkeletonContainer,
} from './MyItemsSection.styled';

interface MyItemsSectionProps {
  items: Item[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onEditItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  onAddItem: () => void;
}

export function MyItemsSection({
  items,
  isLoading,
  isError,
  error,
  onEditItem,
  onDeleteItem,
  onAddItem,
}: MyItemsSectionProps) {
  return (
    <MyItemsSectionContainer>
      <SectionTitle>My Items</SectionTitle>

      {isLoading ? (
        <SkeletonContainer>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={280} />
          ))}
        </SkeletonContainer>
      ) : isError ? (
        <Alert severity="error">{error?.message || 'Failed to load items'}</Alert>
      ) : items.length === 0 ? (
        <EmptyState>
          <EmptyStateText>You haven&apos;t reported any lost or found items yet.</EmptyStateText>
          <AddFirstItemButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAddItem}
          >
            Add Your First Item
          </AddFirstItemButton>
        </EmptyState>
      ) : (
        <ItemsGrid>
          {items.map((item) => (
            <ProfileItemCard
              key={item.id}
              item={item}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
            />
          ))}
        </ItemsGrid>
      )}
    </MyItemsSectionContainer>
  );
}

export default MyItemsSection;
