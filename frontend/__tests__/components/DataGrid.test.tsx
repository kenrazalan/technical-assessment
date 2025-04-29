import { render, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DataGrid } from '@/components/DataGrid'

jest.mock('@/api/mock-data', () => ({
  fetchStatus: jest.fn()
}))

describe('DataGrid', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
          refetchOnWindowFocus: false
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('renders without crashing', async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <DataGrid />
        </QueryClientProvider>
      )
    })
  })
}) 