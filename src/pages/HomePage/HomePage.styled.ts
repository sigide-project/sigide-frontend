import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions, getThemeColors } from '@/theme';
import { breakpoints } from '@/theme/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
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

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${tc((c) => c.background.gradient)};
  overflow-x: hidden;
`;

export const HeroSection = styled('section')`
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${spacing[20]} ${spacing[6]};
  overflow: hidden;

  @media (max-width: ${breakpoints.md}) {
    min-height: auto;
    padding: ${spacing[16]} ${spacing[4]};
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing[12]} ${spacing[4]};
  }
`;

export const HeroBackground = styled('div')`
  position: absolute;
  inset: 0;
  background: ${tc((c) => c.background.hero)};
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 50% at 50% -20%,
      rgba(124, 58, 237, 0.15) 0%,
      transparent 70%
    );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 60% 40% at 80% 80%,
      rgba(217, 70, 239, 0.1) 0%,
      transparent 60%
    );
  }
`;

interface FloatingOrbProps {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  color?: string;
}

export const FloatingOrb = styled('div', { shouldForwardProp })<FloatingOrbProps>(({
  size,
  top,
  left,
  right,
  bottom,
  delay,
  color,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${color || c.decorative.purple};
    opacity: 0.1;
    filter: blur(${Math.max(size / 3, 20)}px);
    ${top && `top: ${top};`}
    ${left && `left: ${left};`}
      ${right && `right: ${right};`}
      ${bottom && `bottom: ${bottom};`}
      animation: ${pulse} ${4 + (delay || 0)}s ease-in-out infinite;
    animation-delay: ${delay || 0}s;
    z-index: 0;
    pointer-events: none;

    @media (max-width: ${breakpoints.md}) {
      display: none;
    }
  `;
});

interface FloatingShapeProps {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  variant?: 'square' | 'circle' | 'triangle';
}

export const FloatingShape = styled('div', { shouldForwardProp })<FloatingShapeProps>(({
  size,
  top,
  left,
  right,
  bottom,
  delay,
  variant,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    ${top && `top: ${top};`}
    ${left && `left: ${left};`}
      ${right && `right: ${right};`}
      ${bottom && `bottom: ${bottom};`}
      z-index: 1;
    pointer-events: none;

    ${variant === 'circle'
      ? css`
          border-radius: 50%;
          background: ${c.decorative.purple};
          opacity: 0.15;
        `
      : css`
          border-radius: ${borderRadius.lg};
          background: linear-gradient(135deg, ${c.primary[100]} 0%, ${c.secondary[100]} 100%);
          opacity: 0.4;
        `}

    animation: ${delay && delay % 2 === 0 ? floatReverse : float}
        ${6 + (delay || 0)}s ease-in-out infinite;
    animation-delay: ${delay || 0}s;

    @media (max-width: ${breakpoints.sm}) {
      opacity: 0.2;
      transform: scale(0.7);
    }
  `;
});

export const HeroContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing[8]};
  position: relative;
  z-index: 2;
  max-width: 900px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} forwards;
`;

export const Badge = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.primary[200])};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${tc((c) => c.primary[700])};
  margin-bottom: ${spacing[8]};
  box-shadow: ${ts((s) => s.sm)};
  animation: ${fadeIn} 0.6s ${transitions.easing.easeOut} forwards;
  animation-delay: 0.2s;
  opacity: 0;

  svg {
    font-size: 1rem;
    color: ${tc((c) => c.primary.main)};
  }
`;

export const HeroTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['6xl']};
  font-weight: ${typography.fontWeight.extrabold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[8]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} forwards;
  animation-delay: 0.1s;
  opacity: 0;

  span {
    background: ${tc((c) => c.decorative.purple)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize['5xl']};
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize['4xl']};
    margin-bottom: ${spacing[6]};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 640px;
  margin: 0 auto ${spacing[12]};
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} forwards;
  animation-delay: 0.2s;
  opacity: 0;

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing[10]};
  }
`;

export const CTAContainer = styled('div')`
  display: flex;
  gap: ${spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ${transitions.easing.easeOut} forwards;
  animation-delay: 0.3s;
  opacity: 0;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${spacing[3]};
  }
`;

export const PrimaryButton = styled(Button)`
  padding: ${spacing[4]} ${spacing[8]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.decorative.purple)};
  color: ${tc((c) => c.text.inverse)};
  text-transform: none;
  box-shadow: ${ts((s) => s.purple.md)};
  position: relative;
  overflow: hidden;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, ${tc((c) => c.glass.faint)}, transparent);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity ${transitions.duration.normal} ${transitions.easing.easeInOut};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${ts((s) => s.purple.lg)};
    background: ${tc((c) => c.decorative.purple)};

    &::before {
      opacity: 1;
      animation: ${shimmer} 1.5s infinite;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
  }
`;

export const SecondaryButton = styled(Button)`
  padding: ${spacing[4]} ${spacing[8]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.background.paper)};
  color: ${tc((c) => c.text.primary)};
  text-transform: none;
  border: 2px solid ${tc((c) => c.grey[200])};
  box-shadow: ${ts((s) => s.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-3px);
    border-color: ${tc((c) => c.primary[300])};
    background: ${tc((c) => c.primary[50])};
    box-shadow: ${ts((s) => s.md)};
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
  }
`;

export const StatsSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  background: ${tc((c) => c.background.paper)};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${tc((c) => c.grey[200])} 50%,
      transparent 100%
    );
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing[12]} ${spacing[4]};
  }
