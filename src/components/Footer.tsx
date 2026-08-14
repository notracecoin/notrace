import React from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/AppIcon';

const mainLinks = [
  { label: 'What We Build', href: '/#products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cancellation & Refund', href: '/cancellation-refund' },
  { label: 'Shipping & Exchange', href: '/shipping-exchange' },
  { label: 'Sitemap', href: '/sitemap-page' },
];

const socials = [
  { icon: 'GlobeAltIcon', href: '#', label: 'Website' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-8 px-5 md:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-10">
          {/* Brand */}
          <div className="shrink-0">
            <span className="font-sans font-bold text-base tracking-tight text-foreground">
              notrace
            </span>
            <p className="text-xs text-muted-foreground mt-2 max-w-[180px] leading-relaxed">
              Privacy-first apps that do exactly what they say.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10 flex-1">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Navigate
              </p>
              <div className="flex flex-col gap-2">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Legal
              </p>
              <div className="flex flex-col gap-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="py-6 px-5 md:px-6 mb-6 rounded-xl border border-border bg-secondary/30">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Business Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">Business:</span>
              <span>M/s Engage Ad (MSME Registered)</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">GST No:</span>
              <span>09GVRPK4451F2Z3</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">Address:</span>
              <span>356/340/1331, Ashok Vihar, Alam Nagar, Lucknow – 226017, UP</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">Owner:</span>
              <span>Mohit Kanaujia</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">Mobile:</span>
              <a href="tel:9369524385" className="hover:text-primary transition-colors">9369524385</a>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="font-semibold text-foreground shrink-0">Email:</span>
              <span className="flex flex-wrap gap-1">
                <a href="mailto:mouhitkanaujia@gmail.com" className="hover:text-primary transition-colors">mouhitkanaujia@gmail.com</a>
                <span>/</span>
                <a href="mailto:ind.engagead@gmail.com" className="hover:text-primary transition-colors">ind.engagead@gmail.com</a>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground">
            © 2026 notrace. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon name={s.icon as 'GlobeAltIcon'} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}