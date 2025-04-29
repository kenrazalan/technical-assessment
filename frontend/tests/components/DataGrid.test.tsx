import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { DataGrid } from '../../components/DataGrid'
import { QueryClient, QueryClientProvider } from 'react-query'
import { fetchStatus } from '../../api/mock-data'

// Mock the API call
jest.mock('../../api/mock-data', () => ({
  fetchStatus: jest.fn()
}))

describe('DataGrid', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  const mockData = [
    {
      id: '1',
      status: 'healthy',
      message: 'System is running normally',
      timestamp: '2024-04-28T12:00:00Z'
    },
    {
      id: '2',
      status: 'warning',
      message: 'High CPU usage detected',
      timestamp: '2024-04-28T12:01:00Z'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DataGrid />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('renders data correctly', async () => {
    ;(fetchStatus as jest.Mock).mockResolvedValueOnce(mockData)

    render(
      <QueryClientProvider client={queryClient}>
        <DataGrid />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Status Updates')).toBeInTheDocument()
      expect(screen.getByText('Healthy')).toBeInTheDocument()
      expect(screen.getByText('Warning')).toBeInTheDocument()
      expect(screen.getByText('System is running normally')).toBeInTheDocument()
      expect(screen.getByText('High CPU usage detected')).toBeInTheDocument()
    })
  })

  it('renders error state', async () => {
    ;(fetchStatus as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    render(
      <QueryClientProvider client={queryClient}>
        <DataGrid />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Failed to load status updates')).toBeInTheDocument()
    })
  })

  it('renders empty state', async () => {
    ;(fetchStatus as jest.Mock).mockResolvedValueOnce([])

    render(
      <QueryClientProvider client={queryClient}>
        <DataGrid />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('No status updates available')).toBeInTheDocument()
    })
  })

  it('shows no results message when search has no matches', async () => {
    ;(fetchStatus as jest.Mock).mockResolvedValueOnce(mockData)

    render(
      <QueryClientProvider client={queryClient}>
        <DataGrid />
      </QueryClientProvider>
    )

    const searchInput = screen.getByPlaceholderText('Search status updates...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    await waitFor(() => {
      const noResultsText = screen.getByText((content, element) => {
        return element?.textContent === 'No results found for "nonexistent"'
      })
      expect(noResultsText).toBeInTheDocument()
    })
  })
}) 