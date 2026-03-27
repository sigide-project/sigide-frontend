import { styled, keyframes } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import { tc, ts, typography, spacing, borderRadius, transitions } from '@/theme';

export const NAVBAR_HEIGHT = 72;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledAppBar = styled(AppBar)`
  background: ${tc((c) => c.glass.medium)};
  color: ${tc((c) => c.text.primary)};
  box-shadow: ${ts((s) => s.sm)};
  height: ${NAVBAR_HEIGHT}px;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${tc((c) => c.grey[100])};
  z-index: 1100;
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${tc((c) => c.primary[200])} 50%,
      transparent 100%
    );
    opacity: 0.5;
  }
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${NAVBAR_HEIGHT}px;
  min-height: ${NAVBAR_HEIGHT}px;
  padding: 0 ${spacing[6]};
  width: 100%;

  @media (max-width: 600px) {
    padding: 0 ${spacing[4]};
    margin: 0 auto;
  }
`;

export const LogoContainer = styled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${spacing[3]};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LogoImage = styled('img')`
  height: 60px;
  object-fit: contain;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  @media (max-width: 600px) {
    height: 45px;
  }
`;

export const RightSection = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

export const LoginButton = styled(Button)`
  padding: ${spacing[2]} ${spacing[5]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${tc((c) => c.text.primary)};
  text-transform: none;
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.grey[100])};
  }
`;

export const SignUpButton = styled(Button)`
  padding: ${spacing[2]} ${spacing[5]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.inverse)};
  background: ${tc((c) => c.decorative.purple)};
  text-transform: none;
  border-radius: ${borderRadius.lg};
  box-shadow: ${ts((s) => s.purple.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${ts((s) => s.purple.md)};
    background: ${tc((c) => c.decorative.purple)};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NavbarSpacer = styled('div')`
  height: ${NAVBAR_HEIGHT}px;
  min-height: ${NAVBAR_HEIGHT}px;
  width: 100%;
`;

export const BrowseButton = styled(Button)`
  padding: ${spacing[2]} ${spacing[5]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${tc((c) => c.text.primary)};
  text-transform: none;
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.grey[100])};
  }
`;

export const ProfileButton = styled('button')`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[1]};
  background: transparent;
  border: 2px solid ${tc((c) => c.grey[200])};
  border-radius: ${borderRadius.full};
  cursor: pointer;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${tc((c) => c.primary[300])};
    box-shadow: ${ts((s) => s.purple.sm)};
  }

  .MuiAvatar-root {
    width: 36px;
    height: 36px;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.bold};
    background: ${tc((c) => c.decorative.purple)};
  }
`;
