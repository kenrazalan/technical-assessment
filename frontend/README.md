# Frontend Specialist Assessment

## Objective

Create a modern, responsive dashboard using Next.js 14 that demonstrates your frontend expertise.

## Project Overview

You'll be building a metrics dashboard that:

- Displays real-time and historical data
- Implements responsive layouts
- Handles loading and error states
- Uses modern React patterns

## Tasks

### 1. Dashboard Implementation (40 points)

```tsx
// Example component structure provided
import { Suspense } from "react";
import { MetricsChart, DataGrid, StatusCards } from "./components";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Suspense fallback={<Loading />}>
        {/* Implement your dashboard here */}
      </Suspense>
    </div>
  );
}
```

Requirements:

- Use Next.js 14 App Router
- Implement Server and Client Components appropriately
- Create reusable components
- Add proper loading states
- Handle errors gracefully
- Make it responsive (mobile-first)

### 2. Data Integration (30 points)

We provide a mock API in `api/mock-data.ts`:

```typescript
// Example usage
const data = await fetchMetrics(); // Returns mock time-series data
const status = await fetchStatus(); // Returns mock status updates
```

Requirements:

- Implement data fetching using provided mock API
- Add proper TypeScript types
- Handle loading states
- Implement error boundaries
- Add retry logic
- Cache responses appropriately

### 3. Performance & Testing (30 points)

Requirements:

- Add component tests using React Testing Library
- Implement performance monitoring
- Optimize bundle size
- Add error tracking
- Document performance decisions

## Getting Started

1. Setup project:

```bash
# Everything is local - no external services needed
npm install
npm run dev
```

2. Available Scripts:

```bash
npm run dev        # Start development server
npm run test      # Run tests
npm run lint      # Check code quality
npm run build     # Production build
```

3. Project Structure:

```
frontend/
├── app/                # Next.js 14 app directory
├── components/         # Reusable components
├── lib/               # Utilities and helpers
├── api/               # Mock API endpoints
└── tests/             # Test files
```

## Provided Resources

- Mock API with TypeScript types
- Basic component templates
- Test setup and examples
- ESLint configuration
- Example data structures

## Requirements

### Technical

- Next.js 14
- TypeScript
- Tailwind CSS
- React Testing Library
- ESLint + Prettier

### Features

- Metrics visualization
- Data tables
- Status indicators
- Search/filter functionality
- Responsive design
- Dark/light mode

### Testing

- Component tests
- Integration tests
- Performance tests
- Accessibility tests

## Evaluation Criteria

### Code Quality (30%)

- Clean, maintainable code
- TypeScript usage
- Error handling
- Code organization

### UI/UX (30%)

- Responsive design
- Loading states
- Error states
- Visual consistency

### Performance (20%)

- Load time optimization
- Bundle size
- Render optimization
- Caching strategy

### Testing (20%)

- Test coverage
- Test quality
- Edge cases
- Accessibility testing

## Tips

- Start with component structure
- Use provided mock data
- Focus on core functionality first
- Document key decisions
- Consider edge cases
- Test thoroughly

## Submission Checklist

- [/] All features implemented
- [/] Tests passing
- [/] Performance optimized
- [/] Documentation complete
- [/] Code linting clean
- [/] Responsive design working
- [/] Dark/light mode working

## Notes

- All data is mocked locally - no external services needed
- No authentication required
- No backend integration needed
- Focus on frontend implementation
- Document any assumptions made

---

# Project Documentation

## Project Overview
A real-time metrics dashboard built with Next.js, React Query, and Tailwind CSS. The dashboard displays system status updates and metrics in a clean, responsive interface.

## Features
- Real-time status updates with color-coded indicators
- Interactive metrics chart with time-series data
- Responsive design for all screen sizes
- Dark mode support
- Error handling and loading states
- Type-safe with TypeScript

## Tech Stack
- **Framework**: Next.js 14
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Type Safety**: TypeScript
- **Testing**: Jest + React Testing Library

## Project Structure
```
frontend/
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── Dashboard.tsx   # Main dashboard layout
│   ├── DataGrid.tsx    # Status updates table
│   ├── MetricsChart.tsx # Metrics visualization
│   └── Loading.tsx     # Loading component
├── lib/               # Utility functions
│   ├── utils.ts       # General utilities
│   └── helpers.ts     # Dashboard-specific helpers
├── types/             # TypeScript type definitions
├── tests/             # Test files
└── api/               # API integration
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development
Run the development server:
```bash
npm run dev
```

### Testing
Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate test coverage:
```bash
npm run test:coverage
```

### Building
Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Component Documentation

### Dashboard
The main dashboard component that orchestrates the layout and data flow. It includes:
- Status updates table
- Metrics chart
- Last updated timestamp
- Responsive grid layout

### DataGrid
Displays system status updates in a table format:
- Color-coded status indicators
- Truncated messages
- Formatted timestamps
- Loading and error states

### MetricsChart
Visualizes metrics data using Recharts:
- Line chart for time-series data
- Interactive tooltips
- Responsive container
- Loading and error states


## Testing
The project uses Jest and React Testing Library for testing:
- Component rendering tests
- State management tests
- Error handling tests
- Loading state tests
- API integration tests

## Best Practices
- Type safety with TypeScript
- Component-based architecture
- Responsive design
- Error handling
- Loading states
- Code organization
- Test coverage
- Performance optimization

