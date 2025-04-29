// Status types
export type Status = 'healthy' | 'warning' | 'error';

export interface StatusUpdate {
  id: string;
  status: Status;
  message: string;
  timestamp: string;
}

// Metrics types
export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

// Chart types
export interface ChartData {
  name: string;
  value: number;
}

// Component props types
export interface StatusCardProps {
  status: Status;
  count: number;
  percentage: number;
}

export interface DataGridProps {
  data: StatusUpdate[];
  isLoading: boolean;
  error: Error | null;
}

export interface MetricsChartProps {
  data: TimeSeriesData[];
  isLoading: boolean;
  error: Error | null;
} 