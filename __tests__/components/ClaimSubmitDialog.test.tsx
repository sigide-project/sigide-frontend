import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import { ClaimSubmitDialog } from '@/components/ClaimSubmitDialog';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockMutateAsync = jest.fn();
jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useClaimSubmit: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  item: {
    id: 'item-1',
    title: 'Lost Wallet',
    type: 'lost',
    owner: { name: 'John Doe' },
  },
};

describe('ClaimSubmitDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders proof_description field and image upload', () => {
    renderWithProviders(<ClaimSubmitDialog {...defaultProps} />);

    expect(screen.getByLabelText(/describe how you found it/i)).toBeInTheDocument();
    expect(screen.getByText(/images \(optional/i)).toBeInTheDocument();
  });

  it('shows validation error when description is under 10 chars', async () => {
    renderWithProviders(<ClaimSubmitDialog {...defaultProps} />);

    const descriptionField = screen.getByLabelText(/describe how you found it/i);
    await userEvent.type(descriptionField, 'Short');

    const submitButton = screen.getByRole('button', { name: /submit claim/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('shows "cannot claim own item" alert on 403', async () => {
    mockMutateAsync.mockRejectedValueOnce({
      response: { status: 403, data: { message: 'You cannot claim your own item' } },
    });

    renderWithProviders(<ClaimSubmitDialog {...defaultProps} />);

    const descriptionField = screen.getByLabelText(/describe how you found it/i);
    await userEvent.type(descriptionField, 'I found this wallet near the park bench area');

    const submitButton = screen.getByRole('button', { name: /submit claim/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/cannot claim your own item/i)).toBeInTheDocument();
    });
  });

  it('shows "already claimed" alert on 409', async () => {
    mockMutateAsync.mockRejectedValueOnce({
      response: { status: 409, data: { message: 'You already have an active claim on this item' } },
    });

    renderWithProviders(<ClaimSubmitDialog {...defaultProps} />);

    const descriptionField = screen.getByLabelText(/describe how you found it/i);
    await userEvent.type(descriptionField, 'I found this wallet near the park bench area');

    const submitButton = screen.getByRole('button', { name: /submit claim/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/already have an active claim/i)).toBeInTheDocument();
    });
  });

  it('navigates to /messages/:claimId on success', async () => {
    mockMutateAsync.mockResolvedValueOnce({ id: 'claim-123' });

    renderWithProviders(<ClaimSubmitDialog {...defaultProps} />);

    const descriptionField = screen.getByLabelText(/describe how you found it/i);
    await userEvent.type(descriptionField, 'I found this wallet near the park bench area');

    const submitButton = screen.getByRole('button', { name: /submit claim/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/messages/claim-123');
    });
  });
});
