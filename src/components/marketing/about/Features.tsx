import Image from 'next/image';

export default function Features() {
    return (
        <div className="relative bg-black py-24 sm:py-32 overflow-hidden">
            {/* Background Effects - matching AboutHero */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />

            <div className="relative z-10 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-base/7 font-semibold text-violet-400">Why Choose Us</h2>
                <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Everything you need to elevate your music career
                </p>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                    {/* Artist Growth */}
                    <div className="relative lg:col-span-3 group">
                        <div className="absolute inset-px rounded-lg bg-zinc-900/50 backdrop-blur-sm max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    alt="Artist performing on stage"
                                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80"
                                    fill
                                    className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-10 pt-4">
                                <h3 className="text-sm/4 font-semibold text-violet-400">Artist Growth</h3>
                                <p className="mt-2 text-lg font-medium tracking-tight text-white">Build Your Fanbase</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400">
                                    Advanced analytics and insights help you understand your audience and grow your reach effectively.
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg shadow-violet-500/10 ring-1 ring-white/10 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                    </div>

                    {/* Venue Matching */}
                    <div className="relative lg:col-span-3 group">
                        <div className="absolute inset-px rounded-lg bg-zinc-900/50 backdrop-blur-sm lg:rounded-tr-[2rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    alt="Premium venue interior"
                                    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&auto=format&fit=crop&q=80"
                                    fill
                                    className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-10 pt-4">
                                <h3 className="text-sm/4 font-semibold text-violet-400">Venue Matching</h3>
                                <p className="mt-2 text-lg font-medium tracking-tight text-white">Perfect Stage, Every Time</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400">
                                    AI-powered matching connects you with venues that align with your style and audience size.
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg shadow-violet-500/10 ring-1 ring-white/10 lg:rounded-tr-[2rem]" />
                    </div>

                    {/* Revenue Management */}
                    <div className="relative lg:col-span-2 group">
                        <div className="absolute inset-px rounded-lg bg-zinc-900/50 backdrop-blur-sm lg:rounded-bl-[2rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    alt="Financial dashboard"
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
                                    fill
                                    className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-10 pt-4">
                                <h3 className="text-sm/4 font-semibold text-violet-400">Revenue</h3>
                                <p className="mt-2 text-lg font-medium tracking-tight text-white">Maximize Your Earnings</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400">
                                    Streamlined booking and payment systems to manage your music business efficiently.
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg shadow-violet-500/10 ring-1 ring-white/10 lg:rounded-bl-[2rem]" />
                    </div>

                    {/* Profile Builder */}
                    <div className="relative lg:col-span-2 group">
                        <div className="absolute inset-px rounded-lg bg-zinc-900/50 backdrop-blur-sm" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    alt="Artist profile interface"
                                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80"
                                    fill
                                    className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-10 pt-4">
                                <h3 className="text-sm/4 font-semibold text-violet-400">Profile Builder</h3>
                                <p className="mt-2 text-lg font-medium tracking-tight text-white">Stand Out</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400">
                                    Create stunning EPKs that get you noticed by top venues and promoters.
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg shadow-violet-500/10 ring-1 ring-white/10" />
                    </div>

                    {/* Analytics */}
                    <div className="relative lg:col-span-2 group">
                        <div className="absolute inset-px rounded-lg bg-zinc-900/50 backdrop-blur-sm max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    alt="Analytics dashboard"
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
                                    fill
                                    className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-10 pt-4">
                                <h3 className="text-sm/4 font-semibold text-violet-400">Analytics</h3>
                                <p className="mt-2 text-lg font-medium tracking-tight text-white">Data-Driven Success</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400">
                                    Deep insights into your performance metrics and audience engagement.
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg shadow-violet-500/10 ring-1 ring-white/10 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                    </div>
                </div>
            </div>
        </div>
    );
} 