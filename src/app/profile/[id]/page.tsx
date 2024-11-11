'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram, FaHeart, FaPlay } from 'react-icons/fa';
import { MdVerified, MdTrendingUp, MdLocationOn, MdEdit } from 'react-icons/md';
import { PiWaveform } from 'react-icons/pi';
import type { Musician } from '@/app/api/musicians/route';
import LoadingProfile from './loading';
;

// Image components with loading states
const CoverImage = ({ src, alt }: { src: string; alt: string }) => (
    <Suspense fallback={<div className="absolute inset-0 bg-[#242424] animate-pulse" />}>
        <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
    </Suspense>
);

const ProfileImage = ({ src, alt }: { src: string; alt: string }) => (
    <Suspense fallback={<div className="absolute inset-0 bg-[#242424] animate-pulse" />}>
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
        />
    </Suspense>
);

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

    useEffect(() => {
        const fetchMusician = async () => {
            try {
                const response = await fetch(`/api/musicians?id=${profileId}`);
                const data = await response.json();
                setMusician(data);
            } catch (error) {
                console.error('Error fetching musician:', error);
            }
        };

        if (profileId) {
            fetchMusician();
        }
    }, [profileId]);

    if (!musician) {
        return <LoadingProfile />;
    }

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header/Hero Section */}
                <div className="relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden group">
                    <CoverImage src={musician.coverImage} alt="Cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="flex items-end gap-6">
                            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-[#1c1c1c]">
                                <ProfileImage src={musician.profileImage} alt={musician.name} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-white">{musician.name}</h1>
                                    {musician.isVerified && (
                                        <MdVerified className="w-6 h-6 text-violet-400" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-[#b3b3b3] mb-4">
                                    <MdLocationOn className="w-5 h-5" />
                                    <span>{musician.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{musician.genre}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        href={`/edit-profile/${musician.id}`}
                                        className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-full flex items-center gap-2 transition-all hover:scale-105"
                                    >
                                        <MdEdit className="w-4 h-4" />
                                        Edit Profile
                                    </Link>
                                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all">
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Cards - Full Width Row */}
                    <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Monthly Listeners</h3>
                            <MdTrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{musician.stats.monthlyListeners}</p>
                        <p className="text-sm text-green-400">+12.3% this month</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Followers</h3>
                            <FaHeart className="w-5 h-5 text-pink-400" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{musician.stats.followers}</p>
                        <p className="text-sm text-pink-400">+856 this week</p>
                    </div>

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

                    {/* Featured Tracks and Connect Section - Side by Side */}
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

                    {/* Connect Section - 2x2 Grid */}
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