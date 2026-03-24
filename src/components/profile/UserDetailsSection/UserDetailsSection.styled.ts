import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export const UserDetailsCard = styled(Card)`
  border-radius: 12px;
`;

export const UserDetailsContent = styled(CardContent)`
  padding: 24px;
`;

export const UserDetailsHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const UserAvatarSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserName = styled('h3')`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`;

export const UserEmail = styled('span')`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const EditButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
`;

export const UserDetailsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const DetailItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled('span')`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DetailValue = styled('span')`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const SkeletonContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
