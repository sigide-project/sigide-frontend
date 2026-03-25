import { screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import { NotificationsBell } from '@/components/NotificationsBell';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockMarkReadMutate = jest.fn();
const mockMarkAllReadMutate = jest.fn();

const mockNotifications = [
  {
    id: 'notif-1',
    user_id: 'user-1',
    type: 'claim_received',
    payload: { claim_id: 'claim-1', item_id: 'item-1', item_title: 'Lost Wallet', claimant_name: 'Finder' },
    read: false,
    createdAt: new Date(Date.now() - 120000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    user_id: 'user-1',
    type: 'claim_accepted',
    payload: { claim_id: 'claim-2', item_id: 'item-2', item_title: 'Lost Phone' },
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'notif-3',
    user_id: 'user-1',
    type: 'claim_rejected',
    payload: { claim_id: 'claim-3', item_id: 'item-3', item_title: 'Lost Keys' },
    read: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'notif-4',
    user_id: 'user-1',
    type: 'new_message',
    payload: { claim_id: 'claim-4', item_id: 'item-4', sender_name: 'Alice', preview: 'Hey, I found it!' },
    read: false,
    createdAt: new Date(Date.now() - 300000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'notif-5',
    user_id: 'user-1',
    type: 'item_resolved',
    payload: { claim_id: 'claim-5', item_id: 'item-5', item_title: 'Lost Laptop' },
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useNotifications: () => ({
    data: {
      notifications: mockNotifications,
      unread_count: 2,
    },
  }),
  useMarkNotificationRead: () => ({
    mutate: mockMarkReadMutate,
  }),
  useMarkAllNotificationsRead: () => ({
    mutate: mockMarkAllReadMutate,
  }),
}));

describe('NotificationsBell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows unread badge count when unread_count > 0', () => {
    renderWithProviders(<NotificationsBell />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders notification rows with correct icon per type', async () => {
    renderWithProviders(<NotificationsBell />);

    const bellButton = screen.getByLabelText(/notifications/i);
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText(/someone found your lost wallet/i)).toBeInTheDocument();
      expect(screen.getByText(/your claim on lost phone was accepted/i)).toBeInTheDocument();
      expect(screen.getByText(/your claim on lost keys was rejected/i)).toBeInTheDocument();
      expect(screen.getByText(/alice: hey, i found it!/i)).toBeInTheDocument();
      expect(screen.getByText(/lost laptop has been resolved/i)).toBeInTheDocument();
    });
  });

  it('clicking a notification calls markRead and navigates to correct route', async () => {
    renderWithProviders(<NotificationsBell />);

    const bellButton = screen.getByLabelText(/notifications/i);
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText(/someone found your lost wallet/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/someone found your lost wallet/i));

    expect(mockMarkReadMutate).toHaveBeenCalledWith('notif-1');
    expect(mockNavigate).toHaveBeenCalledWith('/messages/claim-1');
  });

  it('"Mark all as read" button calls markAllRead mutation', async () => {
    renderWithProviders(<NotificationsBell />);

    const bellButton = screen.getByLabelText(/notifications/i);
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText(/mark all as read/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/mark all as read/i));
    expect(mockMarkAllReadMutate).toHaveBeenCalled();
  });
});
