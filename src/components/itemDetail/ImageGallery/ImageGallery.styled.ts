import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { colors, spacing, borderRadius, shadows, transitions } from '@/theme';

const shouldForwardProp = (prop: string) => !['imageUrl', 'isActive'].includes(prop);

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

export const ImageGalleryContainer = styled(Paper)`
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
