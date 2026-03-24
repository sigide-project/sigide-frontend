import { useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  SectionCard,
  SectionHeader,
  SectionTitle,
  SettingsList,
  SettingItem,
  SettingInfo,
  SettingIcon,
  SettingLabel,
  SettingDescription,
  LogoutButton,
} from './SettingsSection.styled';

interface SettingsSectionProps {
  onLogout: () => void;
}

export function SettingsSection({ onLogout }: SettingsSectionProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <SectionCard>
      <SectionHeader>
        <SectionTitle>
          <SettingsIcon />
          Settings
        </SectionTitle>
      </SectionHeader>

      <SettingsList>
        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <NotificationsIcon />
            </SettingIcon>
            <Box>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingDescription>
                Receive notifications about your items and claims
              </SettingDescription>
            </Box>
          </SettingInfo>
          <Switch
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            color="primary"
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <DarkModeIcon />
            </SettingIcon>
            <Box>
              <SettingLabel>Dark Mode</SettingLabel>
              <SettingDescription>
                Switch to dark theme for better viewing at night
              </SettingDescription>
            </Box>
          </SettingInfo>
          <Switch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            color="primary"
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <SecurityIcon />
            </SettingIcon>
            <Box>
              <SettingLabel>Two-Factor Authentication</SettingLabel>
              <SettingDescription>
                Add an extra layer of security to your account
              </SettingDescription>
            </Box>
          </SettingInfo>
          <Button variant="outlined" size="small" disabled>
            Coming Soon
          </Button>
        </SettingItem>
      </SettingsList>

      <LogoutButton
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogoutClick}
        fullWidth
      >
        Sign Out
      </LogoutButton>

      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out? You'll need to log in again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
}

export default SettingsSection;
