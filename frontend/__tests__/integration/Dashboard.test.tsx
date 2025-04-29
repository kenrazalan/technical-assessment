import { render, screen, waitFor } from '../utils/test-utils';
import Dashboard from '../../pages/dashboard';

// Mock the API calls
jest.mock('../../lib/api', () => ({
  fetchMetrics: jest.fn().mockResolvedValue([
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 200 },
  ]),
}));

describe('Dashboard Integration', () => {
  it('loads and displays metrics data', async () => {
    render(<Dashboard />);
    
    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Verify data is displayed
    expect(screen.getByText('Metrics Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock API error
    const mockError = new Error('API Error');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.requireMock('../../lib/api').fetchMetrics.mockRejectedValueOnce(mockError);

    render(<Dashboard />);
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText('Error loading data')).toBeInTheDocument();
    });
  });
}); 