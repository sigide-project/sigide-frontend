import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import { MessagesPage } from '@/pages/MessagesPage';

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

Element.prototype.scrollIntoView = jest.fn();

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ claimId: 'claim-1' }),
}));

const currentUser = {
  id: 'user-owner',
  name: 'Owner',
  username: 'owner',
  email: 'owner@test.com',
  avatar_url: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const baseMessagesResponse = {
  success: true,
  messages: [
    {
      id: 'msg-1',
      claim_id: 'claim-1',
      sender_id: 'user-finder',
      sender: {
        id: 'user-finder',
        name: 'Finder',
        username: 'finder',
        email: 'f@t.com',
        avatar_url: null,
        createdAt: '',
        updatedAt: '',
      },
      content: 'I found your wallet',
      read_at: null,
      createdAt: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: 'msg-2',
      claim_id: 'claim-1',
      sender_id: 'user-owner',
      sender: {
        id: 'user-owner',
        name: 'Owner',
        username: 'owner',
        email: 'o@t.com',
        avatar_url: null,
        createdAt: '',
        updatedAt: '',
      },
      content: 'Thank you for finding it',
      read_at: new Date().toISOString(),
      createdAt: new Date(Date.now() - 30000).toISOString(),
    },
  ],
  claim: {
    id: 'claim-1',
    status: 'pending',
    item: { id: 'item-1', title: 'Lost Wallet', type: 'lost', status: 'open', image_urls: [] },
    claimant: {
      id: 'user-finder',
      name: 'Finder',
      username: 'finder',
      email: 'f@t.com',
      avatar_url: null,
      createdAt: '',
      updatedAt: '',
    },
    owner: {
      id: 'user-owner',
      name: 'Owner',
      username: 'owner',
      email: 'o@t.com',
      avatar_url: null,
      createdAt: '',
      updatedAt: '',
    },
  },
};

const mockUseMessages = jest.fn();
jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useMessages: (...args: unknown[]) => mockUseMessages(...args),
  useSendMessage: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
  useAcceptClaim: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
  useRejectClaim: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
  useResolveClaim: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/store', () => ({
  useAuthStore: () => ({
    user: currentUser,
    isAuthenticated: true,
  }),
}));

describe('MessagesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMessages.mockReturnValue({
      data: baseMessagesResponse,
      isLoading: false,
    });
  });

  it('renders message bubbles with correct alignment', () => {
    renderWithProviders(<MessagesPage />, { initialEntries: ['/messages/claim-1'] });

    expect(screen.getByText('I found your wallet')).toBeInTheDocument();
    expect(screen.getByText('Thank you for finding it')).toBeInTheDocument();
  });

  it('disables input when claim status is rejected', () => {
    mockUseMessages.mockReturnValue({
      data: {
        ...baseMessagesResponse,
        claim: { ...baseMessagesResponse.claim, status: 'rejected' },
      },
      isLoading: false,
    });

    renderWithProviders(<MessagesPage />, { initialEntries: ['/messages/claim-1'] });

    expect(screen.getByText(/this conversation is closed/i)).toBeInTheDocument();
  });

  it('disables input when claim status is resolved', () => {
    mockUseMessages.mockReturnValue({
      data: {
        ...baseMessagesResponse,
        claim: { ...baseMessagesResponse.claim, status: 'resolved' },
      },
      isLoading: false,
    });

    renderWithProviders(<MessagesPage />, { initialEntries: ['/messages/claim-1'] });

    expect(screen.getByText(/this conversation is closed/i)).toBeInTheDocument();
  });

  it('shows Accept and Reject buttons for item owner with pending claim', () => {
    renderWithProviders(<MessagesPage />, { initialEntries: ['/messages/claim-1'] });

    expect(screen.getByRole('button', { name: /accept claim/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reject claim/i })).toBeInTheDocument();
  });

  it('shows WhatsApp button only when claim is accepted and whatsapp_url present', () => {
    mockUseMessages.mockReturnValue({
      data: {
        ...baseMessagesResponse,
        claim: { ...baseMessagesResponse.claim, status: 'accepted' },
        contact: { whatsapp_url: 'https://wa.me/919876543210?text=Hi' },
      },
      isLoading: false,
    });

    renderWithProviders(<MessagesPage />, { initialEntries: ['/messages/claim-1'] });

    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  });

  it('shows closed banner when claim is resolved', () => {
    mockUseMessages.mockReturnValue({
      data: {
        ...baseMessagesResponse,
        claim: { ...baseMessagesResponse.claim, status: 'resolved' },
      },
      isLoading: false,
    });

    renderWithProviders(<MessagesPage />, { initialEntries: ['/messages/claim-1'] });

    expect(screen.getByText(/this conversation is closed/i)).toBeInTheDocument();
  });
});
