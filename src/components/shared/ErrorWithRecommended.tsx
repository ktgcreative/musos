'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';
import type { Musician } from '@/app/api/musicians/route';
import { useEffect, useState } from 'react';

interface ErrorWithRecommendedProps {
    title?: string;
    message?: string;
    onReset?: () => void;
}

export default function ErrorWithRecommended({
    title = "Profile Not Found",
    message = "We couldn't find the musician you're looking for, but here are some other artists you might like:",
    onReset
}: ErrorWithRecommendedProps) {
    const [similarMusicians, setSimilarMusicians] = useState<Musician[]>([]);

    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                const allMusiciansRes = await fetch('/api/musicians');
                const allMusicians = await allMusiciansRes.json();
                const recommended = allMusicians
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6);
                setSimilarMusicians(recommended);
            } catch (err) {
                console.error('Error fetching recommended musicians:', err);
            }
        };

        fetchRecommended();
    }, []);

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto text-center py-20">
                <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
                <p className="text-zinc-400 mb-12">
                    {message}
                </p>

                {onReset && (
                    <button
                        onClick={onReset}
                        className="mb-8 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                        Try again
                    </button>
                )}

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
