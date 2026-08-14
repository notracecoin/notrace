import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const sections = [
  {
    title: 'Our Privacy Philosophy',
    content: `notrace was built because we believe privacy is a fundamental right, not a feature. We practice what we preach: we collect the absolute minimum data required to operate our services, we never sell your data, and we are transparent about everything we do. This policy explains exactly what we collect, why, and how.`,
  },
  {
    title: 'Information We Collect',
    content: `We collect only what is necessary. When you visit our website, we may collect basic analytics data such as page views and general geographic region — never individual tracking. When you make a donation, our payment processor (Razorpay) handles your payment information directly; we only receive confirmation of the transaction and the amount. We do not store your payment card details. If you contact us, we retain your message and email address to respond to you.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to operate and improve our services, process donations, respond to inquiries, and understand how our content is being used at an aggregate level. We do not use your information for advertising, profiling, or any purpose beyond what is described here. We do not build behavioral profiles of our users.`,
  },
  {
    title: 'Data Sharing',
    content: `We do not sell, rent, or trade your personal information to third parties. We share data only with service providers who help us operate our platform (such as our payment processor), and only to the extent necessary. All third-party providers are contractually required to protect your data and use it only for the specified purpose.`,
  },
  {
    title: 'Cookies and Tracking',
    content: `We use minimal cookies — only those strictly necessary for the website to function. We do not use advertising cookies, cross-site tracking pixels, or third-party analytics that build individual profiles. If we use any analytics, it is privacy-preserving and aggregated only.`,
  },
  {
    title: 'Data Retention',
    content: `We retain your data only as long as necessary to provide our services or as required by law. Donation records are retained for accounting and legal compliance purposes. Contact inquiries are retained for a reasonable period to handle follow-up questions. You may request deletion of your data at any time.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to processing of your data, and request a copy of your data in a portable format. To exercise any of these rights, contact us at privacy@notrace.app. We will respond within 30 days.`,
  },
  {
    title: 'Security',
    content: `We implement industry-standard security measures to protect your information. All data transmission is encrypted using TLS. We regularly review our security practices and update them as needed. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date below and, where appropriate, by posting a notice on our website. We encourage you to review this policy periodically.`,
  },
];

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
                { label: 'We never sell your data', icon: '✕' },
                { label: 'We collect the minimum necessary', icon: '↓' },
                { label: 'You can delete your data anytime', icon: '⌫' },
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
