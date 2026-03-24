import { styled, keyframes } from '@mui/material/styles';
import { Box } from '@mui/material';
import { spacing, transitions } from '@/theme';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  gap: ${spacing[4]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;
