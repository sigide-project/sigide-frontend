import { styled, keyframes } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Chip, Typography, Box } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const StyledCard = styled(Card)`
  position: relative;
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.sm};
  transition:
    box-shadow ${transitions.duration.normal} ${transitions.easing.easeInOut},
    border-color ${transitions.duration.normal} ${transitions.easing.easeInOut};
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;

  &:hover {
    box-shadow: ${shadows.purple.lg};
    border-color: ${colors.primary[200]};
  }

  &:hover .card-media {
    transform: scale(1.05);
  }

  &:hover .hover-overlay {
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.decorative.purple};
    opacity: 0;
    transition: opacity ${transitions.duration.normal} ${transitions.easing.easeInOut};
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const ImageContainer = styled(Box)`
  position: relative;
  overflow: hidden;
  height: 200px;
`;

export const CardMediaWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  height: 200px;
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  transition: transform ${transitions.duration.slow} ${transitions.easing.easeInOut};
` as typeof CardMedia;

export const CardOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
  opacity: 0;
  transition: opacity ${transitions.duration.normal} ${transitions.easing.easeInOut};
  pointer-events: none;
`;

export const HoverOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.3) 100%);
  opacity: 0;
  transition: opacity ${transitions.duration.normal} ${transitions.easing.easeInOut};
  pointer-events: none;
`;

export const TypeBadge = styled(Chip)`
  position: absolute;
  top: ${spacing[3]};
  left: ${spacing[3]};
  font-weight: ${typography.fontWeight.bold};
  text-transform: uppercase;
  font-size: ${typography.fontSize.xs};
  letter-spacing: ${typography.letterSpacing.wider};
  z-index: 2;
  backdrop-filter: blur(8px);
  border-radius: ${borderRadius.base};
  height: auto;
  padding: ${spacing[1]} ${spacing[2]};

  &.lost {
    background: ${colors.lost.gradient};
    color: ${colors.lost.dark};
    border: 1px solid ${colors.lost.main};
  }

  &.found {
    background: ${colors.found.gradient};
    color: ${colors.found.dark};
    border: 1px solid ${colors.found.main};
  }
`;

export const RewardBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  background: ${colors.reward.gradient};
  color: ${colors.reward.dark};
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.xs};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.base};
  border: 1px solid ${colors.reward.main};

  svg {
    font-size: 0.875rem;
  }
`;

export const DistanceBadge = styled(Box)`
  position: absolute;
  top: ${spacing[3]};
  right: ${spacing[3]};
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  background: rgba(255, 255, 255, 0.9);
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.xs};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.base};
  backdrop-filter: blur(8px);
  z-index: 2;

  svg {
    font-size: 0.875rem;
    color: ${colors.primary.main};
  }
`;

export const StyledCardContent = styled(CardContent)`
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  flex: 1;
`;

export const HeaderRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing[2]};
`;

export const Title = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.lg};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const CardTitle = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.lg};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardDescription = styled(Typography)`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.relaxed};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LocationText = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.tertiary};
  margin-bottom: ${spacing[2]};

  svg {
    font-size: 1rem;
    color: ${colors.primary[400]};
    flex-shrink: 0;
  }
`;

export const MetaContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  margin-top: auto;
  padding-top: ${spacing[3]};
  border-top: 1px solid ${colors.grey[100]};
`;

export const CardMeta = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  margin-top: auto;
  padding-top: ${spacing[3]};
  border-top: 1px solid ${colors.grey[100]};
`;

export const MetaItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.tertiary};

  svg {
    font-size: 1rem;
    color: ${colors.primary[400]};
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CategoryChip = styled(Chip)`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  background: ${colors.primary[50]};
  color: ${colors.primary[700]};
  border: 1px solid ${colors.primary[100]};
  height: auto;
  padding: 0.125rem ${spacing[1]};
  border-radius: ${borderRadius.base};

  .MuiChip-label {
    padding: 0 ${spacing[2]};
  }
`;

export const ImagePlaceholder = styled(Box)`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${colors.grey[50]} 0%, ${colors.grey[100]} 100%);

  svg {
    font-size: 4rem;
    color: ${colors.grey[300]};
    opacity: 0.5;
  }
`;

export const PlaceholderImage = styled(Box)`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${colors.grey[50]} 0%, ${colors.grey[100]} 100%);

  svg {
    font-size: 4rem;
    color: ${colors.grey[300]};
    opacity: 0.5;
  }
`;

export const SkeletonCard = styled(Card)`
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
`;

export const SkeletonMedia = styled(Box)`
  height: 200px;
  background: linear-gradient(
    90deg,
    ${colors.grey[100]} 25%,
    ${colors.grey[50]} 50%,
    ${colors.grey[100]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonContent = styled(Box)`
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

export const SkeletonLine = styled(Box)<{ width?: string; height?: string }>`
  height: ${({ height }) => height || '16px'};
  width: ${({ width }) => width || '100%'};
  border-radius: ${borderRadius.base};
  background: linear-gradient(
    90deg,
    ${colors.grey[100]} 25%,
    ${colors.grey[50]} 50%,
    ${colors.grey[100]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;
