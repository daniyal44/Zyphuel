/**
 * Google review request flow — single source of truth.
 *
 * Both the order-confirmation card (OrderPage) and the invoice PDF QR read from
 * this file, so the link and copy can never drift apart.
 *
 * Replace GOOGLE_REVIEW_URL with the exact "ask for reviews" short link from the
 * Google Business Profile dashboard (Reviews → Get more reviews) once the profile
 * is verified. Set it to '' to disable the whole flow without touching components.
 */
export const GOOGLE_REVIEW_URL = 'https://share.google/Nb4XGKYq5aU0nzLr3'

export const GOOGLE_REVIEW_ENABLED = GOOGLE_REVIEW_URL.trim().length > 0

export const REVIEW_PROMPT = {
  title: 'Rate your delivery on Google',
  subtitle:
    'Aap ki honest review doosre Lahore customers ko metered, OGRA-verified doorstep fuel dhoondne me madad karti hai.',
  cta: 'Write a Google Review',
  note: 'Optional · koi incentive nahi, koi script nahi — sirf aap ka experience.',
  invoiceTitle: 'HOW WAS YOUR DELIVERY?',
  invoiceBody:
    'Scan with your phone camera to leave an honest Google review of your doorstep refueling.',
  invoiceFooter: '★ RATE ZYPHUEL ON GOOGLE',
}
