"use client";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { animate, stagger, useInView } from "framer-motion";
import { SiSpotify, SiSoundcloud, SiYoutube } from "react-icons/si";
import { MdAutoAwesome, MdPerson, MdCategory, MdTrendingUp, MdStars, MdMusicNote, MdGroup, MdTimeline } from 'react-icons/md';

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const SVGDataURI =
    "data:image/svg+xml;base64,IDxzdmcKICAgICAgd2lkdGg9IjQyMSIKICAgICAgaGVpZ2h0PSI4NTIiCiAgICAgIHZpZXdCb3g9IjAgMCA0MjEgODUyIgogICAgICBmaWxsPSJub25lIgogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICA+CiAgICAgIDxwYXRoCiAgICAgICAgZmlsbC1ydWxlPSJldmVub2RkIgogICAgICAgIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgICAgICBkPSJNNzMgMEgzNDhDMzg2LjY2IDAgNDE4IDMxLjM0MDEgNDE4IDcwVjc4MkM0MTggODIwLjY2IDM4Ni42NiA4NTIgMzQ4IDg1Mkg3M0MzNC4zNDAxIDg1MiAzIDgyMC42NiAzIDc4MlY3MEMzIDMxLjM0MDEgMzQuMzQwMSAwIDczIDBaTTM0OCA2SDczQzM3LjY1MzggNiA5IDM0LjY1MzggOSA3MFY3ODJDOSA4MTcuMzQ2IDM3LjY1MzggODQ2IDczIDg0NkgzNDhDMzgzLjM0NiA4NDYgNDEyIDgxNy4zNDYgNDEyIDc4MlY3MEM0MTIgMzQuNjUzOCAzODMuMzQ2IDYgMzQ4IDZaIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjMxOCIKICAgICAgICB3aWR0aD0iMTAiCiAgICAgICAgaGVpZ2h0PSI2IgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4yIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjkzIgogICAgICAgIHk9Ijg0NiIKICAgICAgICB3aWR0aD0iMTAiCiAgICAgICAgaGVpZ2h0PSI2IgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4yIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjMiCiAgICAgICAgeT0iOTAiCiAgICAgICAgd2lkdGg9IjYiCiAgICAgICAgaGVpZ2h0PSIxMCIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgICBmaWxsLW9wYWNpdHk9IjAuMiIKICAgICAgLz4KICAgICAgPHJlY3QKICAgICAgICB4PSI0MTIiCiAgICAgICAgeT0iOTAiCiAgICAgICAgd2lkdGg9IjYiCiAgICAgICAgaGVpZ2h0PSIxMCIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgICBmaWxsLW9wYWNpdHk9IjAuMiIKICAgICAgLz4KICAgICAgPHJlY3QKICAgICAgICB4PSIzIgogICAgICAgIHk9Ijc1MiIKICAgICAgICB3aWR0aD0iNiIKICAgICAgICBoZWlnaHQ9IjEwIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4yIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjQxMiIKICAgICAgICB5PSI3NTIiCiAgICAgICAgd2lkdGg9IjYiCiAgICAgICAgaGVpZ2h0PSIxMCIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgICBmaWxsLW9wYWNpdHk9IjAuMiIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik00MTcuOTcxIDI2Nkg0MTguOTgxQzQyMC4wOTYgMjY2IDQyMSAyNjYuODk1IDQyMSAyNjhWMzY0QzQyMSAzNjUuMTA1IDQyMC4wOTYgMzY2IDQxOC45ODEgMzY2SDQxNy45NzFWMjY2WiIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik0wIDMwMkMwIDMwMC44OTUgMC45MDQwMiAzMDAgMi4wMTkxOCAzMDBIMi4wMTkxOEMwLjkwNDAyIDM2MyAwIDM2Mi4xMDUgMCAzNjFWMzAyWiIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik0wIDIyM0MwIDIyMS44OTUgMC45MDQwMiAyMjEgMi4wMTkxOCAyMjFIMi4wMTkxOEMwLjkwNDAyIDI4NCAwIDI4My4xMDUgMCAyODJWMjIzWiIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik0wIDE2MkMwIDE2MC44OTUgMC45MDQwMiAxNjAgMi4wMTkxOCAxNjBIMi4wMTkxOEMwLjkwNDAyIDE5MyAwIDE5Mi4xMDUgMCAxOTFWMTYyWiIKICAgICAgICBmaWxsPSJibGFjayIKICAgICAgLz4KICAgICAgPHJlY3QKICAgICAgICB4PSIxNTAiCiAgICAgICAgeT0iMzAiCiAgICAgICAgd2lkdGg9IjEyMCIKICAgICAgICBoZWlnaHQ9IjM1IgogICAgICAgIHJ4PSIxNy41IgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjI0NCIKICAgICAgICB5PSI0MSIKICAgICAgICB3aWR0aD0iMTMiCiAgICAgICAgaGVpZ2h0PSIxMyIKICAgICAgICByeD0iNi41IgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4xIgogICAgICAvPgogICAgPC9zdmc+";

