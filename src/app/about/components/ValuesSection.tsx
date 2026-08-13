import React from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  {
    icon: 'EyeSlashIcon',
    title: 'Radical transparency',
    description:
      'We publish our source code, permission manifests, and financial reports. If we can\'t show it, we don\'t do it.',
  },
  {
    icon: 'ScaleIcon',
    title: 'Minimal by design',
    description:
      'Every feature request is evaluated against: does this require new permissions? If yes, we need extraordinary justification.',
  },
  {
    icon: 'UserGroupIcon',
    title: 'Users, not users\' data',
    description:
      'Our customers are the people who use our apps. Not the advertisers. Not the data brokers. You.',
  },
  {
    icon: 'MegaphoneIcon',
    title: 'Loud about it',
    description:
      'We don\'t just build clean apps — we expose the ones that aren\'t. The more people know, the better the ecosystem gets.',
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 px-5 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 mb-12">
          <span className="pill-green">Values</span>
          <h2 className="text-section-title text-foreground max-w-xl">
            What we actually<br />
            <span className="text-primary">believe.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, i) => (
            <div
              key={i}
              className="card-base p-6 space-y-4 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name={val.icon as 'EyeSlashIcon'} size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm">{val.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}