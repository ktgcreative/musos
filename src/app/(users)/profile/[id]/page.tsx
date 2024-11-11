'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram, FaHeart, FaPlay } from 'react-icons/fa';
import { MdTrendingUp, MdArrowForward } from 'react-icons/md';
import { PiWaveform } from 'react-icons/pi';
import type { Musician } from '@/app/api/musicians/route';
import LoadingProfile from './loading';
import Hero from '@/components/shared/Hero';
import StatsCard from '@/components/shared/StatsCard';

const LatestReleaseImage = ({ src, alt }: { src: string; alt: string }) => (
    <Suspense fallback={<div className="absolute inset-0 bg-[#2a2a2a] animate-pulse" />}>
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
        />
    </Suspense>
);

export default function Profile() {
    const params = useParams();
    const profileId = params.id;
    const [musician, setMusician] = useState<Musician | null>(null);
    const [similarMusicians, setSimilarMusicians] = useState<Musician[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the requested musician
                const response = await fetch(`/api/musicians?id=${profileId}`);
                if (!response.ok) {
                    throw new Error('Musician not found');
                }
                const data = await response.json();
                setMusician(data);

                // If musician exists, fetch similar musicians
                if (data) {
                    const allMusiciansRes = await fetch('/api/musicians');
                    const allMusicians = await allMusiciansRes.json();
                    const similar = allMusicians
                        .filter((m: Musician) =>
                            m.id !== profileId &&
                            (m.genre === data.genre || m.location === data.location)
                        )
                        .slice(0, 3);
                    setSimilarMusicians(similar);
                }
            } catch (error) {
                console.error('Error fetching musician:', error);
                setError(true);
                // Fetch recommended musicians when profile is not found
                const allMusiciansRes = await fetch('/api/musicians');
                const allMusicians = await allMusiciansRes.json();
                const recommended = allMusicians
                    .filter((m: Musician) => m.id !== profileId)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6);
                setSimilarMusicians(recommended);
            } finally {
                setLoading(false);
            }
        };

        if (profileId) {
            fetchData();
        }
    }, [profileId]);

    if (loading) {
        return <LoadingProfile />;
    }

    if (error || !musician) {
        return (
            <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto text-center py-20">
                    <h1 className="text-4xl font-bold text-white mb-6">Profile Not Found</h1>
                    <p className="text-zinc-400 mb-12">
                        We couldn&apos;t find the musician you&apos;re looking for, but here are some other artists you might like:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similarMusicians.map((musician) => (
                            <Link
                                key={musician.id}
                                href={`/profile/${musician.id}`}
                                className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800/50 transition-all"
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={musician.profileImage}
                                        alt={musician.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                                        {musician.name}
                                    </h3>
                                    <p className="text-sm text-zinc-400">{musician.genre}</p>
                                    <p className="text-sm text-zinc-500">{musician.location}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link
                            href="/discover"
                            className="inline-flex items-center px-6 py-3 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all"
                        >
                            Discover More Artists
                            <MdArrowForward className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const heroActions = [
        {
            icon: <MdTrendingUp className="w-4 h-4" />,
            label: 'Edit Profile',
            href: `/edit-profile/${musician.id}`,
            primary: true
        },
        {
            icon: null,
            label: 'Share',
            onClick: () => {/* Handle share */ }
        }
    ];

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                <Hero
                    name={musician.name}
                    isVerified={musician.isVerified}
                    location={musician.location}
                    subtitle={musician.genre}
                    profileImage={musician.profileImage}
                    coverImage={musician.coverImage}
                    actions={heroActions}
                />

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Cards */}
                    <StatsCard
                        title="Monthly Listeners"
                        value={musician.stats.monthlyListeners}
                        subtext="+12.3% this month"
                        icon={<MdTrendingUp className="w-5 h-5 text-green-400" />}
                        gradientFrom="violet-600/20"
                        gradientTo="fuchsia-600/20"
                        subtextColor="text-green-400"
                    />

                    <StatsCard
                        title="Followers"
                        value={musician.stats.followers}
                        subtext="+856 this week"
                        icon={<FaHeart className="w-5 h-5 text-pink-400" />}
                        gradientFrom="pink-600/20"
                        gradientTo="purple-600/20"
                        subtextColor="text-pink-400"
                    />

                    {/* Latest Release Card */}
                    {musician.latestRelease ? (
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl overflow-hidden group h-[150px]">
                            <div className="relative h-full">
                                <LatestReleaseImage
                                    src={musician.latestRelease.coverImage}
                                    alt={musician.latestRelease.title}
                                />
                                <div className="absolute inset-0 p-6">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-medium text-violet-400">Latest Release</p>
                                            <button className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white hover:bg-violet-700 transition-colors">
                                                <FaPlay className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">
                                                {musician.latestRelease.title} {musician.latestRelease.type}
                                            </h3>
                                            <p className="text-sm text-[#b3b3b3]">
                                                Released: {musician.latestRelease.releaseDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 h-[150px]">
                            <div className="flex flex-col h-full justify-center items-center text-center">
                                <p className="text-sm font-medium text-violet-400 mb-2">No Release Yet</p>
                                <p className="text-sm text-[#b3b3b3]">
                                    Stay tuned for upcoming releases
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Featured Tracks */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px]">
                        <h3 className="text-xl font-bold text-white mb-4">Featured Tracks</h3>
                        <div className="space-y-3">
                            {musician.featuredTracks.map((track, index) => (
                                <div key={track.name}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                                >
                                    <span className="text-sm font-medium text-[#b3b3b3] w-6">{index + 1}</span>
                                    <PiWaveform className="w-6 h-6 text-violet-400" />
                                    <div className="flex-1">
                                        <h4 className="text-base font-medium text-white group-hover:text-violet-400 transition-colors">
                                            {track.name}
                                        </h4>
                                        <p className="text-sm text-[#b3b3b3]">{track.plays} plays</p>
                                    </div>
                                    <span className="text-sm text-[#b3b3b3]">{track.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px]">
                        <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                        <div className="grid grid-cols-2 gap-4 h-[calc(100%-60px)]">
                            {[
                                { name: 'Spotify', icon: FaSpotify, color: 'from-green-600/20 to-green-500/20', link: musician.socialLinks.spotify, followers: musician.socialLinks.followers.spotify },
                                { name: 'YouTube', icon: FaYoutube, color: 'from-red-600/20 to-red-500/20', link: musician.socialLinks.youtube, followers: musician.socialLinks.followers.youtube },
                                { name: 'SoundCloud', icon: FaSoundcloud, color: 'from-orange-600/20 to-orange-500/20', link: musician.socialLinks.soundcloud, followers: musician.socialLinks.followers.soundcloud },
                                { name: 'Instagram', icon: FaInstagram, color: 'from-pink-600/20 to-purple-600/20', link: musician.socialLinks.instagram, followers: musician.socialLinks.followers.instagram },
                            ].map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-4 bg-gradient-to-br ${platform.color} rounded-xl backdrop-blur-sm 
                                    border border-white/5 hover:border-white/10 transition-all hover:translate-y-[-2px]
                                    cursor-pointer flex flex-col justify-between`}
                                >
                                    <div className="flex items-center gap-2">
                                        <platform.icon className="w-5 h-5 text-white" />
                                        <span className="text-base font-medium text-white">{platform.name}</span>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-white mb-0.5">{platform.followers}</p>
                                        <p className="text-xs text-[#b3b3b3]">followers</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 