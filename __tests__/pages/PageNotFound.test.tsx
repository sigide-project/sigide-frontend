import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const MOTION_PROPS = [
  'initial',
  'animate',
  'exit',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'transition',
  'layout',
];

function filterMotionProps(props: Record<string, unknown>) {
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROPS.includes(key)) {
      filtered[key] = value;
    }
  }
  return filtered;
}

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: new Proxy(
    {
      create: (Component: React.ElementType) =>
        React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) =>
          React.createElement(Component, { ...filterMotionProps(props), ref })
        ),
    },
    {
      get: (target: Record<string, unknown>, prop: string) => {
        if (prop === 'create') return target.create;
        return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) =>
          React.createElement(prop, { ...filterMotionProps(props), ref })
        );
      },
    }
  ),
}));

import { PageNotFound } from '@/pages/PageNotFound/PageNotFound';

const renderPageNotFound = (initialEntries: string[] = ['/unknown-route']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('PageNotFound', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the 404 page', () => {
    renderPageNotFound();
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });

  it('displays the 404 text', () => {
    renderPageNotFound();
    const headings = screen.getAllByText('404');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('displays the subtitle', () => {
    renderPageNotFound();
    expect(screen.getByText(/off the map/i)).toBeInTheDocument();
  });

  it('displays the description', () => {
    renderPageNotFound();
    expect(screen.getByText(/wandered off into the void/i)).toBeInTheDocument();
  });

  it('renders the Home link button', () => {
    renderPageNotFound();
    const homeButton = screen.getByTestId('home-link');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveTextContent('Go Home');
  });

  it('renders the Feed link button', () => {
    renderPageNotFound();
    const feedButton = screen.getByTestId('feed-link');
    expect(feedButton).toBeInTheDocument();
    expect(feedButton).toHaveTextContent('Browse Feed');
  });

  it('navigates to home when Home button is clicked', () => {
    renderPageNotFound();
    fireEvent.click(screen.getByTestId('home-link'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to feed when Feed button is clicked', () => {
    renderPageNotFound();
    fireEvent.click(screen.getByTestId('feed-link'));
    expect(mockNavigate).toHaveBeenCalledWith('/feed');
  });

  it('renders the logo image', () => {
    renderPageNotFound();
    expect(screen.getByAltText('Sigide logo')).toBeInTheDocument();
  });

  it('renders both navigation buttons', () => {
    renderPageNotFound();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
