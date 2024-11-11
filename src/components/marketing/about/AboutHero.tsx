import Image from 'next/image';

export default function AboutHero() {
    return (
        <section className="relative min-h-[80vh] flex items-center">
            <div className="absolute inset-0">
                <Image
                    src="/marketing/about-hero.jpg"
                    alt="About Us"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
                <div className="max-w-3xl">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white/90 backdrop-blur-sm mb-6 animate-fade-in">
                        About Our Platform
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-in-up">
                        Empowering the Future of{' '}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x">
                                Music
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x" />
                        </span>
                    </h1>
                    <p className="mt-8 text-xl text-zinc-300 leading-relaxed animate-fade-in-up delay-200">
                        We&apos;re building the bridge between talented artists and world-class venues,
                        creating opportunities that shape the future of live music.
                    </p>
                </div>
            </div>
        </section>
    );
} 