import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import type { User } from '@/types';
import {
  UserDetailsCard,
  UserDetailsContent,
  UserDetailsHeader,
  UserAvatarSection,
  UserInfo,
  UserName,
  UserEmail,
  EditButton,
  UserDetailsGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  SkeletonContainer,
} from './UserDetailsSection.styled';

interface UserDetailsSectionProps {
  user: User | null;
  isLoading: boolean;
  onEditClick: () => void;
}

export function UserDetailsSection({ user, isLoading, onEditClick }: UserDetailsSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getAvatarContent = () => {
    if (user?.avatar_url) {
      return { src: user.avatar_url };
    }
    return { children: user?.name?.charAt(0).toUpperCase() || 'U' };
  };

  if (isLoading) {
    return (
      <UserDetailsCard>
        <UserDetailsContent>
          <SkeletonContainer>
            <Skeleton variant="circular" width={64} height={64} />
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="40%" height={24} />
          </SkeletonContainer>
        </UserDetailsContent>
      </UserDetailsCard>
    );
  }

  return (
    <UserDetailsCard>
      <UserDetailsContent>
        <UserDetailsHeader>
          <UserAvatarSection>
            <Avatar {...getAvatarContent()} sx={{ width: 64, height: 64 }} />
            <UserInfo>
              <UserName>{user?.name}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </UserInfo>
          </UserAvatarSection>
          <EditButton variant="outlined" startIcon={<EditIcon />} onClick={onEditClick}>
            Edit
          </EditButton>
        </UserDetailsHeader>

        <UserDetailsGrid>
          <DetailItem>
            <DetailLabel>Phone</DetailLabel>
            <DetailValue>{user?.phone || 'Not set'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Member since</DetailLabel>
            <DetailValue>{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</DetailValue>
          </DetailItem>
        </UserDetailsGrid>
      </UserDetailsContent>
    </UserDetailsCard>
  );
}

export default UserDetailsSection;
