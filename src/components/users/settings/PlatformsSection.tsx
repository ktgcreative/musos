import { BiLink } from 'react-icons/bi';
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram } from 'react-icons/fa';
import { SettingsLayout } from './SettingsLayout';
import { SettingsInput } from './SettingsInput';
import { Theme } from '@/config/themes';
import { ProfileData } from '../types';

interface PlatformsSectionProps {
    profileData: ProfileData;
    currentTheme: Theme;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function PlatformsSection({ profileData, currentTheme, handleInputChange }: PlatformsSectionProps) {
    const platforms = [
        { name: 'spotify', icon: FaSpotify, label: 'Spotify Profile', color: 'green' },
        { name: 'youtube', icon: FaYoutube, label: 'YouTube Channel', color: 'red' },
        { name: 'soundcloud', icon: FaSoundcloud, label: 'SoundCloud Profile', color: 'orange' },
        { name: 'instagram', icon: FaInstagram, label: 'Instagram Profile', color: 'purple' },
    ];

    return (
        <SettingsLayout
            currentTheme={currentTheme}
            title="Platform Links"
            icon={BiLink}
        >
            <div className="grid grid-cols-1 gap-6">
                {platforms.map((platform) => (
                    <SettingsInput
                        key={platform.name}
                        label={platform.label}
                        name={`socialLinks.${platform.name}`}
                        value={profileData.socialLinks[platform.name as keyof typeof profileData.socialLinks]}
                        onChange={handleInputChange}
                        placeholder={`https://${platform.name}.com/your-profile`}
                        icon={platform.icon}
                        currentTheme={currentTheme}
                    />
                ))}
            </div>
        </SettingsLayout>
    );
} 