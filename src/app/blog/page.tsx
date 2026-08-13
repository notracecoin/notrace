import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHero from '@/app/blog/components/BlogHero';
import BlogGrid from '@/app/blog/components/BlogGrid';

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <BlogHero />
        <BlogGrid />
      </main>
      <Footer />
    </>
  );
}