import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock import.meta.env for Vite
(globalThis as unknown as { importMetaEnv: { VITE_API_URL: string } }).importMetaEnv = {
  VITE_API_URL: 'http://localhost:4000',
};

// Mock window.scrollTo for jsdom
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Configure testing-library
configure({
  asyncUtilTimeout: 5000,
});

// Suppress specific console errors/warnings during tests
const originalError = console.error;
const originalWarn = console.warn;

const suppressedPatterns = [
  'Warning: An update to',
  'inside a test was not wrapped in act',
  'React Router Future Flag Warning',
  'v7_startTransition',
  'v7_relativeSplatPath',
  'Warning: React.jsx: type is invalid',
  'non-boolean attribute',
  'Invalid attribute name',
  'Not implemented: window.scrollTo',
];

console.error = (...args: unknown[]) => {
  const message = String(args[0]);
  if (suppressedPatterns.some((pattern) => message.includes(pattern))) {
    return;
  }
  originalError.apply(console, args);
};

console.warn = (...args: unknown[]) => {
  const message = String(args[0]);
  if (suppressedPatterns.some((pattern) => message.includes(pattern))) {
    return;
  }
  originalWarn.apply(console, args);
};
