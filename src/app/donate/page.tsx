'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const whyDonate = [
  {
    icon: 'CodeBracketIcon',
    title: 'Fund open development',
    desc: 'Every rupee goes toward engineering time — no VC money, no ad revenue, no compromise.',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Keep it free for everyone',
    desc: 'notrace apps are free and always will be. Donations are the only thing that makes that possible.',
  },
  {
    icon: 'BoltIcon',
    title: 'Ship faster',
    desc: 'More funding means more time building. Your donation directly accelerates the next release.',
  },
  {
    icon: 'GlobeAltIcon',
    title: 'Fight surveillance at scale',
    desc: 'Privacy tools only work if people use them. Help us reach more people who deserve better.',
  },
];

function loadRazorpayScript(): Promise<boolean> {
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
}

export default function DonatePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | 'custom'>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const getFinalAmount = (): number => {
    if (selected === 'custom') {
      const val = parseInt(customAmount, 10);
      return isNaN(val) ? 0 : val;
    }
    return selected;
  };

  const handleDonate = async () => {
    const amount = getFinalAmount();
    if (amount < 1) {
      setError('Please enter a valid donation amount.');
      return;
    }
    setError('');
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError('Failed to load payment gateway. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.id) {
        setError(data.error || 'Could not create order. Please try again.');
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: 'notrace',
        description: 'Support the privacy-first mission',
        image: '/assets/notrace-logo.svg',
        handler: () => {
          router.push(`/donate/confirmation?amount=${amount}`);
        },
        prefill: {},
        notes: { purpose: 'notrace donation' },
        theme: { color: '#00A854' },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp: any) => {
        setError(resp?.error?.description || 'Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
      setLoading(false);
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20 px-5 md:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Hero */}
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="pill-green">Support the Privacy Movement</span>
            <h1 className="text-section-title text-foreground leading-tight">
              Help us build a web<br />
              <span className="text-primary">that doesn&apos;t watch you.</span>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto">
              notrace is free, ad-free, and tracker-free. Donations are the only thing keeping it that way.
            </p>
          </div>

          {/* Donation card */}
          <div
            className={`mt-12 card-base rounded-3xl p-8 md:p-10 transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-5">
              Choose an amount
            </p>

            {/* Preset amounts */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelected(amt); setCustomAmount(''); setError(''); }}
                  className={`py-3 rounded-2xl text-sm font-bold transition-all duration-200 border ${
                    selected === amt
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-foreground border-border hover:border-primary/50'
                  }`}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <button
                onClick={() => { setSelected('custom'); setError(''); }}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all duration-200 border mb-3 ${
                  selected === 'custom' ?'bg-primary/10 text-primary border-primary' :'bg-muted text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                Custom amount
              </button>
              {selected === 'custom' && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setError(''); }}
                    className="w-full pl-8 pr-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
            )}

            <button
              onClick={handleDonate}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                  Opening payment…
                </>
              ) : (
                <>
                  <Icon name="HeartIcon" size={16} variant="solid" />
                  Donate{getFinalAmount() > 0 ? ` ₹${getFinalAmount().toLocaleString('en-IN')}` : ''}
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Secured by Razorpay · No recurring charges · No account needed
            </p>
          </div>

          {/* Why donate */}
          <div
            className={`mt-14 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">Why donate?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyDonate.map((item) => (
                <div key={item.title} className="card-base rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon name={item.icon as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back home */}
          <div className="mt-12 text-center">
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
      <Footer />
    </>
  );
}
