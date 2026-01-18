import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '@/components/ui/Checkbox'

describe('Checkbox', () => {
  it('renders checkbox', () => {
    render(<Checkbox aria-label="Accept terms" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('toggles checked state', () => {
    render(<Checkbox aria-label="Subscribe" />)
    const checkbox = screen.getByRole('checkbox')

    // Initially unchecked
    expect(checkbox).not.toBeChecked()

    // Click to check
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    // Click to uncheck
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('calls onCheckedChange handler', () => {
    let checked = false
    const handleChange = (value: boolean) => {
      checked = value
    }
    render(<Checkbox onCheckedChange={handleChange} aria-label="Toggle" />)
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(checked).toBe(true)
  })

  it('can be controlled', () => {
    const { rerender } = render(<Checkbox checked={false} aria-label="Controlled" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    rerender(<Checkbox checked={true} aria-label="Controlled" />)
    expect(checkbox).toBeChecked()
  })
})
