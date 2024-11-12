import Image from 'next/image';
import { MdTrendingUp } from 'react-icons/md';
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram, FaHeart, FaPlay } from 'react-icons/fa';
import { PiWaveform } from 'react-icons/pi';
import Hero from '@/components/shared/Hero';
import ErrorWithRecommended from '@/components/shared/ErrorWithRecommended';
import { Musician } from '@/app/api/musicians/route';

// Server-side data fetching
async function getMusician(id: string) {
    const res = await fetch(`http://localhost:3000/api/musicians?id=${id}`, {
        next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
        throw new Error('Failed to fetch musician data');
    }

    return res.json();
}

const LatestReleaseImage = ({ src, alt }: { src: string; alt: string }) => (
    <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
    />
);

export default async function Profile({ params }: { params: { id: string } }) {
    const musician = await getMusician(params.id);

    if (!musician) {
        return <ErrorWithRecommended />;
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
                    <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Monthly Listeners</h3>
                            <MdTrendingUp className="w-5 h-5 text-violet-400" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{musician.stats.monthlyListeners}</p>
                        <p className="text-sm text-violet-400">+12.3% this month</p>
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
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl overflow-hidden group h-[150px] border border-white/5">
                            <div className="relative h-full">
                                <LatestReleaseImage
                                    src={musician.latestRelease.coverImage}
                                    alt={musician.latestRelease.title}
                                />
                                <div className="absolute inset-0 p-6 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
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
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 h-[150px] border border-white/5">
                            <div className="flex flex-col h-full justify-center items-center text-center">
                                <p className="text-sm font-medium text-violet-400">No Release Yet</p>
                                <p className="text-sm text-[#b3b3b3]">
                                    Stay tuned for upcoming releases
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Featured Tracks */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px] border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-4">Featured Tracks</h3>
                        <div className="space-y-3">
                            {musician.featuredTracks.map((track: Musician['featuredTracks'][0], index: number) => (
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
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px] border border-white/5">
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
                                    cursor-pointer flex flex-col justify-between group`}
                                >
                                    <div className="flex items-center gap-2">
                                        <platform.icon className="w-5 h-5 text-white group-hover:text-violet-400 transition-colors" />
                                        <span className="text-base font-medium text-white group-hover:text-violet-400 transition-colors">{platform.name}</span>
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