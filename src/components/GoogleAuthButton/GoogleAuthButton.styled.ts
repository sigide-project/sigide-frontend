import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledGoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9375rem',
  padding: theme.spacing(1.25, 3),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  width: '100%',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    borderColor: theme.palette.divider,
  },
  '&:disabled': {
    backgroundColor: '#f8f9fa',
    color: theme.palette.text.disabled,
  },
}));

export const GoogleLogoWrapper = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
});
