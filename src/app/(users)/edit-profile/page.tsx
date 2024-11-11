'use client';

import { useState } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram, FaCloudUploadAlt, FaPalette } from 'react-icons/fa';
import { MdLocationOn, MdPerson, MdInfo, MdSettings, MdEvent, MdPalette } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { themes, Theme } from '../../../config/themes';

type ProfileData = {
    name: string;
    location: string;
    bio: string;
    profileImage: string;
    genres: string[];
    language: string;
    timezone: string;
    upcomingEvents: Array<{
        title: string;
        date: string;
        location: string;
        description: string;
    }>;
    preferences: {
        emailNotifications: boolean;
        profileVisibility: 'public' | 'private';
        allowMessages: boolean;
        showLocation: boolean;
    };
    socialLinks: {
        spotify: string;
        youtube: string;
        soundcloud: string;
        instagram: string;
    };
    theme: string;
};

type TabType = 'info' | 'media' | 'platforms' | 'events' | 'preferences' | 'themes';

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

    const getCurrentTheme = (): Theme => {
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
                    ...prev[parent as keyof typeof prev],
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

    const handlePreferenceChange = (key: keyof ProfileData['preferences'], value: boolean) => {
        setProfileData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', profileData);
    };

    const tabs = [
        { id: 'info' as TabType, label: 'Basic Info', icon: MdInfo },
        { id: 'media' as TabType, label: 'Media', icon: BsImages },
        { id: 'platforms' as TabType, label: 'Platforms', icon: BiLink },
        { id: 'events' as TabType, label: 'Events', icon: MdEvent },
        { id: 'preferences' as TabType, label: 'Preferences', icon: MdSettings },
        { id: 'themes' as TabType, label: 'Themes', icon: MdPalette },
    ].map(tab => ({
        ...tab,
        className: `flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
            ${activeTab === tab.id
                ? `bg-${getCurrentTheme().colors.primary} text-white`
                : 'bg-[#2a2a2a] text-[#b3b3b3] hover:bg-[#303030]'
            }`
    }));

    // Add new Events section
    const EventsSection = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
                <button
                    type="button"
                    className={`px-4 py-2 bg-${getCurrentTheme().colors.primary} text-white rounded-lg hover:bg-${getCurrentTheme().colors.primary}/80 transition-colors`}
                >
                    Add Event
                </button>
            </div>

            {profileData.upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    No upcoming events. Add your first event!
                </div>
            ) : (
                <div className="space-y-4">
                    {profileData.upcomingEvents.map((event, index) => (
                        <div key={index} className="bg-[#2a2a2a] p-4 rounded-xl border border-white/10">
                            {/* Event details here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Add new Preferences section
    const PreferencesSection = () => (
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
                            <div className={`w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${getCurrentTheme().colors.primary}/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${getCurrentTheme().colors.primary}`}>
                                {profileData.preferences.showLocation && (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </div>
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
                            <div className={`w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${getCurrentTheme().colors.primary}/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${getCurrentTheme().colors.primary}`}>
                                {profileData.preferences.emailNotifications && (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </div>
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
                            <div className={`w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${getCurrentTheme().colors.primary}/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${getCurrentTheme().colors.primary}`}>
                                {profileData.preferences.allowMessages && (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </div>
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
                            className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${getCurrentTheme().colors.primary} focus:ring-2 focus:ring-${getCurrentTheme().colors.primary}/20 focus:outline-none transition-all`}
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            {/* Add more languages */}
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
                            className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${getCurrentTheme().colors.primary} focus:ring-2 focus:ring-${getCurrentTheme().colors.primary}/20 focus:outline-none transition-all`}
                        >
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            {/* Add more timezones */}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Theme Selection</h3>
                <div className="grid grid-cols-1 gap-4">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className={`flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl border transition-all ${profileData.theme === theme.id
                                ? ['border-' + theme.colors.primary, 'ring-2', 'ring-' + theme.colors.primary + '/20'].join(' ')
                                : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${theme.gradients.primary}`} />
                                <div>
                                    <h4 className="text-white font-medium">{theme.name}</h4>
                                    <p className="text-sm text-gray-400">Click to preview</p>
                                </div>
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
                    ))}
                </div>
            </div>
        </div>
    );

    // Add ThemesSection component
    const ThemesSection = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        className={`relative group overflow-hidden rounded-xl border transition-all ${profileData.theme === theme.id
                            ? `border-${theme.colors.primary} ring-2 ring-${theme.colors.primary}/20`
                            : 'border-white/10 hover:border-white/20'
                            }`}
                    >
                        {/* Theme Preview */}
                        <div className={`h-32 bg-gradient-to-br ${theme.gradients.primary}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        {/* Theme Info */}
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

                            {/* Theme Color Preview */}
                            <div className="flex gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-${theme.colors.primary}`} />
                                <div className={`w-8 h-8 rounded-lg bg-${theme.colors.secondary}`} />
                                <div className={`w-8 h-8 rounded-lg bg-${theme.colors.accent}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section with current theme */}
                <div className={`bg-gradient-to-b ${getCurrentTheme().gradients.primary} rounded-2xl p-8 mb-8 border border-white/5`}>
                    <h1 className="text-4xl font-bold text-white mb-2">Customize Your Profile</h1>
                    <p className="text-[#b3b3b3]">Make your profile stand out and connect with your audience</p>
                </div>

                {/* Tabs Navigation with current theme */}
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
                    {/* Basic Information Tab */}
                    <div className={activeTab === 'info' ? 'block' : 'hidden'}>
                        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <MdPerson className="w-6 h-6 text-violet-400" />
                                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-[#b3b3b3]">
                                        Artist Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${getCurrentTheme().colors.primary} focus:ring-2 focus:ring-${getCurrentTheme().colors.primary}/20 focus:outline-none transition-all`}
                                        placeholder="Your artist name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="location" className="block text-sm font-medium text-[#b3b3b3]">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MdLocationOn className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3]" />
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${getCurrentTheme().colors.primary} focus:ring-2 focus:ring-${getCurrentTheme().colors.primary}/20 focus:outline-none transition-all`}
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <label htmlFor="bio" className="block text-sm font-medium text-[#b3b3b3]">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${getCurrentTheme().colors.primary} focus:ring-2 focus:ring-${getCurrentTheme().colors.primary}/20 focus:outline-none transition-all min-h-[120px] resize-none`}
                                    placeholder="Tell your story..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Tab */}
                    <div className={activeTab === 'media' ? 'block' : 'hidden'}>
                        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <BsImages className="w-6 h-6 text-violet-400" />
                                <h2 className="text-2xl font-bold text-white">Media</h2>
                            </div>

                            {/* Profile Image Upload */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
                                        Profile Image
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-xl cursor-pointer bg-[#2a2a2a] hover:bg-[#303030] transition-all">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FaCloudUploadAlt className="w-10 h-10 text-violet-400 mb-3" />
                                                <p className="mb-2 text-sm text-white font-medium">Click to upload</p>
                                                <p className="text-xs text-[#b3b3b3]">PNG, JPG or GIF (MAX. 800x800px)</p>
                                            </div>
                                            <input type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>

                                {/* Add more media upload options here */}
                            </div>
                        </div>
                    </div>

                    {/* Platforms Tab */}
                    <div className={activeTab === 'platforms' ? 'block' : 'hidden'}>
                        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <BiLink className="w-6 h-6 text-violet-400" />
                                <h2 className="text-2xl font-bold text-white">Platform Links</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { name: 'spotify', icon: FaSpotify, label: 'Spotify Profile', color: 'green' },
                                    { name: 'youtube', icon: FaYoutube, label: 'YouTube Channel', color: 'red' },
                                    { name: 'soundcloud', icon: FaSoundcloud, label: 'SoundCloud Profile', color: 'orange' },
                                    { name: 'instagram', icon: FaInstagram, label: 'Instagram Profile', color: 'purple' },
                                ].map((platform) => (
                                    <div key={platform.name} className="relative group">
                                        <label htmlFor={platform.name} className="block text-sm font-medium text-[#b3b3b3] mb-2 flex items-center gap-2">
                                            <platform.icon className={`w-4 h-4 text-${platform.color}-400`} />
                                            {platform.label}
                                        </label>
                                        <input
                                            type="text"
                                            id={platform.name}
                                            name={`socialLinks.${platform.name}`}
                                            value={profileData.socialLinks[platform.name as keyof typeof profileData.socialLinks]}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-${getCurrentTheme().colors.primary} focus:ring-2 focus:ring-${getCurrentTheme().colors.primary}/20 focus:outline-none transition-all`}
                                            placeholder={`https://${platform.name}.com/your-profile`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Events Tab */}
                    <div className={activeTab === 'events' ? 'block' : 'hidden'}>
                        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <MdEvent className="w-6 h-6 text-violet-400" />
                                <h2 className="text-2xl font-bold text-white">Events</h2>
                            </div>
                            <EventsSection />
                        </div>
                    </div>

                    {/* Preferences Tab */}
                    <div className={activeTab === 'preferences' ? 'block' : 'hidden'}>
                        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <MdSettings className="w-6 h-6 text-violet-400" />
                                <h2 className="text-2xl font-bold text-white">Preferences</h2>
                            </div>
                            <PreferencesSection />
                        </div>
                    </div>

                    {/* Themes Tab */}
                    <div className={activeTab === 'themes' ? 'block' : 'hidden'}>
                        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <MdPalette className="w-6 h-6 text-violet-400" />
                                <h2 className="text-2xl font-bold text-white">Theme Selection</h2>
                            </div>
                            <ThemesSection />
                        </div>
                    </div>

                    {/* Submit Buttons with current theme */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-3 bg-[#2a2a2a] text-white font-bold rounded-xl transition-all hover:bg-[#303030]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={[
                                'px-8 py-3',
                                'bg-gradient-to-r',
                                getCurrentTheme().gradients.primary,
                                'text-white font-bold rounded-xl',
                                'transition-all hover:scale-105',
                                'hover:shadow-lg',
                                'hover:shadow-' + getCurrentTheme().colors.primary + '/20'
                            ].join(' ')}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
} 