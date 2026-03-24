import { styled, css } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colors, typography, spacing, borderRadius, transitions } from '@/theme';

const shouldForwardProp = (prop: string) => prop !== 'expanded';

export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.background.gradient};
`;

export const HeroSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  padding-top: calc(72px + ${spacing[20]});
  background: ${colors.background.hero};
  text-align: center;
`;

export const HeroTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['5xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing[4]};

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['4xl']};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

export const ContentSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  background: ${colors.background.paper};
  flex: 1;
`;

export const FAQList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

interface FAQItemProps {
  expanded?: boolean;
}

export const FAQItem = styled('div', { shouldForwardProp })<FAQItemProps>(
  ({ expanded }) => css`
    background: ${colors.background.gradient};
    border-radius: ${borderRadius.xl};
    border: 1px solid ${expanded ? colors.primary[200] : colors.grey[100]};
    overflow: hidden;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      border-color: ${colors.primary[200]};
    }
  `
);

export const FAQQuestion = styled('button')`
  width: 100%;
  padding: ${spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  transition: color ${transitions.duration.fast};

  &:hover {
    color: ${colors.primary.main};
  }
`;

interface ExpandIconProps {
  expanded?: boolean;
}

export const ExpandIcon = styled('span', { shouldForwardProp })<ExpandIconProps>(
  ({ expanded }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: ${borderRadius.full};
    background: ${expanded ? colors.primary[100] : colors.grey[100]};
    color: ${expanded ? colors.primary.main : colors.text.secondary};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    transform: rotate(${expanded ? '180deg' : '0deg'});
  `
);

interface FAQAnswerProps {
  expanded?: boolean;
}

export const FAQAnswer = styled('div', { shouldForwardProp })<FAQAnswerProps>(
  ({ expanded }) => css`
    padding: ${expanded ? `0 ${spacing[6]} ${spacing[6]}` : '0'};
    max-height: ${expanded ? '500px' : '0'};
    opacity: ${expanded ? 1 : 0};
    overflow: hidden;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    font-size: ${typography.fontSize.base};
    color: ${colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
  `
);
