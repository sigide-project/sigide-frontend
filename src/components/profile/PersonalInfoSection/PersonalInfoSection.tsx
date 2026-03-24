import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import type { User, UpdateUserData } from '@/types';
import { useChangePassword, useCheckUsername, useHasPassword, useSetPassword } from '@/hooks';
import {
  SectionCard,
  SectionHeader,
  SectionTitle,
  InfoList,
  InfoItem,
  InfoIcon,
  InfoContent,
  InfoLabel,
  InfoValue,
  EditableField,
  PasswordSection,
} from './PersonalInfoSection.styled';

const phoneSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]*$/, 'Phone must contain only numbers')
    .min(10, 'Phone must be at least 10 digits')
    .default(''),
});

const usernameSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

const setPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

type PhoneFormData = yup.InferType<typeof phoneSchema>;
type PasswordFormData = yup.InferType<typeof passwordSchema>;
type SetPasswordFormData = yup.InferType<typeof setPasswordSchema>;
type UsernameFormData = yup.InferType<typeof usernameSchema>;

interface PersonalInfoSectionProps {
  user: User | null;
  isLoading: boolean;
  onUpdateProfile: (data: UpdateUserData) => void;
  isUpdating: boolean;
}

export function PersonalInfoSection({
  user,
  isLoading,
  onUpdateProfile,
  isUpdating,
}: PersonalInfoSectionProps) {
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [usernameToCheck, setUsernameToCheck] = useState<string | undefined>(undefined);

  const { data: hasPassword, isLoading: isLoadingHasPassword } = useHasPassword();

  const {
    changePassword,
    isPending: isChangingPassword,
    error: passwordError,
    reset: resetPasswordMutation,
  } = useChangePassword();

  const {
    setPassword,
    isPending: isSettingPassword,
    error: setPasswordError,
    reset: resetSetPasswordMutation,
  } = useSetPassword();

  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    reset: resetPhoneForm,
    formState: { errors: phoneErrors },
  } = useForm<PhoneFormData>({
    resolver: yupResolver(phoneSchema) as any,
    defaultValues: { phone: user?.phone || '' },
  });

  const {
    control: usernameControl,
    handleSubmit: handleUsernameSubmit,
    reset: resetUsernameForm,
    watch: watchUsername,
    formState: { errors: usernameErrors },
  } = useForm<UsernameFormData>({
    resolver: yupResolver(usernameSchema) as any,
    defaultValues: { username: user?.username || '' },
  });

  const watchedUsername = watchUsername('username');
  const isUsernameChanged = watchedUsername !== user?.username;

  const { data: isUsernameAvailable, isLoading: isCheckingUsername } = useCheckUsername(
    usernameToCheck,
    isEditingUsername && isUsernameChanged && !!usernameToCheck && usernameToCheck.length >= 3
  );

  useEffect(() => {
    if (isEditingUsername && isUsernameChanged && watchedUsername && watchedUsername.length >= 3) {
      const timer = setTimeout(() => {
        setUsernameToCheck(watchedUsername);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [watchedUsername, isUsernameChanged, isEditingUsername]);

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema) as any,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    control: setPasswordControl,
    handleSubmit: handleSetPasswordSubmit,
    reset: resetSetPasswordForm,
    formState: { errors: setPasswordErrors },
  } = useForm<SetPasswordFormData>({
    resolver: yupResolver(setPasswordSchema) as any,
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handlePhoneSave = (data: PhoneFormData) => {
    onUpdateProfile({ phone: data.phone });
    setIsEditingPhone(false);
  };

  const handlePhoneCancel = () => {
    resetPhoneForm({ phone: user?.phone || '' });
    setIsEditingPhone(false);
  };

  const handleUsernameSave = (data: UsernameFormData) => {
    if (isUsernameChanged && isUsernameAvailable === false) {
      return;
    }
    onUpdateProfile({ username: data.username });
    setIsEditingUsername(false);
    setUsernameToCheck(undefined);
  };

  const handleUsernameCancel = () => {
    resetUsernameForm({ username: user?.username || '' });
    setIsEditingUsername(false);
    setUsernameToCheck(undefined);
  };

  const getUsernameEndAdornment = () => {
    if (!isUsernameChanged || !watchedUsername || watchedUsername.length < 3) {
      return null;
    }
    if (isCheckingUsername) {
      return (
        <InputAdornment position="end">
          <CircularProgress size={16} />
        </InputAdornment>
      );
    }
    if (isUsernameAvailable === true) {
      return (
        <InputAdornment position="end">
          <CheckCircleIcon color="success" fontSize="small" />
        </InputAdornment>
      );
    }
    if (isUsernameAvailable === false) {
      return (
        <InputAdornment position="end">
          <ErrorIcon color="error" fontSize="small" />
        </InputAdornment>
      );
    }
    return null;
  };

  const getUsernameHelperText = () => {
    if (usernameErrors.username?.message) {
      return usernameErrors.username.message;
    }
    if (!isUsernameChanged) {
      return '';
    }
    if (isCheckingUsername) {
      return 'Checking...';
    }
    if (isUsernameAvailable === false) {
      return 'Username taken';
    }
    if (isUsernameAvailable === true) {
      return 'Available';
    }
    return '';
  };

  const handleOpenPasswordDialog = () => {
    setPasswordDialogOpen(true);
    setPasswordSuccess(false);
    resetPasswordMutation();
    resetSetPasswordMutation();
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
    resetPasswordForm();
    resetSetPasswordForm();
    setPasswordSuccess(false);
    resetPasswordMutation();
    resetSetPasswordMutation();
  };

  const handlePasswordChange = async (data: PasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setPasswordSuccess(true);
      resetPasswordForm();
      setTimeout(() => {
        handleClosePasswordDialog();
      }, 2000);
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleSetPassword = async (data: SetPasswordFormData) => {
    try {
      await setPassword({
        newPassword: data.newPassword,
      });
      setPasswordSuccess(true);
      resetSetPasswordForm();
      setTimeout(() => {
        handleClosePasswordDialog();
      }, 2000);
    } catch {
      // Error is handled by the mutation
    }
  };

  if (isLoading) {
    return (
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <PersonIcon />
            Personal Information
          </SectionTitle>
        </SectionHeader>
        <InfoList>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={72} />
          ))}
        </InfoList>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <SectionHeader>
        <SectionTitle>
          <PersonIcon />
          Personal Information
        </SectionTitle>
      </SectionHeader>

      <InfoList>
        <InfoItem>
          <InfoIcon>
            <AlternateEmailIcon />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Username</InfoLabel>
            {isEditingUsername ? (
              <EditableField>
                <form onSubmit={handleUsernameSubmit(handleUsernameSave)}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Controller
                      name="username"
                      control={usernameControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          placeholder="Enter username"
                          error={
                            Boolean(usernameErrors.username) ||
                            (isUsernameChanged && isUsernameAvailable === false)
                          }
                          helperText={getUsernameHelperText()}
                          autoFocus
                          InputProps={{
                            startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            endAdornment: getUsernameEndAdornment(),
                          }}
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      disabled={
                        isUpdating ||
                        isCheckingUsername ||
                        (isUsernameChanged && isUsernameAvailable === false)
                      }
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleUsernameCancel}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </EditableField>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoValue>@{user?.username || 'Not set'}</InfoValue>
                <IconButton size="small" onClick={() => setIsEditingUsername(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </InfoContent>
        </InfoItem>

        <Divider />

        <InfoItem>
          <InfoIcon>
            <EmailIcon />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Email Address</InfoLabel>
            <InfoValue>{user?.email}</InfoValue>
          </InfoContent>
        </InfoItem>

        <Divider />

        <InfoItem>
          <InfoIcon>
            <PhoneIcon />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Phone Number</InfoLabel>
            {isEditingPhone ? (
              <EditableField>
                <form onSubmit={handlePhoneSubmit(handlePhoneSave)}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Controller
                      name="phone"
                      control={phoneControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          placeholder="Enter phone number"
                          error={Boolean(phoneErrors.phone)}
                          helperText={phoneErrors.phone?.message}
                          autoFocus
                        />
                      )}
                    />
                    <Button type="submit" variant="contained" size="small" disabled={isUpdating}>
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handlePhoneCancel}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </EditableField>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoValue>{user?.phone || 'Not set'}</InfoValue>
                <IconButton size="small" onClick={() => setIsEditingPhone(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </InfoContent>
        </InfoItem>

        <Divider />

        <PasswordSection>
          <InfoItem>
            <InfoIcon>
              <LockIcon />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Password</InfoLabel>
              <InfoValue>
                {isLoadingHasPassword ? '...' : hasPassword ? '••••••••' : 'Not set'}
              </InfoValue>
            </InfoContent>
          </InfoItem>
          <Button variant="outlined" size="small" onClick={handleOpenPasswordDialog}>
            {hasPassword ? 'Change Password' : 'Set Password'}
          </Button>
        </PasswordSection>
      </InfoList>

      <Dialog open={passwordDialogOpen} onClose={handleClosePasswordDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{hasPassword ? 'Change Password' : 'Set Password'}</DialogTitle>
        {hasPassword ? (
          <form onSubmit={handlePasswordSubmit(handlePasswordChange)}>
            <DialogContent>
              {passwordSuccess ? (
                <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
                  Password changed successfully!
                </Alert>
              ) : (
                <>
                  {passwordError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {passwordError.message}
                    </Alert>
                  )}

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Controller
                      name="currentPassword"
                      control={passwordControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Current Password"
                          type={showCurrentPassword ? 'text' : 'password'}
                          fullWidth
                          error={Boolean(passwordErrors.currentPassword)}
                          helperText={passwordErrors.currentPassword?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  edge="end"
                                >
                                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="newPassword"
                      control={passwordControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="New Password"
                          type={showNewPassword ? 'text' : 'password'}
                          fullWidth
                          error={Boolean(passwordErrors.newPassword)}
                          helperText={passwordErrors.newPassword?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  edge="end"
                                >
                                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={passwordControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm New Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          fullWidth
                          error={Boolean(passwordErrors.confirmPassword)}
                          helperText={passwordErrors.confirmPassword?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleClosePasswordDialog} disabled={isChangingPassword}>
                {passwordSuccess ? 'Close' : 'Cancel'}
              </Button>
              {!passwordSuccess && (
                <Button type="submit" variant="contained" disabled={isChangingPassword}>
                  {isChangingPassword ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Change Password'
                  )}
                </Button>
              )}
            </DialogActions>
          </form>
        ) : (
          <form onSubmit={handleSetPasswordSubmit(handleSetPassword)}>
            <DialogContent>
              {passwordSuccess ? (
                <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
                  Password set successfully!
                </Alert>
              ) : (
                <>
                  {setPasswordError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {setPasswordError.message}
                    </Alert>
                  )}

                  <Alert severity="info" sx={{ mb: 2 }}>
                    You signed up with Google. Set a password to also be able to log in with email
                    and password.
                  </Alert>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Controller
                      name="newPassword"
                      control={setPasswordControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="New Password"
                          type={showNewPassword ? 'text' : 'password'}
                          fullWidth
                          error={Boolean(setPasswordErrors.newPassword)}
                          helperText={setPasswordErrors.newPassword?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  edge="end"
                                >
                                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={setPasswordControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          fullWidth
                          error={Boolean(setPasswordErrors.confirmPassword)}
                          helperText={setPasswordErrors.confirmPassword?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleClosePasswordDialog} disabled={isSettingPassword}>
                {passwordSuccess ? 'Close' : 'Cancel'}
              </Button>
              {!passwordSuccess && (
                <Button type="submit" variant="contained" disabled={isSettingPassword}>
                  {isSettingPassword ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Set Password'
                  )}
                </Button>
              )}
            </DialogActions>
          </form>
        )}
      </Dialog>
    </SectionCard>
  );
}

export default PersonalInfoSection;
