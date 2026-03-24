import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePublicProfile } from '@/hooks';
import {
  PageContainer,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  UserName,
  Username,
  StatsContainer,
  StatItem,
  StatValue,
  StatLabel,
  ActionSection,
  ContactButton,
  ErrorContainer,
} from './UserProfilePage.styled';

export function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = usePublicProfile(username);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getAvatarContent = () => {
    if (profile?.avatar_url) {
      return { src: profile.avatar_url };
    }
    return { children: profile?.name?.charAt(0).toUpperCase() || '?' };
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/feed');
    }
  };

  const handleContact = () => {
    // TODO: Implement contact functionality
  };

  if (isLoading) {
    return (
      <PageContainer maxWidth="md">
        <ProfileCard>
          <ProfileHeader>
            <Skeleton variant="circular" width={120} height={120} />
            <ProfileInfo>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={150} height={24} />
              <StatsContainer>
                <Skeleton variant="rounded" width={80} height={60} />
                <Skeleton variant="rounded" width={80} height={60} />
              </StatsContainer>
            </ProfileInfo>
          </ProfileHeader>
        </ProfileCard>
      </PageContainer>
    );
  }

  if (error || !profile) {
    return (
      <PageContainer maxWidth="md">
        <ProfileCard>
          <ErrorContainer>
            <Typography variant="h5" color="text.secondary">
              User not found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The user you're looking for doesn't exist or has been removed.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{ mt: 2 }}
            >
              Go Back
            </Button>
          </ErrorContainer>
        </ProfileCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md">
      <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ mb: 2 }}>
        Go Back
      </Button>

      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar {...getAvatarContent()} />
          <ProfileInfo>
            <UserName>{profile.name}</UserName>
            <Username>@{profile.username}</Username>

            <StatsContainer>
              <StatItem>
                <StatValue>
                  <InventoryIcon sx={{ fontSize: 20, mr: 0.5, verticalAlign: 'middle' }} />
                  {profile.itemsCount}
                </StatValue>
                <StatLabel>Items Posted</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <CalendarTodayIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: 'middle' }} />
                  {formatDate(profile.createdAt)}
                </StatValue>
                <StatLabel>Member Since</StatLabel>
              </StatItem>
            </StatsContainer>

            <ActionSection>
              <ContactButton variant="contained" startIcon={<EmailIcon />} onClick={handleContact}>
                Contact User
              </ContactButton>
            </ActionSection>
          </ProfileInfo>
        </ProfileHeader>
      </ProfileCard>
    </PageContainer>
  );
}

export default UserProfilePage;
