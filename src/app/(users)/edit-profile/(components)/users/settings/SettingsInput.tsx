import { Theme } from "@/config/themes";

interface SettingsInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder?: string;
    icon?: React.ComponentType<{ className?: string }>;
    currentTheme: Theme;
}

export function SettingsInput({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    icon: Icon,
    currentTheme
}: SettingsInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#b3b3b3]">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3]" />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full ${Icon ? 'pl-12' : 'px-4'} py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${currentTheme.colors.primary} focus:ring-2 focus:ring-${currentTheme.colors.primary}/20 focus:outline-none transition-all`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
} 