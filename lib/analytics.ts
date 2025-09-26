// This is a mock analytics service.
// In a real-world application, you would integrate with a service like Google Analytics, Plausible, or a custom solution.

interface Event {
  name: string;
  params?: Record<string, any>;
}

const eventLog: Event[] = [];

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  const event: Event = { name: eventName, params };
  console.log('Analytics Event:', event);
  eventLog.push(event);
};

// Example usage:
// trackEvent('page_view', { page_path: '/about' });
// trackEvent('subscribe_newsletter', { method: 'footer_form' });
// trackEvent('affiliate_click', { affiliate_id: 'notion', tracking_id: 'resource-page-cta' });