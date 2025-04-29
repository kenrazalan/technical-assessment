'use client'

import { useQuery } from 'react-query'
import { useState, useMemo } from 'react'
import { fetchStatus } from '@api/mock-data'
import { formatDate, truncateString, formatStatus } from '@lib/utils'
import { getStatusColor, getRelativeTime } from '@lib/helpers'
import { StatusUpdate } from '../types'
import { Loading } from './Loading'
import { Error } from './Error'
import { SearchInput } from './SearchInput'

export function DataGrid() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading, error } = useQuery<StatusUpdate[]>('status', fetchStatus, {
    retry: 2,
    retryDelay: 1000,
    onError: (error) => {
      console.error('Error fetching status:', error)
    }
  })

  const filteredData = useMemo(() => {
    if (!data) return []
    if (!searchQuery) return data

    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      return (
        item.message.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        formatDate(new Date(item.timestamp)).toLowerCase().includes(query)
      )
    })
  }, [data, searchQuery])

  if (isLoading) return <Loading />
  if (error) return <Error message="Failed to load status updates" />

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Status Updates</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No status updates available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold">Status Updates</h2>
        <div className="w-full sm:w-64">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search status updates..."
          />
        </div>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((item: StatusUpdate) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status === 'healthy' ? 100 : item.status === 'warning' ? 50 : 0)}`}>
                      {formatStatus(item.status)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="max-w-[200px] sm:max-w-none">
                      {truncateString(item.message, 30)}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm">{formatDate(new Date(item.timestamp))}</span>
                      <span className="text-xs text-gray-500">{getRelativeTime(new Date(item.timestamp))}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid="no-results-message">
          No results found for &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  )
} 