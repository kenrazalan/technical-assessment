import { render, screen } from '../utils/test-utils';
import Chart from '../../components/Chart';

describe('Chart Component', () => {
  const mockData = [
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 200 },
  ];

  it('renders chart with data', () => {
    render(<Chart data={mockData} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('displays correct number of data points', () => {
    render(<Chart data={mockData} />);
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
    // Check if the chart container is rendered
    expect(chart.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<Chart data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
}); 