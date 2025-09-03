'use client';
import { NAVIGATION, COMPANY } from '@/shared/lib/constants';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Calendar, Globe } from 'lucide-react';

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: <Facebook className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Meetup: <Calendar className="h-5 w-5" />,
  Eventbrite: <Globe className="h-5 w-5" />,
};

export function WebsiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent text-2xl font-bold">
              {COMPANY.abbreviation}
            </h3>
            <p className="text-sm text-neutral-600">{COMPANY.tagline}</p>
            <div className="space-y-2 text-sm text-neutral-600">
              <p>{COMPANY.phone}</p>
              <p>{COMPANY.email}</p>
              <p>
                {COMPANY.address.street}
                <br />
                {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Company</h4>
            <ul className="space-y-2">
              {NAVIGATION.footer.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Partners</h4>
            <ul className="space-y-2">
              {NAVIGATION.footer.partners.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              {NAVIGATION.footer.social.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-primary-500 text-neutral-700hover:text-white transition-all"
                  aria-label={link.label}
                >
                  {socialIcons[link.label] || <Globe className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-600">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-neutral-600">
              {COMPANY.website && (
                <Link
                  href={COMPANY.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors"
                >
                  {COMPANY.website.replace(/^https?:\/\//, '')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
