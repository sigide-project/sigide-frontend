import { useState, useCallback } from 'react';
import { Alert } from '@mui/material';
import { useItems, useGeolocation } from '@/hooks';
import type { ItemType, ItemSortBy, SortOrder } from '@/types';
import {
  FeedHero,
  FiltersSection,
  ItemsGridSection,
  FeedEmptyState,
  FeedLoadingState,
} from '@/components/feed';
import { FeedContainer, ContentSection } from './Feed.styled';

const MAX_DISTANCE_KM = 50;

export function Feed() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ItemType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState<[number, number]>([0, MAX_DISTANCE_KM]);
  const [sortBy, setSortBy] = useState<ItemSortBy>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { location, isLoading: isLocationLoading, error: locationError } = useGeolocation();

  const hasLocation = !!location;
  const isDistanceFiltered = distanceRange[0] > 0 || distanceRange[1] < MAX_DISTANCE_KM;

  const {
    data: itemsResponse,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useItems({
    lat: location?.lat,
    lng: location?.lng,
    radius: hasLocation ? distanceRange[1] * 1000 : undefined,
    minDistance: hasLocation && distanceRange[0] > 0 ? distanceRange[0] * 1000 : undefined,
    maxDistance:
      hasLocation && distanceRange[1] < MAX_DISTANCE_KM ? distanceRange[1] * 1000 : undefined,
    type,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  const isLoading = isLocationLoading || isItemsLoading;
  const items = itemsResponse?.data || [];
  const pagination = itemsResponse?.pagination;

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleTypeChange = useCallback((newType: ItemType | null) => {
    setType(newType);
  }, []);

  const handleTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  const handleDistanceChange = useCallback((range: [number, number]) => {
    setDistanceRange(range);
  }, []);

  const handleSortByChange = useCallback((newSortBy: ItemSortBy) => {
    setSortBy(newSortBy);
  }, []);

  const handleSortOrderChange = useCallback((newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearch('');
    setType(null);
    setSelectedTags([]);
    setDistanceRange([0, MAX_DISTANCE_KM]);
    setSortBy('createdAt');
    setSortOrder('desc');
  }, []);

  const activeFiltersCount =
    (search ? 1 : 0) + (type ? 1 : 0) + selectedTags.length + (isDistanceFiltered ? 1 : 0);

  const lostCount = items.filter((item) => item.type === 'lost').length;
  const foundCount = items.filter((item) => item.type === 'found').length;

  return (
    <FeedContainer>
      <FeedHero
        type={type}
        onTypeChange={handleTypeChange}
        totalItems={pagination?.total || items.length}
        lostCount={lostCount}
        foundCount={foundCount}
      />

      <ContentSection>
        <FiltersSection
          search={search}
          onSearchChange={handleSearchChange}
          type={type}
          onTypeChange={handleTypeChange}
          selectedTags={selectedTags}
          onTagsChange={handleTagsChange}
          distanceRange={distanceRange}
          onDistanceChange={handleDistanceChange}
          maxDistanceKm={MAX_DISTANCE_KM}
          hasLocation={hasLocation}
          locationError={locationError}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={handleSortByChange}
          onSortOrderChange={handleSortOrderChange}
          onClearAllFilters={clearAllFilters}
        />

        {isLoading ? (
          <FeedLoadingState />
        ) : itemsError ? (
          <Alert severity="error">Failed to load items. Please try again later.</Alert>
        ) : items.length === 0 ? (
          <FeedEmptyState hasActiveFilters={activeFiltersCount > 0} />
        ) : (
          <ItemsGridSection
            items={items}
            pagination={pagination}
            sortBy={sortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}
      </ContentSection>
    </FeedContainer>
  );
}

export default Feed;
