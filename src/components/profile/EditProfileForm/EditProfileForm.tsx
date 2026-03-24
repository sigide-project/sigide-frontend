import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import type { User, UpdateUserData } from '@/types';
import { useCheckUsername } from '@/hooks';
import {
  UserDetailsCard,
  UserDetailsContent,
  EditFormContainer,
  EditFormActions,
  DetailItem,
  DetailLabel,
  DetailValue,
  EmailNote,
} from './EditProfileForm.styled';

const profileSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, 'Phone must contain only numbers')
    .default(''),
  avatar_url: yup.string().url('Must be a valid URL').default(''),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

interface EditProfileFormProps {
  user: User | null;
  isUpdating: boolean;
  error: Error | null;
  profileError: string | null;
  onSubmit: (data: UpdateUserData) => void;
  onCancel: () => void;
}

export function EditProfileForm({
  user,
  isUpdating,
  error,
  profileError,
  onSubmit,
  onCancel,
}: EditProfileFormProps) {
  const [usernameToCheck, setUsernameToCheck] = useState<string | undefined>(undefined);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(profileSchema) as any,
    defaultValues: {
      name: user?.name || '',
      username: user?.username || '',
      phone: user?.phone || '',
      avatar_url: user?.avatar_url || '',
    },
  });

  const watchedUsername = watch('username');
  const isUsernameChanged = watchedUsername !== user?.username;

  const { data: isUsernameAvailable, isLoading: isCheckingUsername } = useCheckUsername(
    usernameToCheck,
    isUsernameChanged && !!usernameToCheck && usernameToCheck.length >= 3
  );

  useEffect(() => {
    if (isUsernameChanged && watchedUsername && watchedUsername.length >= 3) {
      const timer = setTimeout(() => {
        setUsernameToCheck(watchedUsername);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [watchedUsername, isUsernameChanged]);

  const onFormSubmit = (data: ProfileFormData) => {
    if (isUsernameChanged && !isUsernameAvailable) {
      return;
    }

    const updateData: UpdateUserData = {
      name: data.name,
    };
    if (data.username && data.username !== user?.username) {
      updateData.username = data.username;
    }
    if (data.phone) {
      updateData.phone = data.phone;
    }
    if (data.avatar_url) {
      updateData.avatar_url = data.avatar_url;
    }
    onSubmit(updateData);
  };

  const getUsernameHelperText = () => {
    if (errors.username?.message) {
      return errors.username.message;
    }
    if (!isUsernameChanged) {
      return 'Your unique username (letters, numbers, underscores only)';
    }
    if (isCheckingUsername) {
      return 'Checking availability...';
    }
    if (isUsernameAvailable === false) {
      return 'This username is already taken';
    }
    if (isUsernameAvailable === true) {
      return 'Username is available';
    }
    return 'Your unique username (letters, numbers, underscores only)';
  };

  const getUsernameEndAdornment = () => {
    if (!isUsernameChanged || !watchedUsername || watchedUsername.length < 3) {
      return null;
    }
    if (isCheckingUsername) {
      return (
        <InputAdornment position="end">
          <CircularProgress size={20} />
        </InputAdornment>
      );
    }
    if (isUsernameAvailable === true) {
      return (
        <InputAdornment position="end">
          <CheckCircleIcon color="success" />
        </InputAdornment>
      );
    }
    if (isUsernameAvailable === false) {
      return (
        <InputAdornment position="end">
          <ErrorIcon color="error" />
        </InputAdornment>
      );
    }
    return null;
  };

  return (
    <UserDetailsCard>
      <UserDetailsContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <EditFormContainer>
            {(profileError || error) && (
              <Alert severity="error">{profileError || error?.message}</Alert>
            )}

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  error={
                    Boolean(errors.username) || (isUsernameChanged && isUsernameAvailable === false)
                  }
                  helperText={getUsernameHelperText()}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                    endAdornment: getUsernameEndAdornment(),
                  }}
                />
              )}
            />

            <DetailItem>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{user?.email}</DetailValue>
              <EmailNote>Email cannot be changed</EmailNote>
            </DetailItem>

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  placeholder="Enter phone number"
                />
              )}
            />

            <EditFormActions>
              <Button onClick={onCancel} disabled={isUpdating}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isUpdating}>
                {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Save'}
              </Button>
            </EditFormActions>
          </EditFormContainer>
        </form>
      </UserDetailsContent>
    </UserDetailsCard>
  );
}

export default EditProfileForm;
