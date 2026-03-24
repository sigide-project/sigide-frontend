import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ItemCard } from '@/components';
import type { Item, ItemSortBy, Pagination } from '@/types';
import {
  ResultsInfo,
  ResultsCount,
  ViewToggle,
  ViewToggleButton,
  ItemsGrid,
  ItemCardWrapper,
} from './ItemsGridSection.styled';

interface ItemsGridSectionProps {
  items: Item[];
  pagination?: Pagination;
  sortBy: ItemSortBy;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ItemsGridSection({
  items,
  pagination,
  sortBy,
  viewMode,
  onViewModeChange,
}: ItemsGridSectionProps) {
  return (
    <>
      <ResultsInfo>
        <ResultsCount>
          Showing <strong>{items.length}</strong>
          {pagination?.total ? ` of ${pagination.total}` : ''} items
          {sortBy !== 'createdAt' && (
            <> • sorted by {sortBy === 'reward_amount' ? 'reward' : sortBy}</>
          )}
        </ResultsCount>
        <ViewToggle>
          <ViewToggleButton
            active={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
            size="small"
          >
            <GridViewIcon />
          </ViewToggleButton>
          <ViewToggleButton
            active={viewMode === 'list'}
            onClick={() => onViewModeChange('list')}
            size="small"
          >
            <ViewListIcon />
          </ViewToggleButton>
        </ViewToggle>
      </ResultsInfo>
      <ItemsGrid viewMode={viewMode}>
        {items.map((item, index) => (
          <ItemCardWrapper key={item.id} index={index}>
            <ItemCard item={item} />
          </ItemCardWrapper>
        ))}
      </ItemsGrid>
    </>
  );
}

export default ItemsGridSection;
