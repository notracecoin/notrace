'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const contactTopics = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Privacy Question', value: 'privacy' },
  { label: 'Donation / Refund', value: 'donation' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Press / Media', value: 'press' },
  { label: 'Partnership', value: 'partnership' },
];

const contactInfo = [
  {
    label: 'General',
    email: 'hello@notrace.app',
    description: 'General questions and inquiries',
  },
  {
    label: 'Privacy',
    email: 'privacy@notrace.app',
    description: 'Data requests and privacy concerns',
  },
  {
    label: 'Support',
    email: 'support@notrace.app',
    description: 'Technical help and order queries',
  },
  {
    label: 'Press',
    email: 'press@notrace.app',
    description: 'Media inquiries and interviews',
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 md:px-8 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <span className="pill-green mb-6 inline-block">Contact</span>
            <h1 className="text-section-title text-foreground mb-5">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We're a small team building big things for privacy. We read every message and respond to every legitimate inquiry.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-5 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">Direct Contacts</h2>
                <p className="text-sm text-muted-foreground">
                  Reach the right team directly.
                </p>
              </div>
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <div key={item.label} className="card-base p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                      {item.label}
                    </p>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors block"
                    >
                      {item.email}
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="card-base p-5 bg-secondary/40">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Response Time
                </p>
                <p className="text-sm text-foreground font-semibold">1–2 business days</p>
                <p className="text-xs text-muted-foreground mt-1">
                  We're a lean team. We'll get back to you as quickly as we can.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-3">Useful links</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Privacy Policy', href: '/privacy' },
                    { label: 'Terms & Conditions', href: '/terms' },
                    { label: 'Cancellation & Refund', href: '/cancellation-refund' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <span className="text-primary">→</span> {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card-base p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Sent</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thanks for reaching out. We'll get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', topic: '', message: '' }); }}
                    className="mt-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-base p-8 space-y-6">
                  <h2 className="text-lg font-bold text-foreground">Send a Message</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Topic
                    </label>
                    <select
                      name="topic"
                      value={formState.topic}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="" disabled>Select a topic</option>
                      {contactTopics.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
