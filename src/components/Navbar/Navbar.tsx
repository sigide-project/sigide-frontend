import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { useAuthStore } from '@/store';
import { useCurrentUser } from '@/hooks';
import { AddItemDialog } from '@/components';
import {
  StyledAppBar,
  StyledToolbar,
  LogoContainer,
  LogoIcon,
  LogoLetter,
  LogoText,
  RightSection,
  AddItemButton,
  MenuItemText,
  HamburgerButton,
  MobileDrawer,
  DrawerHeader,
  DrawerLogoContainer,
  CloseButton,
  DrawerContent,
  DrawerUserSection,
  DrawerUserInfo,
  DrawerUserName,
  DrawerUserEmail,
  DrawerAvatar,
  DrawerMenuItem,
  DrawerAddItemButton,
  DrawerDivider,
  DrawerLogoutButton,
} from './Navbar.styled';

export interface NavbarProps {
  onAddItemClick?: () => void;
  isAuthPage?: boolean;
}

export function Navbar({ onAddItemClick, isAuthPage = false }: NavbarProps) {
  const navigate = useNavigate();
  const { user: storeUser, clearAuth, isAuthenticated } = useAuthStore();
  const { data: fetchedUser } = useCurrentUser();
  const user = fetchedUser ?? storeUser;
  const showUserFeatures = isAuthenticated && !isAuthPage;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);

  const handleLogoClick = useCallback(() => {
    navigate('/');
    setMobileDrawerOpen(false);
  }, [navigate]);

  const handleAddItemClick = useCallback(() => {
    if (onAddItemClick) {
      onAddItemClick();
    } else {
      setAddItemDialogOpen(true);
    }
    setMobileDrawerOpen(false);
  }, [onAddItemClick]);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMyProfileClick = useCallback(() => {
    handleMenuClose();
    setMobileDrawerOpen(false);
    navigate('/profile');
  }, [navigate, handleMenuClose]);

  const handleLogoutClick = useCallback(() => {
    handleMenuClose();
    setMobileDrawerOpen(false);
    clearAuth();
    navigate('/login');
  }, [clearAuth, navigate, handleMenuClose]);

  const handleAddItemDialogClose = useCallback(() => {
    setAddItemDialogOpen(false);
  }, []);

  const handleMobileDrawerOpen = useCallback(() => {
    setMobileDrawerOpen(true);
  }, []);

  const handleMobileDrawerClose = useCallback(() => {
    setMobileDrawerOpen(false);
  }, []);

  const handleHomeClick = useCallback(() => {
    navigate('/');
    setMobileDrawerOpen(false);
  }, [navigate]);

  const handleFeedClick = useCallback(() => {
    navigate('/feed');
    setMobileDrawerOpen(false);
  }, [navigate]);

  const getAvatarContent = () => {
    if (user?.avatar_url) {
      return { src: user.avatar_url };
    }
    return { children: user?.name?.charAt(0).toUpperCase() || 'U' };
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <LogoContainer onClick={handleLogoClick}>
            <LogoIcon>
              <LogoLetter>S</LogoLetter>
            </LogoIcon>
            <LogoText>Sigide</LogoText>
          </LogoContainer>

          <RightSection>
            {showUserFeatures && (
              <>
                <AddItemButton onClick={handleAddItemClick}>
                  <AddIcon />
                  Add Item
                </AddItemButton>
                <HamburgerButton onClick={handleMobileDrawerOpen} aria-label="Open menu">
                  <MenuIcon />
                </HamburgerButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 180,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                      },
                    },
                  }}
                >
                  <MenuItem onClick={handleMyProfileClick} sx={{ py: 1.5, px: 2 }}>
                    <PersonOutlineIcon sx={{ mr: 1.5, fontSize: '1.25rem', opacity: 0.7 }} />
                    <MenuItemText>My Profile</MenuItemText>
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick} sx={{ py: 1.5, px: 2 }}>
                    <LogoutIcon sx={{ mr: 1.5, fontSize: '1.25rem', opacity: 0.7 }} />
                    <MenuItemText>Logout</MenuItemText>
                  </MenuItem>
                </Menu>
              </>
            )}
          </RightSection>
        </StyledToolbar>
      </StyledAppBar>

      {showUserFeatures && (
        <>
          <MobileDrawer anchor="left" open={mobileDrawerOpen} onClose={handleMobileDrawerClose}>
            <DrawerHeader>
              <DrawerLogoContainer onClick={handleLogoClick}>
                <LogoIcon>
                  <LogoLetter>S</LogoLetter>
                </LogoIcon>
                <LogoText>Sigide</LogoText>
              </DrawerLogoContainer>
              <CloseButton onClick={handleMobileDrawerClose} aria-label="Close menu">
                <CloseIcon />
              </CloseButton>
            </DrawerHeader>

            <DrawerContent>
              <DrawerUserSection>
                <DrawerAvatar>
                  <Avatar {...getAvatarContent()} />
                </DrawerAvatar>
                <DrawerUserInfo>
                  <DrawerUserName>{user?.name || 'User'}</DrawerUserName>
                  <DrawerUserEmail>{user?.email || ''}</DrawerUserEmail>
                </DrawerUserInfo>
              </DrawerUserSection>

              <DrawerMenuItem onClick={handleHomeClick}>
                <HomeOutlinedIcon />
                Home
              </DrawerMenuItem>

              <DrawerMenuItem onClick={handleFeedClick}>
                <ExploreOutlinedIcon />
                Browse Items
              </DrawerMenuItem>

              <DrawerMenuItem onClick={handleMyProfileClick}>
                <PersonOutlineIcon />
                My Profile
              </DrawerMenuItem>

              <DrawerAddItemButton onClick={handleAddItemClick}>
                <AddIcon />
                Add Item
              </DrawerAddItemButton>

              <DrawerDivider />

              <DrawerLogoutButton onClick={handleLogoutClick}>
                <LogoutIcon />
                Logout
              </DrawerLogoutButton>
            </DrawerContent>
          </MobileDrawer>

          <AddItemDialog open={addItemDialogOpen} onClose={handleAddItemDialogClose} />
        </>
      )}
    </>
  );
}

export default Navbar;
