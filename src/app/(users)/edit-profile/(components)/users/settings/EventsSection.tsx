import { MdEvent } from 'react-icons/md';
import { SettingsLayout } from './SettingsLayout';
import { Theme } from '@/config/themes';
import { ProfileData } from '../types';

interface EventsSectionProps {
    profileData: ProfileData;
    currentTheme: Theme;
}

export function EventsSection({ profileData, currentTheme }: EventsSectionProps) {
    return (
        <SettingsLayout
            currentTheme={currentTheme}
            title="Upcoming Events"
            icon={MdEvent}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
                    <button
                        type="button"
                        className={`px-4 py-2 bg-${currentTheme.colors.primary} text-white rounded-lg hover:bg-${currentTheme.colors.primary}/80 transition-colors`}
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
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-medium text-white">{event.title}</h4>
                                        <p className="text-sm text-gray-400">{event.date}</p>
                                        <p className="text-sm text-gray-400">{event.location}</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        Edit
                                    </button>
                                </div>
                                <p className="mt-2 text-gray-300">{event.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </SettingsLayout>
    );
} 