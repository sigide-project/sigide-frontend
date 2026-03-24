import { styled, keyframes, css } from '@mui/material/styles';
import { Box, Typography, Chip, Paper } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

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

export const BadgeContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-wrap: wrap;
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
