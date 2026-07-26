import { trackEvent } from '@/lib/analytics'

export const trackConversion = (url: string, conversionId: string) => {
  trackEvent('conversion_click', { conversion_id: conversionId })
  window.location.href = url
}
