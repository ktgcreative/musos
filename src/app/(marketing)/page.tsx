import Navigation from '@/components/marketing/home/Navigation';
// import Hero from '@/components/marketing/home/Hero';
import { PlayfulHeroSection } from '@/components/marketing/home/MarketingHero';
import Pricing from '@/components/marketing/home/Pricing';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="bg-black min-h-screen">
        <Navigation />
        {/* <Hero /> */}
        <PlayfulHeroSection />
        <Pricing />
      </div>
    </main>
  );
} 