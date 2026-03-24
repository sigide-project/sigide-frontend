import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActionArea, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ImageIcon from '@mui/icons-material/Image';
import NearMeIcon from '@mui/icons-material/NearMe';
import { formatDistanceToNow } from 'date-fns';
import type { Item } from '@/types';
import {
  StyledCard,
  ImageContainer,
  StyledCardMedia,
  StyledCardContent,
  TypeBadge,
  CategoryChip,
  Title,
  MetaContainer,
  MetaItem,
  RewardBadge,
  ImagePlaceholder,
  HeaderRow,
  LocationText,
  DistanceBadge,
  HoverOverlay,
} from './ItemCard.styled';

function formatDistanceMeters(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

export interface ItemCardProps {
  item: Item;
  onClick?: (item: Item) => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const navigate = useNavigate();

  const {
    id,
    type,
    title,
    category,
    image_urls,
    location_name,
    createdAt,
    distance,
    reward_amount,
  } = item;

  const photoUrl = image_urls?.[0];
  const rewardAmount = parseFloat(reward_amount || '0');

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(item);
    } else {
      navigate(`/item/${id}`);
    }
  }, [onClick, item, navigate, id]);

  const relativeTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : null;

  return (
    <StyledCard>
      <CardActionArea
        onClick={handleClick}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <ImageContainer>
          {photoUrl ? (
            <StyledCardMedia image={photoUrl} title={title} />
          ) : (
            <ImagePlaceholder>
              <ImageIcon />
            </ImagePlaceholder>
          )}
          <TypeBadge label={type.toUpperCase()} size="small" className={type} />
          {distance !== undefined && distance !== null && (
            <DistanceBadge>
              <NearMeIcon />
              {formatDistanceMeters(distance)}
            </DistanceBadge>
          )}
          <HoverOverlay />
        </ImageContainer>

        <StyledCardContent>
          <HeaderRow>
            <Title variant="subtitle1">{title}</Title>
            {rewardAmount > 0 && (
              <RewardBadge>
                <LocalOfferIcon />₹{rewardAmount.toLocaleString()}
              </RewardBadge>
            )}
          </HeaderRow>

          {category && (
            <Box mb={1}>
              <CategoryChip label={category} size="small" />
            </Box>
          )}

          {location_name && (
            <LocationText>
              <LocationOnIcon />
              <Box
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {location_name}
              </Box>
            </LocationText>
          )}

          <MetaContainer>
            {relativeTime && (
              <MetaItem>
                <AccessTimeIcon />
                {relativeTime}
              </MetaItem>
            )}
          </MetaContainer>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default ItemCard;
