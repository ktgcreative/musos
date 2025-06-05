import { AppleCardsCarouselDemo } from '@/components/discover/AppleCards';
import GridLayout from '@/components/discover/GridLayout';

// Update the data fetching functions
async function getMusicians() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://musos.io/'}/api/musicians`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        console.error('Failed to fetch musicians');
        return [];
    }

    const data = await res.json();
    return data;
}

async function getVenues() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://musos.vercel.app/'}/api/venues`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        console.error('Failed to fetch venues');
        return [];
    }

    const data = await res.json();
    return data;
}

export default async function Discover() {
    let musicians = [];
    let venues = [];

    try {
        musicians = await getMusicians();
        venues = await getVenues();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 space-y-8 my-16">

                <AppleCardsCarouselDemo
                    musicians={musicians}
                    venues={venues}
                />

                <GridLayout
                    title="Musicians"
                    data={musicians}
                    type="musician"
                    variant="square"
                    viewAllHref="/musicians"
                    maxItems={8}
                />

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

                <GridLayout
                    title="Venues"
                    data={venues}
                    type="venue"
                    variant="landscape"
                    viewAllHref="/venues"
                    maxItems={8}
                />
            </div>
        </div>
    );
} 