'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useQuery } from 'react-query'
import { fetchMetrics } from '@api/mock-data'
import { formatDate } from '@lib/utils'
import { TimeSeriesData } from '../types'
import { Loading } from './Loading'
import { Error } from './Error'

export function MetricsChart() {
  const { data, isLoading, error, refetch } = useQuery<TimeSeriesData[]>('metrics', () => fetchMetrics('day'), {
    retry: 2,
    retryDelay: 1000,
    onError: (error) => {
      console.error('Error fetching metrics:', error)
    }
  })

  if (isLoading) return <Loading />
  if (error) return <Error message="Failed to load metrics data" />

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Metrics Overview</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No metrics data available
        </div>
      </div>
    )
  }

  const formatXAxis = (timestamp: string) => {
    return formatDate(new Date(timestamp))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Metrics Overview</h2>
      <div className="h-[400px]" role="img" tabIndex={0} aria-label="Metrics chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatXAxis}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={formatXAxis}
              formatter={(value: number) => [`${value}`, 'Value']}
              contentStyle={{ fontSize: '12px' }}
            />
            <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 