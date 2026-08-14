import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/app/about/components/AboutHero';
import MissionSection from '@/app/about/components/MissionSection';
import ValuesSection from '@/app/about/components/ValuesSection';
import TransparencyPledge from '@/app/about/components/TransparencyPledge';

export const metadata: Metadata = {
  title: 'About notrace — Our Mission for Privacy-First Technology',
  description: 'Learn about notrace mission to build privacy-first apps that do exactly what they say. Founded on transparency and user trust.',
  keywords: 'about notrace, privacy mission, app transparency, privacy-first company, data protection mission',
  openGraph: {
    title: 'About notrace — Our Privacy Mission',
    description: 'Learn about our mission to build privacy-first apps that do exactly what they say.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About notrace - Privacy-First Apps',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
  },
};

export default function AboutPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'notrace',
    url: baseUrl,
    logo: `${baseUrl}/assets/notrace-logo.svg`,
    description: 'Privacy-first apps that do exactly what they say',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '356/340/1331, Ashok Vihar, Alam Nagar',
      addressLocality: 'Lucknow',
      addressRegion: 'UP',
      postalCode: '226017',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />
      <main className="pt-20">
        <AboutHero />
        <MissionSection />
        <ValuesSection />
        <TransparencyPledge />
      </main>
      <Footer />
    </>
  );
}