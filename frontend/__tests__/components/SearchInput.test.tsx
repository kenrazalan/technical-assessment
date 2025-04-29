import { render, screen, fireEvent } from '@testing-library/react'
import { SearchInput } from '@/components/SearchInput'

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} placeholder="Custom placeholder" />)
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} />)
    
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(onChange).toHaveBeenCalledWith('test')
  })

  it('displays the current value', () => {
    const onChange = jest.fn()
    render(<SearchInput value="current value" onChange={onChange} />)
    
    expect(screen.getByDisplayValue('current value')).toBeInTheDocument()
  })

  it('renders search icon', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} />)
    
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })
}) 