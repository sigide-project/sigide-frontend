import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { colors } from '@/theme';

export const HeaderContainer = styled('div')`
  position: relative;
  margin-bottom: 24px;
`;

export const HeaderBackground = styled('div')`
  height: 160px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.main} 0%,
    ${({ theme }) => theme.palette.primary.dark} 100%
  );
  border-radius: 24px 24px 0 0;
`;

export const ProfileContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 24px;
  margin-top: -60px;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    gap: 24px;
  }
`;

export const AvatarWrapper = styled('div')`
  position: relative;
`;

export const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  border: 4px solid ${({ theme }) => theme.palette.background.paper};
  font-size: 2.5rem;
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const AvatarEditButton = styled(IconButton)`
  background: ${({ theme }) => theme.palette.background.paper};
  border: 2px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }) => theme.palette.grey[100]};
  }
`;

export const UserInfoSection = styled('div')`
  flex: 1;
  text-align: center;
  margin-top: 16px;

  @media (min-width: 768px) {
    text-align: left;
    margin-top: 0;
  }
`;

export const UserName = styled('h1')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${colors.text.inverse};
  margin: 0 0 12px;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const UserStats = styled('div')`
  display: flex;
  justify-content: center;
  gap: 32px;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const StatItem = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

export const StatValue = styled('span')`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const StatLabel = styled('span')`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const EditProfileButton = styled(Button)`
  margin-top: 16px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 500;
  padding: 8px 24px;

  @media (min-width: 768px) {
    margin-top: 0;
    position: absolute;
    right: 24px;
    bottom: 24px;
  }
`;
