import { styled, keyframes, css } from '@mui/material/styles';
import { Container, Box, Typography, Chip, Button, Paper, Avatar } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

const shouldForwardProp = (prop: string) => !['imageUrl', 'isActive', 'status'].includes(prop);

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.2); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.4); }
`;

export const PageContainer = styled(Container)`
  padding-top: calc(72px + ${spacing[6]});
  padding-bottom: ${spacing[16]};
  position: relative;
  min-height: 100vh;
`;

export const BackButton = styled(Button)`
  margin-bottom: ${spacing[6]};
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.secondary};
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${borderRadius.lg};
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[200]};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;

  &:hover {
    background: ${colors.primary[50]};
    border-color: ${colors.primary[200]};
    color: ${colors.primary.main};
    transform: translateX(-4px);
  }

  svg {
    transition: transform ${transitions.duration.normal} ${transitions.easing.easeInOut};
  }

  &:hover svg {
    transform: translateX(-4px);
  }
`;

export const ContentWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing[8]};
  animation: ${fadeInUp} 0.6s ${transitions.easing.easeOut} forwards;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 380px;
  }
`;

export const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

export const ImageGallery = styled(Paper)`
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.md};
  animation: ${scaleIn} 0.5s ${transitions.easing.easeOut} forwards;
`;

interface MainImageProps {
  imageUrl?: string;
}

export const MainImage = styled(Box, { shouldForwardProp })<MainImageProps>(
  ({ imageUrl }) => css`
    width: 100%;
    height: 450px;
    background-image: ${imageUrl ? `url(${imageUrl})` : 'none'};
    background-size: cover;
    background-position: center;
    background-color: ${colors.grey[50]};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all ${transitions.duration.slow} ${transitions.easing.easeInOut};

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.1) 100%);
      pointer-events: none;
    }

    svg {
      font-size: 5rem;
      color: ${colors.grey[300]};
      opacity: 0.5;
    }

    @media (max-width: 600px) {
      height: 300px;
    }
  `
);

export const ThumbnailStrip = styled(Box)`
  display: flex;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  overflow-x: auto;
  background: ${colors.grey[50]};
  border-top: 1px solid ${colors.grey[100]};

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey[300]};
    border-radius: ${borderRadius.full};
  }
`;

interface ThumbnailProps {
  imageUrl: string;
  isActive?: boolean;
}

export const Thumbnail = styled(Box, { shouldForwardProp })<ThumbnailProps>(
  ({ imageUrl, isActive }) => css`
    width: 80px;
    height: 80px;
    min-width: 80px;
    border-radius: ${borderRadius.lg};
    background-image: url(${imageUrl});
    background-size: cover;
    background-position: center;
    cursor: pointer;
    border: 3px solid ${isActive ? colors.primary.main : 'transparent'};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    box-shadow: ${isActive ? shadows.purple.sm : 'none'};

    &:hover {
      border-color: ${isActive ? colors.primary.main : colors.primary[300]};
      transform: scale(1.05);
    }
  `
);

export const DetailsCard = styled(Paper)`
  padding: ${spacing[8]};
  border-radius: ${borderRadius['2xl']};
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.sm};
  animation: ${fadeInUp} 0.6s ${transitions.easing.easeOut} 0.1s forwards;
  opacity: 0;
`;

export const TypeBadge = styled(Chip)`
  font-weight: ${typography.fontWeight.bold};
  text-transform: uppercase;
  font-size: ${typography.fontSize.xs};
  letter-spacing: ${typography.letterSpacing.wider};
  padding: ${spacing[1]} ${spacing[2]};
  height: auto;
  border-radius: ${borderRadius.base};

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

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = styled(Chip, { shouldForwardProp })<StatusBadgeProps>(
  ({ status }) => css`
    font-weight: ${typography.fontWeight.semibold};
    font-size: ${typography.fontSize.xs};
    height: auto;
    padding: ${spacing[1]} ${spacing[2]};
    border-radius: ${borderRadius.base};

    ${status === 'open' &&
    css`
      background: ${colors.info.light};
      color: ${colors.info.dark};
      border: 1px solid ${colors.info.main};
    `}

    ${status === 'claimed' &&
    css`
      background: ${colors.warning.light};
      color: ${colors.warning.dark};
      border: 1px solid ${colors.warning.main};
    `}

    ${status === 'resolved' &&
    css`
      background: ${colors.success.light};
      color: ${colors.success.dark};
      border: 1px solid ${colors.success.main};
    `}

    ${status === 'expired' &&
    css`
      background: ${colors.grey[100]};
      color: ${colors.grey[600]};
      border: 1px solid ${colors.grey[300]};
    `}
  `
);

export const Title = styled(Typography)`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['2xl']};
  }
`;

export const CategoryChip = styled(Chip)`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  background: ${colors.primary[50]};
  color: ${colors.primary[700]};
  border: 1px solid ${colors.primary[100]};
  height: auto;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.base};
