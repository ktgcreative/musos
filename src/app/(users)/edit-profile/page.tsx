'use client';

import { useState } from 'react';
import { BasicInfoSection } from '@/components/users/settings/BasicInfoSection';
import { MediaSection } from '@/components/users/settings/MediaSection';
import { PlatformsSection } from '@/components/users/settings/PlatformsSection';
import { ThemesSection } from '@/components/users/settings/ThemesSection';
import { EventsSection } from '@/components/users/settings/EventsSection';
import { PreferencesSection } from '@/components/users/settings/PreferencesSection';
import { themes } from '@/config/themes';
import { TabType, ProfileData } from '@/components/users/types';
import { getTabConfig } from '@/components/users/settings/TabConfig';

export default function EditProfile() {
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        location: '',
        bio: '',
        profileImage: '',
        genres: [],
        language: 'en',
        timezone: 'UTC',
        upcomingEvents: [],
        preferences: {
            emailNotifications: true,
            profileVisibility: 'public',
            allowMessages: true,
            showLocation: true,
        },
        socialLinks: {
            spotify: '',
            youtube: '',
            soundcloud: '',
            instagram: ''
        },
        theme: 'violet',
    });

    const getCurrentTheme = () => {
        return themes.find(theme => theme.id === profileData.theme) || themes[0];
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setProfileData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev] as Record<string, string>,
                    [child]: value,
                },
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', profileData);
    };

    const handlePreferenceChange = (key: keyof ProfileData['preferences'], value: boolean) => {
        setProfileData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
    };

    const currentTheme = getCurrentTheme();
    const tabs = getTabConfig(activeTab, currentTheme);

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className={`bg-gradient-to-b ${currentTheme.gradients.secondary} rounded-2xl p-8 mb-8 border border-white/5`}>
                    <h1 className="text-4xl font-bold text-white mb-2">Customize Your Profile</h1>
                    <p className="text-[#b3b3b3]">Make your profile stand out and connect with your audience</p>
                </div>

                <div className="flex space-x-2 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={tab.className}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {activeTab === 'info' && (
                        <BasicInfoSection
                            profileData={profileData}
                            currentTheme={currentTheme}
                            handleInputChange={handleInputChange}
                        />
                    )}
                    {activeTab === 'media' && (
                        <MediaSection
                            profileData={profileData}
                            currentTheme={currentTheme}
                        />
                    )}
                    {activeTab === 'platforms' && (
                        <PlatformsSection
                            profileData={profileData}
                            currentTheme={currentTheme}
                            handleInputChange={handleInputChange}
                        />
                    )}
                    {activeTab === 'events' && (
                        <EventsSection
                            profileData={profileData}
                            currentTheme={currentTheme}
                        />
                    )}
                    {activeTab === 'preferences' && (
                        <PreferencesSection
                            profileData={profileData}
                            currentTheme={currentTheme}
                            handleInputChange={handleInputChange}
                            handlePreferenceChange={handlePreferenceChange}
                        />
                    )}
                    {activeTab === 'themes' && (
                        <ThemesSection
                            profileData={profileData}
                            currentTheme={currentTheme}
                            handleInputChange={handleInputChange}
                        />
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-3 bg-[#2a2a2a] text-white font-bold rounded-xl transition-all hover:bg-[#303030]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-8 py-3 bg-gradient-to-r ${currentTheme.gradients.primary} text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-${currentTheme.colors.primary}/20`}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
} 