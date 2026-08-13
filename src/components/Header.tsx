'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'What We Build', href: '/#products' },
  { label: 'Why It Matters', href: '/#evidence' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Donate', href: '/donate' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-sans font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              notrace
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col pt-20 px-6"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col gap-2 mt-8" onClick={(e) => e?.stopPropagation()}>
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-bold text-foreground border-b border-border hover:text-primary transition-colors"
              >
                {link?.label}
              </Link>
            ))}
            <Link
              href="/#pricing"
              onClick={() => setMenuOpen(false)}
              className="mt-8 flex items-center justify-center gap-2 border border-border py-4 rounded-2xl text-base font-semibold text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              Support the Mission
            </Link>
          </div>
        </div>
      )}
    </>
  );
}