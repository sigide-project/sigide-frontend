import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { tc, typography, spacing, borderRadius, transitions } from '@/theme';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: ${borderRadius['2xl']};
    max-width: 520px;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  padding: ${spacing[6]} ${spacing[6]} ${spacing[4]};
  color: ${tc((c) => c.text.primary)};
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 0 ${spacing[6]} ${spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: ${spacing[4]} ${spacing[6]} ${spacing[6]};
  gap: ${spacing[3]};
`;

export const ItemInfoBox = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${tc((c) => c.grey[50])};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${tc((c) => c.grey[100])};
`;

export const ItemTitle = styled('span')`
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  font-size: ${typography.fontSize.sm};
`;

export const ItemOwnerName = styled('span')`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
`;

export const CancelButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.medium};
`;

export const SubmitButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
`;
