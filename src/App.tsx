import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { ColorModeProvider } from '@/context';
import {
  Feed,
  LoginPage,
  RegisterPage,
  AuthCallbackPage,
  ItemDetailPage,
  ProfilePage,
  UserProfilePage,
  HomePage,
  HowItWorksPage,
  SafetyTipsPage,
  FAQPage,
  ContactUsPage,
  ReportIssuePage,
  FeedbackPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  CookiePolicyPage,
  MessagesPage,
} from '@/pages';
import { ProtectedRoute, Navbar, Footer } from '@/components';
import { ScrollToTop } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
    },
  },
});

const AUTH_PATHS = ['/login', '/register', '/auth/callback'];
const PATHS_WITHOUT_NAVBAR = ['/auth/callback'];
const PATHS_WITHOUT_FOOTER = ['/login', '/register', '/auth/callback', '/'];
const PATHS_WITHOUT_FOOTER_PREFIX = ['/messages/'];

function AppContent() {
  const location = useLocation();

  const showNavbar = !PATHS_WITHOUT_NAVBAR.includes(location.pathname);
  const isAuthPage = AUTH_PATHS.includes(location.pathname);
  const showFooter =
    !PATHS_WITHOUT_FOOTER.includes(location.pathname) &&
    !PATHS_WITHOUT_FOOTER_PREFIX.some((prefix) => location.pathname.startsWith(prefix));

  return (
    <>
      {showNavbar && <Navbar isAuthPage={isAuthPage} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />

          {/* Resource pages */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/safety-tips" element={<SafetyTipsPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Support pages */}
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/user/:username" element={<UserProfilePage />} />
            <Route path="/messages/:claimId" element={<MessagesPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
      {showFooter && <Footer />}
    </>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </ColorModeProvider>
    </QueryClientProvider>
  );
}

export default App;
