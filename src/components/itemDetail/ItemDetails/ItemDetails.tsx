import { Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import type { Item } from '@/types';
import { formatDateLong } from '@/utils';
import {
  DetailsCard,
  TypeBadge,
  StatusBadge,
  Title,
  CategoryChip,
  Description,
  InfoSection,
  InfoRow,
  InfoLabel,
  InfoValue,
  RewardCard,
  RewardAmount,
  RewardLabel,
  BadgeContainer,
  Divider,
  SectionLabel,
} from './ItemDetails.styled';

interface ItemDetailsProps {
  item: Item;
}

export function ItemDetails({ item }: ItemDetailsProps) {
  const {
    type,
    status,
    title,
    description,
    category,
    location_name,
    reward_amount,
    lost_found_at,
    createdAt,
  } = item;

  const rewardAmount = parseFloat(reward_amount || '0');
  const hasReward = rewardAmount > 0;

  return (
    <DetailsCard elevation={0}>
      <BadgeContainer mb={3}>
        <TypeBadge label={type.toUpperCase()} size="small" className={type} />
        <StatusBadge label={status.toUpperCase()} size="small" status={status} />
        {category && <CategoryChip label={category} size="small" />}
      </BadgeContainer>

      <Title variant="h3" gutterBottom>
        {title}
      </Title>

      {description && (
        <Box mb={4}>
          <SectionLabel>Description</SectionLabel>
          <Description variant="body1">{description}</Description>
        </Box>
      )}

      <Divider />

      <InfoSection>
        {location_name && (
          <InfoRow>
            <LocationOnIcon />
            <Box>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>{location_name}</InfoValue>
            </Box>
          </InfoRow>
        )}

        {lost_found_at && (
          <InfoRow>
            <CalendarTodayIcon />
            <Box>
              <InfoLabel>{type === 'lost' ? 'Lost On' : 'Found On'}</InfoLabel>
              <InfoValue>{formatDateLong(lost_found_at)}</InfoValue>
            </Box>
          </InfoRow>
        )}

        {createdAt && (
          <InfoRow>
            <ScheduleIcon />
            <Box>
              <InfoLabel>Posted On</InfoLabel>
              <InfoValue>{formatDateLong(createdAt)}</InfoValue>
            </Box>
          </InfoRow>
        )}
      </InfoSection>

      {hasReward && (
        <Box mt={4}>
          <RewardCard>
            <LocalOfferIcon />
            <Box>
              <RewardLabel>Reward Offered</RewardLabel>
              <RewardAmount>₹{rewardAmount.toLocaleString()}</RewardAmount>
            </Box>
          </RewardCard>
        </Box>
      )}
    </DetailsCard>
  );
}

export default ItemDetails;
