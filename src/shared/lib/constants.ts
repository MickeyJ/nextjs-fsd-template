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
  phone: '(805) 710-6302', // TODO: Get Google Voice number
  email: 'info@ypng.com',
  website: 'https://ypng.org',
  address: {
    street: 'PO Box 13643',
    city: 'San Luis Obispo',
    state: 'CA',
    zip: '93406',
  },
} as const;

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      sub_links: [
        { label: 'About YPNG', href: '/about' },
        { label: 'Meet The Board', href: '/board-members' },
      ],
    },
    { label: 'Become a Member', href: '/membership' },
    { label: 'Events', href: '/events' },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Softball', href: '/softball' },
    { label: 'Member Directory', href: '/members' },
    { label: 'Community Board', href: '/community-board' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: {
    social: [
      { label: 'Facebook', href: 'https://www.facebook.com/YPNGSLO' },
      { label: 'Instagram', href: 'https://www.instagram.com/youngprofessionalsslo/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/276027/admin/' },
      { label: 'Meetup', href: 'https://www.meetup.com/san-luis-obispo-sociale-meetup-group/' },
      { label: 'Eventbrite', href: 'https://www.eventbrite.com/o/young-professionals-networking-group-110970285251' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'The Board', href: '/board-members' },
      { label: 'Members', href: '/members' },
      { label: 'Contact', href: '/contact' },
    ],
    partners: [
      { label: 'SLO Chamber of Commerce', href: '/partners/slo-chamber' },
      { label: 'SBDC', href: '/partners/sbdc' },
      { label: '20s & 30s', href: '/partners/20s-30s' },
      { label: 'Surfrider Foundation', href: '/partners/surfrider-foundation' },
    ],
  },
} as const;

export type NavItem = (typeof NAVIGATION.main)[number];
export type NavLink = Extract<NavItem, { href: string }>;
export type NavItemWithSubLinks = Extract<NavItem, { sub_links: any }>;
export type NavigationConfig = typeof NAVIGATION;

// Type guard to check if a nav item has sub_links
export function hasSubLinks(item: NavItem): item is NavItemWithSubLinks {
  return 'sub_links' in item;
}

export const CERTIFICATIONS = ['Non-Profit Organization', '501(c)(3) Organization'] as const;

export const BREAKPOINTS = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
