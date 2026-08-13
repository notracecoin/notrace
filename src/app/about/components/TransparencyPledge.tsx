import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const pledgeItems = [
  'We will never request permissions our apps don\'t strictly need.',
  'We will publish source code for every notrace app on release.',
  'We will publish a signed permission manifest before every update.',
  'We will publish quarterly financial reports showing revenue and expenses.',
  'We will never sell, share, or barter user data to any third party.',
  'If we ever violate any of the above, we will publicly disclose it.',
];

export default function TransparencyPledge() {
  return (
    <section className="py-20 md:py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Pledge */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="pill-green">Transparency Pledge</span>
              <h2 className="text-section-title text-foreground max-w-md">
                Our commitments.<br />
                <span className="text-primary">In writing.</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              These aren't aspirations. They're binding commitments we hold ourselves to publicly.
              Any violation is disclosed in our changelog.
            </p>

            <ol className="space-y-4">
              {pledgeItems?.map((item, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="font-mono text-xs text-primary font-bold mt-0.5 flex-shrink-0 w-5">
                    {String(i + 1)?.padStart(2, '0')}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact + Press */}
          <div className="space-y-6">
            <div className="card-base p-7 space-y-5">
              <h3 className="font-bold text-foreground">Press & Research Inquiries</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Journalists, security researchers, and academics are welcome to reach out.
                We'll respond within 48 hours and provide full source access on request.
              </p>
              <a
                href="mailto:press@notrace.app"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                <Icon name="EnvelopeIcon" size={16} />
                press@notrace.app
              </a>
            </div>

            <div className="card-base p-7 space-y-5 border-primary/20">
              <div className="flex items-center gap-3">
                <Icon name="CodeBracketSquareIcon" size={22} className="text-primary" />
                <h3 className="font-bold text-foreground">Audit the Code</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every notrace app is on GitHub. Fork it, audit it, pull request it.
                We review all security disclosures within 24 hours.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                View GitHub
                <Icon name="ArrowTopRightOnSquareIcon" size={14} />
              </Link>
            </div>

            <div className="card-base p-7 space-y-4 bg-muted/30">
              <h3 className="font-bold text-foreground text-sm">Transparency Reports</h3>
              <div className="space-y-3">
                {[
                  { period: 'Q2 2026', status: 'Published', type: 'primary' },
                  { period: 'Q1 2026', status: 'Published', type: 'primary' },
                  { period: 'Q4 2025', status: 'Published', type: 'primary' },
                ]?.map((report) => (
                  <div key={report?.period} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <Icon name="DocumentTextIcon" size={14} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{report?.period} Report</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="pill-green">{report?.status}</span>
                      <button className="text-xs text-primary hover:underline font-semibold">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}