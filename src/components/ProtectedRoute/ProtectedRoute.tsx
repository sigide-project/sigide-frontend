import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { useSocket } from '@/hooks';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useSocket();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
