'use client';

import { useState } from 'react';
import { MdAutoAwesome, MdPerson, MdMusicNote, MdTheaters, MdQuestionAnswer, MdAnalytics, MdTrendingUp, MdStar, MdHandshake, MdSummarize, MdAlbum, MdWorkspaces, MdBrush, MdMessage, MdPeople } from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';

interface Classification {
    classification: string;
    career_stage: string;
    key_strengths: string[];
    market_position: {
        local_scene: string;
        broader_market: string;
    };
    commercial_potential: string;
    genre_authenticity: number;
    unique_selling_points: string[];
    development_areas: string[];
    target_audience: string[];
    collaboration_potential: string;
    reason: string;
    known_songs: {
        title: string;
        year: string;
        popularity: 'underground' | 'local_hit' | 'regional_hit' | 'major_hit';
    }[];
    tags: string[];
    performance_style: string[];
    brand_identity: {
        visual_aesthetic: string;
        core_message: string;
        audience_connection: 'minimal' | 'developing' | 'strong' | 'exceptional';
    };
    market_trends: {
        trend: string;
        relevance: 'low' | 'medium' | 'high';
    }[];
}

export default function GenerateBioPage() {
    const [formData, setFormData] = useState({
        stageName: 'Happy The Singing Dog',
        realName: '',
        musicianName: '',
        genre: 'Busking, Acoustic,pop',
        instruments: 'Guitar, Singing Dog',
        location: 'Queenstown, New Zealand',
        venues: '',
        yearsActive: '10+',
        achievements: '',
        notablePerformances: '',
        socialMedia: '',
        influences: '',
        education: ''
    });
    const [bio, setBio] = useState('');
    const [searchPrompt, setSearchPrompt] = useState('');
    const [detailedPrompt, setDetailedPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
    const [classification, setClassification] = useState<Classification | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/generate-bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate bio');
            }

            setBio(data.bio);
            setSearchPrompt(data.searchPrompt);
            setDetailedPrompt(data.detailedPrompt);
            setRelatedQuestions(data.relatedQuestions || []);
            setClassification(data.classification);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 mb-8 border border-white/5">
                    <h1 className="text-4xl font-bold text-white mb-2">AI Bio Generator</h1>
                    <p className="text-[#b3b3b3]">Create a professional biography for your music profile with detailed information about your career</p>
                </div>

                <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <MdPerson className="w-5 h-5 text-violet-400" />
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="stageName" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Stage Name
                                    </label>
                                    <input
                                        type="text"
                                        name="stageName"
                                        id="stageName"
                                        required
                                        value={formData.stageName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Your stage name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="realName" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Real Name (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="realName"
                                        id="realName"
                                        value={formData.realName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Your real name (if you want to include it)"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Musical Background Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <MdMusicNote className="w-5 h-5 text-violet-400" />
                                Musical Background
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="genre" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Genre(s)
                                    </label>
                                    <input
                                        type="text"
                                        name="genre"
                                        id="genre"
                                        required
                                        value={formData.genre}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="e.g., Rock, Jazz, Classical"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="instruments" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Instruments
                                    </label>
                                    <input
                                        type="text"
                                        name="instruments"
                                        id="instruments"
                                        required
                                        value={formData.instruments}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="e.g., Guitar, Piano, Drums"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Career Information Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <MdTheaters className="w-5 h-5 text-violet-400" />
                                Career Information
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="e.g., Los Angeles, CA"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-600/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            <MdAutoAwesome className="w-5 h-5" />
                            {loading ? 'Generating...' : 'Generate Bio'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                            {error}
                        </div>
                    )}

                    {bio && (
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
                                <p className="text-[#b3b3b3] whitespace-pre-wrap leading-relaxed">
                                    {bio}
                                </p>
                            </div>

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
                                                {classification.key_strengths.map((strength: string, index: number) => (
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
                                                    {classification.unique_selling_points.map((point: string, index: number) => (
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
                                                    {classification.development_areas.map((area: string, index: number) => (
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
                                                {classification.target_audience.map((audience: string, index: number) => (
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
                                                {(typeof classification.collaboration_potential === 'string' ? [classification.collaboration_potential] : classification.collaboration_potential).map((collab: string, index: number) => (
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
                                                    <li key={index} className="text-[#b3b3b3]">{song.title} ({song.year}) - {song.popularity}</li>
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
                    )}
                </div>
            </div>
        </main>
    );
} 