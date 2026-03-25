import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { getThemeColors } from '@/theme';

export const StyledGoogleButton = styled(Button)(({ theme }) => {
  const c = getThemeColors(theme);
  return {
    backgroundColor: c.background.paper,
    color: c.text.primary,
    border: `1px solid ${c.grey[200]}`,
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
      backgroundColor: c.grey[50],
      borderColor: c.grey[300],
    },
    '&:disabled': {
      backgroundColor: c.grey[50],
      color: c.text.disabled,
    },
  };
});

export const GoogleLogoWrapper = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
});
