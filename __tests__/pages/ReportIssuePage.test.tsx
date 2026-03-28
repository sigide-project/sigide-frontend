import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { createAppTheme } from '@/theme';

const mockMutate = jest.fn();

jest.mock('@/hooks', () => ({
  useReportSubmit: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

jest.mock('@/components/PublicNavbar', () => ({
  PublicNavbar: () => <nav data-testid="public-navbar">Navbar</nav>,
}));

import { ReportIssuePage } from '@/pages/ReportIssuePage/ReportIssuePage';

const theme = createAppTheme('light');

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ReportIssuePage />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

describe('ReportIssuePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders issue type, email, listing URL, and description fields', () => {
    renderPage();
    expect(screen.getByLabelText(/issue type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/related listing url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/describe the issue/i)).toBeInTheDocument();
  });

  it('renders submit report button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /submit report/i })).toBeInTheDocument();
  });

  it('renders all 6 issue type options', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByLabelText(/issue type/i));

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Bug or Technical Issue' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Suspicious User/Listing' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Inappropriate Content' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Scam or Fraud' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Account Issue' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument();
    });
  });

  it('calls mutate on form submission', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByLabelText(/issue type/i));
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Bug or Technical Issue' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Bug or Technical Issue' }));

    await user.type(screen.getByLabelText(/your email/i), 'test@example.com');
    await user.type(
      screen.getByLabelText(/describe the issue/i),
      'This is a detailed description of the issue encountered.'
    );

    await user.click(screen.getByRole('button', { name: /submit report/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          issue_type: 'Bug or Technical Issue',
          email: 'test@example.com',
          description: 'This is a detailed description of the issue encountered.',
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

    await user.click(screen.getByLabelText(/issue type/i));
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Bug or Technical Issue' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Bug or Technical Issue' }));
    await user.type(screen.getByLabelText(/your email/i), 'test@example.com');
    await user.type(
      screen.getByLabelText(/describe the issue/i),
      'This is a detailed description of the issue encountered.'
    );
    await user.click(screen.getByRole('button', { name: /submit report/i }));

    await waitFor(() => {
      expect(screen.getByText(/your report has been submitted/i)).toBeInTheDocument();
    });
  });

  it('shows error snackbar with server message on 400 response', async () => {
    mockMutate.mockImplementation(
      (_data: unknown, options: { onError: (err: unknown) => void }) => {
        options.onError({
          response: { data: { error: 'Invalid issue type' } },
        });
      }
    );
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByLabelText(/issue type/i));
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Bug or Technical Issue' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Bug or Technical Issue' }));
    await user.type(screen.getByLabelText(/your email/i), 'test@example.com');
    await user.type(
      screen.getByLabelText(/describe the issue/i),
      'This is a detailed description of the issue encountered.'
    );
    await user.click(screen.getByRole('button', { name: /submit report/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid issue type')).toBeInTheDocument();
    });
  });
});
