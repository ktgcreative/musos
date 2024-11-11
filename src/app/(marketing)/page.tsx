import Navigation from '@/components/marketing/home/Navigation';
import MarketingHero from '@/components/marketing/home/Hero';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="bg-black min-h-screen">
        <Navigation />
        <MarketingHero />
      </div>
    </main>
  );
} 