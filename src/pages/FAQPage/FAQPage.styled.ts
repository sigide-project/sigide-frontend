import { styled, css } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { tc, typography, spacing, borderRadius, transitions, getThemeColors } from '@/theme';

const shouldForwardProp = (prop: string) => prop !== 'expanded';

export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${tc((c) => c.background.gradient)};
`;

export const HeroSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  padding-top: calc(72px + ${spacing[20]});
  background: ${tc((c) => c.background.hero)};
  text-align: center;
`;

export const HeroTitle = styled(Typography)`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['5xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  margin-bottom: ${spacing[4]};

  @media (max-width: 600px) {
    font-size: ${typography.fontSize['4xl']};
  }
`;

export const HeroSubtitle = styled(Typography)`
  font-size: ${typography.fontSize.xl};
  color: ${tc((c) => c.text.secondary)};
  max-width: 600px;
  margin: 0 auto;
`;

export const ContentSection = styled('section')`
  padding: ${spacing[20]} ${spacing[6]};
  background: ${tc((c) => c.background.paper)};
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

export const FAQItem = styled('div', { shouldForwardProp })<FAQItemProps>(({ expanded, theme }) => {
  const c = getThemeColors(theme);
  return css`
    background: ${c.background.gradient};
    border-radius: ${borderRadius.xl};
    border: 1px solid ${expanded ? c.primary[200] : c.grey[100]};
    overflow: hidden;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      border-color: ${c.primary[200]};
    }
  `;
});

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
  color: ${tc((c) => c.text.primary)};
  transition: color ${transitions.duration.fast};

  &:hover {
    color: ${tc((c) => c.primary.main)};
  }
`;

interface ExpandIconProps {
  expanded?: boolean;
}

export const ExpandIcon = styled('span', { shouldForwardProp })<ExpandIconProps>(({
  expanded,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: ${borderRadius.full};
    background: ${expanded ? c.primary[100] : c.grey[100]};
    color: ${expanded ? c.primary.main : c.text.secondary};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    transform: rotate(${expanded ? '180deg' : '0deg'});
  `;
});

interface FAQAnswerProps {
  expanded?: boolean;
}

export const FAQAnswer = styled('div', { shouldForwardProp })<FAQAnswerProps>(({
  expanded,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    padding: ${expanded ? `0 ${spacing[6]} ${spacing[6]}` : '0'};
    max-height: ${expanded ? '500px' : '0'};
    opacity: ${expanded ? 1 : 0};
    overflow: hidden;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
    font-size: ${typography.fontSize.base};
    color: ${c.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
  `;
});
