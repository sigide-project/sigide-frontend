import { render, screen } from '@testing-library/react';
import { App } from '@/App';
import { useAuthStore } from '@/store';

jest.mock('@/pages', () => ({
  Feed: () => <div data-testid="feed-page">Feed Page</div>,
  LoginPage: () => <div data-testid="login-page">Login Page</div>,
  RegisterPage: () => <div data-testid="register-page">Register Page</div>,
  AuthCallbackPage: () => <div data-testid="auth-callback-page">Auth Callback Page</div>,
  ItemDetailPage: () => <div data-testid="item-detail-page">Item Detail Page</div>,
  ProfilePage: () => <div data-testid="profile-page">Profile Page</div>,
  UserProfilePage: () => <div data-testid="user-profile-page">User Profile Page</div>,
  HomePage: () => <div data-testid="home-page">Home Page</div>,
  HowItWorksPage: () => <div data-testid="how-it-works-page">How It Works Page</div>,
  SafetyTipsPage: () => <div data-testid="safety-tips-page">Safety Tips Page</div>,
  FAQPage: () => <div data-testid="faq-page">FAQ Page</div>,
  ContactUsPage: () => <div data-testid="contact-us-page">Contact Us Page</div>,
  ReportIssuePage: () => <div data-testid="report-issue-page">Report Issue Page</div>,
  FeedbackPage: () => <div data-testid="feedback-page">Feedback Page</div>,
  PrivacyPolicyPage: () => <div data-testid="privacy-policy-page">Privacy Policy Page</div>,
  TermsOfServicePage: () => <div data-testid="terms-of-service-page">Terms of Service Page</div>,
  CookiePolicyPage: () => <div data-testid="cookie-policy-page">Cookie Policy Page</div>,
}));

jest.mock('@/components', () => ({
  ProtectedRoute: ({ children }: { children?: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated) {
      return <div data-testid="redirect-to-login">Redirecting to login</div>;
    }
    return <>{children}</>;
  },
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe('App', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders home page on root route', () => {
    render(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders navbar on public paths (with limited features)', () => {
    render(<App />);
    expect(screen.queryByTestId('navbar')).toBeInTheDocument();
  });

  it('does not render navbar on auth callback path', () => {
    window.history.pushState({}, '', '/auth/callback');
    render(<App />);
    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
  });

  it('renders footer on non-excluded paths', () => {
    window.history.pushState({}, '', '/how-it-works');
    render(<App />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
