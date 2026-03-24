import { motion, AnimatePresence } from 'framer-motion';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ItemCard } from '@/components';
import type { Item, ItemSortBy, Pagination } from '@/types';
import { DURATION, EASE, SPRING } from '@/utils/animations';
import {
  ResultsInfo,
  ResultsCount,
  ViewToggle,
  ViewToggleButton,
  ItemsGrid,
  ItemCardWrapper,
} from './ItemsGridSection.styled';

const MotionResultsInfo = motion.create(ResultsInfo);
const MotionItemsGrid = motion.create(ItemsGrid);
const MotionItemCardWrapper = motion.create(ItemCardWrapper);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

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
      <MotionResultsInfo
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.normal, ease: EASE.smooth }}
      >
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
      </MotionResultsInfo>

      <MotionItemsGrid
        viewMode={viewMode}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        transition={SPRING.gentle}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MotionItemCardWrapper
              key={item.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.95, transition: { duration: DURATION.fast } }}
              style={{ willChange: 'opacity, transform' }}
            >
              <ItemCard item={item} />
            </MotionItemCardWrapper>
          ))}
        </AnimatePresence>
      </MotionItemsGrid>
    </>
  );
}

export default ItemsGridSection;
