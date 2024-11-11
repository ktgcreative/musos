'use client';

import { useState } from 'react';
import { MdAutoAwesome, MdPerson, MdMusicNote, MdTheaters, MdQuestionAnswer } from 'react-icons/md';

export default function GenerateBioPage() {
    const [formData, setFormData] = useState({
        stageName: '',
        realName: '',
        musicianName: '',
        genre: '',
        instruments: '',
        location: '',
        venues: '',
        yearsActive: '',
        achievements: ''
    });
    const [bio, setBio] = useState('');
    const [searchPrompt, setSearchPrompt] = useState('');
    const [detailedPrompt, setDetailedPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);

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