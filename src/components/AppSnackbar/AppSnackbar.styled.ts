import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';

interface StyledAlertProps {
  severity: 'success' | 'error';
}

export const StyledAlert = styled(Alert, {
  shouldForwardProp: (prop) => prop !== 'severity',
})<StyledAlertProps>`
  color: #ffffff;
  font-weight: 500;

  background-color: ${({ theme, severity }) =>
    severity === 'success' ? theme.palette.primary.main : theme.palette.error.main};

  .MuiAlert-icon {
    color: #ffffff;
  }

  .MuiAlert-action {
    color: #ffffff;
  }
`;
