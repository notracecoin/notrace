'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

const shareLinks = [
  {
    label: 'Share on X',
    icon: 'XMarkIcon',
    href: 'https://twitter.com/intent/tweet?text=I+just+supported+%40notrace+%E2%80%94+privacy-first+apps+with+zero+tracking%2C+zero+ads%2C+zero+BS.+If+you+care+about+your+data%2C+check+them+out%3A+https%3A%2F%2Fnotrace3710.builtwithrocket.new',
    bg: 'bg-foreground',
    text: 'text-background',
  },
  {
    label: 'Share on WhatsApp',
    icon: 'ChatBubbleLeftRightIcon',
    href: 'https://wa.me/?text=I+just+supported+notrace+%E2%80%94+privacy-first+apps+with+zero+tracking%2C+zero+ads%2C+zero+BS.+Check+them+out%3A+https%3A%2F%2Fnotrace3710.builtwithrocket.new',
    bg: 'bg-[#25D366]',
    text: 'text-white',
  },
  {
    label: 'Copy Link',
    icon: 'LinkIcon',
    href: '#copy',
    bg: 'bg-muted',
    text: 'text-foreground',
  },
];

const missionPoints = [
  { icon: 'ShieldCheckIcon', label: 'Zero data tracking — ever' },
  { icon: 'EyeSlashIcon', label: 'No ads, no trackers, no surveillance' },
  { icon: 'BoltIcon', label: 'Dead-simple tools that just work' },
  { icon: 'LockClosedIcon', label: 'Open about what we build and why' },
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  const amountParam = searchParams?.get('amount');
  const donationAmount = amountParam ? parseInt(amountParam, 10) : null;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://notrace3710.builtwithrocket.new').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Hero thank-you block */}
        <div
          className={`text-center space-y-5 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center animate-pulse-glow">
            <Icon name="CheckIcon" size={36} className="text-primary" variant="solid" />
          </div>

          <span className="pill-green">Donation received</span>

          {donationAmount && donationAmount > 0 && (
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-2xl px-5 py-2.5 mx-auto">
              <Icon name="HeartIcon" size={16} className="text-primary" variant="solid" />
              <span className="text-primary font-bold text-sm">
                ₹{donationAmount.toLocaleString('en-IN')} received — thank you!
              </span>
            </div>
          )}

          <h1 className="text-section-title text-foreground leading-tight">
            Thank you for<br />
            <span className="text-primary">keeping the web clean.</span>
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto">
            Your support goes directly toward building the next notrace app — no investors, no ad networks, no compromises. You&apos;re part of something that actually matters.
          </p>
        </div>

        {/* Mission reinforcement */}
        <div
          className={`mt-14 card-base rounded-3xl p-8 md:p-10 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">
            What your donation funds
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {missionPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon name={point.icon as any} size={18} className="text-primary" variant="solid" />
                </div>
                <span className="text-sm font-semibold text-foreground">{point.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              notrace is built on one principle:{' '}
              <span className="text-foreground font-semibold">
                technology should serve you, not surveil you.
              </span>{' '}
              Every app we ship leaves no trace behind — no data sold, no profiles built, no dark patterns.
            </p>
          </div>
        </div>

        {/* Share section */}
        <div
          className={`mt-10 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-xl font-bold text-foreground">Spread the word</h2>
            <p className="text-sm text-muted-foreground">
              The best way to fight surveillance tech is to show people there&apos;s a better option.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {shareLinks.map((link) => {
              if (link.href === '#copy') {
                return (
                  <button
                    key={link.label}
                    onClick={handleCopy}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-80 active:scale-95 ${link.bg} ${link.text}`}
                  >
                    <Icon
                      name={copied ? 'CheckIcon' : 'LinkIcon'}
                      size={16}
                      variant="solid"
                    />
                    {copied ? 'Copied!' : link.label}
                  </button>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-80 active:scale-95 ${link.bg} ${link.text}`}
                >
                  <Icon name={link.icon as any} size={16} variant="solid" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Back home */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={14} />
            Back to notrace
          </Link>
        </div>

      </div>
    </main>
  );
}

export default function DonationConfirmationPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<main className="min-h-screen bg-background pt-24 pb-20" />}>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </>
  );
}
