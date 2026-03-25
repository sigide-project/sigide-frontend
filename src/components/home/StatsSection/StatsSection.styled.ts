import { styled } from '@mui/material/styles';
import { tc, ts, typography, spacing, borderRadius, transitions } from '@/theme';
import { breakpoints } from '@/theme/theme';

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
