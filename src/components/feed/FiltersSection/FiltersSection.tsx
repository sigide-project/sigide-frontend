import { Box, Chip, Alert } from '@mui/material';
import { SearchBar, FilterPanel, SortDropdown } from '@/components';
import type { ItemType, ItemSortBy, SortOrder } from '@/types';
import {
  FiltersContainer,
  SearchSortRow,
  ActiveFiltersRow,
  FilterChip,
  ClearAllChip,
  AlertWrapper,
} from './FiltersSection.styled';

interface FiltersSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: ItemType | null;
  onTypeChange: (type: ItemType | null) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  distanceRange: [number, number];
  onDistanceChange: (range: [number, number]) => void;
  maxDistanceKm: number;
  hasLocation: boolean;
  locationError: Error | GeolocationPositionError | null;
  sortBy: ItemSortBy;
  sortOrder: SortOrder;
  onSortByChange: (sortBy: ItemSortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onClearAllFilters: () => void;
}

export function FiltersSection({
  search,
  onSearchChange,
  type,
  onTypeChange,
  selectedTags,
  onTagsChange,
  distanceRange,
  onDistanceChange,
  maxDistanceKm,
  hasLocation,
  locationError,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
  onClearAllFilters,
}: FiltersSectionProps) {
  const isDistanceFiltered = distanceRange[0] > 0 || distanceRange[1] < maxDistanceKm;
  const activeFiltersCount =
    (search ? 1 : 0) + (type ? 1 : 0) + selectedTags.length + (isDistanceFiltered ? 1 : 0);

  return (
    <>
      {locationError && (
        <AlertWrapper>
          <Alert severity="warning">
            Unable to get your location. Distance-based filtering is disabled.
          </Alert>
        </AlertWrapper>
      )}

      <FiltersContainer>
        <SearchSortRow>
          <SearchBar
            value={search}
            onChange={onSearchChange}
            placeholder="Search items by name or description..."
          />
          <SortDropdown
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={onSortByChange}
            onSortOrderChange={onSortOrderChange}
            hasLocation={hasLocation}
          />
        </SearchSortRow>

        <FilterPanel
          type={type}
          onTypeChange={onTypeChange}
          selectedTags={selectedTags}
          onTagsChange={onTagsChange}
          distanceRange={distanceRange}
          onDistanceChange={onDistanceChange}
          maxDistanceKm={maxDistanceKm}
          hasLocation={hasLocation}
        />

        {activeFiltersCount > 0 && (
          <ActiveFiltersRow>
            <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
              <Box
                component="span"
                sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 500 }}
              >
                Active filters:
              </Box>
              {search && (
                <FilterChip
                  label={`Search: "${search}"`}
                  size="small"
                  onDelete={() => onSearchChange('')}
                />
              )}
              {type && (
                <Chip
                  label={`Type: ${type}`}
                  size="small"
                  color={type === 'lost' ? 'error' : 'success'}
                  onDelete={() => onTypeChange(null)}
                />
              )}
              {selectedTags.map((tag) => (
                <FilterChip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => onTagsChange(selectedTags.filter((t) => t !== tag))}
                />
              ))}
              {isDistanceFiltered && hasLocation && (
                <FilterChip
                  label={`Distance: ${distanceRange[0]}-${distanceRange[1]}km`}
                  size="small"
                  onDelete={() => onDistanceChange([0, maxDistanceKm])}
                />
              )}
              <ClearAllChip label="Clear all" size="small" onClick={onClearAllFilters} />
            </Box>
          </ActiveFiltersRow>
        )}
      </FiltersContainer>
    </>
  );
}

export default FiltersSection;
