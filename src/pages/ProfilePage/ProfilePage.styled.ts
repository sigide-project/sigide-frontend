import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

export const PageContainer = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  padding-top: calc(72px + 24px);
`;

export const ContentWrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 340px;
  }
`;

export const MainContent = styled('div')`
  min-width: 0;
`;

export const Sidebar = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TabPanel = styled('div')`
  &[hidden] {
    display: none;
  }
`;

export const SectionTitle = styled('h2')`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 16px;
`;

export const UserDetailsCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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

export const EditFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EditFormActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const EmailNote = styled('span')`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-style: italic;
`;

export const MyItemsSection = styled('section')`
  display: flex;
  flex-direction: column;
`;

export const ItemsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

export const ItemCardContainer = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ItemCardImage = styled('div')`
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  position: relative;
  overflow: hidden;
`;

export const ItemImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImagePlaceholder = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const ItemCardContent = styled(CardContent)`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ItemCardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const ItemTitle = styled('h4')`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
  flex: 1;
`;

interface TypeChipProps {
  itemType: 'lost' | 'found';
}

const shouldForwardProp = (prop: string) => prop !== 'itemType';

export const TypeChip = styled(Chip, { shouldForwardProp })<TypeChipProps>`
  font-size: 0.75rem;
  font-weight: 600;
  height: 24px;
  background-color: ${({ theme, itemType }) =>
    itemType === 'lost' ? theme.palette.lost.light : theme.palette.found.light};
  color: ${({ theme, itemType }) =>
    itemType === 'lost' ? theme.palette.lost.main : theme.palette.found.main};
`;

export const ItemDetails = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  flex: 1;
`;

export const ItemDetail = styled('span')`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RewardBadge = styled('span')`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.reward.main};
  background-color: ${({ theme }) => theme.palette.reward.light};
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const ItemCardActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export const ActionButton = styled(IconButton)`
  padding: 8px;
`;

export const EmptyState = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  border-radius: 12px;
`;

export const EmptyStateText = styled('p')`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0 0 16px;
`;

export const AddFirstItemButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
`;

export const SkeletonContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

export const DeleteDialogContent = styled('div')`
  padding: 8px 0;
`;

export const DeleteDialogText = styled('p')`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`;
