import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { createAppTheme } from '@/theme';

const mockMutate = jest.fn();

jest.mock('@/hooks', () => ({
  useContactSubmit: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

jest.mock('@/components/PublicNavbar', () => ({
  PublicNavbar: () => <nav data-testid="public-navbar">Navbar</nav>,
}));

import { ContactUsPage } from '@/pages/ContactUsPage/ContactUsPage';

const theme = createAppTheme('light');

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ContactUsPage />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

describe('ContactUsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders name, email, subject, message fields', () => {
    renderPage();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders send message button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('calls mutate on form submission', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your name/i), 'Test User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough chars.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'This is a test message with enough chars.',
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  it('shows success snackbar on success', async () => {
    mockMutate.mockImplementation((_data: unknown, options: { onSuccess: () => void }) => {
      options.onSuccess();
    });
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your name/i), 'Test User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough chars.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
    });
  });

  it('shows error snackbar on error', async () => {
    mockMutate.mockImplementation(
      (_data: unknown, options: { onError: (err: unknown) => void }) => {
        options.onError(new Error('Network error'));
      }
    );
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your name/i), 'Test User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough chars.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows server error message on 400 response', async () => {
    mockMutate.mockImplementation(
      (_data: unknown, options: { onError: (err: unknown) => void }) => {
        options.onError({
          response: { data: { error: 'Name must be at least 2 characters' } },
        });
      }
    );
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your name/i), 'T');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough chars.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });
});
