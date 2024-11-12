import { MdSettings } from 'react-icons/md';
import { SettingsLayout } from './SettingsLayout';
import { Theme } from '@/config/themes';
import { ProfileData } from '../types';

interface PreferencesSectionProps {
    profileData: ProfileData;
    currentTheme: Theme;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handlePreferenceChange: (key: keyof ProfileData['preferences'], value: boolean) => void;
}

export function PreferencesSection({
    profileData,
    currentTheme,
    handleInputChange,
    handlePreferenceChange
}: PreferencesSectionProps) {
    return (
        <SettingsLayout
            currentTheme={currentTheme}
            title="Preferences"
            icon={MdSettings}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Profile Settings</h3>

                        <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl">
                            <div>
                                <h4 className="text-white font-medium">Profile Visibility</h4>
                                <p className="text-sm text-gray-400">Control who can see your profile</p>
                            </div>
                            <select
                                name="preferences.profileVisibility"
                                value={profileData.preferences.profileVisibility}
                                onChange={handleInputChange}
                                className="bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-white/10"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl">
                            <div>
                                <h4 className="text-white font-medium">Show Location</h4>
                                <p className="text-sm text-gray-400">Display your location on your profile</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={profileData.preferences.showLocation}
                                    onChange={(e) => handlePreferenceChange('showLocation', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${currentTheme.colors.primary}/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${currentTheme.colors.primary}`} />
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>

                        <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl">
                            <div>
                                <h4 className="text-white font-medium">Email Notifications</h4>
                                <p className="text-sm text-gray-400">Receive updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={profileData.preferences.emailNotifications}
                                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${currentTheme.colors.primary}/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${currentTheme.colors.primary}`} />
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl">
                            <div>
                                <h4 className="text-white font-medium">Direct Messages</h4>
                                <p className="text-sm text-gray-400">Allow others to send you messages</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={profileData.preferences.allowMessages}
                                    onChange={(e) => handlePreferenceChange('allowMessages', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${currentTheme.colors.primary}/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${currentTheme.colors.primary}`} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Regional Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#b3b3b3]">
                                Language
                            </label>
                            <select
                                name="language"
                                value={profileData.language}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${currentTheme.colors.primary} focus:ring-2 focus:ring-${currentTheme.colors.primary}/20 focus:outline-none transition-all`}
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#b3b3b3]">
                                Timezone
                            </label>
                            <select
                                name="timezone"
                                value={profileData.timezone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${currentTheme.colors.primary} focus:ring-2 focus:ring-${currentTheme.colors.primary}/20 focus:outline-none transition-all`}
                            >
                                <option value="UTC">UTC</option>
                                <option value="EST">Eastern Time</option>
                                <option value="PST">Pacific Time</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
} 