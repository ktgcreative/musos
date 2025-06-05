import { MdAutoAwesome, MdPerson, MdMusicNote, MdTheaters, MdPiano } from 'react-icons/md';
import { FaGuitar, FaDrum, FaMicrophone } from 'react-icons/fa';
import { GiTrumpet, GiFlute, GiHarp, GiViolin, GiSaxophone, GiBanjo } from 'react-icons/gi';

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

interface BioGeneratorFormProps {
    formData: FormData;
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleInstrumentToggle: (instrument: string) => void;
}

const instrumentOptions = [
    { name: 'Guitar', icon: <FaGuitar className="w-6 h-6" /> },
    { name: 'Piano', icon: <MdPiano className="w-6 h-6" /> },
    { name: 'Drums', icon: <FaDrum className="w-6 h-6" /> },
    { name: 'Bass', icon: <GiBanjo className="w-6 h-6" /> },
    { name: 'Vocals', icon: <FaMicrophone className="w-6 h-6" /> },
    { name: 'Violin', icon: <GiViolin className="w-6 h-6" /> },
    { name: 'Saxophone', icon: <GiSaxophone className="w-6 h-6" /> },
    { name: 'Trumpet', icon: <GiTrumpet className="w-6 h-6" /> },
    { name: 'Flute', icon: <GiFlute className="w-6 h-6" /> },
    { name: 'Harp', icon: <GiHarp className="w-6 h-6" /> },
];

const ensembleOptions = [
    { value: 'solo', label: 'Solo Artist' },
    { value: 'duo', label: 'Duo' },
    { value: 'band', label: 'Band' }
];

export function BioGeneratorForm({ formData, loading, handleSubmit, handleChange, handleInstrumentToggle }: BioGeneratorFormProps) {
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <MdPerson className="w-5 h-5 text-violet-400" />
                    Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Stage Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="stageName"
                            required
                            value={formData.stageName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="Your stage name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Real Name <span className="text-xs text-[#888]">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            name="realName"
                            value={formData.realName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="Your real name"
                        />
                    </div>
                </div>
            </div>

            {/* Musical Details */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <MdMusicNote className="w-5 h-5 text-violet-400" />
                    Musical Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Genre(s) <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="genre"
                            required
                            value={formData.genre}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="e.g., Rock, Jazz, Classical"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Performance Type
                        </label>
                        <select
                            name="ensembleType"
                            value={formData.ensembleType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                        >
                            <option value="">Select performance type</option>
                            {ensembleOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Instruments */}
                <div>
                    <label className="block text-sm font-medium text-[#b3b3b3] mb-4">
                        Instruments <span className="text-red-400">*</span>
                        <span className="block text-xs text-[#888] mt-1">Select all that apply</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {instrumentOptions.map((instrument) => (
                            <div
                                key={instrument.name}
                                onClick={() => handleInstrumentToggle(instrument.name)}
                                className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer transition-all hover:scale-105 ${formData.instruments.includes(instrument.name)
                                    ? 'bg-violet-600/20 border-violet-500 text-violet-400'
                                    : 'bg-[#2a2a2a] border-white/10 text-white hover:border-violet-500/50'
                                    }`}
                            >
                                <div className="mb-2 text-violet-400">
                                    {instrument.icon}
                                </div>
                                <span className="text-xs font-medium text-center">
                                    {instrument.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    {formData.instruments.length > 0 && (
                        <div className="mt-3 text-sm text-[#b3b3b3]">
                            Selected: {formData.instruments.join(', ')}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Years Active
                        </label>
                        <input
                            type="text"
                            name="yearsActive"
                            value={formData.yearsActive}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="e.g., 2018-present, 5 years"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Influences
                        </label>
                        <input
                            type="text"
                            name="influences"
                            value={formData.influences}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="e.g., The Beatles, Miles Davis"
                        />
                    </div>
                </div>
            </div>

            {/* Career Information */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <MdTheaters className="w-5 h-5 text-violet-400" />
                    Career Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="e.g., Los Angeles, CA"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                            Notable Venues
                        </label>
                        <input
                            type="text"
                            name="venues"
                            value={formData.venues}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                            placeholder="e.g., The Fillmore, Local clubs"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                        Achievements & Highlights
                    </label>
                    <textarea
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all resize-none"
                        placeholder="e.g., Released debut album, toured with major artists, awards won"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-600/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
                <MdAutoAwesome className="w-5 h-5" />
                {loading ? 'Generating Bio...' : 'Generate Bio'}
            </button>
        </form>
    );
} 