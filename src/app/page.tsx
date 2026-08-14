import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import EvidenceSection from '@/app/components/EvidenceSection';
import ProductsSection from '@/app/components/ProductsSection';
import TransparencySection from '@/app/components/TransparencySection';
import PricingSection from '@/app/components/PricingSection';
import HomeBlogSection from '@/app/components/HomeBlogSection';

export const metadata: Metadata = {
  title: 'notrace — Privacy-First Apps That Do What They Say',
  description: 'notrace exposes how everyday apps secretly harvest your data and builds privacy-first alternatives that do exactly what they claim — nothing hidden.',
  keywords: 'privacy apps, data privacy, privacy-first software, app transparency, privacy tools, data protection',
  openGraph: {
    title: 'notrace — Privacy-First Apps',
    description: 'Privacy-first alternatives that do exactly what they claim — nothing hidden.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'notrace - Privacy-First Apps That Do What They Say',
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};

export default function HomePage() {
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
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'hello@notrace.app',
      telephone: '+91-9369524385',
    },
    sameAs: [
      'https://twitter.com/notrace',
      'https://github.com/notrace',
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'notrace — Privacy-First Apps That Do What They Say',
    description: 'Privacy-first alternatives that do exactly what they claim — nothing hidden.',
    url: baseUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'notrace',
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <EvidenceSection />
        <ProductsSection />
        <TransparencySection />
        <PricingSection />
        <HomeBlogSection />
      </main>
      <Footer />
    </>
  );
}