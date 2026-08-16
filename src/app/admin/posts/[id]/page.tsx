'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminGuard from '@/app/admin/components/AdminGuard';
import AdminLayout from '@/app/admin/components/AdminLayout';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // JSON string for the editor
  cover_image: string;
  cover_image_alt: string;
  author: string;
  category: string;
  read_time: string;
  status: 'draft' | 'published';
  featured: boolean;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
}

const EMPTY_POST: BlogPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: JSON.stringify({
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }]
  }, null, 2),
  cover_image: '',
  cover_image_alt: '',
  author: 'Manisha',
  category: '',
  read_time: '',
  status: 'draft',
  featured: false,
  meta_title: '',
  meta_description: '',
  keywords: '',
  og_title: '',
  og_description: '',
  og_image: '',
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateArticleSchema(post: BlogPost): object {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://notrace.co.in';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.og_image || post.cover_image,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'notrace',
      url: baseUrl,
    },
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: new Date().toISOString(),
    keywords: post.keywords,
  };
}

function CharCount({ value, max, label }: { value: string; max: number; label: string }) {
  const len = value?.length || 0;
  const color = len > max ? 'text-red-500' : len > max * 0.9 ? 'text-yellow-500' : 'text-muted-foreground';
  return (
    <span className={`text-xs ${color}`}>
      {len}/{max} chars
    </span>
  );
}

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string | undefined;
  const isNew = !postId || postId === 'new';

  const [post, setPost] = useState<BlogPost>(EMPTY_POST);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'schema'>('content');

  const supabase = createClient();

  useEffect(() => {
    if (!isNew && postId) {
      loadPost(postId);
    }
  }, [postId]);

  const loadPost = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setPost({
        ...data,
        content: typeof data.content === 'object'
          ? JSON.stringify(data.content, null, 2)
          : data.content || '',
      });
    }
    setLoading(false);
  };

  const update = (field: keyof BlogPost, value: any) => {
    setPost((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title
      if (field === 'title' && isNew) {
        updated.slug = generateSlug(value);
      }
      // Auto-fill SEO fields from title/excerpt
      if (field === 'title' && !prev.meta_title) {
        updated.meta_title = value;
        updated.og_title = value;
      }
      if (field === 'excerpt' && !prev.meta_description) {
        updated.meta_description = value;
        updated.og_description = value;
      }
      return updated;
    });
  };

  const validateJson = (value: string): boolean => {
    try {
      JSON.parse(value);
      setJsonError('');
      return true;
    } catch (e: any) {
      setJsonError(`Invalid JSON: ${e.message}`);
      return false;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `blog/${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, { upsert: true });

      if (error) {
        // Bucket may not exist yet — use URL input instead
        setSaveMsg('Image upload failed. Please enter image URL manually.');
        setTimeout(() => setSaveMsg(''), 4000);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName);
        update('cover_image', publicUrl);
        update('og_image', publicUrl);
      }
    } catch {
      setSaveMsg('Upload error. Please enter image URL manually.');
      setTimeout(() => setSaveMsg(''), 4000);
    }
    setUploading(false);
  };

  const handleSave = async (publishNow?: boolean) => {
    if (!post.title.trim()) {
      setSaveMsg('Title is required.');
      setTimeout(() => setSaveMsg(''), 3000);
      return;
    }

    if (!validateJson(post.content)) return;

    setSaving(true);
    setSaveMsg('');

    let parsedContent: object;
    try {
      parsedContent = JSON.parse(post.content);
    } catch {
      parsedContent = { type: 'doc', content: [] };
    }

    const articleSchema = generateArticleSchema(post);
    const status = publishNow ? 'published' : post.status;
    const published_at = status === 'published' && !post.id ? new Date().toISOString() : undefined;

    const payload: any = {
      title: post.title,
      slug: post.slug || generateSlug(post.title),
      excerpt: post.excerpt,
      content: parsedContent,
      cover_image: post.cover_image,
      cover_image_alt: post.cover_image_alt,
      author: post.author,
      category: post.category,
      read_time: post.read_time,
      status,
      featured: post.featured,
      meta_title: post.meta_title || post.title,
      meta_description: post.meta_description || post.excerpt,
      keywords: post.keywords,
      og_title: post.og_title || post.title,
      og_description: post.og_description || post.excerpt,
      og_image: post.og_image || post.cover_image,
      article_schema: articleSchema,
    };

    if (published_at) payload.published_at = published_at;

    let error: any;
    if (isNew) {
      const result = await supabase.from('blog_posts').insert(payload).select().single();
      error = result.error;
      if (!error && result.data) {
        router.replace(`/admin/posts/${result.data.id}`);
      }
    } else {
      const result = await supabase.from('blog_posts').update(payload).eq('id', post.id!).select().single();
      error = result.error;
      if (!error && result.data) {
        setPost((prev) => ({ ...prev, status: result.data.status }));
      }
    }

    if (error) {
      setSaveMsg(`Error: ${error.message}`);
    } else {
      setSaveMsg(publishNow ? 'Published!' : 'Saved!');
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const articleSchemaPreview = JSON.stringify(generateArticleSchema(post), null, 2);

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="p-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/admin/posts')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-foreground">
                {isNew ? 'New Post' : 'Edit Post'}
              </h1>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                post.status === 'published' ?'bg-green-500/15 text-green-600' :'bg-yellow-500/15 text-yellow-600'
              }`}>
                {post.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {saveMsg && (
                <span className={`text-sm font-medium ${saveMsg.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
                  {saveMsg}
                </span>
              )}
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold border border-border rounded-xl text-foreground hover:bg-muted transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save Draft'}
              </button>
              {post.status !== 'published' && (
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  Publish
                </button>
              )}
              {post.status === 'published' && (
                <button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  Update
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Main editor */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Title *</label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder="Post title"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Slug</label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => update('slug', e.target.value)}
                  placeholder="post-url-slug"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Excerpt</label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => update('excerpt', e.target.value)}
                  placeholder="Short summary of the post"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Tabs */}
              <div className="border border-border rounded-2xl overflow-hidden">
                <div className="flex border-b border-border bg-muted/30">
                  {(['content', 'seo', 'schema'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-sm font-semibold capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-primary border-b-2 border-primary bg-background' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab === 'seo' ? 'SEO' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {/* Content Tab */}
                  {activeTab === 'content' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">
                          Content (JSON)
                        </label>
                        <span className="text-xs text-muted-foreground">
                          Prosemirror / TipTap JSON format
                        </span>
                      </div>
                      <textarea
                        value={post.content}
                        onChange={(e) => {
                          update('content', e.target.value);
                          validateJson(e.target.value);
                        }}
                        rows={18}
                        spellCheck={false}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-y"
                        placeholder='{"type":"doc","content":[...]}'
                      />
                      {jsonError && (
                        <p className="text-xs text-red-500">{jsonError}</p>
                      )}
                    </div>
                  )}

                  {/* SEO Tab */}
                  {activeTab === 'seo' && (
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-sm font-semibold text-foreground">Meta Title</label>
                          <CharCount value={post.meta_title} max={60} label="meta title" />
                        </div>
                        <input
                          type="text"
                          value={post.meta_title}
                          onChange={(e) => update('meta_title', e.target.value)}
                          placeholder="SEO title (50-60 chars)"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-sm font-semibold text-foreground">Meta Description</label>
                          <CharCount value={post.meta_description} max={160} label="meta description" />
                        </div>
                        <textarea
                          value={post.meta_description}
                          onChange={(e) => update('meta_description', e.target.value)}
                          placeholder="SEO description (150-160 chars)"
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Keywords</label>
                        <input
                          type="text"
                          value={post.keywords}
                          onChange={(e) => update('keywords', e.target.value)}
                          placeholder="privacy, data harvesting, app transparency"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="border-t border-border pt-5">
                        <p className="text-sm font-bold text-foreground mb-4">Open Graph Tags</p>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="text-sm font-semibold text-foreground">OG Title</label>
                              <CharCount value={post.og_title} max={60} label="og title" />
                            </div>
                            <input
                              type="text"
                              value={post.og_title}
                              onChange={(e) => update('og_title', e.target.value)}
                              placeholder="Open Graph title"
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="text-sm font-semibold text-foreground">OG Description</label>
                              <CharCount value={post.og_description} max={160} label="og description" />
                            </div>
                            <textarea
                              value={post.og_description}
                              onChange={(e) => update('og_description', e.target.value)}
                              placeholder="Open Graph description"
                              rows={3}
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-1.5">OG Image URL</label>
                            <input
                              type="text"
                              value={post.og_image}
                              onChange={(e) => update('og_image', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* SEO Preview */}
                      <div className="border border-border rounded-xl p-4 bg-muted/20">
                        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Google Preview</p>
                        <p className="text-blue-600 text-sm font-medium truncate">
                          {post.meta_title || post.title || 'Post Title'}
                        </p>
                        <p className="text-green-700 text-xs mt-0.5">
                          {(process.env.NEXT_PUBLIC_SITE_URL || 'https://notrace.co.in')}/blog/{post.slug || 'post-slug'}
                        </p>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                          {post.meta_description || post.excerpt || 'Post description will appear here.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Schema Tab */}
                  {activeTab === 'schema' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">
                          Article Schema (JSON-LD)
                        </label>
                        <span className="text-xs text-green-600 font-medium">Auto-generated</span>
                      </div>
                      <pre className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-xs font-mono overflow-auto max-h-80">
                        {articleSchemaPreview}
                      </pre>
                      <p className="text-xs text-muted-foreground">
                        This schema is automatically saved with the post and injected into the blog post page.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-5">
              {/* Cover Image */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-sm font-bold text-foreground mb-3">Cover Image</p>

                {post.cover_image && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-border aspect-video relative bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image}
                      alt={post.cover_image_alt || 'Cover image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <label className="block w-full cursor-pointer">
                  <div className={`border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary transition-colors ${uploading ? 'opacity-60' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">
                      {uploading ? 'Uploading…' : 'Click to upload image'}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>

                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={post.cover_image}
                    onChange={(e) => update('cover_image', e.target.value)}
                    placeholder="Or paste image URL"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    value={post.cover_image_alt}
                    onChange={(e) => update('cover_image_alt', e.target.value)}
                    placeholder="Image alt text"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Post Settings */}
              <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                <p className="text-sm font-bold text-foreground">Post Settings</p>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Author</label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => update('author', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
                  <input
                    type="text"
                    value={post.category}
                    onChange={(e) => update('category', e.target.value)}
                    placeholder="Privacy, FTC Cases, Deep Dives…"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={post.read_time}
                    onChange={(e) => update('read_time', e.target.value)}
                    placeholder="5 min read"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-muted-foreground">Featured Post</label>
                  <button
                    type="button"
                    onClick={() => update('featured', !post.featured)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      post.featured ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        post.featured ? 'translate-x-4.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
