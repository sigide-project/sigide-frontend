import '@testing-library/jest-dom';

// Mock import.meta.env for Vite
(globalThis as any).importMetaEnv = {
  VITE_API_URL: 'http://localhost:4000',
};
