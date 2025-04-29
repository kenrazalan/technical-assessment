import { render, screen } from './test-utils';

describe('Test Utilities', () => {
  it('renders components with React Query provider', () => {
    const TestComponent = () => <div>Test Component</div>;
    render(<TestComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
}); 