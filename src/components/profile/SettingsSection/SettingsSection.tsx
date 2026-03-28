import { useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useColorMode } from '@/context';
import { useHasPassword, useDeleteAccount } from '@/hooks';
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
  onOpenPasswordDialog: () => void;
}

export function SettingsSection({ onLogout, onOpenPasswordDialog }: SettingsSectionProps) {
  const [notifications, setNotifications] = useState(true);
  const { isDarkMode, toggleColorMode } = useColorMode();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: hasPassword, isLoading: isLoadingHasPassword } = useHasPassword();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();

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

  const handleDeleteClick = () => {
    setDeleteError(null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteError(null);
      await deleteAccount();
      setDeleteDialogOpen(false);
      onLogout();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteError(null);
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
            <SettingIcon>{isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}</SettingIcon>
            <Box>
              <SettingLabel>Dark Mode</SettingLabel>
              <SettingDescription>
                {isDarkMode
                  ? 'Switch to light theme for daytime viewing'
                  : 'Switch to dark theme for better viewing at night'}
              </SettingDescription>
            </Box>
          </SettingInfo>
          <Switch checked={isDarkMode} onChange={toggleColorMode} color="primary" />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <LockIcon />
            </SettingIcon>
            <Box>
              <SettingLabel>Password</SettingLabel>
              <SettingDescription>
                {isLoadingHasPassword
                  ? 'Loading...'
                  : hasPassword
                    ? 'Change your account password'
                    : 'Set a password for email login'}
              </SettingDescription>
            </Box>
          </SettingInfo>
          <Button
            variant="outlined"
            size="small"
            onClick={onOpenPasswordDialog}
            disabled={isLoadingHasPassword}
          >
            {isLoadingHasPassword ? '...' : hasPassword ? 'Change' : 'Set Password'}
          </Button>
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

      <Button
        variant="text"
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={handleDeleteClick}
        fullWidth
        sx={{ mt: 1, textTransform: 'none', fontWeight: 500 }}
      >
        Delete Account
      </Button>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out? You&apos;ll need to log in again to access your
            account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
          <WarningAmberIcon />
          Delete Account
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action is permanent and cannot be undone.
          </Alert>
          <DialogContentText sx={{ mb: 1 }}>Deleting your account will:</DialogContentText>
          <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
            <li>Permanently remove all your listed items</li>
            <li>Delete all claims and messages associated with your items</li>
            <li>Remove your saved items and notifications</li>
            <li>Deactivate your account — you will not be able to log in again</li>
          </Box>
          <DialogContentText sx={{ mt: 2 }}>
            You can create a new account with the same email address in the future, but your
            previous data will not be recoverable.
          </DialogContentText>
          {deleteError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {deleteError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={
              isDeleting ? <CircularProgress size={18} color="inherit" /> : <DeleteForeverIcon />
            }
          >
            {isDeleting ? 'Deleting...' : 'Delete My Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
}

export default SettingsSection;
