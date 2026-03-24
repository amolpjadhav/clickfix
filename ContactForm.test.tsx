import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../app/ContactForm'

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('jane@acme.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Acme Inc.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Describe your project goals/i)).toBeInTheDocument()
  })

  it('shows validation error for empty name', async () => {
    render(<ContactForm />)
    const submitBtn = screen.getByText(/SEND MESSAGE/i)
    fireEvent.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByPlaceholderText('jane@acme.com')
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } })
    
    const submitBtn = screen.getByText(/SEND MESSAGE/i)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    render(<ContactForm />)
    
    fireEvent.change(screen.getByPlaceholderText('Jane Doe'), { target: { value: 'John Test' } })
    fireEvent.change(screen.getByPlaceholderText('jane@acme.com'), { target: { value: 'john@test.com' } })
    fireEvent.change(screen.getByPlaceholderText(/Describe your project goals/i), { target: { value: 'I need a React application built.' } })
    
    const submitBtn = screen.getByText(/SEND MESSAGE/i)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(screen.getByText('Message Sent')).toBeInTheDocument()
    })
  })
})