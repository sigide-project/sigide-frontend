import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ImageIcon from '@mui/icons-material/Image';
import type { Item } from '@/types';
import {
  ItemCardContainer,
  ItemCardImage,
  ItemImage,
  NoImagePlaceholder,
  ItemCardContent,
  ItemCardHeader,
  ItemTitle,
  TypeChip,
  ItemDetails,
  ItemDetail,
  RewardBadge,
  ItemCardActions,
  ActionButton,
} from './ProfileItemCard.styled';

interface ProfileItemCardProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProfileItemCard({ item, onEdit, onDelete }: ProfileItemCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <ItemCardContainer>
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
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </ItemDetail>
          <ItemDetail>
            <LocationOnIcon fontSize="small" />
            {item.location_name}
          </ItemDetail>
          <ItemDetail>
            <CalendarTodayIcon fontSize="small" />
            {formatDate(item.lost_found_at)}
          </ItemDetail>
          {parseFloat(item.reward_amount) > 0 && (
            <RewardBadge>Reward: ₹{item.reward_amount}</RewardBadge>
          )}
        </ItemDetails>

        <ItemCardActions>
          <ActionButton color="primary" onClick={onEdit} title="Edit item">
            <EditIcon />
          </ActionButton>
          <ActionButton color="error" onClick={onDelete} title="Delete item">
            <DeleteIcon />
          </ActionButton>
        </ItemCardActions>
      </ItemCardContent>
    </ItemCardContainer>
  );
}

export default ProfileItemCard;
