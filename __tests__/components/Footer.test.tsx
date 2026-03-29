import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { Footer } from '@/components/Footer/Footer';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

describe('Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render brand name', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Sigide')).toBeInTheDocument();
  });

  it('should render brand description', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(/Reuniting people with their lost belongings/)).toBeInTheDocument();
  });

  // it('should render social links', () => {
  //   renderWithProviders(<Footer />);

  //   expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  //   expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  // });

  it('should render Quick Links section', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Browse Items')).toBeInTheDocument();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
  });

  it('should render Resources section', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Safety Tips')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('should render Support section', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Report an Issue')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
  });

  it('should render legal links', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
  });

  it('should render current year in copyright', () => {
    renderWithProviders(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('should navigate to home on logo click', () => {
    renderWithProviders(<Footer />);

    const logo = screen.getByText('Sigide');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to feed on Browse Items click', () => {
    renderWithProviders(<Footer />);

    const browseItems = screen.getByText('Browse Items');
    fireEvent.click(browseItems);

    expect(mockNavigate).toHaveBeenCalledWith('/feed');
  });

  it('should navigate to profile on My Profile click', () => {
    renderWithProviders(<Footer />);

    const myProfile = screen.getByText('My Profile');
    fireEvent.click(myProfile);

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('should navigate to how-it-works on How It Works click', () => {
    renderWithProviders(<Footer />);

    const howItWorks = screen.getByText('How It Works');
    fireEvent.click(howItWorks);

    expect(mockNavigate).toHaveBeenCalledWith('/how-it-works');
  });

  it('should navigate to privacy-policy on Privacy Policy click', () => {
    renderWithProviders(<Footer />);

    const privacyPolicy = screen.getByText('Privacy Policy');
    fireEvent.click(privacyPolicy);

    expect(mockNavigate).toHaveBeenCalledWith('/privacy-policy');
  });

  it('should navigate to terms-of-service on Terms of Service click', () => {
    renderWithProviders(<Footer />);

    const termsOfService = screen.getByText('Terms of Service');
    fireEvent.click(termsOfService);

    expect(mockNavigate).toHaveBeenCalledWith('/terms-of-service');
  });

  it('should navigate to contact on Contact Us click', () => {
    renderWithProviders(<Footer />);

    const contactUs = screen.getByText('Contact Us');
    fireEvent.click(contactUs);

    expect(mockNavigate).toHaveBeenCalledWith('/contact');
  });

  // it('should have external links with correct attributes', () => {
  //   renderWithProviders(<Footer />);

  //   const githubLink = screen.getByLabelText('GitHub');
  //   expect(githubLink).toHaveAttribute('target', '_blank');
  //   expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  // });
});
