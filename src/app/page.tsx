import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import EvidenceSection from '@/app/components/EvidenceSection';
import ProductsSection from '@/app/components/ProductsSection';
import TransparencySection from '@/app/components/TransparencySection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <EvidenceSection />
        <ProductsSection />
        <TransparencySection />
      </main>
      <Footer />
    </>
  );
}