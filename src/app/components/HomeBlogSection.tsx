import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const featuredPost = {
  category: 'Privacy',
  title: "Remember When Tech Didn\'t Try to Steal Your Soul?",
  excerpt:
  "There's a strange agreement we've all been forced into. Whether you're a college student scrolling TikTok until 3 AM or a seasoned adult trying to find your glasses in the dark, you download a simple phone tool—like a flashlight—and suddenly you're handing over your entire life story.",
  author: 'Mohit Kanaujia',
  date: 'Aug 13, 2026',
  time: '04:18 AM',
  readTime: '7 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_132b6a6ee-1773051894819.png",
  imageAlt:
  'Dark smartphone screen with privacy lock icon, moody low-light atmosphere, digital surveillance concept',
  href: '/blog'
};

export default function HomeBlogSection() {
  return (
    <section className="py-16 px-5 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="pill-green">From the Blog</span>
            <h2 className="text-section-title text-foreground">
              Latest <span className="text-primary">Insights</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            
            View all articles
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Featured blog card */}
        <Link
          href={featuredPost?.href}
          className="card-base overflow-hidden group flex flex-col md:flex-row">
          
          {/* Image */}
          <div className="h-64 md:h-auto md:w-2/5 relative overflow-hidden flex-shrink-0">
            <AppImage
              src={featuredPost?.image}
              alt={featuredPost?.imageAlt}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 40vw" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/40 hidden md:block" />
            <span className="absolute top-4 left-4 pill-green">{featuredPost?.category}</span>
          </div>

          {/* Content */}
          <div className="flex-1 p-7 md:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight group-hover:text-primary transition-colors">
                {featuredPost?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {featuredPost?.excerpt}
              </p>
            </div>

            {/* Meta */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Icon name="UserCircleIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{featuredPost?.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="CalendarIcon" size={11} />
                    <span>{featuredPost?.date}</span>
                    <span>·</span>
                    <Icon name="ClockIcon" size={11} />
                    <span>{featuredPost?.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Icon name="ClockIcon" size={12} />
                  {featuredPost?.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Read article <Icon name="ArrowRightIcon" size={13} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Mobile view all link */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            
            View all articles <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      </div>
    </section>);

}