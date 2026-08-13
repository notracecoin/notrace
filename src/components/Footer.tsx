import React from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/AppIcon';

const links = [
  { label: 'What We Build', href: '/#products' },
  { label: 'Why It Matters', href: '/#evidence' },
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/#privacy' },
];

const socials = [
  { icon: 'GlobeAltIcon', href: '#', label: 'Website' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-5 md:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-base tracking-tight text-foreground">
            notrace
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social + Copyright */}
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
          <span className="text-xs font-medium text-muted-foreground">
            © 2026 notrace
          </span>
        </div>
      </div>
    </footer>
  );
}