import { render } from '../utils/test-utils';
import Chart from '../../components/Chart';

describe('Chart Performance', () => {
  const generateLargeDataset = (size: number) => {
    return Array.from({ length: size }, (_, i) => ({
      date: `2024-01-${i + 1}`,
      value: Math.random() * 1000,
    }));
  };

  it('renders large dataset within acceptable time', () => {
    const largeDataset = generateLargeDataset(1000);
    const startTime = performance.now();
    
    render(<Chart data={largeDataset} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Expect rendering to take less than 1 second
    expect(renderTime).toBeLessThan(1000);
  });

  it('maintains performance with frequent updates', () => {
    const { rerender } = render(<Chart data={generateLargeDataset(100)} />);
    
    const updateTimes: number[] = [];
    
    // Simulate 10 rapid updates
    for (let i = 0; i < 10; i++) {
      const startTime = performance.now();
      rerender(<Chart data={generateLargeDataset(100)} />);
      const endTime = performance.now();
      updateTimes.push(endTime - startTime);
    }
    
    // Calculate average update time
    const averageUpdateTime = updateTimes.reduce((a, b) => a + b) / updateTimes.length;
    
    // Expect average update time to be less than 100ms
    expect(averageUpdateTime).toBeLessThan(100);
  });
}); 