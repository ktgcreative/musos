import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

const venueFeatures = [
    {
        title: 'Artist Growth',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        subtitle: 'Quality Talent',
        description: 'Connect with verified artists who match your venue\'s style and audience.'
    },
    {
        title: 'Venue Management',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
        subtitle: 'Streamlined Operations',
        description: 'Manage bookings, contracts, and payments all in one place.'
    },
    {
        title: 'Analytics',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        subtitle: 'Data-Driven Success',
        description: 'Get deep insights into performance metrics and audience engagement.'
    }
];

export default function VenueSignup() {
    return (
        <main className="flex-1">
            <div className="relative min-h-screen bg-black">
                {/* Hero Section */}
                <section className="relative pt-24 pb-32">
                    <div className="absolute inset-0">
                        <Image
                            src="/marketing/venue-hero.jpg"
                            alt="Venue"
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-16"
                        >
                            ← Back to home
                        </Link>

                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white/90 backdrop-blur-sm mb-6">
                                For Venue Owners
                            </span>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                                Partner with the best{' '}
                                <span className="relative">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x">
                                        artists
                                    </span>
                                </span>
                            </h1>
                            <p className="mt-8 text-xl text-zinc-300 leading-relaxed">
                                Join our network of premium venues and get matched with verified artists that perfectly fit your space. Streamline your booking process and grow your business.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    href="/venue/signup"
                                    className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:scale-105 transition-all group"
                                >
                                    Get Started
                                    <MdArrowForward className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 text-white font-bold backdrop-blur-sm hover:bg-white/20 transition-all"
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Features List */}

                {/* Features Grid Section - styled like Features component */}
                <div className="relative bg-black py-24 sm:py-32 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />

                    <div className="relative z-10 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                        <h2 className="text-base/7 font-semibold text-violet-400">Why Partner With Us</h2>
                        <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            Transform your venue management
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-3">
                            {venueFeatures.map((feature, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-px rounded-lg bg-zinc-900/50 backdrop-blur-sm" />
                                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                                        <div className="relative h-80 overflow-hidden">
                                            <Image
                                                alt={feature.title}
                                                src={feature.image}
                                                fill
                                                className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-10 pt-4">
                                            <h3 className="text-sm/4 font-semibold text-violet-400">{feature.title}</h3>
                                            <p className="mt-2 text-lg font-medium tracking-tight text-white">{feature.subtitle}</p>
                                            <p className="mt-2 max-w-lg text-sm/6 text-zinc-400">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg shadow-violet-500/10 ring-1 ring-white/10" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <section className="relative py-24">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to transform your venue?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                            Join the network of premium venues and start connecting with verified artists today.
                        </p>
                        <Link
                            href="/venue/signup"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:scale-105 transition-all group"
                        >
                            Get Started Now
                            <MdArrowForward className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
} 