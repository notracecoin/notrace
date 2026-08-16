import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const sections = [
  {
    title: 'Our Privacy Philosophy',
    content: `notrace was built because we believe privacy is a fundamental right, not a feature. We practice what we preach: we do not collect any type of user data — not a single piece of information is gathered, stored, or used. We never sell your data because we never have it. This policy reflects our absolute commitment to zero data collection.`,
  },
  {
    title: 'Information We Collect',
    content: `We collect absolutely nothing. notrace does not collect, store, or process any personal data, usage data, analytics data, or any other type of user information whatsoever. We do not track page views, geographic regions, device information, IP addresses, or any other identifiers. Not a single byte of your data is collected — ever.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We do not use any user information because we do not collect any. There is no data to process, analyze, or use. We do not build user profiles, run analytics, serve targeted content, or perform any data processing of any kind. Your visit to notrace leaves no data footprint with us.`,
  },
  {
    title: 'Data Sharing',
    content: `We do not share any user data with third parties because we do not collect any user data in the first place. There is nothing to sell, rent, trade, or share. Our zero-collection policy means your information never enters our systems at any point.`,
  },
  {
    title: 'Cookies and Tracking',
    content: `We do not use any cookies, tracking pixels, analytics scripts, fingerprinting techniques, or any other tracking technology. We do not monitor your behavior, track your sessions, or identify you in any way. Your browsing on notrace is completely private and leaves no trace with us.`,
  },
  {
    title: 'Data Retention',
    content: `Since we collect zero data, there is nothing to retain or delete. We have no databases of user information, no logs of user activity, and no records of individual visits. Our data retention policy is simple: we retain nothing because we collect nothing.`,
  },
  {
    title: 'Your Rights',
    content: `Because we collect no data about you, there is no personal data to access, correct, delete, or export. You have complete privacy by default — not as an option you need to exercise, but as the fundamental design of our service. If you have any questions about our zero-collection approach, contact us at privacy@notrace.app.`,
  },
  {
    title: 'Security',
    content: `The best data security is having no data to secure. Since notrace collects no user data, there is no user information at risk of breach, leak, or unauthorized access. We have designed our services from the ground up to operate without any user data collection.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `Our services do not collect data from anyone — including children. Since we collect zero data from all users regardless of age, children's information is never at risk. Our no-collection policy provides the strongest possible protection for users of all ages.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. However, our core commitment — zero data collection — will never change. We will notify users of any updates by revising the date below. We encourage you to review this policy periodically.`,
  },
];

export const metadata: Metadata = {
  title: 'Privacy Policy — notrace Zero Data Collection Commitment',
  description: 'notrace privacy policy: We collect zero user data. No tracking, no analytics, no cookies. Complete privacy by design.',
  keywords: 'privacy policy, data privacy, zero data collection, privacy commitment, user privacy rights',
  openGraph: {
    title: 'Privacy Policy — notrace',
    description: 'We collect zero user data. No tracking, no analytics, no cookies. Complete privacy by design.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/privacy`,
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'notrace Privacy Policy',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <span className="pill-green mb-6 inline-block">Privacy</span>
            <h1 className="text-section-title text-foreground mb-5">
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We built notrace to fight data exploitation. Our privacy policy reflects that mission — minimal collection, zero selling, full transparency.
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-mono-data">
              Last updated: August 2026
            </p>
          </div>
        </section>

        {/* TL;DR Banner */}
        <section className="py-8 px-5 md:px-8 bg-secondary/40 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">TL;DR</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Zero data collected — ever', icon: '✕' },
                { label: 'No tracking of any kind', icon: '↓' },
                { label: 'No cookies, no analytics', icon: '⌫' },
              ]?.map((item) => (
                <div key={item?.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {item?.icon}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{item?.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-5 md:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {sections?.map((section, i) => (
              <div key={i} className="border-b border-border pb-10 last:border-0">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono-data text-xs text-muted-foreground mt-1 w-6 shrink-0">
                    {String(i + 1)?.padStart(2, '0')}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {section?.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-10">
                  {section?.content}
                </p>
              </div>
            ))}

            {/* Business Information */}
            <div className="card-base p-6 border border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Business Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div>
                  <span className="font-semibold text-foreground">Business Name: </span>
                  <span className="text-muted-foreground">M/s Engage Ad (MSME Registered)</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">GST No: </span>
                  <span className="text-muted-foreground">09GVRPK4451F2Z3</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-foreground">Address: </span>
                  <span className="text-muted-foreground">356/340/1331, Ashok Vihar, Alam Nagar, Lucknow – 226017, UP</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Owner: </span>
                  <span className="text-muted-foreground">Mohit Kanaujia</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Mobile: </span>
                  <a href="tel:9369524385" className="text-muted-foreground hover:text-primary transition-colors">9369524385</a>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-foreground">Email: </span>
                  <a href="mailto:mouhitkanaujia@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">mouhitkanaujia@gmail.com</a>
                  <span className="text-muted-foreground"> / </span>
                  <a href="mailto:ind.engagead@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">ind.engagead@gmail.com</a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="card-base p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Questions about your privacy? We'll answer them.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
