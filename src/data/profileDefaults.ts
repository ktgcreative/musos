import { ProfileData } from "@/app/(users)/(content)/edit-profile/(components)/users/types";


export const DEFAULT_PROFILE_DATA: ProfileData = {
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
} as const; 