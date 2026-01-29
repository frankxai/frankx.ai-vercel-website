export const membershipConfig = {
  checkoutUrl:
    process.env.NEXT_PUBLIC_INNER_CIRCLE_CHECKOUT_URL ||
    'https://frankx.ck.page/creation-chronicles',
  accessUrl:
    process.env.NEXT_PUBLIC_INNER_CIRCLE_ACCESS_URL ||
    '/vault',
  supportUrl:
    process.env.NEXT_PUBLIC_INNER_CIRCLE_SUPPORT_URL ||
    'mailto:hello@frankx.ai',
}
