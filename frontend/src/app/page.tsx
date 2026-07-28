'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { Stats } from '@/components/sections/Stats';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}