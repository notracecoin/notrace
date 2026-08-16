'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminGuard from '@/app/admin/components/AdminGuard';
import AdminLayout from '@/app/admin/components/AdminLayout';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  category: string;
  author: string;
  featured: boolean;
  created_at: string;
  published_at: string | null;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, status, category, author, featured, created_at, published_at')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    setDeleting(id);
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleting(null);
  };

  const handleTogglePublish = async (post: Post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const update: any = { status: newStatus };
    if (newStatus === 'published' && !post.published_at) {
      update.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('blog_posts')
      .update(update)
      .eq('id', post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) => p.id === post.id ? { ...p, status: newStatus } : p)
      );
    }
  };

  const filtered = posts.filter((p) => filter === 'all' || p.status === filter);

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{counts.all} total posts</p>
            </div>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 mb-5 bg-muted/30 p-1 rounded-xl w-fit">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg capitalize transition-colors ${
                  filter === f
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>

          {/* Posts table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-muted-foreground/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-muted-foreground text-sm">No posts yet.</p>
                <Link href="/admin/posts/new" className="text-primary text-sm font-semibold mt-2 hover:underline">
                  Create your first post
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Title</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Category</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden lg:table-cell">Author</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Date</th>
                    <th className="text-right text-xs font-semibold text-muted-foreground px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {post.featured && (
                            <span className="text-yellow-500" title="Featured">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </span>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-foreground line-clamp-1">{post.title}</p>
                            <p className="text-xs text-muted-foreground font-mono">/blog/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{post.category || '—'}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                            post.status === 'published' ?'bg-green-500/15 text-green-600 hover:bg-green-500/25' :'bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25'
                          }`}
                          title={post.status === 'published' ? 'Click to unpublish' : 'Click to publish'}
                        >
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deleting === post.id}
                            className="text-xs text-red-500/70 hover:text-red-500 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 disabled:opacity-50"
                          >
                            {deleting === post.id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
