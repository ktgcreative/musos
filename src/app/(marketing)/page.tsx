import Navigation from '@/components/marketing/home/Navigation';
import MarketingHero from '@/components/marketing/home/Hero';
import Pricing from '@/components/marketing/home/Pricing';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="bg-black min-h-screen">
        <Navigation />
        <MarketingHero />
        <Pricing />
      </div>
    </main>
  );
} 