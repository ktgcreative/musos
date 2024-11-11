'use client';

import { useState } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram, FaCloudUploadAlt } from 'react-icons/fa';
import { MdMusicNote, MdLocationOn, MdPerson } from 'react-icons/md';

// Define the type for profileData
type ProfileData = {
    name: string;
    location: string;
    bio: string;
    profileImage: string;
    socialLinks: {
        spotify: string;
        youtube: string;
        soundcloud: string;
        instagram: string;
    };
};

export default function EditProfile() {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        location: '',
        bio: '',
        profileImage: '',
        socialLinks: {
            spotify: '',
            youtube: '',
            soundcloud: '',
            instagram: '',
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setProfileData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof ProfileData] as Record<string, string>,
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
        // Here you would typically send the data to your backend
        console.log('Form submitted:', profileData);
    };

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 mb-8 border border-white/5">
                    <h1 className="text-4xl font-bold text-white mb-2">Customize Your Profile</h1>
                    <p className="text-[#b3b3b3]">Make your profile stand out and connect with your audience</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5 shadow-xl">
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
                                    className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
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
                                        className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
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
                                className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all min-h-[120px] resize-none"
                                placeholder="Tell your story..."
                            />
                        </div>

                        <div className="mt-6">
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
                    </div>

                    {/* Social Links */}
                    <div className="bg-gradient-to-br from-[#1c1c1c] to-[#242424] rounded-2xl p-8 border border-white/5 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <MdMusicNote className="w-6 h-6 text-violet-400" />
                            <h2 className="text-2xl font-bold text-white">Social Links</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                        placeholder={`https://${platform.name}.com/your-profile`}
                                    />
                                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-3 bg-[#2a2a2a] text-white font-bold rounded-xl transition-all hover:bg-[#303030]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-600/20"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
} 