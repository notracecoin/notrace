import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact notrace — Get in Touch',
  description: 'Contact notrace for questions, support, or partnerships. Direct email contacts for different departments. Response within 1-2 business days.',
  keywords: 'contact notrace, support, customer service, inquiries, partnerships',
  openGraph: {
    title: 'Contact notrace — Get in Touch',
    description: 'Contact notrace for questions, support, or partnerships.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact notrace',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
