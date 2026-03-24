import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

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

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

export const HeroSection = styled(Box)`
  position: relative;
  padding: ${spacing[16]} ${spacing[6]} ${spacing[12]};
  padding-top: calc(72px + ${spacing[16]});
  width: 100%;
  background: ${colors.background.hero};
  border-radius: 0 0 ${borderRadius['3xl']} ${borderRadius['3xl']};
  margin-bottom: ${spacing[8]};
  overflow: hidden;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, ${colors.primary[200]} 0%, transparent 70%);
    opacity: 0.5;
    animation: ${pulse} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, ${colors.secondary[200]} 0%, transparent 70%);
    opacity: 0.4;
    animation: ${pulse} 10s ease-in-out infinite reverse;
  }

  @media (max-width: 600px) {
    padding: ${spacing[10]} ${spacing[4]} ${spacing[8]};
    padding-top: calc(72px + ${spacing[10]});
  }
`;

export const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 0 ${spacing[6]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} forwards;

  @media (max-width: 600px) {
    padding: 0 ${spacing[4]};
  }
`;

export const HeroTitle = styled(Typography)`
  font-size: ${typography.fontSize['5xl']};
  font-weight: ${typography.fontWeight.extrabold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.text.primary};
  margin-bottom: ${spacing[4]};

  span {
    background: ${colors.decorative.purple};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 900px) {
    font-size: ${typography.fontSize['4xl']};
  }

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['3xl']};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 600px;

  @media (max-width: 600px) {
    font-size: ${typography.fontSize.base};
  }
`;

export const StatsRow = styled(Box)`
  display: flex;
  gap: ${spacing[6]};
  margin-top: ${spacing[8]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} 0.2s forwards;
  opacity: 0;

  @media (max-width: 600px) {
    gap: ${spacing[4]};
    flex-wrap: wrap;
  }
`;

export const StatItem = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${spacing[4]} ${spacing[6]};
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: ${borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: ${shadows.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.purple.sm};
    border-color: ${colors.primary[200]};
  }
`;

export const StatValue = styled(Typography)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
`;

export const StatLabel = styled(Typography)`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.medium};
`;

interface FloatingShapeProps {
  delay?: number;
  size?: number;
  top?: string;
  right?: string;
}

export const FloatingShape = styled(Box, { shouldForwardProp })<FloatingShapeProps>(
  ({ delay, size, top, right }) => css`
    position: absolute;
    width: ${size || 60}px;
    height: ${size || 60}px;
    top: ${top || '20%'};
    right: ${right || '10%'};
    background: ${colors.decorative.purple};
    border-radius: ${borderRadius.xl};
    opacity: 0.1;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: ${delay || 0}s;
    z-index: 0;

    @media (max-width: 900px) {
      display: none;
    }
  `
);

export const QuickFilters = styled(Box)`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
  margin-top: ${spacing[6]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} 0.3s forwards;
  opacity: 0;
`;

interface QuickFilterButtonProps {
  active?: boolean;
  variant?: 'lost' | 'found' | 'all';
}

export const QuickFilterButton = styled(Box, { shouldForwardProp })<QuickFilterButtonProps>(
  ({ active, variant }) => css`
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[3]} ${spacing[5]};
    border-radius: ${borderRadius.full};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    cursor: pointer;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    border: 2px solid transparent;

    ${active
      ? variant === 'lost'
        ? css`
            background: ${colors.lost.light};
            color: ${colors.lost.dark};
            border-color: ${colors.lost.main};
          `
        : variant === 'found'
          ? css`
              background: ${colors.found.light};
              color: ${colors.found.dark};
              border-color: ${colors.found.main};
            `
          : css`
              background: ${colors.primary[100]};
              color: ${colors.primary[700]};
              border-color: ${colors.primary.main};
            `
      : css`
          background: rgba(255, 255, 255, 0.8);
          color: ${colors.text.secondary};
          border-color: ${colors.grey[200]};
          backdrop-filter: blur(10px);

          &:hover {
            border-color: ${colors.primary[300]};
            color: ${colors.primary.main};
            background: ${colors.background.paper};
          }
        `}

    svg {
      font-size: 18px;
    }
  `
);
