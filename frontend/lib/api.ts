export interface Metric {
  date: string;
  value: number;
}

export const fetchMetrics = async (): Promise<Metric[]> => {
  try {
    const response = await fetch('/api/metrics');
    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
}; 