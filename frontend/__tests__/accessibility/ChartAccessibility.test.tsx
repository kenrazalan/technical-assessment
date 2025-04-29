import { render, screen } from '../utils/test-utils';
import Chart from '../../components/Chart';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Chart Accessibility', () => {
  const mockData = [
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 200 },
  ];

  it('should not have any accessibility violations', async () => {
    const { container } = render(<Chart data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<Chart data={mockData} />);
    expect(screen.getByLabelText('Metrics Chart')).toBeInTheDocument();
  });

  it('should be keyboard navigable', () => {
    render(<Chart data={mockData} />);
    const chart = screen.getByRole('img');
    expect(chart).toHaveAttribute('tabindex', '0');
  });

  it('should have sufficient color contrast', async () => {
    const { container } = render(<Chart data={mockData} />);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });
}); 