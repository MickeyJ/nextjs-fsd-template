import '../globals.css';

import type { Metadata } from 'next';
import { Roboto_Condensed, Roboto_Flex, Roboto_Mono } from 'next/font/google';

import { COMPANY } from '@/shared/lib/constants';

import { WebsiteHeader, WebsiteFooter } from '@/widgets';

const headerFont = Roboto_Condensed({
  variable: '--ypng-font-family-header',
  subsets: ['latin'],
  weight: ['400'],
});

const bodyFont = Roboto_Flex({
  variable: '--ypng-font-family-body',
  subsets: ['latin'],
});

const bodyFontMono = Roboto_Mono({
  variable: '--ypng-font-family-body-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: `${COMPANY.name} - ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: ['young professionals', 'networking', 'events', 'members', 'non-profit', '501(c)(3)'],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
    other: [{ rel: 'icon', type: 'image/png', sizes: '192x192', url: '/icons/android-chrome-192x192.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: COMPANY.website,
    siteName: COMPANY.name,
    title: COMPANY.name,
    description: COMPANY.description,
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: COMPANY.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY.name,
    description: COMPANY.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${bodyFontMono.variable} ${headerFont.variable} antialiased`}>
        <WebsiteHeader />
        <main>{children}</main>
        <WebsiteFooter />
      </body>
    </html>
  );
}
