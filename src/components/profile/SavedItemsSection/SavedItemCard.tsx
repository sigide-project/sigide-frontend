import { useNavigate } from 'react-router-dom';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import type { Item } from '@/types';
import { formatDateShort, capitalizeFirst } from '@/utils';

const ItemCardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ItemCardImage = styled('div')`
  position: relative;
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const ItemImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImagePlaceholder = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

const ItemCardContent = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`;

const ItemCardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const ItemTitle = styled('h3')`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TypeChip = styled(Chip)<{ itemType: string }>`
  font-size: 0.7rem;
  height: 24px;
  background-color: ${({ theme, itemType }) =>
    itemType === 'lost' ? theme.palette.error.light : theme.palette.success.light};
  color: ${({ theme, itemType }) =>
    itemType === 'lost' ? theme.palette.error.dark : theme.palette.success.dark};
`;

const ItemDetails = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemDetail = styled('div')`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.text.secondary};

  svg {
    font-size: 1rem;
    color: ${({ theme }) => theme.palette.grey[500]};
  }
`;

const OwnerInfo = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const RewardBadge = styled('span')`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.palette.warning.light};
  color: ${({ theme }) => theme.palette.warning.dark};
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ItemCardActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;

const ActionButton = styled(IconButton)`
  padding: 8px;
`;

interface SavedItemCardProps {
  item: Item;
  onRemove: () => void;
  isRemoving?: boolean;
}

export function SavedItemCard({ item, onRemove, isRemoving }: SavedItemCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <ItemCardContainer onClick={handleCardClick}>
      <ItemCardImage>
        {item.image_urls && item.image_urls.length > 0 ? (
          <ItemImage src={item.image_urls[0]} alt={item.title} />
        ) : (
          <NoImagePlaceholder>
            <ImageIcon fontSize="large" />
          </NoImagePlaceholder>
        )}
      </ItemCardImage>

      <ItemCardContent>
        <ItemCardHeader>
          <ItemTitle>{item.title}</ItemTitle>
          <TypeChip label={item.type.toUpperCase()} itemType={item.type} size="small" />
        </ItemCardHeader>

        <ItemDetails>
          <ItemDetail>
            <CategoryIcon fontSize="small" />
            {capitalizeFirst(item.category)}
          </ItemDetail>
          <ItemDetail>
            <LocationOnIcon fontSize="small" />
            {item.location_name}
          </ItemDetail>
          <ItemDetail>
            <CalendarTodayIcon fontSize="small" />
            {formatDateShort(item.lost_found_at)}
          </ItemDetail>
          {parseFloat(item.reward_amount) > 0 && (
            <RewardBadge>Reward: ₹{item.reward_amount}</RewardBadge>
          )}
        </ItemDetails>

        {item.owner && <OwnerInfo>Posted by {item.owner.name}</OwnerInfo>}

        <ItemCardActions>
          <ActionButton
            color="error"
            onClick={handleRemoveClick}
            title="Remove from saved"
            disabled={isRemoving}
          >
            <BookmarkRemoveIcon />
          </ActionButton>
        </ItemCardActions>
      </ItemCardContent>
    </ItemCardContainer>
  );
}

export default SavedItemCard;
