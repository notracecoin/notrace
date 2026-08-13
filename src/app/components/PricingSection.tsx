'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async () => {
    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load payment gateway. Please try again.');
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      amount: 10000, // ₹100 in paise — donor can edit in Razorpay modal
      currency: 'INR',
      name: 'notrace',
      description: 'Support the privacy-first mission',
      image: '/assets/notrace-logo.svg',
      handler: () => {
        router.push('/donate/confirmation');
      },
      prefill: {},
      notes: {
        purpose: 'notrace donation',
      },
      theme: {
        color: '#00A854',
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => {
      setLoading(false);
    });
    rzp.open();
    setLoading(false);
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className={`space-y-6 ${visible ? 'animate-fade-up' : 'opacity-0-init'}`}>
          <span className="pill-green">Support the Mission</span>
          <h2 className="text-section-title text-foreground">
            Like what we&apos;re doing?<br />
            <span className="text-primary">Buy us a coffee.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-base">
            notrace is free. Always. No subscriptions, no trials, no paywalls. If our work means something to you, a small donation helps us keep building privacy-first tools.
          </p>

          <div className={`mt-10 card-base rounded-3xl p-8 md:p-12 flex flex-col items-center gap-6 ${visible ? 'animate-fade-up stagger-2' : 'opacity-0-init'}`}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Icon name="HeartIcon" size={28} className="text-primary" variant="solid" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">Donate what feels right</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Every rupee goes directly toward building the next notrace app. No investors. No ad networks. Just you and us.
              </p>
            </div>
            <button
              onClick={handleDonate}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                  Opening…
                </>
              ) : (
                <>
                  <Icon name="HeartIcon" size={16} variant="solid" />
                  Donate
                </>
              )}
            </button>
            <p className="text-xs text-muted-foreground">No account needed. No recurring charges. Just a one-time thank you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}