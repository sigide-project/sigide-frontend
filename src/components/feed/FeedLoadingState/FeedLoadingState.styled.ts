import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colors, typography, spacing } from '@/theme';

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[16]} ${spacing[8]};
  gap: ${spacing[4]};
`;

export const LoadingText = styled(Typography)`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.medium};
`;
