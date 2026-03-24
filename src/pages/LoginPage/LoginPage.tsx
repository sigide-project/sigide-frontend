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
} from './LoginPage.styled';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(loginSchema) as any,
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      const responseData = response.data.data ?? response.data;
      const apiUser = responseData.user!;
      const token = responseData.token!;
      const user = normalizeUser(apiUser as ApiUser);
      setAuth(user, token);
      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 401) {
        setServerError('Invalid email or password');
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
          <Title variant="h4">Welcome back</Title>
          <Subtitle variant="body1">Sign in to continue to Sigide</Subtitle>
        </LogoContainer>

        {serverError && (
          <ErrorAlert severity="error" data-testid="login-error">
            {serverError}
          </ErrorAlert>
        )}

        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
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

          <SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            data-testid="login-submit"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
          </SubmitButton>
        </FormContainer>

        <Divider>
          <DividerText>or</DividerText>
        </Divider>

        <GoogleAuthButton disabled={isLoading} />

        <FooterText variant="body2">
          Don&apos;t have an account? <FooterLink href="/register">Sign up</FooterLink>
        </FooterText>
      </FormCard>
    </PageContainer>
  );
}

export default LoginPage;
