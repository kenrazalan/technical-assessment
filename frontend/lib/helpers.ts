import { formatNumber } from './utils';


/**
 * Format metric value with appropriate unit
 */
export const formatMetric = (value: number, unit: string = ''): string => {
  return `${formatNumber(value)}${unit}`;
};

/**
 * Get status color based on value
 */
export const getStatusColor = (value: number): string => {
  if (value >= 80) return 'text-green-500';
  if (value >= 50) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Format timestamp to relative time
 */
export const getRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}; 