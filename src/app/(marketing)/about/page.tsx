import AboutHero from '../../../components/marketing/about/AboutHero';
import Features from '@/components/marketing/about/Features';
import Navigation from '@/components/marketing/home/Navigation';

export default function AboutPage() {
    return (
        <main className="flex-1 -z-10">
            <Navigation />
            <div className="bg-black z-0 min-h-screen">
                <AboutHero />
                <Features />
            </div>
        </main>
    );
} 