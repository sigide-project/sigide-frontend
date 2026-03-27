import { styled, keyframes, css } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { tc, ts, typography, spacing, borderRadius, transitions, getThemeColors } from '@/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$') && prop !== 'active';

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
`;

export const LogoImage = styled('img')`
  height: 60px;
  object-fit: contain;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  @media (max-width: 600px) {
    height: 45px;
  }
`;

export const NavLinks = styled('nav')`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};

  @media (max-width: 768px) {
    display: none;
  }
`;

interface NavLinkProps {
  active?: boolean;
}

export const NavLink = styled('button', { shouldForwardProp })<NavLinkProps>(({
  active,
  theme,
}) => {
  const c = getThemeColors(theme);
  return css`
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[2]} ${spacing[4]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${active ? c.primary.main : c.text.secondary};
    background: ${active ? c.primary[50] : 'transparent'};
    border: none;
    border-radius: ${borderRadius.lg};
    cursor: pointer;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      color: ${c.primary.main};
      background: ${c.primary[50]};
    }

    svg {
      font-size: 1.25rem;
    }
  `;
});

export const RightSection = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing[4]};
`;

export const AddItemButton = styled('button')`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.inverse)};
  background: ${tc((c) => c.decorative.purple)};
  border: none;
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  box-shadow: ${ts((s) => s.purple.sm)};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${ts((s) => s.purple.md)};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    display: none;
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

export const MenuItemText = styled('span')`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const HamburgerButton = styled(IconButton)`
  display: flex;
  padding: ${spacing[2]};
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background-color: ${tc((c) => c.primary[50])};
  }

  svg {
    font-size: 1.75rem;
    color: ${tc((c) => c.text.primary)};
  }
`;

export const MobileDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 300px;
    max-width: 85vw;
    background: ${tc((c) => c.background.paper)};
    border-radius: 0 ${borderRadius['2xl']} ${borderRadius['2xl']} 0;
    padding: 0;
    box-shadow: ${ts((s) => s.xl)};
  }
`;

export const DrawerHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[5]} ${spacing[5]} ${spacing[4]};
  border-bottom: 1px solid ${tc((c) => c.grey[100])};
  background: ${tc((c) => c.background.hero)};
`;

export const DrawerLogoContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  cursor: pointer;
`;

export const CloseButton = styled(IconButton)`
  padding: ${spacing[2]};
  border-radius: ${borderRadius.lg};
  background-color: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[200])};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background-color: ${tc((c) => c.grey[100])};
    border-color: ${tc((c) => c.grey[300])};
  }

  svg {
    font-size: 1.25rem;
    color: ${tc((c) => c.text.secondary)};
  }
`;

export const DrawerContent = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing[4]};
  gap: ${spacing[2]};
  flex: 1;
`;

export const DrawerUserSection = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding: ${spacing[5]};
  margin-bottom: ${spacing[2]};
  background: ${tc((c) => c.background.hero)};
  border-radius: ${borderRadius.xl};
  border: 1px solid ${tc((c) => c.primary[100])};
`;

export const DrawerUserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  flex: 1;
  min-width: 0;
`;

export const DrawerUserName = styled('span')`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${tc((c) => c.text.primary)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DrawerUserEmail = styled('span')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.tertiary)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DrawerAvatar = styled('div')`
  .MuiAvatar-root {
    width: 52px;
    height: 52px;
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
    background: ${tc((c) => c.decorative.purple)};
    box-shadow: ${ts((s) => s.purple.sm)};
    border: 3px solid ${tc((c) => c.background.paper)};
  }
`;

const drawerMenuItemBaseStyles = `
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding: ${spacing[4]} ${spacing[5]};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
`;

export const DrawerMenuItem = styled('button')`
  ${drawerMenuItemBaseStyles}
  color: ${tc((c) => c.text.primary)};

  &:hover {
    background-color: ${tc((c) => c.grey[50])};
    transform: translateX(4px);
  }

  &:active {
    background-color: ${tc((c) => c.grey[100])};
  }

  svg {
    font-size: 1.35rem;
    color: ${tc((c) => c.text.secondary)};
    transition: color ${transitions.duration.fast} ${transitions.easing.easeInOut};
  }

  &:hover svg {
    color: ${tc((c) => c.primary.main)};
  }
`;

export const DrawerAddItemButton = styled('button')`
  ${drawerMenuItemBaseStyles}
  background: ${tc((c) => c.primary[50])};
  color: ${tc((c) => c.primary[700])};
  margin-top: ${spacing[2]};
  border: 1px solid ${tc((c) => c.primary[100])};

  &:hover {
    background: ${tc((c) => c.primary[100])};
    border-color: ${tc((c) => c.primary[200])};
    transform: translateX(4px);
  }

  &:active {
    background-color: ${tc((c) => c.grey[100])};
  }

  svg {
    font-size: 1.35rem;
    color: ${tc((c) => c.primary.main)};
    transition: color ${transitions.duration.fast} ${transitions.easing.easeInOut};
  }
`;

export const DrawerDivider = styled('div')`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${tc((c) => c.grey[200])} 50%,
    transparent 100%
  );
  margin: ${spacing[3]} 0;
`;

export const DrawerLogoutButton = styled('button')`
  ${drawerMenuItemBaseStyles}
  color: ${tc((c) => c.error.main)};
  margin-top: auto;

  &:hover {
    background-color: ${tc((c) => c.error.light)};
    transform: translateX(4px);
  }

  &:active {
    background-color: ${tc((c) => c.grey[100])};
  }

  svg {
    font-size: 1.35rem;
    color: ${tc((c) => c.error.main)};
    transition: color ${transitions.duration.fast} ${transitions.easing.easeInOut};
  }

  &:hover svg {
    color: ${tc((c) => c.error.dark)};
  }
`;

export const NavbarSpacer = styled('div')`
  height: ${NAVBAR_HEIGHT}px;
  min-height: ${NAVBAR_HEIGHT}px;
  width: 100%;
`;
