import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';
import { SiSpotify, SiSoundcloud, SiYoutube } from 'react-icons/si';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center">
            {/* Premium background with overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/marketing/hero-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
                <div className="max-w-3xl">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white/90 backdrop-blur-sm mb-6 animate-fade-in">
                        Seamlessly connect all your music platforms
                    </span>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-in-up">
                        Your Music Career,{' '}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x">
                                Amplified
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x" />
                        </span>
                    </h1>

                    <p className="mt-8 text-xl text-zinc-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
                        Connect with premium venues, grow your audience, and take control of your music career with professional tools trusted by top artists.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up delay-300">
                        <Link
                            href="/signup"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:scale-105 transition-all group"
                        >
                            Start Free Trial
                            <MdArrowForward className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/demo"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 text-white font-bold backdrop-blur-sm hover:bg-white/20 transition-all"
                        >
                            Watch Demo
                        </Link>
                    </div>

                    {/* Platform integrations */}
                    <div className="mt-20 animate-fade-in-up delay-500">
                        <p className="text-sm font-medium text-zinc-500 mb-4">
                            INSTANTLY SYNC YOUR MUSIC FROM
                        </p>
                        <div className="flex flex-wrap gap-8 items-center">
                            <div className="flex items-center gap-2 text-zinc-400 hover:text-green-500 transition-colors">
                                <SiSpotify className="w-8 h-8" />
                                <span className="text-sm font-medium">Spotify</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors">
                                <SiSoundcloud className="w-8 h-8" />
                                <span className="text-sm font-medium">SoundCloud</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors">
                                <SiYoutube className="w-8 h-8" />
                                <span className="text-sm font-medium">YouTube</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 