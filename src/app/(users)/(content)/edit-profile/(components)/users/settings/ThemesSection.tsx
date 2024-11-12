import { MdPalette } from 'react-icons/md';
import { SettingsLayout } from './SettingsLayout';
import { Theme, themes } from '@/config/themes';
import { ProfileData } from '../types';

interface ThemesSectionProps {
    profileData: ProfileData;
    currentTheme: Theme;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ThemesSection({ profileData, currentTheme, handleInputChange }: ThemesSectionProps) {
    return (
        <SettingsLayout
            currentTheme={currentTheme}
            title="Theme Selection"
            icon={MdPalette}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        className={`relative group overflow-hidden rounded-xl border transition-all ${profileData.theme === theme.id
                                ? `border-${theme.colors.primary} ring-2 ring-${theme.colors.primary}/20`
                                : 'border-white/10 hover:border-white/20'
                            }`}
                    >
                        <div className={`h-32 bg-gradient-to-br ${theme.gradients.primary}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        <div className="relative p-4 bg-[#2a2a2a]">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-medium text-white">{theme.name}</h4>
                                    <p className="text-sm text-gray-400">Stage lighting inspired</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="theme"
                                        value={theme.id}
                                        checked={profileData.theme === theme.id}
                                        onChange={handleInputChange}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-6 h-6 rounded-full border-2 border-white/20 peer-checked:border-${theme.colors.primary} peer-checked:bg-${theme.colors.primary} transition-all`}>
                                        {profileData.theme === theme.id && (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-${theme.colors.primary}`} />
                                <div className={`w-8 h-8 rounded-lg bg-${theme.colors.secondary}`} />
                                <div className={`w-8 h-8 rounded-lg bg-${theme.colors.accent}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SettingsLayout>
    );
} 