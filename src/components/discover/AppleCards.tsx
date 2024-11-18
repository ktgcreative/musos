"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { Musician } from '@/app/api/musicians/route';
import type { Venue } from '@/app/api/venues/route';

interface AppleCardsProps {
    musicians: Musician[];
    venues: Venue[];
}

export function AppleCardsCarouselDemo({ musicians, venues }: AppleCardsProps) {
    // Combine and shuffle musicians and venues into cards data
    const generateCardsData = () => {
        const musicianCards = musicians.slice(0, 3).map(musician => ({
            category: "Musician",
            title: musician.name,
            src: musician.profileImage,
            content: <DummyContent musician={musician} />,
        }));

        const venueCards = venues.slice(0, 3).map(venue => ({
            category: "Venue",
            title: venue.name,
            src: venue.profileImage,
            content: <DummyContent venue={venue} />,
        }));

        // Combine and shuffle
        const allCards = [...musicianCards, ...venueCards]
            .sort(() => Math.random() - 0.5);

        return allCards;
    };

    const cards = generateCardsData().map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full pb-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
                Discover Featured Artists & Venues
            </h2>
            <p className="max-w-7xl pl-4 mx-auto text-sm md:text-lg text-neutral-400 font-sans">
                Explore the latest and greatest in the music and venue scene.
            </p>
            <Carousel items={cards} />
        </div>
    );
}

interface DummyContentProps {
    musician?: Musician;
    venue?: Venue;
}

const DummyContent = ({ musician, venue }: DummyContentProps) => {
    if (musician) {
        return (
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl ">
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        {musician.name}
                    </span>{" "}
                    {musician.bio || "A talented musician ready to perform at your venue."}
                </p>
                <Image
                    src={musician.profileImage}
                    alt={musician.name}
                    height="500"
                    width="500"
                    className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-xl"
                />
            </div>
        );
    }

    if (venue) {
        return (
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl ">
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        {venue.name}
                    </span>{" "}
                    {venue.bio || "An amazing venue looking for talented musicians."}
                </p>
                <Image
                    src={venue.profileImage}
                    alt={venue.name}
                    height="500"
                    width="500"
                    className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-xl"
                />
            </div>
        );
    }

    return null;
};
