import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { useAuthStore } from '@/store';
import { useCurrentUser } from '@/hooks';
import {
  StyledAppBar,
  StyledToolbar,
  LogoContainer,
  LogoIcon,
  LogoLetter,
  LogoText,
  RightSection,
  LoginButton,
  SignUpButton,
  BrowseButton,
  ProfileButton,
} from './PublicNavbar.styled';

export function PublicNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user: storeUser, clearAuth } = useAuthStore();
  const { data: fetchedUser } = useCurrentUser();
  const user = fetchedUser ?? storeUser;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const handleBrowseClick = () => {
    navigate('/feed');
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfileClick = useCallback(() => {
    handleMenuClose();
    navigate('/profile');
  }, [navigate, handleMenuClose]);

  const handleLogoutClick = useCallback(() => {
    handleMenuClose();
    clearAuth();
    navigate('/login');
  }, [clearAuth, navigate, handleMenuClose]);

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
            <LogoIcon className="public-navbar-logo-icon">
              <LogoLetter>S</LogoLetter>
            </LogoIcon>
            <LogoText>Sigide</LogoText>
          </LogoContainer>

          <RightSection>
            {isAuthenticated ? (
              <>
                <BrowseButton onClick={handleBrowseClick} startIcon={<ExploreOutlinedIcon />}>
                  Browse Items
                </BrowseButton>
                <ProfileButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Avatar {...getAvatarContent()} />
                </ProfileButton>
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
                  <MenuItem onClick={handleProfileClick} sx={{ py: 1.5, px: 2 }}>
                    <PersonOutlineIcon sx={{ mr: 1.5, fontSize: '1.25rem', opacity: 0.7 }} />
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick} sx={{ py: 1.5, px: 2 }}>
                    <LogoutIcon sx={{ mr: 1.5, fontSize: '1.25rem', opacity: 0.7 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <LoginButton onClick={handleLoginClick}>Log In</LoginButton>
                <SignUpButton variant="contained" onClick={handleSignUpClick}>
                  Sign Up
                </SignUpButton>
              </>
            )}
          </RightSection>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
}

export default PublicNavbar;
