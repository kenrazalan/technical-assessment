'use client'

import { MetricsChart, DataGrid } from './index'
import { formatDateTime } from '@lib/utils'
import { ThemeToggle } from './ThemeToggle'

export function Dashboard() {
  return (
    <div className="dashboard-layout" data-testid="dashboard-container">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Metrics Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {formatDateTime(new Date())}
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="grid gap-8" data-testid="dashboard-grid">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <DataGrid />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <MetricsChart />
          </div>
        </div>
      </div>
    </div>
  )
} 