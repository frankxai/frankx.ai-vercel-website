import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter your email" />)
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('handles text input', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input).toHaveValue('test@example.com')
  })

  it('shows error state', () => {
    render(<Input error helperText="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('shows password toggle for password inputs', () => {
    render(<Input type="password" />)
    const toggleButton = screen.getByLabelText('Show password')
    expect(toggleButton).toBeInTheDocument()
  })

  it('toggles password visibility', () => {
    render(<Input type="password" />)
    const input = screen.getByRole('textbox')
    const toggleButton = screen.getByLabelText('Show password')

    // Initially hidden
    expect(input).toHaveAttribute('type', 'password')

    // Click to show
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument()

    // Click to hide
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders with left icon', () => {
    const Icon = () => <span data-testid="test-icon">Icon</span>
    render(<Input icon={<Icon />} iconPosition="left" />)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('calls onChange handler', () => {
    let value = ''
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value
    }
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(value).toBe('new value')
  })
})
