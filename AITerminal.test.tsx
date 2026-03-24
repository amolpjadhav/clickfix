import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import AITerminal from '../app/AITerminal'

describe('AITerminal Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the toggle button initially', () => {
    render(<AITerminal />)
    const toggleBtn = screen.getByLabelText('Toggle Terminal')
    expect(toggleBtn).toBeInTheDocument()
  })

  it('opens the terminal when toggle is clicked', () => {
    render(<AITerminal />)
    const toggleBtn = screen.getByLabelText('Toggle Terminal')
    fireEvent.click(toggleBtn)
    expect(screen.getByText('TERMINAL_UPLINK')).toBeInTheDocument()
  })

  it('displays initial system message', () => {
    render(<AITerminal />)
    fireEvent.click(screen.getByLabelText('Toggle Terminal'))
    expect(screen.getByText(/ClickFix.dev System v2.1.0 initialized/i)).toBeInTheDocument()
  })

  it('allows user to type and send a message', async () => {
    render(<AITerminal />)
    fireEvent.click(screen.getByLabelText('Toggle Terminal'))
    
    const input = screen.getByPlaceholderText('Enter command...')
    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.submit(input)

    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('responds to "help" command', async () => {
    render(<AITerminal />)
    fireEvent.click(screen.getByLabelText('Toggle Terminal'))
    
    const input = screen.getByPlaceholderText('Enter command...')
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(input)

    // Fast-forward timers to skip typing animation
    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(screen.getByText(/I can help you navigate our services/i)).toBeInTheDocument()
    })
  })

  it('responds to "services" command', async () => {
    render(<AITerminal />)
    fireEvent.click(screen.getByLabelText('Toggle Terminal'))
    
    const input = screen.getByPlaceholderText('Enter command...')
    fireEvent.change(input, { target: { value: 'services' } })
    fireEvent.submit(input)

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(screen.getByText(/I provide three core services/i)).toBeInTheDocument()
    })
  })

  it('clears terminal on "clear" command', async () => {
    render(<AITerminal />)
    fireEvent.click(screen.getByLabelText('Toggle Terminal'))
    
    const input = screen.getByPlaceholderText('Enter command...')
    fireEvent.change(input, { target: { value: 'clear' } })
    fireEvent.submit(input)

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(screen.getByText('Terminal cleared.')).toBeInTheDocument()
      expect(screen.queryByText(/ClickFix.dev System v2.1.0 initialized/i)).not.toBeInTheDocument()
    })
  })

  it('handles quick action buttons', async () => {
    render(<AITerminal />)
    fireEvent.click(screen.getByLabelText('Toggle Terminal'))
    
    const servicesBtn = screen.getByText('Services')
    fireEvent.click(servicesBtn)

    expect(screen.getAllByText('services').length).toBeGreaterThan(0)
  })
})