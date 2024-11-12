import { MdPerson, MdLocationOn } from 'react-icons/md';
import { SettingsLayout } from './SettingsLayout';
import { SettingsInput } from './SettingsInput';
import { Theme } from '@/config/themes';
import { ProfileData } from '../types';

interface BasicInfoSectionProps {
    profileData: ProfileData;
    currentTheme: Theme;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function BasicInfoSection({ profileData, currentTheme, handleInputChange }: BasicInfoSectionProps) {
    return (
        <SettingsLayout
            currentTheme={currentTheme}
            title="Basic Information"
            icon={MdPerson}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsInput
                    label="Artist Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Your artist name"
                    currentTheme={currentTheme}
                />

                <SettingsInput
                    label="Location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    icon={MdLocationOn}
                    currentTheme={currentTheme}
                />
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                    Bio
                </label>
                <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${currentTheme.colors.primary} focus:ring-2 focus:ring-${currentTheme.colors.primary}/20 focus:outline-none transition-all min-h-[120px] resize-none`}
                    placeholder="Tell your story..."
                />
            </div>
        </SettingsLayout>
    );
} 