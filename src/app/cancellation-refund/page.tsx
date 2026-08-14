import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const sections = [
  {
    title: 'Overview',
    content: `notrace is a privacy-first technology initiative. Our primary revenue comes from voluntary donations that support our mission to build privacy-respecting alternatives to data-harvesting apps. This policy outlines our approach to cancellations and refunds for donations and any future paid services.`,
  },
  {
    title: 'Donations — General Policy',
    content: `Donations made to notrace are voluntary contributions and are generally non-refundable. When you donate, you are supporting our mission and ongoing development work. We use donations to fund engineering, research, and operations. Because donations are immediately allocated to our work, we are unable to offer refunds in most circumstances.`,
  },
  {
    title: 'Refund Eligibility for Donations',
    content: `We will consider refund requests for donations in the following circumstances: (1) A duplicate payment was made due to a technical error; (2) An unauthorized transaction occurred on your account; (3) The payment was made in error within 24 hours of the transaction. Refund requests must be submitted within 7 days of the transaction date. Requests submitted after this window will not be eligible for a refund.`,
  },
  {
    title: 'How to Request a Refund',
    content: `To request a refund, contact us at refunds@notrace.app with your transaction ID, the amount, the date of the transaction, and the reason for your refund request. We will review your request within 5 business days and notify you of our decision. If approved, refunds will be processed to the original payment method within 7–10 business days.`,
  },
  {
    title: 'Subscription Services',
    content: `If notrace introduces subscription-based services in the future, subscribers may cancel at any time. Upon cancellation, you will retain access to the service until the end of your current billing period. We do not offer prorated refunds for partial billing periods unless required by applicable law. Cancellation instructions will be provided within the relevant service.`,
  },
  {
    title: 'Payment Processing',
    content: `All payments are processed securely through Razorpay. Refunds, once approved by notrace, are processed through Razorpay back to your original payment method. Processing times may vary depending on your bank or card issuer. notrace is not responsible for delays caused by your financial institution.`,
  },
  {
    title: 'Disputes and Chargebacks',
    content: `If you believe a charge is incorrect, please contact us before initiating a chargeback with your bank. We are committed to resolving disputes fairly and quickly. Initiating a chargeback without first contacting us may result in delays and additional complications. We will work with you to resolve any legitimate concerns.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We reserve the right to update this Cancellation and Refund Policy at any time. Changes will be effective upon posting to our website. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
];

export default function CancellationRefundPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <span className="pill-green mb-6 inline-block">Policy</span>
            <h1 className="text-section-title text-foreground mb-5">
              Cancellation &amp; Refund
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We believe in fair and transparent policies. Here's everything you need to know about cancellations and refunds at notrace.
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-mono-data">
              Last updated: August 2026
            </p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-8 px-5 md:px-8 bg-secondary/40 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Quick Summary</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Refund window', value: '7 days from transaction' },
                { label: 'Processing time', value: '7–10 business days' },
                { label: 'Contact for refunds', value: 'refunds@notrace.app' },
                { label: 'Review time', value: '5 business days' },
              ]?.map((item) => (
                <div key={item?.label} className="card-base p-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item?.label}</span>
                  <span className="text-sm font-bold text-foreground">{item?.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-5 md:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {sections?.map((section, i) => (
              <div key={i} className="border-b border-border pb-10 last:border-0">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono-data text-xs text-muted-foreground mt-1 w-6 shrink-0">
                    {String(i + 1)?.padStart(2, '0')}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {section?.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-10">
                  {section?.content}
                </p>
              </div>
            ))}

            {/* CTA */}
            <div className="card-base p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Need help with a refund or have a question?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
