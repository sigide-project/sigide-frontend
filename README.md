# Sigide Frontend

Lost & Found platform frontend built with React 18, Vite, MUI, and styled-components.

## Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **State Management**: Zustand (auth), TanStack Query (server state)
- **HTTP Client**: Axios with JWT interceptor
- **UI Components**: MUI (Material UI v5)
- **Styling**: styled-components (wrapping MUI components)
- **Maps**: Leaflet + react-leaflet
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs at http://localhost:3000 by default.

### Testing

```bash
npm test           # Run tests
npm run test:watch # Watch mode
npm run test:coverage # Coverage report
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ItemCard/   # Example component folder
│       ├── index.jsx
│       ├── ItemCard.jsx
│       ├── ItemCard.styled.js
│       └── ItemCard.test.jsx
├── hooks/          # Custom React hooks
├── pages/          # Route page components
├── services/       # API services (Axios)
├── store/          # Zustand stores
├── theme/          # MUI theme configuration
└── utils/          # Constants and helpers
```

## Conventions

### Barrel Exports

Every folder has an `index.js` that re-exports public members:

```javascript
// Import from barrel, not direct path
import { ItemCard } from '@/components';
```

### Styling

- Use MUI components as base
- Apply custom styles via styled-components
- No `sx` prop or inline styles
- No Tailwind

### Component Structure

```
ComponentName/
├── index.jsx           # Re-exports
├── ComponentName.jsx   # Component logic
├── ComponentName.styled.js  # Styled components
└── ComponentName.test.jsx   # Tests
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
VITE_API_URL=http://localhost:4000/api
```
