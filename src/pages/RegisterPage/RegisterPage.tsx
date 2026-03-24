import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { authApi } from '@/services';
import { useAuthStore } from '@/store';
import { GoogleAuthButton } from '@/components';
import { normalizeUser, type ApiUser } from '@/utils';
import {
  PageContainer,
  FormCard,
  LogoContainer,
  Title,
  Subtitle,
  FormContainer,
  StyledTextField,
  SubmitButton,
  Divider,
  DividerText,
  ErrorAlert,
  FooterText,
  FooterLink,
} from './RegisterPage.styled';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

const registerSchema = yup.object({
  name: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup.string(),
});

export function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(registerSchema) as any,
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || undefined,
      });

      const responseData = response.data.data ?? response.data;
      const apiUser = responseData.user!;
      const token = responseData.token!;
      const user = normalizeUser(apiUser as ApiUser);
      setAuth(user, token);
      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 409) {
        setServerError('An account with this email already exists');
      } else {
        setServerError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormCard elevation={2}>
        <LogoContainer>
          <Title variant="h4">Create account</Title>
          <Subtitle variant="body1">Join Sigide to help find lost items</Subtitle>
        </LogoContainer>

        {serverError && (
          <ErrorAlert severity="error" data-testid="register-error">
            {serverError}
          </ErrorAlert>
        )}

        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <StyledTextField
            {...register('name')}
            label="Full name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
            inputProps={{ 'data-testid': 'name-input' }}
          />

          <StyledTextField
            {...register('email')}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoading}
            inputProps={{ 'data-testid': 'email-input' }}
          />

          <StyledTextField
            {...register('password')}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
            inputProps={{ 'data-testid': 'password-input' }}
          />

          <StyledTextField
            {...register('confirmPassword')}
            label="Confirm password"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isLoading}
            inputProps={{ 'data-testid': 'confirm-password-input' }}
          />

          <StyledTextField
            {...register('phone')}
            label="Phone (optional)"
            type="tel"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
            disabled={isLoading}
            inputProps={{ 'data-testid': 'phone-input' }}
          />

          <SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            data-testid="register-submit"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create account'}
          </SubmitButton>
        </FormContainer>

        <Divider>
          <DividerText>or</DividerText>
        </Divider>

        <GoogleAuthButton label="Sign up with Google" disabled={isLoading} />

        <FooterText variant="body2">
          Already have an account? <FooterLink href="/login">Sign in</FooterLink>
        </FooterText>
      </FormCard>
    </PageContainer>
  );
}

export default RegisterPage;
