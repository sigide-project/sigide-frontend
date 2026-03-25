import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Typography, Chip, Paper } from '@mui/material';
import { tc, ts, getThemeColors, typography, spacing, borderRadius, transitions } from '@/theme';

const shouldForwardProp = (prop: string) => !['status'].includes(prop);

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

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.2); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.4); }
`;

export const DetailsCard = styled(Paper)`
  padding: ${spacing[8]};
  border-radius: ${borderRadius['2xl']};
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[100])};
  box-shadow: ${ts((s) => s.sm)};
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
    background: ${tc((c) => c.lost.gradient)};
    color: ${tc((c) => c.lost.dark)};
    border: 1px solid ${tc((c) => c.lost.main)};
  }

  &.found {
    background: ${tc((c) => c.found.gradient)};
    color: ${tc((c) => c.found.dark)};
    border: 1px solid ${tc((c) => c.found.main)};
  }
`;

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = styled(Chip, { shouldForwardProp })<StatusBadgeProps>(({
  status,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    font-weight: ${typography.fontWeight.semibold};
    font-size: ${typography.fontSize.xs};
    height: auto;
    padding: ${spacing[1]} ${spacing[2]};
    border-radius: ${borderRadius.base};

    ${status === 'open' &&
    css`
      background: ${c.info.light};
      color: ${c.info.dark};
      border: 1px solid ${c.info.main};
    `}

    ${status === 'claimed' &&
    css`
      background: ${c.warning.light};
      color: ${c.warning.dark};
      border: 1px solid ${c.warning.main};
    `}

      ${status === 'resolved' &&
    css`
      background: ${c.success.light};
      color: ${c.success.dark};
      border: 1px solid ${c.success.main};
    `}

      ${status === 'expired' &&
    css`
      background: ${c.grey[100]};
      color: ${c.grey[600]};
      border: 1px solid ${c.grey[300]};
    `}
  `;
});

export const Title = styled(Typography)`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['2xl']};
  }
`;

export const CategoryChip = styled(Chip)`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  background: ${tc((c) => c.primary[50])};
  color: ${tc((c) => c.primary[700])};
  border: 1px solid ${tc((c) => c.primary[100])};
  height: auto;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.base};
`;

export const Description = styled(Typography)`
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  white-space: pre-wrap;
  font-size: ${typography.fontSize.base};
`;

export const InfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  background: ${tc((c) => c.background.hero)};
  border-radius: ${borderRadius.xl};
  border: 1px solid ${tc((c) => c.primary[100])};
`;

export const InfoRow = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};

  svg {
    color: ${tc((c) => c.primary.main)};
    font-size: 1.5rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

export const InfoLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing[1]};
`;

export const InfoValue = styled(Typography)`
  font-weight: ${typography.fontWeight.medium};
  color: ${tc((c) => c.text.primary)};
  font-size: ${typography.fontSize.base};
`;

export const RewardCard = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding: ${spacing[5]} ${spacing[6]};
  background: ${tc((c) => c.reward.gradient)};
  border-radius: ${borderRadius.xl};
  border: 2px solid ${tc((c) => c.reward.main)};
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
    color: ${tc((c) => c.reward.dark)};
    font-size: 2rem;
    position: relative;
    z-index: 1;
  }
`;

export const RewardAmount = styled(Typography)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.extrabold};
  color: ${tc((c) => c.reward.dark)};
  position: relative;
  z-index: 1;
`;

export const RewardLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.reward.dark)};
  opacity: 0.8;
  font-weight: ${typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  position: relative;
  z-index: 1;
`;

export const BadgeContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-wrap: wrap;
`;

export const Divider = styled(Box)`
  height: 1px;
  background: ${tc((c) => c.grey[100])};
  margin: ${spacing[6]} 0;
`;

export const SectionLabel = styled(Typography)`
  font-size: ${typography.fontSize.xs};
  color: ${tc((c) => c.text.tertiary)};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing[3]};
`;
