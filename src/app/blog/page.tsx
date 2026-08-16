import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHero from '@/app/blog/components/BlogHero';
import BlogGrid from '@/app/blog/components/BlogGrid';

export const metadata: Metadata = {
  title: 'Blog — Privacy Insights & App Transparency News',
  description: 'Read latest insights on app privacy, data protection, and transparency. Learn how apps collect your data and privacy-first alternatives.',
  keywords: 'privacy blog, app transparency, data privacy news, privacy insights, app security',
  openGraph: {
    title: 'Blog — Privacy Insights & App Transparency',
    description: 'Latest insights on app privacy, data protection, and transparency.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'notrace Blog',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <BlogHero />
        <BlogGrid />
      </main>
      <Footer />
    </>
  );
}