`;

export const StatsContainer = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[8]};

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[6]};
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${spacing[4]};
  }
`;

export const StatCard = styled('div')`
  text-align: center;
  padding: ${spacing[6]};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.background.gradient)};
  border: 1px solid ${tc((c) => c.grey[100])};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${ts((s) => s.purple.md)};
    border-color: ${tc((c) => c.primary[200])};
  }
`;

export const StatIcon = styled('div')`
  width: 56px;
  height: 56px;
  margin: 0 auto ${spacing[4]};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.decorative.purple)};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${ts((s) => s.purple.sm)};

  svg {
    font-size: 1.75rem;
    color: ${tc((c) => c.text.inverse)};
  }
`;

export const StatValue = styled('div')`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.extrabold};
  color: ${tc((c) => c.text.primary)};
  font-family: ${typography.fontFamily.display};
  margin-bottom: ${spacing[1]};
`;

export const StatLabel = styled('div')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.secondary)};
  font-weight: ${typography.fontWeight.medium};
`;

export const FeaturesSection = styled('section')`
  padding: ${spacing[24]} ${spacing[6]};
  background: ${tc((c) => c.background.hero)};
  position: relative;

  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing[16]} ${spacing[4]};
  }
`;

export const SectionHeader = styled('div')`
  text-align: center;
  max-width: 640px;
  margin: 0 auto ${spacing[12]};

  @media (max-width: ${breakpoints.sm}) {
    margin-bottom: ${spacing[8]};
  }
`;

export const SectionTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[4]};

  span {
    background: ${tc((c) => c.decorative.purple)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize['3xl']};
  }
`;

export const SectionSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.lg};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize.base};
  }
`;

export const FeaturesGrid = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing[8]};

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[6]};
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${spacing[4]};
  }
`;

export const FeatureCard = styled('div')`
  padding: ${spacing[8]};
  background: ${tc((c) => c.background.paper)};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${ts((s) => s.purple.lg)};
    border-color: ${tc((c) => c.primary[200])};
  }

  &:hover .feature-icon {
    transform: scale(1.1) rotate(-5deg);
  }
`;

interface FeatureIconProps {
  color?: string;
}

export const FeatureIcon = styled('div', { shouldForwardProp })<FeatureIconProps>(({
  color,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    width: 64px;
    height: 64px;
    border-radius: ${borderRadius.xl};
    background: ${color || c.primary[50]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${spacing[5]};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    svg {
      font-size: 2rem;
      color: ${c.primary.main};
    }
  `;
});

export const FeatureTitle = styled('h3')`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  margin: 0 0 ${spacing[3]};
`;

export const FeatureDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;

export const CTASection = styled('section')`
  padding: ${spacing[24]} ${spacing[6]};
  background: ${tc((c) => c.background.paper)};
  position: relative;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing[16]} ${spacing[4]};
  }
`;

export const CTACard = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing[6]};
  max-width: 900px;
  margin: 0 auto;
  padding: ${spacing[12]} ${spacing[10]};
  background: ${tc((c) => c.decorative.purple)};
  border-radius: ${borderRadius['3xl']};
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: ${ts((s) => s.purple.xl)};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing[8]} ${spacing[6]};
    border-radius: ${borderRadius['2xl']};
  }
`;

export const CTATitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.inverse)};
  margin-bottom: ${spacing[6]};
  position: relative;
  z-index: 1;

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing[4]};
  }
`;

export const CTADescription = styled(Typography)`
  font-size: ${typography.fontSize.lg};
  color: ${tc((c) => c.glass.heavy)};
  margin-bottom: ${spacing[10]};
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize.base};
    margin-bottom: ${spacing[8]};
  }
`;

export const CTAWhiteButton = styled(Button)`
  padding: ${spacing[4]} ${spacing[10]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.xl};
  background: ${tc((c) => c.background.paper)};
  color: ${tc((c) => c.primary[700])};
  text-transform: none;
  box-shadow: ${ts((s) => s.lg)};
  position: relative;
  z-index: 1;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${ts((s) => s.xl)};
    background: ${tc((c) => c.background.paper)};
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
  }
`;

interface DecorativeRingProps {
  size: number;
  top?: string;
  right?: string;
}

export const DecorativeRing = styled('div', { shouldForwardProp })<DecorativeRingProps>(({
  size,
  top,
  right,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border: 2px solid ${c.glass.faint};
    border-radius: 50%;
    ${top && `top: ${top};`}
    ${right && `right: ${right};`}
      animation: ${spin} 20s linear infinite;
  `;
});
