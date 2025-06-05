'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { themes } from '@/config/themes';
import { DEFAULT_PROFILE_DATA } from '@/data/profileDefaults';
import { TabType, ProfileData } from '../(components)/users/types';
import { BasicInfoSection } from '../(components)/users/settings/BasicInfoSection';
import { MediaSection } from '../(components)/users/settings/MediaSection';
import { PlatformsSection } from '../(components)/users/settings/PlatformsSection';
import { EventsSection } from '../(components)/users/settings/EventsSection';
import { PreferencesSection } from '../(components)/users/settings/PreferencesSection';
import { ThemesSection } from '../(components)/users/settings/ThemesSection';

export default function EditProfileSection() {
    const params = useParams();
    const section = params.section as string;
    const activeTab = section as TabType;

    const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE_DATA);

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

    return (
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
    );
} 