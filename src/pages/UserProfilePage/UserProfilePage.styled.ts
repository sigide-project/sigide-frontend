import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: `calc(72px + ${theme.spacing(4)})`,
  paddingBottom: theme.spacing(4),
  minHeight: 'calc(100vh - 64px)',
}));

export const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: theme.palette.background.paper,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
}));

export const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
    marginRight: theme.spacing(4),
  },
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
    flex: 1,
  },
}));

export const UserName = styled('h1')(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(0.5),
  fontSize: '1.75rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const Username = styled('p')(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(2),
  fontSize: '1rem',
  color: theme.palette.text.secondary,
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-start',
  },
}));

export const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-start',
  },
}));

export const StatValue = styled('span')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const StatLabel = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const ActionSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-start',
  },
}));

export const ContactButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 600,
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
  flexDirection: 'column',
  gap: theme.spacing(2),
  textAlign: 'center',
}));
