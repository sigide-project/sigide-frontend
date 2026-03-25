import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { tc, ts, borderRadius, transitions } from '@/theme';

export const SearchBarContainer = styled(Box)`
  flex: 1;
  min-width: 200px;
  max-width: 500px;

  .MuiOutlinedInput-root {
    background: ${tc((c) => c.background.paper)};
    border-radius: ${borderRadius.xl};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      box-shadow: ${ts((s) => s.sm)};
    }

    &.Mui-focused {
      box-shadow: ${ts((s) => s.purple.sm)};
    }

    fieldset {
      border-color: ${tc((c) => c.grey[200])};
      border-width: 2px;
    }

    &:hover fieldset {
      border-color: ${tc((c) => c.primary[300])};
    }

    &.Mui-focused fieldset {
      border-color: ${tc((c) => c.primary.main)};
    }
  }

  .MuiInputAdornment-root svg {
    color: ${tc((c) => c.primary.main)};
  }

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;
