import { styled, keyframes } from '@mui/material/styles';
import { Box } from '@mui/material';
import { tc, typography, spacing, borderRadius, transitions } from '@/theme';
import { breakpoints } from '@/theme/theme';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

export const FooterContainer = styled('footer')`
  background: linear-gradient(
    180deg,
    ${tc((c) => c.background.default)} 0%,
    ${tc((c) => c.primary[50])} 100%
  );
  border-top: 1px solid ${tc((c) => c.grey[100])};
  position: relative;
  overflow: hidden;

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
      ${tc((c) => c.primary[200])} 50%,
      transparent 100%
    );
  }
`;

export const FooterContent = styled(Box)`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing[12]} ${spacing[6]} ${spacing[8]};
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${spacing[10]};

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${spacing[8]};
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing[6]};
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: ${spacing[8]} ${spacing[4]} ${spacing[6]};
    gap: ${spacing[8]};
  }
`;

export const BrandSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};

  @media (max-width: ${breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

export const LogoContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  cursor: pointer;
  width: fit-content;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
  }

  &:hover .footer-logo-icon {
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
    transform: rotate(-5deg);
  }
`;

export const LogoIcon = styled('div')`
  width: 48px;
  height: 48px;
  border-radius: ${borderRadius.lg};
  background: ${tc((c) => c.decorative.purple)};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25);
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
  animation: ${float} 3s ease-in-out infinite;
`;

export const LogoLetter = styled('span')`
  font-size: 1.5rem;
  font-weight: ${typography.fontWeight.extrabold};
  color: ${tc((c) => c.text.inverse)};
  font-family: ${typography.fontFamily.display};
`;

export const LogoText = styled('span')`
  font-size: 1.75rem;
  font-weight: ${typography.fontWeight.extrabold};
  background: ${tc((c) => c.decorative.purple)};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: ${typography.letterSpacing.tight};
  font-family: ${typography.fontFamily.display};
`;

export const BrandDescription = styled('p')`
  font-size: ${typography.fontSize.base};
  color: ${tc((c) => c.text.secondary)};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 320px;
  margin: 0;
`;

export const SocialLinks = styled('div')`
  display: flex;
  gap: ${spacing[3]};
  margin-top: ${spacing[2]};
`;

export const SocialLink = styled('a')`
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.full};
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[200])};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tc((c) => c.text.secondary)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
  cursor: pointer;

  &:hover {
    background: ${tc((c) => c.primary[50])};
    border-color: ${tc((c) => c.primary[200])};
    color: ${tc((c) => c.primary.main)};
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const FooterSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

export const SectionTitle = styled('h4')`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  color: ${tc((c) => c.text.primary)};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wider};
  margin: 0;
`;

export const FooterLinks = styled('nav')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

export const FooterLink = styled('a')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.secondary)};
  text-decoration: none;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};

  &:hover {
    color: ${tc((c) => c.primary.main)};
    transform: translateX(4px);
  }

  svg {
    font-size: 1rem;
    opacity: 0;
    transition: opacity ${transitions.duration.fast} ${transitions.easing.easeInOut};
  }

  &:hover svg {
    opacity: 1;
  }
`;

export const FooterBottom = styled('div')`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing[6]} ${spacing[6]};
  border-top: 1px solid ${tc((c) => c.grey[200])};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing[4]};

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
    padding: ${spacing[6]} ${spacing[4]};
  }
`;

export const Copyright = styled('p')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.tertiary)};
  margin: 0;
`;

export const LegalLinks = styled('div')`
  display: flex;
  gap: ${spacing[6]};

  @media (max-width: ${breakpoints.sm}) {
    gap: ${spacing[4]};
  }
`;

export const LegalLink = styled('a')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.tertiary)};
  text-decoration: none;
  transition: color ${transitions.duration.fast} ${transitions.easing.easeInOut};
  cursor: pointer;

  &:hover {
    color: ${tc((c) => c.primary.main)};
  }
`;

export const HeartIcon = styled('span')`
  display: inline-block;
  color: ${tc((c) => c.error.main)};
  animation: ${float} 1.5s ease-in-out infinite;
`;

export const GradientAccent = styled('div')`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 3px;
  background: ${tc((c) => c.decorative.purple)};
  border-radius: ${borderRadius.full};
  opacity: 0.5;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, ${tc((c) => c.glass.subtle)}, transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
  }
`;
