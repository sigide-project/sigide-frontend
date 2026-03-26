/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface AllProvidersProps {
  children: React.ReactNode;
  initialEntries?: string[];
}

export function AllProviders({ children, initialEntries }: AllProvidersProps) {
  const queryClient = createTestQueryClient();
  const Router = initialEntries ? MemoryRouter : BrowserRouter;
  const routerProps = initialEntries ? { initialEntries } : {};

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router {...routerProps}>{children}</Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithProviders(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { initialEntries, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries}>{children}</AllProviders>
    ),
    ...renderOptions,
  });
}

export function createMockUser(overrides = {}) {
  return {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    name: 'Test User',
    phone: null,
    avatar_url: null,
    roles: ['user'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockItem(overrides = {}) {
  return {
    id: '1',
    title: 'Test Item',
    description: 'Test description',
    type: 'lost' as const,
    category: 'electronics',
    status: 'active' as const,
    images: [],
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Test St',
    },
    owner: createMockUser(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockAddress(overrides = {}) {
  return {
    id: '1',
    label: 'Home',
    street: '123 Test St',
    city: 'Test City',
    state: 'CA',
    zipCode: '12345',
    country: 'USA',
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export * from '@testing-library/react';
export { renderWithProviders as render };
