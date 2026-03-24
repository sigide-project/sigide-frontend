import { useState } from 'react';
import {
  Box,
  Chip,
  Slider,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Collapse,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import type { ItemType } from '@/types';
import { ITEM_CATEGORIES } from '@/types';
import {
  FilterPanelContainer,
  FilterSection,
  FilterHeader,
  ChipsContainer,
  DistanceSliderContainer,
  TypeToggleContainer,
} from './FilterPanel.styled';

export interface FilterPanelProps {
  type: ItemType | null;
  onTypeChange: (type: ItemType | null) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  distanceRange: [number, number];
  onDistanceChange: (range: [number, number]) => void;
  maxDistanceKm?: number;
  hasLocation: boolean;
}

const distanceMarks = [
  { value: 0, label: '0' },
  { value: 5, label: '5km' },
  { value: 10, label: '10km' },
  { value: 25, label: '25km' },
  { value: 50, label: '50km' },
];

export function FilterPanel({
  type,
  onTypeChange,
  selectedTags,
  onTagsChange,
  distanceRange,
  onDistanceChange,
  maxDistanceKm = 50,
  hasLocation,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    onTypeChange(newType === 'all' ? null : (newType as ItemType | null));
  };

  const handleTagToggle = (category: string) => {
    if (selectedTags.includes(category)) {
      onTagsChange(selectedTags.filter((t) => t !== category));
    } else {
      onTagsChange([...selectedTags, category]);
    }
  };

  const handleDistanceChange = (_event: Event, newValue: number | number[]) => {
    onDistanceChange(newValue as [number, number]);
  };

  const activeFiltersCount =
    (type ? 1 : 0) +
    selectedTags.length +
    (distanceRange[0] > 0 || distanceRange[1] < maxDistanceKm ? 1 : 0);

  return (
    <FilterPanelContainer>
      <FilterHeader onClick={() => setIsExpanded(!isExpanded)}>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterListIcon color="primary" />
          <Typography variant="subtitle1" fontWeight={600}>
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: '0.75rem' }}
            />
          )}
        </Box>
        <IconButton size="small">{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </FilterHeader>

      <Collapse in={isExpanded}>
        <Box mt={2}>
          <FilterSection>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                Item Type
              </Typography>
            </Box>
            <TypeToggleContainer>
              <ToggleButtonGroup
                value={type ?? 'all'}
                exclusive
                onChange={handleTypeChange}
                size="small"
                fullWidth
              >
                <ToggleButton value="all" aria-label="all items">
                  All
                </ToggleButton>
                <ToggleButton
                  value="lost"
                  aria-label="lost items"
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'error.light',
                      color: 'error.dark',
                      '&:hover': {
                        backgroundColor: 'error.light',
                      },
                    },
                  }}
                >
                  Lost
                </ToggleButton>
                <ToggleButton
                  value="found"
                  aria-label="found items"
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'success.light',
                      color: 'success.dark',
                      '&:hover': {
                        backgroundColor: 'success.light',
                      },
                    },
                  }}
                >
                  Found
                </ToggleButton>
              </ToggleButtonGroup>
            </TypeToggleContainer>
          </FilterSection>

          <Divider sx={{ my: 2 }} />

          {hasLocation && (
            <>
              <FilterSection>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" fontWeight={500} color="text.secondary">
                    Distance Range
                  </Typography>
                </Box>
                <DistanceSliderContainer>
                  <Slider
                    value={distanceRange}
                    onChange={handleDistanceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}km`}
                    min={0}
                    max={maxDistanceKm}
                    marks={distanceMarks.filter((m) => m.value <= maxDistanceKm)}
                    sx={{
                      '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                      },
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      {distanceRange[0]}km
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {distanceRange[1]}km
                    </Typography>
                  </Box>
                </DistanceSliderContainer>
              </FilterSection>

              <Divider sx={{ my: 2 }} />
            </>
          )}

          <FilterSection>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <CategoryIcon fontSize="small" color="action" />
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                Categories
              </Typography>
              {selectedTags.length > 0 && (
                <Chip
                  label={`${selectedTags.length} selected`}
                  size="small"
                  variant="outlined"
                  onDelete={() => onTagsChange([])}
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              )}
            </Box>
            <ChipsContainer>
              {ITEM_CATEGORIES.map(({ value, label }) => (
                <Tooltip key={value} title={label} arrow placement="top">
                  <Chip
                    label={label}
                    size="small"
                    variant={selectedTags.includes(value) ? 'filled' : 'outlined'}
                    color={selectedTags.includes(value) ? 'primary' : 'default'}
                    onClick={() => handleTagToggle(value)}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </ChipsContainer>
          </FilterSection>
        </Box>
      </Collapse>
    </FilterPanelContainer>
  );
}

export default FilterPanel;
