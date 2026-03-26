import '@testing-library/jest-dom';

// Mock import.meta.env for Vite
(globalThis as unknown as { importMetaEnv: { VITE_API_URL: string } }).importMetaEnv = {
  VITE_API_URL: 'http://localhost:4000',
};
