'use client';

import { useRouter, usePathname } from 'next/navigation';
import * as React from 'react';
import { themes } from '@/config/themes';
import { TabType } from '../edit-profile/(components)/users/types';
import { getTabConfig } from '../edit-profile/(components)/users/settings/TabConfig';

interface Props {
    children: React.ReactNode;
}

export default function EditProfileLayout({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const currentTheme = themes[0]; // Default theme, you might want to manage this differently

    // Extract the current section from the pathname
    const currentSection = pathname.split('/').pop() as TabType;
    const tabs = getTabConfig(currentSection, currentTheme);

    const handleTabChange = (tabId: TabType) => {
        router.push(`/edit-profile/${tabId}`);
    };

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
                            onClick={() => handleTabChange(tab.id)}
                            className={tab.className}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {children}
            </div>
        </main>
    );
} 