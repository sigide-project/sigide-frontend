import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { ItemCard } from '@/components/ItemCard/ItemCard';
import type { Item } from '@/types';

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

const createMockItem = (overrides: Partial<Item> = {}): Item => ({
  id: '1',
  user_id: '1',
  title: 'Test Item',
  description: 'Test description',
  type: 'lost',
  category: 'electronics',
  status: 'open',
  image_urls: ['https://example.com/image.jpg'],
  location_name: 'Test Location',
  reward_amount: '0',
  lost_found_at: new Date().toISOString(),
  owner: {
    id: '1',
    username: 'testuser',
    name: 'Test User',
    avatar_url: null,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

describe('ItemCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render item title', () => {
    const item = createMockItem({ title: 'Lost Phone' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('Lost Phone')).toBeInTheDocument();
  });

  it('should render item type badge', () => {
    const item = createMockItem({ type: 'lost' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('LOST')).toBeInTheDocument();
  });

  it('should render found type badge', () => {
    const item = createMockItem({ type: 'found' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('FOUND')).toBeInTheDocument();
  });

  it('should render category chip', () => {
    const item = createMockItem({ category: 'electronics' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('should render location name', () => {
    const item = createMockItem({ location_name: 'Central Park' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('Central Park')).toBeInTheDocument();
  });

  it('should render image when image_urls is provided', () => {
    const item = createMockItem({ image_urls: ['https://example.com/photo.jpg'] });
    renderWithProviders(<ItemCard item={item} />);

    const image = document.querySelector('[style*="background-image"]');
    expect(image).toBeInTheDocument();
  });

  it('should render placeholder when no image', () => {
    const item = createMockItem({ image_urls: [] });
    renderWithProviders(<ItemCard item={item} />);

    const placeholder =
      document.querySelector('[data-testid="ImageIcon"]') || document.querySelector('svg');
    expect(placeholder).toBeInTheDocument();
  });

  it('should navigate to item detail on click', () => {
    const item = createMockItem({ id: '123' });
    renderWithProviders(<ItemCard item={item} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/item/123');
  });

  it('should call onClick prop when provided', () => {
    const item = createMockItem();
    const onClick = jest.fn();
    renderWithProviders(<ItemCard item={item} onClick={onClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalledWith(item);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should render reward badge when reward_amount is set', () => {
    const item = createMockItem({ reward_amount: '500' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText(/₹500/)).toBeInTheDocument();
  });

  it('should not render reward badge when reward_amount is 0', () => {
    const item = createMockItem({ reward_amount: '0' });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.queryByText(/₹0/)).not.toBeInTheDocument();
  });

  it('should render distance when provided', () => {
    const item = createMockItem({ distance: 500 });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('500m')).toBeInTheDocument();
  });

  it('should format distance in km when over 1000m', () => {
    const item = createMockItem({ distance: 2500 });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText('2.5km')).toBeInTheDocument();
  });

  it('should render relative time', () => {
    const item = createMockItem({ createdAt: new Date().toISOString() });
    renderWithProviders(<ItemCard item={item} />);

    expect(screen.getByText(/ago/)).toBeInTheDocument();
  });

  it('should not render location when location_name is not provided', () => {
    const item = createMockItem({ location_name: undefined });
    renderWithProviders(<ItemCard item={item} />);

    const locationIcon = document.querySelector('[data-testid="LocationOnIcon"]');
    expect(locationIcon).not.toBeInTheDocument();
  });
});
