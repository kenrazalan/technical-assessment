import React from 'react';
import { useQuery } from 'react-query';
import Chart from '../components/Chart';
import { fetchMetrics } from '../lib/api';

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery('metrics', fetchMetrics);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Metrics Dashboard</h1>
      <Chart data={data || []} />
    </div>
  );
};

export default Dashboard; 