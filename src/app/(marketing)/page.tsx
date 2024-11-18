import Navigation from '@/components/marketing/home/Navigation';
// import Hero from '@/components/marketing/home/Hero';
import { PlayfulHeroSection } from '@/components/marketing/home/hero/MainHero';
import Pricing from '@/components/marketing/home/Pricing';
import Features from '@/components/marketing/about/Features';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="bg-black min-h-screen">
        <Navigation />
        {/* <Hero /> */}
        <PlayfulHeroSection />
        <Features />
        <Pricing />
      </div>
    </main>
  );
} 