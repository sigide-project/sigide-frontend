import { FormControl, Select, MenuItem, InputLabel, Box, IconButton, Tooltip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { ItemSortBy, SortOrder } from '@/types';
import { SortDropdownContainer } from './SortDropdown.styled';

export interface SortDropdownProps {
  sortBy: ItemSortBy;
  sortOrder: SortOrder;
  onSortByChange: (sortBy: ItemSortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  hasLocation: boolean;
}

interface SortOption {
  value: ItemSortBy;
  label: string;
  requiresLocation?: boolean;
}

const sortOptions: SortOption[] = [
  { value: 'createdAt', label: 'Date Posted' },
  { value: 'reward_amount', label: 'Reward Amount' },
  { value: 'distance', label: 'Distance', requiresLocation: true },
  { value: 'title', label: 'Name' },
];

export function SortDropdown({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
  hasLocation,
}: SortDropdownProps) {
  const handleSortByChange = (event: { target: { value: string } }) => {
    onSortByChange(event.target.value as ItemSortBy);
  };

  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const availableOptions = sortOptions.filter((option) => !option.requiresLocation || hasLocation);

  return (
    <SortDropdownContainer>
      <Box display="flex" alignItems="center" gap={1}>
        <SortIcon color="action" fontSize="small" />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={sortBy}
            label="Sort by"
            onChange={handleSortByChange}
            sx={{
              backgroundColor: 'background.paper',
              '& .MuiSelect-select': {
                paddingY: '8px',
              },
            }}
          >
            {availableOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={sortOrder === 'asc' ? 'Ascending' : 'Descending'} arrow>
          <IconButton
            size="small"
            onClick={toggleSortOrder}
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            {sortOrder === 'asc' ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </SortDropdownContainer>
  );
}

export default SortDropdown;
