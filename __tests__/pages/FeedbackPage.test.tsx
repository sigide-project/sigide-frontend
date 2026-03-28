import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { createAppTheme } from '@/theme';

const mockMutate = jest.fn();

jest.mock('@/hooks', () => ({
  useFeedbackSubmit: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

jest.mock('@/components/PublicNavbar', () => ({
  PublicNavbar: () => <nav data-testid="public-navbar">Navbar</nav>,
}));

import { FeedbackPage } from '@/pages/FeedbackPage/FeedbackPage';

const theme = createAppTheme('light');

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <FeedbackPage />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

describe('FeedbackPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders feedback field and optional fields', () => {
    renderPage();
    expect(screen.getByLabelText(/your feedback/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders the rating section', () => {
    renderPage();
    expect(screen.getByText(/how would you rate/i)).toBeInTheDocument();
  });

  it('renders the disclaimer text', () => {
    renderPage();
    expect(screen.getByText(/by submitting feedback/i)).toBeInTheDocument();
  });

  it('renders submit feedback button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
  });

  it('submits with only required feedback field', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your feedback/i), 'This is great feedback!');
    await user.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          feedback: 'This is great feedback!',
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  it('shows success snackbar on 201 response', async () => {
    mockMutate.mockImplementation((_data: unknown, options: { onSuccess: () => void }) => {
      options.onSuccess();
    });
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your feedback/i), 'This is great feedback!');
    await user.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument();
    });
  });

  it('shows error snackbar on failure', async () => {
    mockMutate.mockImplementation(
      (_data: unknown, options: { onError: (err: unknown) => void }) => {
        options.onError(new Error('Network error'));
      }
    );
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your feedback/i), 'This is great feedback!');
    await user.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
