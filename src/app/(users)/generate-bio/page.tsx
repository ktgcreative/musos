'use client';

import { useState } from 'react';
import { MdAutoAwesome, MdPerson, MdMusicNote, MdTheaters, MdQuestionAnswer, MdAnalytics } from 'react-icons/md';

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
    collaboration_potential: string[];
    reason: string;
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
                                <div>
                                    <label htmlFor="venues" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Venues Frequently Played
                                    </label>
                                    <textarea
                                        name="venues"
                                        id="venues"
                                        value={formData.venues}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="List major venues you've performed at"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="achievements" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Notable Achievements
                                    </label>
                                    <textarea
                                        name="achievements"
                                        id="achievements"
                                        value={formData.achievements}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Awards, collaborations, or significant milestones"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="notablePerformances" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Notable Performances
                                    </label>
                                    <textarea
                                        name="notablePerformances"
                                        id="notablePerformances"
                                        value={formData.notablePerformances}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Significant shows, festivals, or events you've performed at"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="influences" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Musical Influences
                                    </label>
                                    <input
                                        type="text"
                                        name="influences"
                                        id="influences"
                                        value={formData.influences}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Artists who have influenced your style"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="socialMedia" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Social Media Presence
                                    </label>
                                    <input
                                        type="text"
                                        name="socialMedia"
                                        id="socialMedia"
                                        value={formData.socialMedia}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Instagram, TikTok, YouTube handles"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="education" className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Musical Education
                                    </label>
                                    <input
                                        type="text"
                                        name="education"
                                        id="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder="Formal training, certifications, or self-taught experience"
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
                                                <h3 className="text-violet-400 font-medium mb-2">Unique Selling Points</h3>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {classification.unique_selling_points.map((point: string, index: number) => (
                                                        <li key={index} className="text-[#b3b3b3]">{point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                                <h3 className="text-violet-400 font-medium mb-2">Development Areas</h3>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {classification.development_areas.map((area: string, index: number) => (
                                                        <li key={index} className="text-[#b3b3b3]">{area}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-[#1a1a1a] rounded-lg">
                                            <h3 className="text-violet-400 font-medium mb-2">Target Audience</h3>
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
                                            <h3 className="text-violet-400 font-medium mb-2">Collaboration Potential</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {classification.collaboration_potential.map((collab: string, index: number) => (
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
                                            <h3 className="text-violet-400 font-medium mb-2">Analysis Summary</h3>
                                            <p className="text-[#b3b3b3] leading-relaxed">{classification.reason}</p>
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