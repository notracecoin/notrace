import type { Metadata } from 'next';
import DonateClient from './DonateClient';

export const metadata: Metadata = {
  title: 'Donate to notrace — Support Privacy-First Apps',
  description: 'Support notrace mission to build privacy-first apps. Your donation funds open development, keeps apps free, and fights surveillance.',
  keywords: 'donate, support privacy, privacy-first, open source funding, privacy mission',
  openGraph: {
    title: 'Donate to notrace — Support Privacy-First Apps',
    description: 'Support notrace mission to build privacy-first apps. Your donation funds open development.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/donate`,
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Donate to notrace',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/donate`,
  },
};

export default function DonatePage() {
  return <DonateClient />;
}
