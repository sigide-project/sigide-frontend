import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

interface TypeChipProps {
  itemType: 'lost' | 'found';
}

const shouldForwardProp = (prop: string) => prop !== 'itemType';

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
