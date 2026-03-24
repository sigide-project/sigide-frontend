import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { authApi } from '@/services';
import { useAuthStore } from '@/store';
import { normalizeUser, type ApiUser } from '@/utils';
import { PageContainer, LoadingText } from './AuthCallbackPage.styled';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processCallback = async () => {
      const token = searchParams.get('token');

      if (!token) {
        navigate('/login?error=google_failed');
        return;
      }

      try {
        const response = await authApi.getMeWithToken(token);
        const apiUser = response.data.data ?? response.data;
        const user = normalizeUser(apiUser as ApiUser);
        setAuth(user, token);
        navigate('/');
      } catch {
        navigate('/login?error=google_failed');
      }
    };

    processCallback();
  }, [searchParams, setAuth, navigate]);

  return (
    <PageContainer data-testid="auth-callback-page">
      <CircularProgress size={48} />
      <LoadingText variant="body1">Completing sign in...</LoadingText>
    </PageContainer>
  );
}

export default AuthCallbackPage;
