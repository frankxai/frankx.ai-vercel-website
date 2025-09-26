export const trackConversion = (url: string, conversionId: string) => {
  window.gtag('event', 'conversion', {
    send_to: `${process.env.NEXT_PUBLIC_GA_TRACKING_ID}/${conversionId}`,
    event_callback: () => {
      window.location.href = url
    },
  })
}
