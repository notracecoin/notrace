'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const products = [
{
  id: 'flashlight',
  name: 'notrace Flashlight',
  tagline: 'A flashlight that is just a flashlight.',
  description:
  'Uses your camera flash. Requests zero permissions. No location, no device ID, no network access. Open source. Auditable. Free.',
  status: 'available',
  platform: 'Android',
  permissions: [],
  forbidden: ['Location', 'Device ID', 'Network', 'Contacts', 'Storage'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1312e0dd1-1784770086654.png",
  imageAlt: 'Bright white flashlight beam against clean background, simple and minimal',
  href: '#download',
  size: 'featured'
},
{
  id: 'keyboard',
  name: 'notrace Keyboard',
  tagline: 'Type privately. Every keystroke stays local.',
  description: 'A keyboard that never phones home. Your words are yours.',
  status: 'coming-soon',
  platform: 'Android',
  permissions: [],
  forbidden: ['Network', 'Location', 'Cloud sync'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1760a238a-1772690320969.png",
  imageAlt: 'Minimal keyboard layout on clean surface, modern and simple',
  href: '#notify',
  size: 'small'
},
{
  id: 'weather',
  name: 'notrace Weather',
  tagline: 'Weather without selling your location.',
  description: "You enter a city. It shows weather. That\'s it.",
  status: 'coming-soon',
  platform: 'Android',
  permissions: [],
  forbidden: ['Background location', 'Device ID', 'Ad networks'],
  image: "https://images.unsplash.com/photo-1508525299984-8a3c54087039",
  imageAlt: 'Clear sky with soft clouds, calm weather scene',
  href: '#notify',
  size: 'small'
}];


export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 ${visible ? 'animate-fade-up' : 'opacity-0-init'}`}>
          <div className="space-y-4">
            <span className="pill-green">What We're Building</span>
            <h2 className="text-section-title text-foreground">
              Apps that do<br />
              <span className="text-primary">exactly one thing.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed text-sm md:text-base">
            Every notrace app ships with a public permission audit. Zero hidden requests. Fully open source. You can verify every claim.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${visible ? 'animate-fade-up stagger-2' : 'opacity-0-init'}`}>
          {/* Featured: Flashlight — col-span-2 */}
          <div className="md:col-span-2 card-base overflow-hidden flex flex-col md:flex-row group">
            <div className="md:w-2/5 h-52 md:h-auto relative overflow-hidden flex-shrink-0">
              <AppImage
                src={products?.[0]?.image}
                alt={products?.[0]?.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
              <span className="absolute top-4 left-4 pill-green">Available Now</span>
            </div>
            <div className="flex-1 p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-card-title text-foreground">{products?.[0]?.name}</h3>
                    <p className="text-primary text-sm font-semibold mt-0.5">{products?.[0]?.tagline}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded border border-border">
                    {products?.[0]?.platform}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{products?.[0]?.description}</p>

                {/* Permissions audit */}
                <div className="space-y-2">
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Permissions requested:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                      <Icon name="CheckIcon" size={11} variant="solid" />
                      Camera Flash Only
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-2">Never requests:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {products?.[0]?.forbidden?.map((f) =>
                    <span key={f} className="flex items-center gap-1 font-mono text-xs bg-accent/8 text-accent border border-accent/20 px-2 py-0.5 rounded-full">
                        <Icon name="XMarkIcon" size={10} variant="solid" />
                        {f}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  href={products?.[0]?.href}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                  
                  <Icon name="ArrowDownTrayIcon" size={16} variant="solid" />
                  Download Free
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 border border-border text-muted-foreground px-5 py-3 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
                  
                  <Icon name="CodeBracketIcon" size={14} />
                  Source Code
                </Link>
              </div>
            </div>
          </div>

          {/* col-span-1 cards */}
          {products?.slice(1)?.map((product) =>
          <div key={product?.id} className="card-base overflow-hidden flex flex-col group relative">
              <div className="h-44 relative overflow-hidden flex-shrink-0">
                <AppImage
                src={product?.image}
                alt={product?.imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />
                <span className="absolute top-4 left-4 pill-warn">Coming Soon</span>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-foreground">{product?.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{product?.description}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-mono text-xs text-muted-foreground">Never requests:</p>
                  <div className="flex flex-wrap gap-1">
                    {product?.forbidden?.map((f) =>
                  <span key={f} className="font-mono text-xs text-accent/70 border border-accent/15 px-2 py-0.5 rounded-full">
                        {f}
                      </span>
                  )}
                  </div>
                  <button className="mt-3 w-full border border-border text-muted-foreground py-2.5 rounded-xl text-xs font-bold hover:border-primary hover:text-primary transition-colors">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Open source pledge */}
        <div className={`mt-8 card-base p-6 flex flex-col sm:flex-row items-center gap-5 ${visible ? 'animate-fade-up stagger-4' : 'opacity-0-init'}`}>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="LockOpenIcon" size={22} className="text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-foreground text-sm">All notrace apps are open source</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Every line of code is public. Audit it yourself. We have nothing to hide — by design.
            </p>
          </div>
          <Link
            href="#"
            className="flex items-center gap-2 text-primary text-sm font-bold hover:underline flex-shrink-0">
            
            View on GitHub
            <Icon name="ArrowTopRightOnSquareIcon" size={14} />
          </Link>
        </div>
      </div>
    </section>);

}