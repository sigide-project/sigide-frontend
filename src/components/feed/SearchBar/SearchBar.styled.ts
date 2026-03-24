import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors, borderRadius, shadows, transitions } from '@/theme';

export const SearchBarContainer = styled(Box)`
  flex: 1;
  min-width: 200px;
  max-width: 500px;

  .MuiOutlinedInput-root {
    background: ${colors.background.paper};
    border-radius: ${borderRadius.xl};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      box-shadow: ${shadows.sm};
    }

    &.Mui-focused {
      box-shadow: ${shadows.purple.sm};
    }

    fieldset {
      border-color: ${colors.grey[200]};
      border-width: 2px;
    }

    &:hover fieldset {
      border-color: ${colors.primary[300]};
    }

    &.Mui-focused fieldset {
      border-color: ${colors.primary.main};
    }
  }

  .MuiInputAdornment-root svg {
    color: ${colors.primary.main};
  }

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;
