import { MdInfo, MdEvent, MdSettings, MdPalette } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { TabType } from '../types';
import { Theme } from '@/config/themes';

export const getTabConfig = (activeTab: TabType, currentTheme: Theme) => [
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
            ? `bg-${currentTheme.colors.primary} text-white`
            : 'bg-[#2a2a2a] text-[#b3b3b3] hover:bg-[#303030]'
        }`
})); 