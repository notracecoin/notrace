'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const timeline = [
  {
    step: '01',
    time: 'T+0:00',
    label: 'You tap "Install"',
    detail: 'App downloaded from Google Play. You haven\'t opened it yet.',
    type: 'neutral',
  },
  {
    step: '02',
    time: 'T+0:03',
    label: 'App opens. Terms appear.',
    detail: 'A consent dialog displays. You haven\'t tapped anything yet.',
    type: 'warn',
  },
  {
    step: '03',
    time: 'T+0:03',
    label: 'GPS data transmitted',
    detail: 'Your precise geolocation is already being sent to advertising networks — before you accept any terms.',
    type: 'danger',
  },
  {
    step: '04',
    time: 'T+0:03',
    label: 'Device ID captured',
    detail: 'Your unique device identifier is logged and transmitted alongside your location.',
    type: 'danger',
  },
  {
    step: '05',
    time: 'T+0:04',
    label: 'You tap "Agree"',
    detail: 'You consent to terms. The data transmission that already happened isn\'t mentioned.',
    type: 'neutral',
  },
  {
    step: '06',
    time: 'Ongoing',
    label: 'Background collection continues',
    detail: 'Even when the app is closed, data continues to be harvested and sold to 14+ ad networks.',
    type: 'danger',
  },
];

const stats = [
  { value: '50M+', label: 'App downloads', sub: 'Brightest Flashlight Free' },
  { value: '14+', label: 'Ad networks fed', sub: 'Per device, per session' },
  { value: '$0', label: 'User compensation', sub: 'Your data, their profit' },
  { value: '2013', label: 'FTC settlement', sub: 'But the practice continues' },
];

export default function EvidenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="evidence" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`space-y-5 mb-16 ${visible ? 'animate-fade-up' : 'opacity-0-init'}`}>
          <div className="flex items-center gap-3">
            <span className="pill-red">Why This Matters</span>
            <span className="font-mono text-xs text-muted-foreground">Source: FTC.gov, Dec 5 2013</span>
          </div>
          <h2 className="text-section-title text-foreground max-w-3xl">
            The problem is real.<br />
            <span className="text-accent">Here's the proof.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            The FTC caught a flashlight app secretly harvesting user data before anyone even agreed to terms.
            This is exactly why we're building notrace — apps that are honest by design.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Timeline */}
          <div className={`lg:col-span-7 space-y-0 ${visible ? 'animate-fade-up stagger-2' : 'opacity-0-init'}`}>
            {timeline?.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold border transition-all duration-300 group-hover:scale-110 ${
                      item?.type === 'danger' ?'border-accent/40 bg-accent/8 text-accent group-hover:bg-accent/15'
                        : item?.type === 'warn' ?'border-warn/40 bg-warn/8 text-warn' :'border-border bg-muted text-muted-foreground'
                    }`}
                  >
                    {item?.step}
                  </div>
                  {i < timeline?.length - 1 && (
                    <div
                      className={`w-px flex-1 my-1 min-h-8 ${
                        item?.type === 'danger' ? 'bg-accent/20' : 'bg-border'
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono text-xs text-muted-foreground">{item?.time}</span>
                    {item?.type === 'danger' && <span className="pill-red">Violation</span>}
                    {item?.type === 'warn' && <span className="pill-warn">Warning</span>}
                  </div>
                  <h4 className={`font-bold text-base mb-1 ${item?.type === 'danger' ? 'text-accent' : 'text-foreground'}`}>
                    {item?.label}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item?.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats + Quote */}
          <div className={`lg:col-span-5 space-y-6 ${visible ? 'animate-fade-up stagger-3' : 'opacity-0-init'}`}>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats?.map((stat, i) => (
                <div key={i} className="card-base p-5 space-y-1">
                  <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat?.value}</p>
                  <p className="text-sm font-semibold text-foreground/80">{stat?.label}</p>
                  <p className="text-xs text-muted-foreground">{stat?.sub}</p>
                </div>
              ))}
            </div>

            {/* Official FTC quote */}
            <div className="card-base p-6 space-y-4 border-l-2 border-accent">
              <div className="flex items-center gap-2">
                <Icon name="DocumentTextIcon" size={16} className="text-accent" />
                <span className="font-mono text-xs text-accent uppercase tracking-widest">Official FTC Statement</span>
              </div>
              <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                "The application was already collecting and sending information to third parties — including location and the unique device identifier — even before a consumer had a chance to accept terms."
              </blockquote>
              <p className="font-mono text-xs text-muted-foreground">
                — FTC Press Release, December 5, 2013
              </p>
              <a
                href="https://www.ftc.gov/news-events/news/press-releases/2013/12/android-flashlight-app-developer-settles-ftc-charges-it-deceived-consumers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                Read the full FTC report
                <Icon name="ArrowTopRightOnSquareIcon" size={12} />
              </a>
            </div>

            {/* Broader context */}
            <div className="card-base p-6 space-y-3">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Icon name="ExclamationTriangleIcon" size={16} className="text-warn" />
                This isn't just one app
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Weather apps, keyboard apps, VPN apps, flashlight apps — the pattern is identical.
                Free app + excessive permissions + silent data brokerage = your life as their product.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Keyboards', 'VPNs', 'Weather', 'Fitness', 'Calculators']?.map((tag) => (
                  <span key={tag} className="font-mono text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}