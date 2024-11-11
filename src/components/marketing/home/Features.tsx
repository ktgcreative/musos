import { MdMusicNote, MdLocationOn, MdPeople, MdAnalytics } from 'react-icons/md';

export default function Features() {
    const features = [
        {
            icon: MdMusicNote,
            title: 'Smart Profile Builder',
            description: 'Create stunning EPKs and profiles that get you noticed by top venues and promoters.',
            gradient: 'from-violet-500 to-fuchsia-500'
        },
        {
            icon: MdLocationOn,
            title: 'Venue Matching',
            description: 'AI-powered venue recommendations based on your genre, audience size, and performance history.',
            gradient: 'from-blue-500 to-violet-500'
        },
        {
            icon: MdPeople,
            title: 'Audience Insights',
            description: 'Deep analytics on your fanbase growth, engagement metrics, and performance statistics.',
            gradient: 'from-fuchsia-500 to-pink-500'
        },
        {
            icon: MdAnalytics,
            title: 'Revenue Management',
            description: 'Streamlined booking, payments, and financial reporting all in one place.',
            gradient: 'from-rose-500 to-orange-500'
        }
    ];

    return (
        <section className="relative py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-20">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Professional tools for serious musicians
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        Everything you need to manage and grow your music career, backed by powerful analytics and industry insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -m-[1px] p-[1px]"
                                style={{ backgroundImage: `linear-gradient(to right, ${feature.gradient})` }}
                            />

                            <div className="relative h-full bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800/50 transition-colors">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-zinc-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 