import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { tc, ts } from '@/theme';
import { borderRadius, breakpoints } from '@/theme/theme';

const orbFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.1); }
  50% { transform: translate(-10px, -40px) scale(0.95); }
  75% { transform: translate(-30px, -10px) scale(1.05); }
`;

const glitchShift = keyframes`
  0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
  20% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 2px); }
  40% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
  60% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 4px); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(2px, -4px); }
`;

const scanline = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`;

const particleDrift = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
`;

export const PageContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${tc((c) => c.background.gradient)};
  padding: 2rem;
`;

export const BackgroundOrb = styled(Box)<{
  size: number;
  top: string;
  left: string;
  delay: number;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${tc((c) => c.decorative.violet)};
  opacity: 0.08;
  filter: blur(60px);
  animation: ${orbFloat} ${({ delay }) => 8 + delay}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  pointer-events: none;
`;

export const Particle = styled(Box)<{
  left: string;
  size: number;
  delay: number;
  duration: number;
}>`
  position: absolute;
  bottom: -20px;
  left: ${({ left }) => left};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${tc((c) => c.primary.main)};
  opacity: 0;
  animation: ${particleDrift} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  pointer-events: none;
`;

export const ContentWrapper = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 640px;
  width: 100%;
`;

export const GlitchWrapper = styled(Box)`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const GlitchText = styled(Typography)`
  font-size: clamp(7rem, 20vw, 14rem);
  font-weight: 800;
  line-height: 1;
  background: ${tc((c) => c.decorative.purple)};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  user-select: none;
  position: relative;
`;

export const GlitchOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  font-size: clamp(7rem, 20vw, 14rem);
  font-weight: 800;
  line-height: 1;
  background: ${tc((c) => c.decorative.violet)};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${glitchShift} 3s ease-in-out infinite;
  opacity: 0.6;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScanlineOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: ${borderRadius.xl};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${tc((c) => c.primary.light)};
    opacity: 0.15;
    animation: ${scanline} 4s linear infinite;
    filter: blur(1px);
  }
`;

export const Subtitle = styled(Typography)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  color: ${tc((c) => c.text.primary)};
  margin-bottom: 0.75rem;
`;

export const Description = styled(Typography)`
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: ${tc((c) => c.text.secondary)};
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 480px;
`;

export const ButtonGroup = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PrimaryButton = styled(Button)`
  background: ${tc((c) => c.decorative.purple)};
  color: #fff;
  padding: 14px 36px;
  border-radius: ${borderRadius.full};
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  box-shadow: ${ts((s) => s.purple.md)};
  transition: all 0.3s ease;

  &:hover {
    background: ${tc((c) => c.decorative.violet)};
    box-shadow: ${ts((s) => s.purple.lg)};
    transform: translateY(-2px);
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 12px 28px;
    font-size: 0.9rem;
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${tc((c) => c.glass.subtle)};
  color: ${tc((c) => c.primary.main)};
  padding: 14px 36px;
  border-radius: ${borderRadius.full};
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  border: 2px solid ${tc((c) => c.primary[200])};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    background: ${tc((c) => c.primary[50])};
    border-color: ${tc((c) => c.primary.main)};
    transform: translateY(-2px);
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 12px 28px;
    font-size: 0.9rem;
  }
`;

export const GlassCard = styled(Box)`
  background: ${tc((c) => c.glass.medium)};
  backdrop-filter: blur(20px);
  border: 1px solid ${tc((c) => c.glass.border)};
  border-radius: ${borderRadius['2xl']};
  padding: 3rem 2.5rem;
  box-shadow: ${ts((s) => s.purple.md)};
  position: relative;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    padding: 2rem 1.5rem;
  }
`;

export const CompassWrapper = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${tc((c) => c.primary[50])};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border: 2px solid ${tc((c) => c.primary[200])};
  color: ${tc((c) => c.primary.main)};
  font-size: 2rem;
`;
