import { styled, keyframes } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const FiltersContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};
  padding: ${spacing[6]};
  background: ${colors.background.paper};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.sm};
  animation: ${fadeInUp} 0.6s ${transitions.easing.easeOut} 0.1s forwards;
  opacity: 0;
`;

export const SearchSortRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[4]};
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ActiveFiltersRow = styled(Box)`
  padding: ${spacing[4]} ${spacing[5]};
  background: ${colors.primary[50]};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.primary[100]};
  animation: ${fadeIn} 0.3s ${transitions.easing.easeOut} forwards;
`;

export const FilterChip = styled(Chip)`
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[200]};
  font-weight: ${typography.fontWeight.medium};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${colors.primary[300]};
    background: ${colors.primary[50]};
  }

  .MuiChip-deleteIcon {
    color: ${colors.grey[400]};
    transition: color ${transitions.duration.fast};

    &:hover {
      color: ${colors.error.main};
    }
  }
`;

export const ClearAllChip = styled(Chip)`
  background: transparent;
  border: 2px dashed ${colors.grey[300]};
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${colors.primary.main};
    color: ${colors.primary.main};
    background: ${colors.primary[50]};
  }
`;

export const AlertWrapper = styled(Box)`
  margin-bottom: ${spacing[4]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;
