'use client';

import { useState } from 'react';
import { BioGeneratorForm } from './components/BioGeneratorForm';
import { AiOutputDisplay } from './components/AiOutputDisplay';
import { generateBioAction } from './actions/generate-bio';
import { Classification } from './types';

interface FormData {
    stageName: string;
    realName: string;
    genre: string;
    instruments: string[];
    location: string;
    ensembleType: string;
    venues: string;
    achievements: string;
    yearsActive: string;
    influences: string;
}

export default function GenerateBioPage() {
    const [formData, setFormData] = useState<FormData>({
        stageName: '',
        realName: '',
        genre: '',
        instruments: [],
        location: '',
        ensembleType: '',
        venues: '',
        achievements: '',
        yearsActive: '',
        influences: ''
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

        // Basic validation
        if (!formData.stageName.trim()) {
            setError('Stage name is required');
            return;
        }
        if (!formData.genre.trim()) {
            setError('Genre is required');
            return;
        }
        if (formData.instruments.length === 0) {
            setError('Please select at least one instrument');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Prepare data for the action
            const actionData = {
                stageName: formData.stageName.trim(),
                realName: formData.realName.trim(),
                genre: formData.genre.trim(),
                instruments: formData.instruments.join(', '),
                location: formData.location.trim(),
                ensembleType: formData.ensembleType,
                venues: formData.venues.trim(),
                achievements: formData.achievements.trim(),
                yearsActive: formData.yearsActive.trim(),
                influences: formData.influences.trim()
            };

            const result = await generateBioAction(actionData);

            if (!result.success) {
                throw new Error(result.error || 'Failed to generate bio');
            }

            setBio(result.bio || '');
            setSearchPrompt(result.searchPrompt || '');
            setDetailedPrompt(result.detailedPrompt || '');
            setRelatedQuestions(result.relatedQuestions || []);
            setClassification(result.classification || null);
            setCitations(result.citations?.map(citation =>
                typeof citation === 'string' ? citation : citation.url || citation.title || ''
            ) || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleInstrumentToggle = (instrument: string) => {
        setFormData(prev => ({
            ...prev,
            instruments: prev.instruments.includes(instrument)
                ? prev.instruments.filter(i => i !== instrument)
                : [...prev.instruments, instrument]
        }));
    };

    return (
        <main className="flex-1 min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 mb-8 border border-white/5">
                    <h1 className="text-4xl font-bold text-white mb-2">AI Bio Generator</h1>
                    <p className="text-[#b3b3b3]">Create a professional biography for your music profile with AI-powered research</p>
                </div>

                <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5 shadow-xl">
                    <BioGeneratorForm
                        formData={formData}
                        loading={loading}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleInstrumentToggle={handleInstrumentToggle}
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