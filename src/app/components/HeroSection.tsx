'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const dataPoints = [
  { label: 'GPS Location', value: 'Sent every 3s', type: 'danger' },
  { label: 'Device ID', value: 'Transmitted', type: 'danger' },
  { label: 'Ad Networks', value: '14 recipients', type: 'warn' },
];

export default function HeroSection() {
  const [shared, setShared] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    const text =
      'A flashlight app was silently sending your GPS location to 14 ad networks — before you even accepted the terms. notrace is building the alternative: notrace.co.in';
    if (navigator.share) {
      await navigator.share({ title: 'notrace', text, url: window.location?.href });
    } else {
      await navigator.clipboard?.writeText(text + '\n' + window.location?.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background" style={{ minHeight: '100svh' }}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-16 md:pb-24 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Main content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow label */}
            <div className={`flex items-center gap-3 ${mounted ? 'animate-fade-up' : 'opacity-0-init'}`}>
              <span className="pill-green">Privacy-First Apps</span>
              <span className="font-mono text-xs text-muted-foreground">www.notrace.co.in</span>
            </div>

            {/* Main headline — clear and direct */}
            <h1 className={`text-hero-xl text-foreground ${mounted ? 'animate-fade-up stagger-1' : 'opacity-0-init'}`}>
              Apps that do<br />
              <span className="text-primary">exactly what</span><br />
              they say.
            </h1>

            {/* Clear explanation */}
            <p className={`text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-medium ${mounted ? 'animate-fade-up stagger-2' : 'opacity-0-init'}`}>
              Most "free" apps secretly harvest your location, contacts, and device data to sell to advertisers.
              <strong className="text-foreground font-semibold"> notrace builds the honest alternative</strong> — apps with zero hidden permissions, open source code, and no data collection. Ever.
            </p>

            {/* What we're building — 3 simple points */}
            <div className={`space-y-3 ${mounted ? 'animate-fade-up stagger-3' : 'opacity-0-init'}`}>
              {[
                { icon: 'BoltIcon', text: 'Simple apps that do one thing well — nothing more' },
                { icon: 'LockClosedIcon', text: 'Zero data collection. Your phone stays yours.' },
                { icon: 'CodeBracketIcon', text: 'Fully open source — audit every line of code' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as 'BoltIcon'} size={15} className="text-primary" variant="solid" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 ${mounted ? 'animate-fade-up stagger-4' : 'opacity-0-init'}`}>
              <Link
                href="#products"
                className="flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity animate-pulse-glow"
              >
                <Icon name="ShieldCheckIcon" size={16} variant="solid" />
                See What We're Building
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center gap-2.5 border border-border text-foreground px-7 py-3.5 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-colors"
              >
                <Icon name={shared ? 'CheckIcon' : 'ShareIcon'} size={14} />
                {shared ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>

          {/* Right: Live data leak card — shows the problem clearly */}
          <div className={`lg:col-span-5 space-y-4 ${mounted ? 'animate-fade-up stagger-3' : 'opacity-0-init'}`}>
            {/* The problem */}
            <div className="card-base p-5 space-y-4 border-accent/30">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-accent opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-warn opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-muted" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-2">What a typical "free" app does</span>
              </div>
              <div className="space-y-3">
                <p className="font-mono text-xs text-accent font-bold">
                  App: "Brightest Flashlight Free" — 50M+ downloads
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  Status: <span className="text-accent font-bold">TRANSMITTING YOUR DATA</span>
                </p>
                {dataPoints?.map((dp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-muted-foreground">{dp?.label}</span>
                      <span className={`font-mono text-xs font-bold ${dp?.type === 'danger' ? 'text-accent' : 'text-warn'}`}>
                        {dp?.value}
                      </span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dp?.type === 'danger' ? 'bg-accent' : 'bg-warn'}`}
                        style={{
                          width: i === 0 ? '90%' : i === 1 ? '100%' : '70%',
                          transition: `width 1.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-accent">FTC confirmed this in 2013. It still happens today.</span>
              </div>
            </div>

            {/* The solution */}
            <div className="card-base p-5 border-primary/30 bg-primary/[0.03]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="ShieldCheckIcon" size={20} className="text-primary" variant="solid" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">notrace Flashlight</p>
                  <p className="text-xs text-muted-foreground">Our first app. Available now on Android.</p>
                </div>
                <span className="pill-green ml-auto">Free</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Zero permissions', 'Open source', 'No ads', 'No tracking'].map((tag) => (
                  <span key={tag} className="flex items-center gap-1 font-mono text-xs bg-primary/8 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
                    <Icon name="CheckIcon" size={10} variant="solid" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <div className="flex items-center gap-3 text-muted-foreground pt-2">
              <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center animate-bounce">
                <Icon name="ArrowDownIcon" size={12} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest">See all our apps below</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