export function PlayfulHeroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <div ref={ref} className="relative min-h-screen pt-10 w-full">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />
            </div>

            <div className="relative z-10 grid min-h-screen grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-8xl mx-auto px-4 md:px-12 pt-8 md:pt-12 pb-8 md:pb-12 items-center">
                <div className="lg:col-span-2 py-8 md:py-12 px-4 md:px-12">
                    <RoughNotationGroup show={isInView}>
                        <h2
                            className={cn(
                                "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-center sm:text-left drop-shadow-lg",
                                manrope.className
                            )}
                        >
                            From the Studio to the Stage:{" "}
                            <RoughNotation
                                type="highlight"
                                animationDuration={2500}
                                iterations={3}
                                color="rgba(139, 92, 246, 0.4)"
                                multiline
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
                                    Your Next Big Opportunity
                                </span>
                            </RoughNotation>{" "}
                            Awaits
                        </h2>
                        <p className="text-zinc-200 text-lg md:text-xl max-w-3xl mt-8 md:mt-12 text-center sm:text-left leading-relaxed">
                            Showcase Your Talent: Create stunning profiles that put your artistry in the spotlight.{" "}
                            <RoughNotation
                                type="underline"
                                animationDuration={2500}
                                iterations={3}
                                color="#8b5cf6"
                            >
                                Highlight your achievements
                            </RoughNotation>{" "}
                            with professional stats, feature your best tracks, and seamlessly integrate your social links. Stand out to venue owners and captivate your fans with a sleek, modern profile that's as impressive as your sound.
                        </p>
                    </RoughNotationGroup>
                    <div className="flex sm:flex-row flex-col gap-4 md:gap-6 items-center mt-8 md:mt-12 [perspective:800px]">
                        <button className="px-8 md:px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 w-full sm:w-auto font-bold text-white text-lg md:text-xl hover:scale-110 transition-transform shadow-lg">
                            Get the App
                        </button>
                        <button className="text-zinc-200 hover:text-white border-purple-500 border px-8 md:px-10 py-4 rounded-full text-lg md:text-xl w-full sm:w-auto transition-colors duration-200">
                            Watch Demo
                        </button>
                    </div>

                    <div className="mt-16 md:mt-24 animate-fade-in-up delay-500">
                        <p className="text-sm md:text-base font-semibold text-zinc-400 mb-6">
                            INSTANTLY SYNC YOUR MUSIC FROM
                        </p>
                        <div className="flex flex-wrap gap-6 md:gap-10 items-center">
                            <div className="flex items-center gap-3 text-zinc-300 hover:text-green-400 transition-colors">
                                <SiSpotify className="w-8 h-8 md:w-10 md:h-10" />
                                <span className="text-base md:text-lg font-medium">Spotify</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300 hover:text-orange-400 transition-colors">
                                <SiSoundcloud className="w-8 h-8 md:w-10 md:h-10" />
                                <span className="text-base md:text-lg font-medium">SoundCloud</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300 hover:text-red-400 transition-colors">
                                <SiYoutube className="w-8 h-8 md:w-10 md:h-10" />
                                <span className="text-base md:text-lg font-medium">YouTube</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center sm:justify-end h-[600px] md:h-[747px] w-full relative flex-shrink-0 mt-8 sm:mt-0">
                    <Skeleton />
                </div>
            </div>
        </div>
    );
}

