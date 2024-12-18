import Image from 'next/image';
import Link from 'next/link';
import { MdVerified, MdLocationOn, MdPeople, MdMusicNote } from 'react-icons/md';
import type { Musician } from '@/app/api/musicians/route';
import type { Venue } from '@/app/api/venues/route';
import { AppleCardsCarouselDemo } from '@/components/discover/AppleCards';



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
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />
            <div className="relative z-10  space-y-8 my-16">

                <AppleCardsCarouselDemo musicians={musicians} venues={venues} />

                {/* Musicians Section */}
                <div className="space-y-6 px-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-violet-600/20 backdrop-blur-sm">
                                <MdMusicNote className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Musicians</h2>
                                <p className="text-sm text-zinc-400">{musicians?.length || 0} artists</p>
                            </div>
                        </div>
                        <Link
                            href="/musicians"
                            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {musicians?.slice(0, 8).map((musician: Musician) => (
                            <Link
                                href={`/profile/${musician.id}`}
                                key={musician.id}
                                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-600/10 transition-all duration-300"
                            >
                                <div className="aspect-square relative">
                                    <Image
                                        src={musician.profileImage}
                                        alt={musician.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                                            {musician.name}
                                        </h3>
                                        {musician.isVerified && (
                                            <div className="p-1 rounded-full bg-violet-600/20 backdrop-blur-sm">
                                                <MdVerified className="w-4 h-4 text-violet-400" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-300 mb-2">{musician.genre}</p>
                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                        <MdLocationOn className="w-4 h-4" />
                                        {musician.location}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

                {/* Venues Section */}
                <div className="space-y-6 mb-16 px-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-fuchsia-600/20 backdrop-blur-sm">
                                <MdPeople className="w-6 h-6 text-fuchsia-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Venues</h2>
                                <p className="text-sm text-zinc-400">{venues.length} venues</p>
                            </div>
                        </div>
                        <Link
                            href="/venues"
                            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {venues.slice(0, 8).map((venue: Venue) => (
                            <Link
                                href={`/venue/${venue.id}`}
                                key={venue.id}
                                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-fuchsia-600/10 transition-all duration-300"
                            >
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={venue.profileImage}
                                        alt={venue.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                                            {venue.name}
                                        </h3>
                                        {venue.isVerified && (
                                            <div className="p-1 rounded-full bg-fuchsia-600/20 backdrop-blur-sm">
                                                <MdVerified className="w-4 h-4 text-fuchsia-400" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-300 mb-2">{venue.type}</p>
                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                        <MdLocationOn className="w-4 h-4" />
                                        {venue.location}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 