import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using notrace's website, applications, or services (collectively, "Services"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Services. These terms apply to all visitors, users, and others who access or use the Services.`,
  },
  {
    title: 'Use of Services',
    content: `You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services in any way that violates applicable local, national, or international law or regulation. You must not misuse our Services by knowingly introducing viruses, trojans, or other malicious material. You must not attempt to gain unauthorized access to any part of our Services.`,
  },
  {
    title: 'Intellectual Property',
    content: `The Services and their original content, features, and functionality are and will remain the exclusive property of notrace and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of notrace. All software, design, text, images, and other content on this platform are protected by applicable intellectual property laws.`,
  },
  {
    title: 'Privacy and Data',
    content: `Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. notrace is built on the principle of minimal data collection. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Please review our Privacy Policy to understand our practices.`,
  },
  {
    title: 'Donations',
    content: `Donations made through our platform are voluntary contributions to support notrace's mission. All donations are non-refundable unless otherwise required by applicable law. Donations do not constitute a purchase of goods or services. notrace reserves the right to use donated funds at its discretion to further its privacy-first mission.`,
  },
  {
    title: 'Disclaimers',
    content: `The Services are provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied. notrace does not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information provided through the Services.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, notrace shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the Services. Our total liability to you for any claims arising from these Terms shall not exceed the amount you paid to us in the twelve months preceding the claim.`,
  },
  {
    title: 'Changes to Terms',
    content: `We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the date at the top of this page. Your continued use of the Services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.`,
  },
  {
    title: 'Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in India.`,
  },
  {
    title: 'Contact',
    content: `If you have any questions about these Terms and Conditions, please contact us at legal@notrace.app or visit our Contact Us page.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <span className="pill-green mb-6 inline-block">Legal</span>
            <h1 className="text-section-title text-foreground mb-5">
              Terms &amp; Conditions
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              These terms govern your use of notrace's services. We've written them to be clear and straightforward — because transparency is what we're about.
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-mono-data">
              Last updated: August 2026
            </p>
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

            {/* Business Information */}
            <div className="card-base p-6 border border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Business Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div>
                  <span className="font-semibold text-foreground">Business Name: </span>
                  <span className="text-muted-foreground">M/s Engage Ad (MSME Registered)</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">GST No: </span>
                  <span className="text-muted-foreground">09GVRPK4451F2Z3</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-foreground">Address: </span>
                  <span className="text-muted-foreground">356/340/1331, Ashok Vihar, Alam Nagar, Lucknow – 226017, UP</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Owner: </span>
                  <span className="text-muted-foreground">Mohit Kanaujia</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Mobile: </span>
                  <a href="tel:9369524385" className="text-muted-foreground hover:text-primary transition-colors">9369524385</a>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-foreground">Email: </span>
                  <a href="mailto:mouhitkanaujia@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">mouhitkanaujia@gmail.com</a>
                  <span className="text-muted-foreground"> / </span>
                  <a href="mailto:ind.engagead@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">ind.engagead@gmail.com</a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="card-base p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about our terms?
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
