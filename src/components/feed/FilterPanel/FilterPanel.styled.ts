import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions } from '@/theme';

export const FilterPanelContainer = styled(Paper)`
  padding: ${spacing[5]};
  border-radius: ${borderRadius.xl};
  background-color: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: none;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.grey[200])};
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
  border-bottom: 1px solid ${tc((c) => c.grey[100])};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const FilterSectionTitle = styled(Box)`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.secondary)};
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
    border: 1px solid ${tc((c) => c.grey[200])};
    background: ${tc((c) => c.background.paper)};

    &:hover {
      border-color: ${tc((c) => c.primary[300])};
      background: ${tc((c) => c.primary[50])};
    }

    &.MuiChip-filled {
      background: ${tc((c) => c.primary[100])};
      border-color: ${tc((c) => c.primary[200])};
      color: ${tc((c) => c.primary[700])};
    }
  }
`;

export const DistanceSliderContainer = styled(Box)`
  padding: ${spacing[2]} ${spacing[4]};

  .MuiSlider-root {
    color: ${tc((c) => c.primary.main)};
  }

  .MuiSlider-thumb {
    width: 20px;
    height: 20px;
    background: ${tc((c) => c.background.paper)};
    border: 3px solid ${tc((c) => c.primary.main)};
    box-shadow: ${ts((s) => s.sm)};

    &:hover,
    &.Mui-focusVisible {
      box-shadow: ${ts((s) => s.purple.sm)};
    }
  }

  .MuiSlider-track {
    height: 6px;
    border-radius: ${borderRadius.full};
    background: ${tc((c) => c.decorative.purple)};
  }

  .MuiSlider-rail {
    height: 6px;
    border-radius: ${borderRadius.full};
    background: ${tc((c) => c.grey[200])};
  }

  .MuiSlider-valueLabel {
    background: ${tc((c) => c.primary.main)};
    border-radius: ${borderRadius.base};
    font-weight: ${typography.fontWeight.semibold};
  }
`;

export const TypeToggleContainer = styled(Box)`
  .MuiToggleButtonGroup-root {
    width: 100%;
    background: ${tc((c) => c.grey[100])};
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
    color: ${tc((c) => c.text.secondary)};
    transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

    &:hover {
      background: ${tc((c) => c.grey[200])};
    }

    &.Mui-selected {
      background: ${tc((c) => c.background.paper)};
      color: ${tc((c) => c.primary.main)};
      box-shadow: ${ts((s) => s.sm)};

      &:hover {
        background: ${tc((c) => c.background.paper)};
      }
    }
  }
`;
