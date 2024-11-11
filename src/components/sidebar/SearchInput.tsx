type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search..."
}: SearchInputProps) {
    return (
        <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-xl">
            <input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-transparent text-white placeholder-zinc-400 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
            <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );
} 