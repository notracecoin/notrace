import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const posts = [
{
  id: 1,
  category: 'FTC Cases',
  categoryType: 'danger',
  title: 'The Flashlight App That Reported Your Location to 14 Ad Networks',
  excerpt:
  'In 2013, the FTC settled with Goldenshores Technologies over the Brightest Flashlight Free app. The details are more disturbing than you\'d expect — and the practice is still happening.',
  author: 'Marcus Webb',
  date: 'Aug 8, 2026',
  readTime: '8 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ef74aa6-1784419446326.png",
  imageAlt: 'Flashlight beam in dark room, deep shadows, minimal lighting, investigative tone',
  featured: true,
  href: '#'
},
{
  id: 2,
  category: 'Data Harvesting',
  categoryType: 'danger',
  title: 'Your Keyboard App Is Reading Every Message You Type',
  excerpt:
  'Third-party keyboards request "full access" — which means everything you type, including passwords and credit card numbers, can be logged.',
  author: 'Priya Nair',
  date: 'Aug 5, 2026',
  readTime: '6 min read',
  image: "https://images.unsplash.com/photo-1718627829047-b4c1016e7b9f",
  imageAlt: 'Dark keyboard with illuminated keys, moody low-light atmosphere, tech surveillance feel',
  featured: false,
  href: '#'
},
{
  id: 3,
  category: 'Deep Dives',
  categoryType: 'warn',
  title: 'Free VPNs: The Worst Privacy Tool You Could Choose',
  excerpt:
  'Dozens of free VPN apps have been caught selling user traffic data to third parties. The irony is brutal.',
  author: 'Tomás Reyes',
  date: 'Jul 29, 2026',
  readTime: '10 min read',
  image: "https://images.unsplash.com/photo-1680992046626-418f7e910589",
  imageAlt: 'Digital network cables in dark server room, dim blue lighting, surveillance atmosphere',
  featured: false,
  href: '#'
},
{
  id: 4,
  category: 'Privacy Tips',
  categoryType: 'safe',
  title: 'The 5-Minute Audit: Check What Your Apps Are Actually Doing',
  excerpt:
  'You don\'t need to be a developer to audit your app permissions. Here\'s a practical guide anyone can follow in 5 minutes.',
  author: 'Amara Osei',
  date: 'Jul 22, 2026',
  readTime: '5 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14971ac52-1766517936500.png",
  imageAlt: 'Smartphone in hands with privacy settings visible, soft dark background, calm atmosphere',
  featured: false,
  href: '#'
}];


export default function BlogGrid() {
  const featured = posts?.find((p) => p?.featured);
  const rest = posts?.filter((p) => !p?.featured);

  return (
    <section className="py-14 px-5 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* BENTO GRID AUDIT:
             Array has 4 cards: [FeaturedPost, Post2, Post3, Post4]
             Row 1: [col-1..2: FeaturedPost cs-2 rs-1] [col-3: Post2 cs-1]
             Row 2: [col-1: Post3 cs-1] [col-2..3: Post4 cs-2]
             Placed 4/4 cards ✓
          */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured post: cs-2 */}
          {featured && (
          /* card: FeaturedPost cs-2 */
          <Link href={featured?.href} className="md:col-span-2 card-base overflow-hidden group flex flex-col">
              <div className="h-64 md:h-72 relative overflow-hidden">
                <AppImage
                src={featured?.image}
                alt={featured?.imageAlt}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 66vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="pill-red">{featured?.category}</span>
                  <span className="pill-warn">Featured</span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                  {featured?.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{featured?.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center">
                      <Icon name="UserCircleIcon" size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{featured?.author}</p>
                      <p className="text-xs text-muted-foreground">{featured?.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="ClockIcon" size={12} />
                    {featured?.readTime}
                  </div>
                </div>
              </div>
            </Link>)
          }

          {/* Post2: cs-1 */}
          {rest?.[0] && (
          /* card: Post2 cs-1 */
          <Link href={rest?.[0]?.href} className="card-base overflow-hidden group flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <AppImage
                src={rest?.[0]?.image}
                alt={rest?.[0]?.imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute top-4 left-4 pill-red">{rest?.[0]?.category}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-base text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                  {rest?.[0]?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{rest?.[0]?.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{rest?.[0]?.author} · {rest?.[0]?.date}</p>
                  <span className="text-xs text-muted-foreground">{rest?.[0]?.readTime}</span>
                </div>
              </div>
            </Link>)
          }

          {/* Post3: cs-1 */}
          {rest?.[1] && (
          /* card: Post3 cs-1 */
          <Link href={rest?.[1]?.href} className="card-base overflow-hidden group flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <AppImage
                src={rest?.[1]?.image}
                alt={rest?.[1]?.imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute top-4 left-4 pill-warn">{rest?.[1]?.category}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-base text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                  {rest?.[1]?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{rest?.[1]?.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{rest?.[1]?.author} · {rest?.[1]?.date}</p>
                  <span className="text-xs text-muted-foreground">{rest?.[1]?.readTime}</span>
                </div>
              </div>
            </Link>)
          }

          {/* Post4: cs-2 */}
          {rest?.[2] && (
          /* card: Post4 cs-2 */
          <Link href={rest?.[2]?.href} className="md:col-span-2 card-base overflow-hidden group flex flex-col md:flex-row">
              <div className="h-48 md:h-auto md:w-2/5 relative overflow-hidden flex-shrink-0">
                <AppImage
                src={rest?.[2]?.image}
                alt={rest?.[2]?.imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 40vw" />
              
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:hidden" />
                <span className="absolute top-4 left-4 pill-green">{rest?.[2]?.category}</span>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                    {rest?.[2]?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rest?.[2]?.excerpt}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{rest?.[2]?.author} · {rest?.[2]?.date}</p>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold group-hover:gap-2.5 transition-all">
                    Read more <Icon name="ArrowRightIcon" size={12} />
                  </div>
                </div>
              </div>
            </Link>)
          }
        </div>

        {/* Load more */}
        <div className="text-center pt-6">
          <button className="inline-flex items-center gap-2 border border-border text-muted-foreground px-8 py-3 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
            Load more articles
            <Icon name="ArrowDownIcon" size={14} />
          </button>
        </div>
      </div>
    </section>);

}