import { useRef } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import type { User } from '@/types';
import { useUploadImage } from '@/hooks';
import { formatMonthYear } from '@/utils';
import {
  HeaderContainer,
  HeaderBackground,
  ProfileContent,
  AvatarWrapper,
  StyledAvatar,
  AvatarEditButton,
  UserInfoSection,
  UserName,
  UserStats,
  StatItem,
  StatValue,
  StatLabel,
  EditProfileButton,
} from './ProfileHeader.styled';

interface ProfileHeaderProps {
  user: User | null;
  isLoading: boolean;
  itemsCount: number;
  onEditClick: () => void;
  onAvatarUpdate: (url: string) => void;
}

export function ProfileHeader({
  user,
  isLoading,
  itemsCount,
  onEditClick,
  onAvatarUpdate,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading: isUploading } = useUploadImage();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    try {
      const url = await uploadImage(file);
      if (url) {
        onAvatarUpdate(url);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAvatarContent = () => {
    if (user?.avatar_url) {
      return { src: user.avatar_url };
    }
    return { children: user?.name?.charAt(0).toUpperCase() || 'U' };
  };

  if (isLoading) {
    return (
      <HeaderContainer>
        <HeaderBackground />
        <ProfileContent>
          <AvatarWrapper>
            <Skeleton variant="circular" width={120} height={120} />
          </AvatarWrapper>
          <UserInfoSection>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={150} height={24} />
          </UserInfoSection>
        </ProfileContent>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <HeaderBackground />
      <ProfileContent>
        <AvatarWrapper>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Tooltip title="Change photo">
                <AvatarEditButton size="small" onClick={handleAvatarClick} disabled={isUploading}>
                  <CameraAltIcon fontSize="small" />
                </AvatarEditButton>
              </Tooltip>
            }
          >
            <StyledAvatar {...getAvatarContent()} />
          </Badge>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </AvatarWrapper>

        <UserInfoSection>
          <UserName>{user?.name}</UserName>

          <UserStats>
            <StatItem>
              <StatValue>
                <InventoryIcon sx={{ fontSize: 16 }} />
                {itemsCount}
              </StatValue>
              <StatLabel>Items Posted</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>
                <CalendarTodayIcon sx={{ fontSize: 14 }} />
                {user?.createdAt ? formatMonthYear(user.createdAt) : 'N/A'}
              </StatValue>
              <StatLabel>Member Since</StatLabel>
            </StatItem>
          </UserStats>
        </UserInfoSection>

        <EditProfileButton variant="outlined" startIcon={<EditIcon />} onClick={onEditClick}>
          Edit Profile
        </EditProfileButton>
      </ProfileContent>
    </HeaderContainer>
  );
}

export default ProfileHeader;
