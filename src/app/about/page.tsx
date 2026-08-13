import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/app/about/components/AboutHero';
import MissionSection from '@/app/about/components/MissionSection';
import ValuesSection from '@/app/about/components/ValuesSection';
import TransparencyPledge from '@/app/about/components/TransparencyPledge';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <AboutHero />
        <MissionSection />
        <ValuesSection />
        <TransparencyPledge />
      </main>
      <Footer />
    </>
  );
}