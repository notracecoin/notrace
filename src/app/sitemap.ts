import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://notrace.co.in';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/donate`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.6, changeFrequency: 'yearly' },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.6, changeFrequency: 'yearly' },
    { url: `${baseUrl}/cancellation-refund`, lastModified: new Date(), priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/shipping-exchange`, lastModified: new Date(), priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/sitemap-page`, lastModified: new Date(), priority: 0.4, changeFrequency: 'monthly' },
  ];

  // Dynamic blog post pages from Supabase
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    const blogPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));

    return [...staticPages, ...blogPages];
  } catch {
    // If Supabase is unavailable, return static pages only
    return staticPages;
  }
}