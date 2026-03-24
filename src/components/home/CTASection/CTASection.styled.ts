import { styled, keyframes, css } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';
import { breakpoints } from '@/theme/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$');

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const CTASection = styled('section')`
  padding: ${spacing[24]} ${spacing[6]};
  background: ${colors.background.paper};
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
  background: ${colors.decorative.purple};
  border-radius: ${borderRadius['3xl']};
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: ${shadows.purple.xl};

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
  color: ${colors.text.inverse};
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
  color: rgba(255, 255, 255, 0.9);
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
  background: ${colors.background.paper};
  color: ${colors.primary[700]};
  text-transform: none;
  box-shadow: ${shadows.lg};
  position: relative;
  z-index: 1;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${shadows.xl};
    background: ${colors.background.paper};
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

export const DecorativeRing = styled('div', { shouldForwardProp })<DecorativeRingProps>(
  ({ size, top, right }) => css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    ${top && `top: ${top};`}
    ${right && `right: ${right};`}
    animation: ${spin} 20s linear infinite;
  `
);
