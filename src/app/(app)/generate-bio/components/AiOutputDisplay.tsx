import React from 'react';
import {
    MdAutoAwesome, MdStar, MdTheaters, MdAlbum, MdAnalytics,
    MdLibraryBooks, MdMessage, MdPeople, MdPerson, MdQuestionAnswer,
    MdSummarize, MdBrush, MdTrendingUp
} from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import { LinkPreview } from '@/components/ui/LinkPreview';
import { Classification } from '../types';

interface AiOutputDisplayProps {
    bio: string;
    searchPrompt: string;
    detailedPrompt: string;
    classification: Classification | null;
    citations: string[];
    relatedQuestions: string[];
}

const BentoGridItem = ({ children, className = '', colSpan = '', rowSpan = '' }: {
    children: React.ReactNode;
    className?: string;
    colSpan?: string;
    rowSpan?: string;
}) => (
    <div className={`
        p-6 bg-[#2a2a2a]/70 backdrop-blur-sm rounded-xl border border-white/10
        transition-all duration-300 ease-in-out hover:scale-[1.02]
        hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]
        ${colSpan} ${rowSpan} ${className}
    `}>
        {children}
    </div>
);

export function AiOutputDisplay({
    bio,
    searchPrompt,
    detailedPrompt,
    classification,
    citations,
    relatedQuestions
}: AiOutputDisplayProps) {
    if (!bio) return null;

    return (
        <div className="mt-8">
            <div className="relative">
                {/* Cyberpunk background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e1e31_1px,transparent_1px)] opacity-50 [background-size:16px_16px]" />
                <div className="absolute inset-0">
                    <div className="absolute left-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-violet-500/0 via-violet-500/50 to-violet-500/0" />
                    <div className="absolute right-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500/50 to-fuchsia-500/0" />
                </div>

                {/* Main grid container */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Prompt Information */}
                    <BentoGridItem colSpan="md:col-span-3" className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
                        <div className="space-y-3">
                            <p className="text-[#b3b3b3] font-mono text-sm">
                                Search prompt: {searchPrompt}
                            </p>
                            <pre className="text-[#b3b3b3] font-mono text-sm whitespace-pre-wrap">
                                {detailedPrompt}
                            </pre>
                        </div>
                    </BentoGridItem>

                    {/* Generated Biography */}
                    <BentoGridItem colSpan="md:col-span-3" >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <MdAutoAwesome className="w-5 h-5 text-violet-400" />
                            Generated Biography
                        </h2>
                        <div className="prose prose-invert prose-violet max-w-none">
                            <ReactMarkdown>{bio}</ReactMarkdown>
                        </div>
                    </BentoGridItem>

                    {classification && (
                        <>
                            {/* Artist Overview */}
                            <BentoGridItem colSpan="md:col-span-2">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <MdAnalytics className="w-5 h-5 text-violet-400" />
                                    Artist Overview
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <h3 className="text-violet-400 font-medium mb-2">Classification</h3>
                                        <p className="text-white capitalize">{classification.classification}</p>
                                    </div>
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <h3 className="text-violet-400 font-medium mb-2">Career Stage</h3>
                                        <p className="text-white capitalize">
                                            {classification.career_stage.replace(/_/g, ' ')}
                                        </p>
                                    </div>
                                </div>
                            </BentoGridItem>

                            {/* Key Strengths */}
                            <BentoGridItem>
                                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                    <MdStar className="w-4 h-4" />
                                    Key Strengths
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {classification.key_strengths.map((strength, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
                                        >
                                            {strength.replace(/_/g, ' ')}
                                        </span>
                                    ))}
                                </div>
                            </BentoGridItem>

                            {/* Market Position */}
                            <BentoGridItem colSpan="md:col-span-2">
                                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                                    <MdTrendingUp className="w-4 h-4" />
                                    Market Position
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <p className="text-white">
                                            Local Scene: <span className="capitalize">{classification.market_position.local_scene}</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <p className="text-white">
                                            Broader Market: <span className="capitalize">{classification.market_position.broader_market}</span>
                                        </p>
                                    </div>
                                </div>
                            </BentoGridItem>


                            {/* Brand Identity */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-4 flex items-center gap-2">
                                    <MdBrush className="w-4 h-4" />
                                    Brand Identity
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <h4 className="text-sm text-violet-400 mb-2 flex items-center gap-2">
                                            <MdAutoAwesome className="w-3 h-3" />
                                            Visual Aesthetic
                                        </h4>
                                        <p className="text-white text-sm leading-relaxed">
                                            {classification.brand_identity.visual_aesthetic}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <h4 className="text-sm text-violet-400 mb-2 flex items-center gap-2">
                                            <MdMessage className="w-3 h-3" />
                                            Core Message
                                        </h4>
                                        <p className="text-white text-sm leading-relaxed">
                                            {classification.brand_identity.core_message}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                                        <h4 className="text-sm text-violet-400 mb-2 flex items-center gap-2">
                                            <MdPeople className="w-3 h-3" />
                                            Audience Connection
                                        </h4>
                                        <span className={`inline-block px-3 py-1.5 rounded-full text-sm ${classification.brand_identity.audience_connection === 'exceptional' ? 'bg-green-500/20 text-green-300 border border-green-500/20' :
                                            classification.brand_identity.audience_connection === 'strong' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/20' :
                                                classification.brand_identity.audience_connection === 'developing' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/20' :
                                                    'bg-gray-500/20 text-gray-300 border border-gray-500/20'
                                            }`}>
                                            {classification.brand_identity.audience_connection}
                                        </span>
                                    </div>
                                </div>
                            </BentoGridItem>

                            {/* Market Trends */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-4 flex items-center gap-2">
                                    <MdTrendingUp className="w-4 h-4" />
                                    Market Trends
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {classification.market_trends.map((trend, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-white/5"
                                        >
                                            <span className="text-white text-sm">{trend.trend}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${trend.relevance === 'high' ? 'bg-green-500/20 text-green-300 border border-green-500/20' :
                                                trend.relevance === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/20' :
                                                    'bg-red-500/20 text-red-300 border border-red-500/20'
                                                }`}>
                                                {trend.relevance}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </BentoGridItem>

                            {/* Known Songs */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-4 flex items-center gap-2">
                                    <MdAlbum className="w-4 h-4" />
                                    Known Songs
                                </h3>
                                <div className="space-y-2">
                                    {classification.known_songs.map((song, index) => (
                                        <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg border border-white/5">
                                            <span className="text-white">{song.title}</span>
                                            <div className="flex items-center gap-2 mt-1 text-sm">
                                                <span className="text-[#b3b3b3]">{song.year}</span>
                                                <span className="text-violet-400">•</span>
                                                <span className="text-[#b3b3b3] capitalize">{song.popularity.replace(/_/g, ' ')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </BentoGridItem>

                            {/* Target Audience */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                    <TbTargetArrow className="w-4 h-4" />
                                    Target Audience
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {classification.target_audience.map((audience, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-full text-sm"
                                        >
                                            {audience}
                                        </span>
                                    ))}
                                </div>
                            </BentoGridItem>

                            {/* Performance Style */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                                    <MdTheaters className="w-4 h-4" />
                                    Performance Style
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {classification.performance_style.map((style, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 
                                            border border-fuchsia-500/20 text-fuchsia-300 rounded-full text-sm
                                            hover:scale-105 transition-transform cursor-default"
                                        >
                                            {style}
                                        </span>
                                    ))}
                                </div>
                            </BentoGridItem>

                            {/* Profile Tags */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                                    <MdPerson className="w-4 h-4" />
                                    Profile Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {classification.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                                            border border-violet-500/20 text-violet-300 rounded-full text-sm 
                                            hover:scale-105 transition-transform cursor-default"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </BentoGridItem>

                            {/* Unique Selling Points */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                    <MdStar className="w-4 h-4" />
                                    Unique Selling Points
                                </h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {classification.unique_selling_points.map((point, index) => (
                                        <li key={index} className="text-[#b3b3b3]">{point}</li>
                                    ))}
                                </ul>
                            </BentoGridItem>




                            {/* Analysis Summary */}
                            <BentoGridItem colSpan="md:col-span-3">
                                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                    <MdSummarize className="w-4 h-4" />
                                    Analysis Summary
                                </h3>
                                <p className="text-[#b3b3b3] leading-relaxed">{classification.reason}</p>
                            </BentoGridItem>
                        </>
                    )}

                    {/* Citations */}
                    {citations.length > 0 && (
                        <BentoGridItem colSpan="md:col-span-3">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <MdLibraryBooks className="w-5 h-5 text-violet-400" />
                                Citations
                            </h2>
                            <ul className="space-y-8">
                                {citations.map((citation, index) => {
                                    const urlMatch = citation.match(/https?:\/\/[^\s]+/);
                                    const url = urlMatch ? urlMatch[0] : null;
                                    const isYouTube = url?.includes('youtube.com') || url?.includes('youtu.be');
                                    const citationText = citation.replace(url || '', '').trim();

                                    return (
                                        <li key={index} className="text-neutral-400 text-xl leading-relaxed">
                                            {citationText && (
                                                <span className="block mb-3">{citationText}</span>
                                            )}
                                            {url && (
                                                <LinkPreview
                                                    url={url}
                                                    className="font-medium text-violet-400 hover:text-violet-300 transition-colors inline-flex items-center gap-2"
                                                    width={isYouTube ? 480 : 320}
                                                    height={isYouTube ? 270 : 180}
                                                    quality={80}
                                                >
                                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                                        {url.replace(/^https?:\/\/(www\.)?/, '')}
                                                    </span>
                                                </LinkPreview>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </BentoGridItem>
                    )}

                    {/* Related Questions */}
                    {relatedQuestions.length > 0 && (
                        <BentoGridItem colSpan="md:col-span-3">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <MdQuestionAnswer className="w-5 h-5 text-violet-400" />
                                Related Questions
                            </h2>
                            <ul className="space-y-3">
                                {relatedQuestions.map((question, index) => (
                                    <li
                                        key={index}
                                        className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <span className="text-violet-400">•</span>
                                        {question}
                                    </li>
                                ))}
                            </ul>
                        </BentoGridItem>
                    )}
                </div>
            </div>
        </div>
    );
} 