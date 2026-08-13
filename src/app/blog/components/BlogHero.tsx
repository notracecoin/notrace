import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function BlogHero() {
  return (
    <section className="pt-12 pb-10 px-5 md:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="pill-red">Investigative Reports</span>
            <h1 className="text-section-title text-foreground max-w-xl">
              The data they<br />
              <span className="text-accent">don't want you</span> to read.
            </h1>
            <p className="text-muted-foreground max-w-lg leading-relaxed">
              Every article is sourced, fact-checked, and designed to show you exactly what's happening
              inside the apps on your phone.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-2">
              <Icon name="MagnifyingGlassIcon" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">Search articles...</span>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-8">
          {['All', 'Data Harvesting', 'FTC Cases', 'Privacy Tips', 'New Products', 'Deep Dives']?.map(
            (cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  i === 0
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}