export const Skeleton = () => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    useEffect(() => {
        const sequence = [
            [
                ".ai-cards .card",
                {
                    opacity: [0, 1],
                    scale: [0.95, 1],
                },
                { duration: 0.8, ease: "easeOut", delay: stagger(0.2) },
            ],
        ];

        //@ts-expect-error - Framer Motion types are not fully compatible
        if (isInView) animate(sequence);
    }, [isInView]);

    return (
        <div ref={ref} className="relative w-[280px] md:w-[350px] h-full m-auto">
            <div
                style={{
                    backgroundImage: `url('${SVGDataURI}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className="absolute inset-0 mx-auto w-full h-full dark:filter dark:invert"
            />
            <div className="px-6 mt-20 flex flex-col gap-4 relative z-20">
                <div className="ai-cards grid grid-cols-2 gap-3">
                    {/* Career Stage */}
                    <div className="card opacity-0 col-span-2 p-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <MdTimeline className="w-4 h-4 text-violet-400" />
                                <span className="text-xs text-violet-300">Career Stage</span>
                            </div>
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white">Rising Star</span>
                        </div>
                        <div className="mt-2 flex gap-1">
                            <div className="h-1 flex-1 bg-violet-500 rounded-full" />
                            <div className="h-1 flex-1 bg-violet-500 rounded-full" />
                            <div className="h-1 flex-1 bg-violet-500 rounded-full" />
                            <div className="h-1 flex-1 bg-violet-900/50 rounded-full" />
                            <div className="h-1 flex-1 bg-violet-900/50 rounded-full" />
                        </div>
                    </div>

                    {/* Genre Analysis */}
                    <div className="card opacity-0 p-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <MdMusicNote className="w-4 h-4 text-violet-400" />
                            <span className="text-xs text-violet-300">Genre Mix</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white">Electronic 70%</span>
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white">Pop 30%</span>
                        </div>
                    </div>

                    {/* Market Trend */}
                    <div className="card opacity-0 p-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <MdTrendingUp className="w-4 h-4 text-violet-400" />
                            <span className="text-xs text-violet-300">Trend</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-violet-900/50 rounded-full overflow-hidden">
                                <div className="h-full w-4/5 bg-violet-500 rounded-full" />
                            </div>
                            <span className="text-[10px] text-white">80%</span>
                        </div>
                    </div>

                    {/* Audience Reach */}
                    <div className="card opacity-0 col-span-2 p-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <MdGroup className="w-4 h-4 text-violet-400" />
                            <span className="text-xs text-violet-300">Audience</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white text-center">18-24</span>
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white text-center">Urban</span>
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white text-center">Digital</span>
                        </div>
                    </div>

                    {/* Performance Style */}
                    <div className="card opacity-0 p-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <MdStars className="w-4 h-4 text-violet-400" />
                            <span className="text-xs text-violet-300">Style</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] px-2 py-1 bg-violet-500/30 rounded-full text-white">High Energy</span>
                        </div>
                    </div>

                    {/* Brand Strength */}
                    <div className="card opacity-0 p-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <MdAutoAwesome className="w-4 h-4 text-violet-400" />
                            <span className="text-xs text-violet-300">Brand</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 flex-1 rounded-full ${i <= 3 ? 'bg-violet-500' : 'bg-violet-900/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MobileMockup = ({ className }: { className?: string }) => {
    return (
        <svg
            width="421"
            height="852"
            viewBox="0 0 421 852"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
                "text-neutral-900 dark:text-neutral-50 h-full w-full  mx-auto flex-shrink-0 absolute inset-0 object-cover object-top",
                className
            )}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M73 0H348C386.66 0 418 31.3401 418 70V782C418 820.66 386.66 852 348 852H73C34.3401 852 3 820.66 3 782V70C3 31.3401 34.3401 0 73 0ZM348 6H73C37.6538 6 9 34.6538 9 70V782C9 817.346 37.6538 846 73 846H348C383.346 846 412 817.346 412 782V70C412 34.6538 383.346 6 348 6Z"
                fill="currentColor"
            />
            <rect
                x="318"
                width="10"
                height="6"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <rect
                x="93"
                y="846"
                width="10"
                height="6"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <rect
                x="3"
                y="90"
                width="6"
                height="10"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <rect
                x="412"
                y="90"
                width="6"
                height="10"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <rect
                x="3"
                y="752"
                width="6"
                height="10"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <rect
                x="412"
                y="752"
                width="6"
                height="10"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M417.971 266H418.981C420.096 266 421 266.895 421 268V364C421 365.105 420.096 366 418.981 366H417.971V266Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 302C0 300.895 0.90402 300 2.01918 300H3.02878V363H2.01918C0.90402 363 0 362.105 0 361V302Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 223C0 221.895 0.90402 221 2.01918 221H3.02878V284H2.01918C0.90402 284 0 283.105 0 282V223Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 162C0 160.895 0.90402 160 2.01918 160H3.02878V193H2.01918C0.90402 193 0 192.105 0 191V162Z"
                fill="currentColor"
            />
            <rect
                x="150"
                y="30"
                width="120"
                height="35"
                rx="17.5"
                fill="currentColor"
            />
            <rect
                x="244"
                y="41"
                width="13"
                height="13"
                rx="6.5"
                fill="currentColor"
                fillOpacity="0.1"
            />
        </svg>
    );
};
