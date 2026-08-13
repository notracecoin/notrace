import React from 'react';
import Icon from '@/components/ui/AppIcon';

const milestones = [
  {
    date: 'Jan 2024',
    event: 'notrace founded',
    detail: 'One developer, one weekend, one flashlight app with zero permissions.',
    type: 'primary',
  },
  {
    date: 'Mar 2024',
    event: 'First 1,000 downloads',
    detail: 'Word spread on privacy forums. No marketing spend.',
    type: 'primary',
  },
  {
    date: 'Jun 2024',
    event: 'First $9 payment received',
    detail: 'Someone paid voluntarily. The model works.',
    type: 'primary',
  },
  {
    date: 'Sep 2024',
    event: 'Open source audit published',
    detail: 'Full permission manifest published. Independent security review completed.',
    type: 'primary',
  },
  {
    date: '2025',
    event: 'notrace Keyboard in development',
    detail: 'Building the second app. Same philosophy, zero exceptions.',
    type: 'future',
  },
  {
    date: '2026+',
    event: 'The full suite',
    detail: 'Every category of app that harvests data gets a clean alternative.',
    type: 'future',
  },
];

export default function MissionSection() {
  return (
    <section className="py-20 md:py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Mission statement */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="pill-green">Mission</span>
              <h2 className="text-section-title text-foreground">
                Every "free" app<br />
                <span className="text-accent">has a price.</span><br />
                <span className="text-primary">We changed the model.</span>
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                The standard model for free apps is: give users the app for free, then quietly harvest their data
                and sell it to advertisers. The user is the product. It's legal (barely), profitable, and ubiquitous.
              </p>
              <p>
                NotRace rejects this. Our apps are free to use because we believe software should work for users,
                not against them. We sustain ourselves through honest subscriptions — $9/year, no coercion.
              </p>
              <p>
                We're not building a company on surveillance. We're building a company on trust.
              </p>
            </div>

            <div className="card-base p-6 space-y-3 border-l-2 border-primary">
              <p className="font-mono text-xs text-primary uppercase tracking-widest">The notrace Rule</p>
              <p className="font-bold text-foreground text-base">
                If an app doesn't need a permission to do its job, it doesn't have that permission. Full stop.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            <h3 className="font-bold text-foreground mb-8 text-sm uppercase tracking-widest text-muted-foreground">
              Timeline
            </h3>
            {milestones?.map((m, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                      m?.type === 'primary' ?'border-primary/40 bg-primary/10 group-hover:bg-primary/20' :'border-border bg-muted'
                    }`}
                  >
                    <Icon
                      name={m?.type === 'primary' ? 'CheckIcon' : 'ClockIcon'}
                      size={12}
                      className={m?.type === 'primary' ? 'text-primary' : 'text-muted-foreground'}
                      variant="solid"
                    />
                  </div>
                  {i < milestones?.length - 1 && (
                    <div className={`w-px flex-1 my-1 min-h-6 ${m?.type === 'primary' ? 'bg-primary/20' : 'bg-border'}`} />
                  )}
                </div>
                <div className="pb-7 flex-1">
                  <p className="font-mono text-xs text-muted-foreground mb-0.5">{m?.date}</p>
                  <p className={`font-bold text-sm mb-1 ${m?.type === 'primary' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {m?.event}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m?.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}