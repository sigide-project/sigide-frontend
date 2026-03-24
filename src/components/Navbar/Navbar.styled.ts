import { styled, keyframes, css } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '@/theme';

const shouldForwardProp = (prop: string) => !prop.startsWith('$') && prop !== 'active';

export const NAVBAR_HEIGHT = 72;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledAppBar = styled(AppBar)`
  background: rgba(255, 255, 255, 0.85);
  color: ${colors.text.primary};
  box-shadow: ${shadows.sm};
  height: ${NAVBAR_HEIGHT}px;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${colors.grey[100]};
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
      ${colors.primary[200]} 50%,
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
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 600px) {
    padding: 0 ${spacing[4]};
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

export const LogoIcon = styled('div')`
  width: 44px;
  height: 44px;
  border-radius: ${borderRadius.lg};
  background: ${colors.decorative.purple};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.purple.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  .logo-container:hover & {
    box-shadow: ${shadows.purple.md};
    transform: rotate(-5deg);
  }

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    border-radius: ${borderRadius.md};
  }
`;

export const LogoLetter = styled('span')`
  font-size: 1.5rem;
  font-weight: ${typography.fontWeight.extrabold};
  color: ${colors.text.inverse};
  font-family: ${typography.fontFamily.display};

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

export const LogoText = styled('span')`
  font-size: 1.75rem;
  font-weight: ${typography.fontWeight.extrabold};
  background: ${colors.decorative.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: ${typography.letterSpacing.tight};
  font-family: ${typography.fontFamily.display};

  @media (max-width: 600px) {
    font-size: 1.5rem;
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

export const NavLink = styled('button', { shouldForwardProp })<NavLinkProps>(
  ({ active }) => css`
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[2]} ${spacing[4]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${active ? colors.primary.main : colors.text.secondary};
    background: ${active ? colors.primary[50] : 'transparent'};
    border: none;
    border-radius: ${borderRadius.lg};
    cursor: pointer;
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      color: ${colors.primary.main};
      background: ${colors.primary[50]};
    }

    svg {
      font-size: 1.25rem;
    }
  `
);

export const RightSection = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing[4]};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AddItemButton = styled('button')`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.inverse};
  background: ${colors.decorative.purple};
  border: none;
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  box-shadow: ${shadows.purple.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.purple.md};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const ProfileButton = styled('button')`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[1]};
  background: transparent;
  border: 2px solid ${colors.grey[200]};
  border-radius: ${borderRadius.full};
  cursor: pointer;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    border-color: ${colors.primary[300]};
    box-shadow: ${shadows.purple.sm};
  }

  .MuiAvatar-root {
    width: 36px;
    height: 36px;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.bold};
    background: ${colors.decorative.purple};
  }
`;

export const MenuItemText = styled('span')`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const HamburgerButton = styled(IconButton)`
  padding: ${spacing[2]};
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background-color: ${colors.primary[50]};
  }

  svg {
    font-size: 1.75rem;
    color: ${colors.text.primary};
  }
`;

export const MobileDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 300px;
    max-width: 85vw;
    background: ${colors.background.paper};
    border-radius: 0 ${borderRadius['2xl']} ${borderRadius['2xl']} 0;
    padding: 0;
    box-shadow: ${shadows.xl};
  }
`;

export const DrawerHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[5]} ${spacing[5]} ${spacing[4]};
  border-bottom: 1px solid ${colors.grey[100]};
  background: ${colors.background.hero};
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
  background-color: ${colors.background.paper};
  border: 1px solid ${colors.grey[200]};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background-color: ${colors.grey[100]};
    border-color: ${colors.grey[300]};
  }

  svg {
    font-size: 1.25rem;
    color: ${colors.text.secondary};
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
  background: ${colors.background.hero};
  border-radius: ${borderRadius.xl};
  border: 1px solid ${colors.primary[100]};
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
  color: ${colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DrawerUserEmail = styled('span')`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.tertiary};
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
    background: ${colors.decorative.purple};
    box-shadow: ${shadows.purple.sm};
    border: 3px solid ${colors.background.paper};
  }
`;

const menuItemStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding: ${spacing[4]} ${spacing[5]};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

  &:hover {
    background-color: ${colors.grey[50]};
    transform: translateX(4px);
  }

  &:active {
    background-color: ${colors.grey[100]};
  }

  svg {
    font-size: 1.35rem;
    color: ${colors.text.secondary};
    transition: color ${transitions.duration.fast} ${transitions.easing.easeInOut};
  }

  &:hover svg {
    color: ${colors.primary.main};
  }
`;

export const DrawerMenuItem = styled('button')`
  ${menuItemStyles}
`;

export const DrawerAddItemButton = styled('button')`
  ${menuItemStyles}
  background: ${colors.primary[50]};
  color: ${colors.primary[700]};
  margin-top: ${spacing[2]};
  border: 1px solid ${colors.primary[100]};

  &:hover {
    background: ${colors.primary[100]};
    border-color: ${colors.primary[200]};
  }

  svg {
    color: ${colors.primary.main};
  }
`;

export const DrawerDivider = styled('div')`
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, ${colors.grey[200]} 50%, transparent 100%);
  margin: ${spacing[3]} 0;
`;

export const DrawerLogoutButton = styled('button')`
  ${menuItemStyles}
  color: ${colors.error.main};
  margin-top: auto;

  &:hover {
    background-color: ${colors.error.light};
  }

  svg {
    color: ${colors.error.main};
  }

  &:hover svg {
    color: ${colors.error.dark};
  }
`;

export const NavbarSpacer = styled('div')`
  height: ${NAVBAR_HEIGHT}px;
  min-height: ${NAVBAR_HEIGHT}px;
  width: 100%;
`;
