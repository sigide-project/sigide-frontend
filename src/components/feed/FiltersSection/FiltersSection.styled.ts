import { styled, keyframes } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions } from '@/theme';

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
  background: ${tc((c) => c.background.paper)};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.sm)};
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
  background: ${tc((c) => c.primary[50])};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${tc((c) => c.primary[100])};
  animation: ${fadeIn} 0.3s ${transitions.easing.easeOut} forwards;
`;

export const FilterChip = styled(Chip)`
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[200])};
  font-weight: ${typography.fontWeight.medium};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.primary[300])};
    background: ${tc((c) => c.primary[50])};
  }

  .MuiChip-deleteIcon {
    color: ${tc((c) => c.grey[400])};
    transition: color ${transitions.duration.fast};

    &:hover {
      color: ${tc((c) => c.error.main)};
    }
  }
`;

export const ClearAllChip = styled(Chip)`
  background: transparent;
  border: 2px dashed ${tc((c) => c.grey[300])};
  color: ${tc((c) => c.text.secondary)};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.primary.main)};
    color: ${tc((c) => c.primary.main)};
    background: ${tc((c) => c.primary[50])};
  }
`;

export const AlertWrapper = styled(Box)`
  margin-bottom: ${spacing[4]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;
