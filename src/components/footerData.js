export const footerData = {
  brand: {
    name: 'Zyphuel',
    logoPath: '/images/Zyphuel-logo.png',
    logoAlt: 'Zyphuel - On-Demand 24/7 Mobile Fuel & Petrol Delivery Lahore',
    fallbackLogo: true, // triggers SVG if image fails
    description:
      'Zyphuel is Pakistan\'s #1 mobile fuel delivery brand, supplier, and agency. Providing international-standard, 24/7 on-demand petrol and diesel fuel delivery across Lahore.',
  },
  contact: {
    phone: '+92 3230-112464',
    email: 'm.daniyalkhan490@gmail.com',
    address: 'Lahore, Pakistan',
    whatsapp: 'https://wa.me/923230112464',
  },
  socialLinks: [
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/muhammad.daniyal.522942/',
      icon: 'fa-brands fa-facebook-f',
    },
    {
      platform: 'Google Business Profile',
      url: 'https://share.google/Nb4XGKYq5aU0nzLr3',
      icon: 'fa-brands fa-google', // use fa-google if available; otherwise fallback
    },
    {
      platform: 'LinkedIn Company',
      url: 'https://www.linkedin.com/company/zyphuel/?viewAsMember=true', // replace with real URL
      icon: 'fa-brands fa-linkedin',
    },
    {
      platform: 'LinkedIn',
      url: 'www.linkedin.com/in/muhammad-daniyal490',
      icon: 'fa-brands fa-linkedin-in',
    },
  ],
  quickLinks: [
    { label: 'Home', to: '/' },
    { label: 'Services & Rates', to: '/services' },
    { label: 'About Us & Team', to: '/about' },
    { label: 'Order Fuel Dispatch', to: '/order' },
    { label: 'Contact Helpline', to: '/contact' },
    { label: 'Download Mobile App', to: '/download' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Use', to: '/terms-of-use' },
  ],
  // Enhanced list of Lahore towns (more local areas)
  lahoreTowns: [
    'DHA (Phase 1-9)',
    'Gulberg',
    'Johar Town',
    'Model Town',
    'Wapda Town',
    'Cantonment',
    'Bahria Town',
    'Valencia Town',
    'Faisal Town',
    'Garden Town',
    'Iqbal Town',
    'Township',
    'Shadbagh',
    'Samanabad',
    'Mughalpura',
    'Liaquatabad',
    'Shalimar',
    'Ravi Town',
    'Aziz Bhatti Town',
    'Data Gunj Bakhsh Town',
  ],
  expansion: {
    showAlert: true,
    text: 'Launching micro-hubs in Rawalpindi, Islamabad, and Karachi shortly.',
    badge: 'Islamabad Coming Soon',
  },
  bottomLinks: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Use', to: '/terms-of-use' },
  ],
  copyright: `© ${new Date().getFullYear()} Zyphuel Pakistan. All rights reserved.`,
};