import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { AppSnackbar } from '@/components/AppSnackbar/AppSnackbar';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('AppSnackbar', () => {
  it('renders with success severity and correct message', () => {
    renderWithTheme(
      <AppSnackbar open={true} message="Success message" severity="success" onClose={jest.fn()} />
    );
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders with error severity and correct message', () => {
    renderWithTheme(
      <AppSnackbar open={true} message="Error message" severity="error" onClose={jest.fn()} />
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    renderWithTheme(
      <AppSnackbar open={true} message="Test" severity="success" onClose={onClose} />
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render content when open is false', () => {
    renderWithTheme(
      <AppSnackbar open={false} message="Hidden message" severity="success" onClose={jest.fn()} />
    );
    expect(screen.queryByText('Hidden message')).not.toBeInTheDocument();
  });
});
