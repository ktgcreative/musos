'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdVerified, MdLocationOn, MdPeople, MdMusicNote, MdSearch } from 'react-icons/md';
import type { Musician } from '@/app/api/musicians/route';
import type { Venue } from '@/app/api/venues/route';

export default function Discover() {
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [musiciansRes, venuesRes] = await Promise.all([
                    fetch('/api/musicians'),
                    fetch('/api/venues')
                ]);
                const musiciansData = await musiciansRes.json();
                const venuesData = await venuesRes.json();
                setMusicians(musiciansData);
                setVenues(venuesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredMusicians = musicians.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredVenues = venues.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-16 h-16 relative animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full animate-ping" />
                    <div className="absolute inset-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1 bg-black min-h-screen">
            {/* Background Effects */}
            <div className="fixed inset-0 ml-72 bg-gradient-to-br from-black via-black/95 to-transparent" />
            <div className="fixed inset-0 ml-72 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-white">Discover</h1>
                        <p className="text-zinc-400">Find your next performance opportunity</p>
                    </div>
                    <div className="relative w-full sm:w-96">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur group-hover:blur-md transition-all" />
                            <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-xl">
                                <input
                                    type="search"
                                    placeholder="Search musicians and venues..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 pl-12 bg-transparent text-white placeholder-zinc-400 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                                />
                                <MdSearch className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Musicians Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-violet-600/20 backdrop-blur-sm">
                                <MdMusicNote className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Musicians</h2>
                                <p className="text-sm text-zinc-400">{filteredMusicians.length} artists</p>
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
                        {filteredMusicians.slice(0, 8).map(musician => (
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
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-fuchsia-600/20 backdrop-blur-sm">
                                <MdPeople className="w-6 h-6 text-fuchsia-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Venues</h2>
                                <p className="text-sm text-zinc-400">{filteredVenues.length} venues</p>
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
                        {filteredVenues.slice(0, 8).map(venue => (
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
        </main>
    );
} 