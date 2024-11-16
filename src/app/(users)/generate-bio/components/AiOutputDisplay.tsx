import {
    MdAutoAwesome, MdStar, MdTheaters, MdHandshake, MdAlbum, MdAnalytics,
    MdLibraryBooks, MdMessage, MdPeople, MdPerson, MdQuestionAnswer,
    MdSummarize, MdWorkspaces, MdBrush, MdTrendingUp
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
        <div className="mt-8 space-y-6">
            <div className="p-4 bg-[#2a2a2a]/50 rounded-xl border border-white/10">
                <p className="text-[#b3b3b3] font-mono text-sm">
                    Search prompt: {searchPrompt}
                </p>
                <pre className="mt-2 text-[#b3b3b3] font-mono text-sm whitespace-pre-wrap">
                    {detailedPrompt}
                </pre>
            </div>

            <div className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MdAutoAwesome className="w-5 h-5 text-violet-400" />
                    Generated Biography
                </h2>
                <div className="prose prose-invert prose-violet max-w-none">
                    <ReactMarkdown>{bio}</ReactMarkdown>
                </div>
            </div>

            {citations.length > 0 && (
                <div className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10">
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
                                <li
                                    key={index}
                                    className="text-neutral-400 dark:text-neutral-300 text-xl md:text-2xl leading-relaxed"
                                >
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
                </div>
            )}

            {classification && (
                <div className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <MdAnalytics className="w-5 h-5 text-violet-400" />
                        Artist Analysis
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                <h3 className="text-violet-400 font-medium mb-2">Classification</h3>
                                <p className="text-white capitalize">{classification.classification}</p>
                            </div>
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                <h3 className="text-violet-400 font-medium mb-2">Career Stage</h3>
                                <p className="text-white capitalize">{classification.career_stage.replace(/_/g, ' ')}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                            <h3 className="text-violet-400 font-medium mb-2">Key Strengths</h3>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                <h3 className="text-violet-400 font-medium mb-2">Market Position</h3>
                                <div className="space-y-2">
                                    <p className="text-white">
                                        Local Scene: <span className="capitalize">{classification.market_position.local_scene}</span>
                                    </p>
                                    <p className="text-white">
                                        Broader Market: <span className="capitalize">{classification.market_position.broader_market}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                <h3 className="text-violet-400 font-medium mb-2">Commercial Potential</h3>
                                <p className="text-white capitalize">{classification.commercial_potential}</p>
                                <div className="mt-2">
                                    <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                                            style={{
                                                width: `${classification.genre_authenticity * 100}%`
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-[#b3b3b3] mt-1">
                                        Genre Authenticity: {Math.round(classification.genre_authenticity * 100)}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
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
                            </div>

                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
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
                            </div>
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                            <h3 className="text-violet-400 font-medium mb-4 flex items-center gap-2">
                                <MdBrush className="w-4 h-4" />
                                Brand Identity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-[#2a2a2a] rounded-lg border border-white/5">
                                    <h4 className="text-sm text-violet-400 mb-2 flex items-center gap-2">
                                        <MdAutoAwesome className="w-3 h-3" />
                                        Visual Aesthetic
                                    </h4>
                                    <p className="text-white text-sm leading-relaxed">
                                        {classification.brand_identity.visual_aesthetic}
                                    </p>
                                </div>
                                <div className="p-4 bg-[#2a2a2a] rounded-lg border border-white/5">
                                    <h4 className="text-sm text-violet-400 mb-2 flex items-center gap-2">
                                        <MdMessage className="w-3 h-3" />
                                        Core Message
                                    </h4>
                                    <p className="text-white text-sm leading-relaxed">
                                        {classification.brand_identity.core_message}
                                    </p>
                                </div>
                                <div className="p-4 bg-[#2a2a2a] rounded-lg border border-white/5">
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
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                            <h3 className="text-violet-400 font-medium mb-4 flex items-center gap-2">
                                <MdTrendingUp className="w-4 h-4" />
                                Market Trends
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {classification.market_trends.map((trend, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg border border-white/5"
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                    <MdStar className="w-4 h-4" />
                                    Unique Selling Points
                                </h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {classification.unique_selling_points.map((point, index) => (
                                        <li key={index} className="text-[#b3b3b3]">{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                    <MdWorkspaces className="w-4 h-4" />
                                    Development Areas
                                </h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {classification.development_areas.map((area, index) => (
                                        <li key={index} className="text-[#b3b3b3]">{area}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
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
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                            <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                <MdHandshake className="w-4 h-4" />
                                Collaboration Potential
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(classification.collaboration_potential) ?
                                    classification.collaboration_potential :
                                    [classification.collaboration_potential]
                                ).map((collab, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
                                    >
                                        {collab}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                            <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                <MdSummarize className="w-4 h-4" />
                                Analysis Summary
                            </h3>
                            <p className="text-[#b3b3b3] leading-relaxed">{classification.reason}</p>
                        </div>

                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                            <h3 className="text-violet-400 font-medium mb-2 flex items-center gap-2">
                                <MdAlbum className="w-4 h-4" />
                                Known Songs
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {classification.known_songs.map((song, index) => (
                                    <li key={index} className="text-[#b3b3b3]">
                                        {song.title} ({song.year}) - {song.popularity.replace(/_/g, ' ')}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {relatedQuestions.length > 0 && (
                <div className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10">
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
                </div>
            )}
        </div>
    );
} 