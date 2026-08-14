import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://notrace.co.in';
  return [
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
}