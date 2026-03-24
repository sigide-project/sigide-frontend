import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

export const FilterPanelContainer = styled(Paper)`
  padding: ${spacing[5]};
  border-radius: ${borderRadius.xl};
  background-color: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
  box-shadow: none;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${colors.grey[200]};
  }
`;

export const FilterHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: ${spacing[2]} 0;
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    opacity: 0.85;
  }
`;

export const FilterSection = styled(Box)`
  margin-bottom: ${spacing[4]};
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${colors.grey[100]};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const FilterSectionTitle = styled(Box)`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  margin-bottom: ${spacing[3]};
`;

export const ChipsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};

  .MuiChip-root {
    border-radius: ${borderRadius.full};
    font-weight: ${typography.fontWeight.medium};
    transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};
    border: 1px solid ${colors.grey[200]};
    background: ${colors.background.paper};

    &:hover {
      border-color: ${colors.primary[300]};
      background: ${colors.primary[50]};
    }

    &.MuiChip-filled {
      background: ${colors.primary[100]};
      border-color: ${colors.primary[200]};
      color: ${colors.primary[700]};
    }
  }
`;

export const DistanceSliderContainer = styled(Box)`
  padding: ${spacing[2]} ${spacing[4]};

  .MuiSlider-root {
    color: ${colors.primary.main};
  }

  .MuiSlider-thumb {
    width: 20px;
    height: 20px;
    background: ${colors.background.paper};
    border: 3px solid ${colors.primary.main};
    box-shadow: ${shadows.sm};

    &:hover,
    &.Mui-focusVisible {
      box-shadow: ${shadows.purple.sm};
    }
  }

  .MuiSlider-track {
    height: 6px;
    border-radius: ${borderRadius.full};
    background: ${colors.decorative.purple};
  }

  .MuiSlider-rail {
    height: 6px;
    border-radius: ${borderRadius.full};
    background: ${colors.grey[200]};
  }

  .MuiSlider-valueLabel {
    background: ${colors.primary.main};
    border-radius: ${borderRadius.base};
    font-weight: ${typography.fontWeight.semibold};
  }
`;

export const TypeToggleContainer = styled(Box)`
  .MuiToggleButtonGroup-root {
    width: 100%;
    background: ${colors.grey[100]};
    border-radius: ${borderRadius.lg};
    padding: ${spacing[1]};
  }

  .MuiToggleButton-root {
    flex: 1;
    text-transform: none;
    font-weight: ${typography.fontWeight.semibold};
    padding: ${spacing[2]} ${spacing[4]};
    border: none;
    border-radius: ${borderRadius.base} !important;
    color: ${colors.text.secondary};
    transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

    &:hover {
      background: ${colors.grey[200]};
    }

    &.Mui-selected {
      background: ${colors.background.paper};
      color: ${colors.primary.main};
      box-shadow: ${shadows.sm};

      &:hover {
        background: ${colors.background.paper};
      }
    }
  }
`;
