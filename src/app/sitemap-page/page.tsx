import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const sitemapData = [
  {
    category: 'Main',
    links: [
      { label: 'Home', href: '/', description: 'notrace homepage — privacy-first apps' },
      { label: 'About', href: '/about', description: 'Our mission, values, and team' },
      { label: 'Blog', href: '/blog', description: 'Privacy insights and notrace updates' },
      { label: 'Donate', href: '/donate', description: 'Support the privacy movement' },
    ],
  },
  {
    category: 'Legal & Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy', description: 'How we handle your data' },
      { label: 'Terms & Conditions', href: '/terms', description: 'Terms governing use of our services' },
      { label: 'Cancellation & Refund', href: '/cancellation-refund', description: 'Our refund and cancellation policy' },
      { label: 'Shipping & Exchange', href: '/shipping-exchange', description: 'Shipping and exchange information' },
    ],
  },
  {
    category: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact', description: 'Get in touch with the notrace team' },
      { label: 'Sitemap', href: '/sitemap-page', description: 'All pages on notrace.app' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-20 px-5 md:px-8 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <span className="pill-green mb-6 inline-block">Navigation</span>
            <h1 className="text-section-title text-foreground mb-4">
              Sitemap
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              Every page on notrace.app — organized for easy navigation.
            </p>
          </div>
        </section>

        {/* Sitemap Grid */}
        <section className="py-16 px-5 md:px-8">
          <div className="max-w-5xl mx-auto space-y-14">
            {sitemapData?.map((group) => (
              <div key={group?.category}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {group?.category}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group?.links?.map((link) => (
                    <Link
                      key={link?.href}
                      href={link?.href}
                      className="card-base p-5 flex items-start justify-between gap-4 group"
                    >
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {link?.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{link?.description}</p>
                      </div>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg shrink-0">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* XML Sitemap note */}
        <section className="py-8 px-5 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Looking for the XML sitemap?</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                For search engines and crawlers — available at /sitemap.xml
              </p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-primary hover:underline shrink-0"
            >
              View sitemap.xml →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
