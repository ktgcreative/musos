'use client';

import { useState } from 'react';
import { BioGeneratorForm } from './components/BioGeneratorForm';
import { AiOutputDisplay } from './components/AiOutputDisplay';

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
    const [citations, setCitations] = useState<string[]>([]);

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
            setCitations(data.citations || []);
        } catch (err) {
            const errorMessage = err instanceof Error ?
                err.message :
                typeof err === 'object' && err && 'details' in err ?
                    String(err.details) :
                    'Something went wrong';
            setError(errorMessage);
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
        <main className="flex-1 min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 mb-8 border border-white/5">
                    <h1 className="text-4xl font-bold text-white mb-2">AI Bio Generator</h1>
                    <p className="text-[#b3b3b3]">Create a professional biography for your music profile with detailed information about your career</p>
                </div>

                <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5 shadow-xl">
                    <BioGeneratorForm
                        formData={formData}
                        loading={loading}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                    />

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                            {error}
                        </div>
                    )}

                    <AiOutputDisplay
                        bio={bio}
                        searchPrompt={searchPrompt}
                        detailedPrompt={detailedPrompt}
                        classification={classification}
                        citations={citations}
                        relatedQuestions={relatedQuestions}
                    />
                </div>
            </div>
        </main>
    );
} 