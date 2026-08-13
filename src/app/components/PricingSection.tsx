'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const tiers = [
  {
    name: 'Free Forever',
    price: '$0',
    period: '',
    note: 'No expiry. No tricks.',
    description:
      "Full app functionality. Always. We\'ll occasionally remind you we exist — like WinRAR — but the app keeps working either way.",
    features: [
      'Full flashlight functionality',
      'Zero permissions collected',
      'Open source code access',
      'Occasional "support us?" prompt',
    ],
    cta: 'Download Free',
    ctaHref: '#download',
    highlight: false,
    icon: 'BoltIcon',
  },
  {
    name: 'Supporter',
    price: '$9',
    period: '/year',
    note: 'The price of a coffee.',
    description:
      'Pay $9/year and the reminder goes away. You fund the mission directly — no investors, no ad networks, just you.',
    features: [
      'Everything in Free',
      'No support prompts',
      'Early access to new apps',
      'Supporter badge (optional)',
      'Fund the mission directly',
    ],
    cta: 'Become a Supporter',
    ctaHref: '#pay',
    highlight: true,
    icon: 'ShieldCheckIcon',
  },
  {
    name: 'Donor',
    price: 'Your call',
    period: '',
    note: 'Pay what feels right.',
    description:
      "Some people want to give more. We're grateful. Every dollar funds the next privacy-first app we build.",
    features: [
      'Everything in Supporter',
      'Named in our transparency report',
      'Direct input on next app we build',
      'Private Discord access',
    ],
    cta: 'Donate',
    ctaHref: '#donate',
    highlight: false,
    icon: 'HeartIcon',
  },
];

const faqs = [
  {
    q: 'What happens if I never pay?',
    a: "The app keeps working. We'll occasionally show a small prompt asking if you'd like to support us — similar to WinRAR. That's it. No degraded functionality, no paywalled features.",
  },
  {
    q: "How do I know you won't harvest data later?",
    a: "The code is open source and auditable at any time. Any change to permissions triggers a public notice in our changelog. If we ever violate this, you'll know before we do.",
  },
  {
    q: 'Where does my $9 go?',
    a: 'Server costs (minimal), developer time, and building the next notrace app. We publish a quarterly transparency report showing every dollar in and out.',
  },
  {
    q: 'Is there a refund policy?',
    a: "Yes. If you're not satisfied within 30 days, email us and we'll refund you without questions asked.",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center space-y-4 mb-16 ${visible ? 'animate-fade-up' : 'opacity-0-init'}`}>
          <span className="pill-green">Honest Pricing</span>
          <h2 className="text-section-title text-foreground">
            Support the mission.<br />
            <span className="text-primary">On your terms.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            No hidden fees. No data as payment. Just honest software with an honest ask.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-16 ${visible ? 'animate-fade-up stagger-2' : 'opacity-0-init'}`}>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                tier.highlight
                  ? 'bg-primary/5 border-2 border-primary shadow-lg shadow-primary/10'
                  : 'card-base'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Honest
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tier.highlight ? 'bg-primary/20 border border-primary/30' : 'bg-muted border border-border'}`}>
                    <Icon name={tier.icon as 'BoltIcon'} size={18} className={tier.highlight ? 'text-primary' : 'text-muted-foreground'} variant="solid" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground">{tier.note}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${tier.highlight ? 'text-primary' : 'text-foreground'}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground font-medium">{tier.period}</span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>

                <ul className="space-y-2.5">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <Icon
                        name="CheckCircleIcon"
                        size={16}
                        className={tier.highlight ? 'text-primary' : 'text-muted-foreground'}
                        variant="solid"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={tier.ctaHref}
                className={`mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  tier.highlight
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'border border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className={`max-w-2xl mx-auto ${visible ? 'animate-fade-up stagger-4' : 'opacity-0-init'}`}>
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">Common questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-base overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-sm text-foreground pr-4">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180 border-primary' : ''
                    }`}
                  >
                    <Icon name="ChevronDownIcon" size={14} className={openFaq === i ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}