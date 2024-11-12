export type TabType = 'info' | 'media' | 'platforms' | 'events' | 'preferences' | 'themes';

export interface ProfileData {
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
} 