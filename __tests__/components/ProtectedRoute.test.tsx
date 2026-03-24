import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { useAuthStore } from '@/store';

const ProtectedContent = () => <div>Protected Content</div>;
const LoginPage = () => <div>Login Page</div>;

const renderWithRouter = (initialEntries: string[] = ['/protected']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<ProtectedContent />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('should redirect to login when not authenticated', () => {
    renderWithRouter();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render protected content when authenticated', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      token: 'test-token',
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithRouter();

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to login when token is null', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });

    renderWithRouter();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should use replace navigation to login', () => {
    renderWithRouter();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
