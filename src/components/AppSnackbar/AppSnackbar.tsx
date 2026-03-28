import { Snackbar } from '@mui/material';
import { StyledAlert } from './AppSnackbar.styled';

export interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

export function AppSnackbar({ open, message, severity, onClose }: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <StyledAlert onClose={onClose} severity={severity} variant="filled">
        {message}
      </StyledAlert>
    </Snackbar>
  );
}

export default AppSnackbar;