`;

export const Description = styled(Typography)`
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  white-space: pre-wrap;
  font-size: ${typography.fontSize.base};
`;

export const InfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  background: ${colors.background.hero};
  border-radius: ${borderRadius.xl};
  border: 1px solid ${colors.primary[100]};
`;

export const InfoRow = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};

  svg {
    color: ${colors.primary.main};
    font-size: 1.5rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

export const InfoLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing[1]};
`;

export const InfoValue = styled(Typography)`
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.base};
`;

export const RewardCard = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding: ${spacing[5]} ${spacing[6]};
  background: ${colors.reward.gradient};
  border-radius: ${borderRadius.xl};
  border: 2px solid ${colors.reward.main};
  position: relative;
  overflow: hidden;
  animation: ${glow} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
  }

  svg {
    color: ${colors.reward.dark};
    font-size: 2rem;
    position: relative;
    z-index: 1;
  }
`;

export const RewardAmount = styled(Typography)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.extrabold};
  color: ${colors.reward.dark};
  position: relative;
  z-index: 1;
`;

export const RewardLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${colors.reward.dark};
  opacity: 0.8;
  font-weight: ${typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  position: relative;
  z-index: 1;
`;

export const SidebarCard = styled(Paper)`
  padding: ${spacing[6]};
  border-radius: ${borderRadius['2xl']};
  background: ${colors.background.paper};
  border: 1px solid ${colors.grey[100]};
  box-shadow: ${shadows.md};
  position: sticky;
  top: ${spacing[6]};
  animation: ${fadeInUp} 0.6s ${transitions.easing.easeOut} 0.2s forwards;
  opacity: 0;
`;

export const OwnerSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding-bottom: ${spacing[5]};
  border-bottom: 1px solid ${colors.grey[100]};
  margin-bottom: ${spacing[5]};
`;

export const OwnerAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  background: ${colors.decorative.purple};
  color: ${colors.text.inverse};
  border: 3px solid ${colors.background.paper};
  box-shadow: ${shadows.purple.sm};
`;

export const OwnerName = styled(Typography)`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.lg};
`;

export const OwnerLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  font-weight: ${typography.fontWeight.medium};
`;

export const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: ${typography.fontWeight.semibold};
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${borderRadius.xl};
  font-size: ${typography.fontSize.base};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
`;

export const ContactButton = styled(ActionButton)`
  background: ${colors.decorative.purple};
  color: ${colors.text.inverse};
  box-shadow: ${shadows.purple.sm};

  &:hover {
    background: ${colors.decorative.violet};
    box-shadow: ${shadows.purple.md};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(ActionButton)`
  background: ${colors.background.paper};
  color: ${colors.primary.main};
  border: 2px solid ${colors.primary[200]};

  &:hover {
    background: ${colors.primary[50]};
    border-color: ${colors.primary.main};
  }
`;

export const BadgeContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-wrap: wrap;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  gap: ${spacing[4]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;

export const LoadingSpinner = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: ${borderRadius.full};
  background: ${colors.decorative.purple};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  gap: ${spacing[6]};
  text-align: center;
  padding: ${spacing[8]};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
`;

export const ErrorIcon = styled(Box)`
  width: 100px;
  height: 100px;
  border-radius: ${borderRadius.full};
  background: ${colors.error.light};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 48px;
    color: ${colors.error.main};
  }
`;

export const DateInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  padding-top: ${spacing[5]};
  border-top: 1px solid ${colors.grey[100]};
  margin-top: ${spacing[5]};
`;

export const DateRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateLabel = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.tertiary};
  font-weight: ${typography.fontWeight.medium};
`;

export const DateValue = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
`;

export const ActionButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

export const ShareButton = styled(ActionButton)`
  background: ${colors.grey[100]};
  color: ${colors.text.secondary};
  border: 1px solid ${colors.grey[200]};

  &:hover {
    background: ${colors.grey[200]};
    color: ${colors.text.primary};
  }

  svg {
    margin-right: ${spacing[2]};
  }
`;

export const MapPreview = styled(Box)`
  width: 100%;
  height: 200px;
  border-radius: ${borderRadius.xl};
  background: ${colors.grey[100]};
  margin-top: ${spacing[4]};
  overflow: hidden;
  border: 1px solid ${colors.grey[200]};
  position: relative;

  &::after {
    content: 'Map Preview';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.text.tertiary};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
  }
`;

export const TagsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  margin-top: ${spacing[4]};
`;

export const Tag = styled(Chip)`
  background: ${colors.grey[100]};
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  height: auto;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.full};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: ${colors.primary[100]};
    color: ${colors.primary[700]};
  }
`;

export const Divider = styled(Box)`
  height: 1px;
  background: ${colors.grey[100]};
  margin: ${spacing[6]} 0;
`;

export const SectionLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing[3]};
`;
