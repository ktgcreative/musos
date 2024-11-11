import Image from 'next/image';
import { MdStar } from 'react-icons/md';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Independent Artist',
            image: '/testimonials/sarah.jpg',
            quote: 'This platform has completely transformed how I connect with venues and manage my performances.',
            rating: 5
        },
        {
            name: 'The Blue Note',
            role: 'Jazz Club',
            image: '/testimonials/venue1.jpg',
            quote: "We have found amazing talent and increased our bookings significantly since joining.",
            rating: 5
        },
        {
            name: 'Mike Rivers',
            role: 'Band Manager',
            image: '/testimonials/mike.jpg',
            quote: 'The analytics and insights have helped us make better decisions for our tours.',
            rating: 5
        }
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Loved by Musicians and Venues
                    </h2>
                    <p className="text-[#b3b3b3] max-w-2xl mx-auto">
                        Join thousands of satisfied users who are growing their music careers and venues with our platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                                    <p className="text-sm text-[#b3b3b3]">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <MdStar key={i} className="w-5 h-5 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-[#b3b3b3]">&quot;{testimonial.quote}&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 