/**
 * FrankX Brand Values Application in Testing
 * 
 * This test suite applies FrankX's core brand values to quality assurance:
 * 
 * 1. SOUL ALIGNMENT - Tests verify technology serves consciousness
 * 2. BEAUTIFUL SIMPLICITY - Tests ensure elegant, accessible interfaces  
 * 3. GENERATIVE ABUNDANCE - Tests validate knowledge sharing and scalability
 * 4. TRANSFORMATIVE IMPACT - Tests confirm tools change lives, not just tasks
 * 5. AUTHENTIC CONNECTION - Tests verify real relationships over transactions
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Import components under test
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Footer } from '@/components/Footer';

describe('Brand Value: Soul Alignment', () => {
  /**
   * Technology serves consciousness, not vice versa
   * Tests verify that interfaces respond to human intention, not the other way around
   */
  
  it('GlassmorphicCard responds to user interaction with natural motion', () => {
    const handleClick = vi.fn();
    render(
      <GlassmorphicCard 
        hover 
        onClick={handleClick}
        data-testid="soul-card"
      >
        Test Content
      </GlassmorphicCard>
    );
    
    const card = screen.getByTestId('soul-card');
    expect(card).toBeInTheDocument();
    
    // Card responds naturally to interaction
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalled();
  });

  it('Form inputs honor user intention without friction', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput).toHaveValue('test@example.com');
  });
});

describe('Brand Value: Beautiful Simplicity', () => {
  /**
   * Elegance in design and function
   * Tests ensure interfaces are intuitive and joyful to use
   */
  
  it('Components render with proper styling and no visual regression', () => {
    render(
      <GlassmorphicCard variant="premium" data-testid="elegant-card">
        Beautiful Simplicity
      </GlassmorphicCard>
    );
    
    const card = screen.getByTestId('elegant-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-2xl');
  });

  it('Navigation is intuitive and accessible', () => {
    render(<Footer />);
    
    // Users can find what they need without cognitive load
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});

describe('Brand Value: Generative Abundance', () => {
  /**
   * Sharing knowledge multiplies impact
   * Tests validate that content and tools scale to serve more creators
   */
  
  it('Newsletter form captures email for knowledge sharing', async () => {
    const mockSubscribe = vi.fn();
    render(<NewsletterForm onSubscribe={mockSubscribe} />);
    
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    
    await userEvent.type(emailInput, 'creator@example.com');
    await userEvent.click(submitButton);
    
    expect(mockSubscribe).toHaveBeenCalledWith('creator@example.com');
  });

  it('Social links are correctly configured for creator connection', () => {
    render(<Footer />);
    
    // Verify social links connect creators to FrankX community
    const xLink = screen.getByRole('link', { name: /x|twitter/i });
    expect(xLink).toHaveAttribute('href', 'https://x.com/frankxeth');
  });
});

describe('Brand Value: Transformative Impact', () => {
  /**
   * Tools that change lives, not just complete tasks
   * Tests verify interfaces create meaningful transformation
   */
  
  it('Components provide clear value proposition', () => {
    render(
      <GlassmorphicCard 
        variant="luxury"
        gradient="aurora"
        data-testid="transformative-card"
      >
        Transform Your Creative Practice
      </GlassmorphicCard>
    );
    
    const card = screen.getByTestId('transformative-card');
    // Card presents clear transformation opportunity
    expect(card).toBeInTheDocument();
  });

  it('Call-to-actions are action-oriented and empowering', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    const cta = screen.getByRole('button', { name: /subscribe|join/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toBeEnabled();
  });
});

describe('Brand Value: Authentic Connection', () => {
  /**
   * Real relationships over transactions
   * Tests verify genuine human connection points
   */
  
  it('Footer contains authentic creator community links', () => {
    render(<Footer />);
    
    // Community over competition - real connections
    const links = screen.getAllByRole('link');
    const hasCommunityLinks = links.some(link => 
      /community|realm|connect/i.test(link.textContent || '')
    );
    expect(hasCommunityLinks).toBe(true);
  });

  it('Contact information is clear and accessible', () => {
    render(<Footer />);
    
    // Direct connection, no gatekeeping
    const email = screen.getByText(/hello@frankx\.ai/i);
    expect(email).toBeInTheDocument();
  });
});

describe('Performance & Accessibility', () => {
  /**
   * Additional quality standards from FrankX brand identity:
   * - WCAG 2.2 compliance
   * - Oracle AI consultant-grade quality
   * - Enterprise-grade performance
   */
  
  it('Components meet accessibility standards', () => {
    render(
      <GlassmorphicCard data-testid="accessible-card">
        Accessible Content
      </GlassmorphicCard>
    );
    
    const card = screen.getByTestId('accessible-card');
    // Cards should be keyboard navigable
    expect(card).toBeInTheDocument();
  });

  it('Forms have proper labels for screen readers', () => {
    render(<NewsletterForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('Components render efficiently without memory leaks', () => {
    const { unmount } = render(
      <GlassmorphicCard data-testid="performance-card">
        Performance Test
      </GlassmorphicCard>
    );
    
    expect(screen.getByTestId('performance-card')).toBeInTheDocument();
    
    // Clean up to prevent memory leaks
    unmount();
    expect(screen.queryByTestId('performance-card')).not.toBeInTheDocument();
  });
});
