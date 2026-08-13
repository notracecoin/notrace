'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const pledges = [
  {
    icon: 'EyeSlashIcon',
    title: 'Zero data collection',
    detail: 'Our apps collect no personal data. No analytics. No crash reports sent to us. Nothing leaves your device.',
    color: 'primary',
  },
  {
    icon: 'CodeBracketIcon',
    title: 'Fully open source',
    detail: 'Every app ships with public source code. Security researchers, journalists, and users can verify every claim.',
    color: 'primary',
  },
  {
    icon: 'DocumentMagnifyingGlassIcon',
    title: 'Permission audit on every release',
    detail: 'Before every release, we publish a signed permission manifest. Any new permission triggers a public notice.',
    color: 'primary',
  },
  {
    icon: 'CurrencyDollarIcon',
    title: 'Revenue from users, not advertisers',
    detail: 'Our only income is $9/year subscriptions and voluntary donations. No ad networks. No data brokers. Ever.',
    color: 'primary',
  },
];

const comparison = [
  { feature: 'Location access', them: true, us: false },
  { feature: 'Device identifier', them: true, us: false },
  { feature: 'Ad network integration', them: true, us: false },
  { feature: 'Background data collection', them: true, us: false },
  { feature: 'Open source code', them: false, us: true },
  { feature: 'Permission audit', them: false, us: true },
  { feature: 'User-funded only', them: false, us: true },
];

export default function TransparencySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="transparency" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`space-y-4 mb-16 ${visible ? 'animate-fade-up' : 'opacity-0-init'}`}>
          <span className="pill-green">Our Promise</span>
          <h2 className="text-section-title text-foreground max-w-2xl">
            Transparency isn't a feature.<br />
            <span className="text-primary">It's the whole point.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            We don't just say we're private — we prove it. Every app, every release, every line of code.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: pledges */}
          <div className={`lg:col-span-7 grid sm:grid-cols-2 gap-5 ${visible ? 'animate-fade-up stagger-2' : 'opacity-0-init'}`}>
            {pledges.map((pledge, i) => (
              <div key={i} className="card-base p-6 space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={pledge.icon as 'EyeSlashIcon'} size={20} className="text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm">{pledge.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{pledge.detail}</p>
              </div>
            ))}
          </div>

          {/* Right: comparison table */}
          <div className={`lg:col-span-5 ${visible ? 'animate-fade-up stagger-3' : 'opacity-0-init'}`}>
            <div className="card-base overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 p-4 border-b border-border bg-muted/60">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest col-span-1">Feature</p>
                <p className="text-xs font-bold text-accent uppercase tracking-widest text-center">Typical App</p>
                <p className="text-xs font-bold text-primary uppercase tracking-widest text-center">notrace</p>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 p-4 items-center border-b border-border last:border-0 ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-muted/30'
                  }`}
                >
                  <p className="text-xs font-medium text-foreground/80 col-span-1 pr-2">{row.feature}</p>
                  <div className="flex justify-center">
                    {row.them ? (
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="CheckIcon" size={12} className="text-accent" variant="solid" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <Icon name="XMarkIcon" size={12} className="text-muted-foreground" variant="solid" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.us ? (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="CheckIcon" size={12} className="text-primary" variant="solid" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <Icon name="XMarkIcon" size={12} className="text-muted-foreground" variant="solid" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}