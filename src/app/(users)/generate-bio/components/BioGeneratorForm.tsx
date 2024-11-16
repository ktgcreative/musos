import { MdAutoAwesome, MdPerson, MdMusicNote, MdTheaters } from 'react-icons/md';

interface FormData {
    stageName: string;
    realName: string;
    genre: string;
    instruments: string;
    location: string;
}

interface BioGeneratorFormProps {
    formData: FormData;
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface FormSection {
    title: string;
    icon: React.ReactNode;
    fields: {
        name: keyof FormData;
        label: string;
        placeholder: string;
        required?: boolean;
        optional?: boolean;
    }[];
    columns?: number;
}

export function BioGeneratorForm({ formData, loading, handleSubmit, handleChange }: BioGeneratorFormProps) {
    const formSections: FormSection[] = [
        {
            title: "Basic Information",
            icon: <MdPerson className="w-5 h-5 text-violet-400" />,
            fields: [
                {
                    name: "stageName",
                    label: "Stage Name",
                    placeholder: "Your stage name",
                    required: true
                },
                {
                    name: "realName",
                    label: "Real Name",
                    placeholder: "Your real name (if you want to include it)",
                    optional: true
                }
            ],
            columns: 2
        },
        {
            title: "Musical Background",
            icon: <MdMusicNote className="w-5 h-5 text-violet-400" />,
            fields: [
                {
                    name: "genre",
                    label: "Genre(s)",
                    placeholder: "e.g., Rock, Jazz, Classical",
                    required: true
                },
                {
                    name: "instruments",
                    label: "Instruments",
                    placeholder: "e.g., Guitar, Piano, Drums",
                    required: true
                }
            ],
            columns: 2
        },
        {
            title: "Career Information",
            icon: <MdTheaters className="w-5 h-5 text-violet-400" />,
            fields: [
                {
                    name: "location",
                    label: "Location",
                    placeholder: "e.g., Los Angeles, CA"
                }
            ],
            columns: 1
        }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {formSections.map((section) => (
                <div key={section.title} className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        {section.icon}
                        {section.title}
                    </h2>
                    <div className={`grid grid-cols-1 ${section.columns === 2 ? 'md:grid-cols-2' : ''} gap-6`}>
                        {section.fields.map((field) => (
                            <div key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-[#b3b3b3] mb-2"
                                >
                                    {field.label} {field.optional && "(Optional)"}
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    id={field.name}
                                    required={field.required}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-600/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
                <MdAutoAwesome className="w-5 h-5" />
                {loading ? 'Generating...' : 'Generate Bio'}
            </button>
        </form>
    );
} 