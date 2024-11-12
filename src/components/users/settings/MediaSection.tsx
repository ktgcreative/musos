import { BsImages } from 'react-icons/bs';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { SettingsLayout } from './SettingsLayout';
import { Theme } from '@/config/themes';
import { ProfileData } from '../types';

interface MediaSectionProps {
    profileData: ProfileData;
    currentTheme: Theme;
}

export function MediaSection({ currentTheme }: MediaSectionProps) {
    return (
        <SettingsLayout
            currentTheme={currentTheme}
            title="Media"
            icon={BsImages}
        >
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
            </div>
        </SettingsLayout>
    );
} 