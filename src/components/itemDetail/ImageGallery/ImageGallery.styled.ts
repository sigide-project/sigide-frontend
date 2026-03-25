import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import {
  tc,
  ts,
  getThemeColors,
  getThemeShadows,
  spacing,
  borderRadius,
  transitions,
} from '@/theme';

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
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.md)};
  animation: ${scaleIn} 0.5s ${transitions.easing.easeOut} forwards;
`;

interface MainImageProps {
  imageUrl?: string;
}

export const MainImage = styled(Box, { shouldForwardProp })<MainImageProps>(({
  imageUrl,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    width: 100%;
    height: 450px;
    background-image: ${imageUrl ? `url(${imageUrl})` : 'none'};
    background-size: cover;
    background-position: center;
    background-color: ${c.grey[50]};
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
      color: ${c.grey[300]};
      opacity: 0.5;
    }

    @media (max-width: 600px) {
      height: 300px;
    }
  `;
});

export const ThumbnailStrip = styled(Box)`
  display: flex;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  overflow-x: auto;
  background: ${tc((c) => c.grey[50])};
  border-top: 1px solid ${tc((c) => c.grey[100])};

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${tc((c) => c.grey[300])};
    border-radius: ${borderRadius.full};
  }
`;

interface ThumbnailProps {
  imageUrl: string;
  isActive?: boolean;
}

export const Thumbnail = styled(Box, { shouldForwardProp })<ThumbnailProps>(({
  imageUrl,
  isActive,
  theme,
}) => {
  const c = getThemeColors(theme);
  const s = getThemeShadows(theme);
  return css`
    width: 80px;
    height: 80px;
    min-width: 80px;
    border-radius: ${borderRadius.lg};
    background-image: url(${imageUrl});
    background-size: cover;
    background-position: center;
    cursor: pointer;
    border: 3px solid ${isActive ? c.primary.main : 'transparent'};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    box-shadow: ${isActive ? s.purple.sm : 'none'};

    &:hover {
      border-color: ${isActive ? c.primary.main : c.primary[300]};
      transform: scale(1.05);
    }
  `;
});
