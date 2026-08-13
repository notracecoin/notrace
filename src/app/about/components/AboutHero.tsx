import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function AboutHero() {
  return (
    <section className="pt-12 pb-16 px-5 md:px-8 border-b border-border relative overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-4 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <span className="pill-green">Our Story</span>
            <h1 className="text-section-title text-foreground">
              We got tired of<br />
              <span className="text-accent">being the product.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Notrace started when one developer got annoyed enough to actually do something about it.
              A flashlight app requesting GPS access was the last straw.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2.5 bg-muted border border-border px-5 py-3 rounded-full">
                <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Founded 2024</span>
              </div>
              <div className="flex items-center gap-2.5 bg-muted border border-border px-5 py-3 rounded-full">
                <Icon name="MapPinIcon" size={16} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Independent, remote</span>
              </div>
              <div className="flex items-center gap-2.5 bg-primary/10 border border-primary/20 px-5 py-3 rounded-full">
                <Icon name="ShieldCheckIcon" size={16} className="text-primary" variant="solid" />
                <span className="text-sm font-semibold text-primary">Zero investors</span>
              </div>
            </div>
          </div>

          {/* Founder card */}
          <div className="card-base p-8 space-y-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center flex-shrink-0">
                <Icon name="UserCircleIcon" size={32} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">The Founder</h3>
                <p className="text-primary text-sm font-semibold">Solo developer → Building in public</p>
                <p className="text-xs text-muted-foreground mt-0.5">Started notrace after the flashlight incident</p>
              </div>
            </div>
            <blockquote className="border-l-2 border-primary pl-4">
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "I built the flashlight app in a weekend. Then I published all the code publicly and said:
                here's everything. Judge it yourself. That's the whole philosophy."
              </p>
            </blockquote>
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
              {[
                { value: '1', label: 'Founder' },
                { value: '2', label: 'Apps shipped' },
                { value: '$0', label: 'VC funding' },
              ]?.map((stat) => (
                <div key={stat?.label} className="text-center">
                  <p className="text-2xl font-extrabold text-primary">{stat?.value}</p>
                  <p className="text-xs text-muted-foreground">{stat?.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}