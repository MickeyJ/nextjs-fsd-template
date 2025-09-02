/**
 * Global constants for Anderson Burton Construction
 */

export const COMPANY = {
  name: 'Young Professionals Networking Group',
  shortName: 'YPNG',
  abbreviation: 'YPNG',
  tagline: 'Surround Yourself with People Who Inspire You',
  description:
    'Young Professionals Networking Group is a group of young professionals who are looking to network and grow their careers.',
  phone: '(555) 123-4567', // Update with actual
  email: 'info@ypng.com',
  website: 'https://ypng.org',
  address: {
    street: '123 Main Street', // Update with actual
    city: 'San Luis Obispo',
    state: 'CA',
    zip: '93405',
  },
} as const;

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'About', href: '/about' },
    { label: 'Meet The Board', href: '/board' },
    { label: 'Member Directory', href: '/members' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: {
    services: [
      { label: 'Events', href: '/events' },
      { label: 'Board Members', href: '/board' },
      { label: 'Member Directory', href: '/members' },
      { label: 'Contact', href: '/contact' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Meet The Board', href: '/board' },
      { label: 'Member Directory', href: '/members' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'Case Studies', href: '/resources/case-studies' },
      { label: 'News', href: '/resources/news' },
      { label: 'RFP Portal', href: '/rfp' },
      { label: 'Federal Guides', href: '/resources/guides' },
    ],
  },
} as const;

export const CERTIFICATIONS = ['Non-Profit Organization', '501(c)(3) Organization'] as const;

export const BREAKPOINTS = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
