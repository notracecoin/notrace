import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const sections = [
  {
    title: 'About Our Products',
    content: `notrace is primarily a software and digital services company. Our core offerings — privacy-first applications and tools — are delivered digitally and do not require physical shipping. Importantly, notrace does not collect any type of user data — not a single piece of information is gathered, stored, or used. This policy applies to any physical merchandise, hardware, or tangible products that notrace may offer now or in the future.`,
  },
  {
    title: 'Digital Products and Services',
    content: `All software applications, digital downloads, and online services provided by notrace are delivered electronically. There is no physical shipping involved. Access to digital products is typically granted immediately upon successful payment or donation. We do not collect any usage data, behavioral data, or any other type of user information when you use our digital products. If you experience any issues accessing a digital product, please contact our support team.`,
  },
  {
    title: 'No Data Collection',
    content: `notrace does not collect any type of user data — not a single piece of information is gathered, stored, or processed. We do not track orders for marketing purposes, build customer profiles, collect browsing behavior, or use any user data in any way. Your interaction with notrace leaves no data footprint with us whatsoever.`,
  },
  {
    title: 'Physical Merchandise (if applicable)',
    content: `If notrace offers physical merchandise (such as branded items, hardware devices, or printed materials), the following shipping terms apply. Orders are processed within 2–3 business days. Standard shipping within India takes 5–7 business days. Express shipping options may be available at checkout. International shipping timelines vary by destination and will be displayed at checkout.`,
  },
  {
    title: 'Shipping Costs',
    content: `Shipping costs, if applicable, are calculated at checkout based on the delivery address and selected shipping method. Free shipping may be offered on orders above a specified threshold, which will be clearly communicated at the time of purchase. All applicable taxes and duties are the responsibility of the recipient for international orders.`,
  },
  {
    title: 'Order Tracking',
    content: `Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your shipment through the carrier's website. If you do not receive a tracking email within 3 business days of your order, please contact us at support@notrace.app.`,
  },
  {
    title: 'Exchange Policy',
    content: `We accept exchange requests for physical products within 14 days of delivery, provided the item is unused, in its original packaging, and in the same condition as received. To initiate an exchange, contact us at support@notrace.app with your order number and reason for the exchange. We will provide instructions for returning the item. Shipping costs for exchanges are the responsibility of the customer unless the item was defective or incorrectly shipped.`,
  },
  {
    title: 'Damaged or Defective Items',
    content: `If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos of the damage. We will arrange for a replacement or full refund at no additional cost to you. Please do not discard the damaged item until we have reviewed your claim, as we may request it to be returned.`,
  },
  {
    title: 'Non-Returnable Items',
    content: `The following items are not eligible for exchange or return: digital products and software licenses once accessed, items that have been used or show signs of wear, items returned without original packaging, and custom or personalized items. Donations are also non-refundable as outlined in our Cancellation & Refund Policy.`,
  },
  {
    title: 'Contact for Shipping Queries',
    content: `For any questions about shipping, delivery, or exchanges, please reach out to us at support@notrace.app or visit our Contact Us page. Our team typically responds within 1–2 business days.`,
  },
];

export default function ShippingExchangePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <span className="pill-green mb-6 inline-block">Policy</span>
            <h1 className="text-section-title text-foreground mb-5">
              Shipping &amp; Exchange
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Clear, fair policies for shipping and exchanges. notrace is primarily digital — but here's everything you need to know about physical products.
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-mono-data">
              Last updated: August 2026
            </p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-8 px-5 md:px-8 bg-secondary/40 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">At a Glance</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Processing', value: '2–3 business days' },
                { label: 'Standard delivery (India)', value: '5–7 business days' },
                { label: 'Exchange window', value: '14 days from delivery' },
              ]?.map((item) => (
                <div key={item?.label} className="card-base p-4">
                  <p className="text-xs text-muted-foreground mb-1">{item?.label}</p>
                  <p className="text-sm font-bold text-foreground">{item?.value}</p>
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
                Questions about an order or shipment?
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
