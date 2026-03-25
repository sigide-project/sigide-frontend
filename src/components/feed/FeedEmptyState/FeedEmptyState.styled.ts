import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { tc, typography, spacing, borderRadius, transitions } from '@/theme';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[16]} ${spacing[8]};
  text-align: center;
  animation: ${fadeIn} 0.6s ${transitions.easing.easeOut} forwards;
`;

export const EmptyStateIcon = styled(Box)`
  width: 120px;
  height: 120px;
  margin-bottom: ${spacing[6]};
  background: ${tc((c) => c.background.hero)};
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 48px;
    color: ${tc((c) => c.primary[300])};
  }
`;

export const EmptyStateTitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[2]};
`;

export const EmptyStateDescription = styled(Typography)`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  max-width: 400px;
`;
