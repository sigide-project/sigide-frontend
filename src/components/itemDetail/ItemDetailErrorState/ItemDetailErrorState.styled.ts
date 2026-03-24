import { styled, keyframes } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  gap: ${spacing[6]};
  text-align: center;
  padding: ${spacing[8]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;

export const ErrorIcon = styled(Box)`
  width: 100px;
  height: 100px;
  border-radius: ${borderRadius.full};
  background: ${colors.error.light};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 48px;
    color: ${colors.error.main};
  }
`;

export const BrowseButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${borderRadius.xl};
  font-size: ${typography.fontSize.base};
  background: ${colors.decorative.purple};
  color: ${colors.text.inverse};
  box-shadow: ${shadows.purple.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background: ${colors.decorative.violet};
    box-shadow: ${shadows.purple.md};
    transform: translateY(-2px);
  }
`;
