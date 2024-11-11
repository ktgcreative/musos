import { NextResponse } from 'next/server';

export type Musician = {
    id: string;
    name: string;
    genre: string;
    location: string;
    isVerified: boolean;
    bio: string;
    profileImage: string;
    coverImage: string;
    stats: {
        monthlyListeners: string;
        followers: string;
        totalStreams: string;
        trackCount: string;
    };
    featuredTracks: {
        name: string;
        plays: string;
        duration: string;
        platform: 'Spotify' | 'SoundCloud' | 'YouTube';
    }[];
    socialLinks: {
        spotify: string;
        youtube: string;
        soundcloud: string;
        instagram: string;
        followers: {
            spotify: string;
            youtube: string;
            soundcloud: string;
            instagram: string;
        };
    };
    status: 'online' | 'offline' | 'away';
    lastActive?: string;
    latestRelease?: {
        title: string;
        type: string;
        releaseDate: string;
        coverImage: string;
    };
};

const musicians: Musician[] = [
    {
        id: "crystal-waves",
        name: "Crystal Waves",
        genre: "Electronic / Future Bass",
        location: "Los Angeles, CA",
        isVerified: true,
        bio: "Creating waves in the electronic music scene. Grammy-nominated producer and DJ.",
        profileImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "1.2M",
            followers: "856K",
            totalStreams: "45.2M",
            trackCount: "42",
        },
        featuredTracks: [
            { name: "Midnight Dreams", plays: "1.2M", duration: "3:45", platform: "Spotify" },
            { name: "Electric Sunset", plays: "856K", duration: "4:12", platform: "SoundCloud" },
            { name: "Urban Echoes", plays: "645K", duration: "3:28", platform: "YouTube" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/crystal-waves",
            youtube: "https://youtube.com/@crystal-waves",
            soundcloud: "https://soundcloud.com/crystal-waves",
            instagram: "https://instagram.com/crystal.waves",
            followers: {
                spotify: "542K",
                youtube: "1.1M",
                soundcloud: "324K",
                instagram: "892K",
            }
        },
        status: "online",
        lastActive: "now",
        latestRelease: {
            title: "Midnight Echoes",
            type: "EP",
            releaseDate: "March 15, 2024",
            coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "neon-pulse",
        name: "Neon Pulse",
        genre: "Synthwave / Retrowave",
        location: "Miami, FL",
        isVerified: true,
        bio: "Bringing the 80s back with modern synthesizer magic. Retro-futuristic soundscapes.",
        profileImage: "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2940&auto=format&fit=crop",
        stats: {
            monthlyListeners: "890K",
            followers: "623K",
            totalStreams: "32.1M",
            trackCount: "38",
        },
        featuredTracks: [
            { name: "Retro Drive", plays: "925K", duration: "4:15", platform: "Spotify" },
            { name: "Neon Dreams", plays: "784K", duration: "3:58", platform: "YouTube" },
            { name: "Digital Sunset", plays: "562K", duration: "4:32", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/neon-pulse",
            youtube: "https://youtube.com/@neon-pulse",
            soundcloud: "https://soundcloud.com/neon-pulse",
            instagram: "https://instagram.com/neon.pulse",
            followers: {
                spotify: "425K",
                youtube: "892K",
                soundcloud: "256K",
                instagram: "734K",
            }
        },
        status: "away",
        lastActive: "5m ago",
        latestRelease: {
            title: "Retrowave Dreams",
            type: "Album",
            releaseDate: "February 28, 2024",
            coverImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "bass-horizon",
        name: "Bass Horizon",
        genre: "Bass House / Tech House",
        location: "Berlin, DE",
        isVerified: true,
        bio: "Pushing the boundaries of bass music. International DJ and producer.",
        profileImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2940&auto=format&fit=crop",
        stats: {
            monthlyListeners: "1.5M",
            followers: "945K",
            totalStreams: "52.3M",
            trackCount: "56",
        },
        featuredTracks: [
            { name: "Deep Impact", plays: "1.5M", duration: "3:42", platform: "Spotify" },
            { name: "Tech Revolution", plays: "892K", duration: "4:08", platform: "YouTube" },
            { name: "Bass Quake", plays: "756K", duration: "3:55", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/bass-horizon",
            youtube: "https://youtube.com/@bass-horizon",
            soundcloud: "https://soundcloud.com/bass-horizon",
            instagram: "https://instagram.com/bass.horizon",
            followers: {
                spotify: "623K",
                youtube: "1.3M",
                soundcloud: "445K",
                instagram: "892K",
            }
        },
        status: "offline",
        lastActive: "2h ago",
        latestRelease: {
            title: "Tech Fusion",
            type: "Single",
            releaseDate: "March 1, 2024",
            coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "lunar-echo",
        name: "Lunar Echo",
        genre: "Ambient / Space Music",
        location: "Reykjavik, IS",
        isVerified: true,
        bio: "Creating ethereal soundscapes inspired by cosmic phenomena.",
        profileImage: "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2940&auto=format&fit=crop",
        stats: {
            monthlyListeners: "720K",
            followers: "534K",
            totalStreams: "28.5M",
            trackCount: "35",
        },
        featuredTracks: [
            { name: "Stellar Dreams", plays: "892K", duration: "6:15", platform: "Spotify" },
            { name: "Aurora Nights", plays: "654K", duration: "5:42", platform: "YouTube" },
            { name: "Cosmic Drift", plays: "445K", duration: "7:18", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/lunar-echo",
            youtube: "https://youtube.com/@lunar-echo",
            soundcloud: "https://soundcloud.com/lunar-echo",
            instagram: "https://instagram.com/lunar.echo",
            followers: {
                spotify: "320K",
                youtube: "567K",
                soundcloud: "234K",
                instagram: "445K",
            }
        },
        status: "online",
        lastActive: "now",
        latestRelease: {
            title: "Celestial Journey",
            type: "Album",
            releaseDate: "March 10, 2024",
            coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "jungle-pulse",
        name: "Jungle Pulse",
        genre: "Drum & Bass / Jungle",
        location: "London, UK",
        isVerified: true,
        bio: "Breaking barriers in the DnB scene with raw energy and innovative beats.",
        profileImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2940&auto=format&fit=crop",
        stats: {
            monthlyListeners: "980K",
            followers: "678K",
            totalStreams: "38.9M",
            trackCount: "45",
        },
        featuredTracks: [
            { name: "Urban Jungle", plays: "1.1M", duration: "5:23", platform: "Spotify" },
            { name: "Bass Warrior", plays: "876K", duration: "4:56", platform: "SoundCloud" },
            { name: "Night Rider", plays: "654K", duration: "5:12", platform: "YouTube" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/jungle-pulse",
            youtube: "https://youtube.com/@jungle-pulse",
            soundcloud: "https://soundcloud.com/jungle-pulse",
            instagram: "https://instagram.com/jungle.pulse",
            followers: {
                spotify: "456K",
                youtube: "789K",
                soundcloud: "345K",
                instagram: "567K",
            }
        },
        status: "away",
        lastActive: "15m ago",
        latestRelease: {
            title: "Concrete Jungle",
            type: "EP",
            releaseDate: "March 5, 2024",
            coverImage: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "desert-mirage",
        name: "Desert Mirage",
        genre: "Organic House / Downtempo",
        location: "Marrakech, MA",
        isVerified: true,
        bio: "Blending traditional instruments with modern electronic production.",
        profileImage: "https://images.unsplash.com/photo-1504704911898-68304a7d2807?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "845K",
            followers: "567K",
            totalStreams: "29.8M",
            trackCount: "32",
        },
        featuredTracks: [
            { name: "Sahara Winds", plays: "987K", duration: "6:45", platform: "Spotify" },
            { name: "Oasis Dreams", plays: "765K", duration: "5:32", platform: "YouTube" },
            { name: "Desert Dawn", plays: "543K", duration: "7:15", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/desert-mirage",
            youtube: "https://youtube.com/@desert-mirage",
            soundcloud: "https://soundcloud.com/desert-mirage",
            instagram: "https://instagram.com/desert.mirage",
            followers: {
                spotify: "345K",
                youtube: "678K",
                soundcloud: "234K",
                instagram: "456K",
            }
        },
        status: "online",
        lastActive: "now",
        latestRelease: {
            title: "Tales of the Dunes",
            type: "Album",
            releaseDate: "February 20, 2024",
            coverImage: "https://images.unsplash.com/photo-1682685797828-d3b2561deef4?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "tokyo-drift",
        name: "Tokyo Drift",
        genre: "Future Garage / UK Garage",
        location: "Tokyo, JP",
        isVerified: true,
        bio: "Merging Japanese pop culture with UK garage influences.",
        profileImage: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "912K",
            followers: "678K",
            totalStreams: "34.5M",
            trackCount: "28",
        },
        featuredTracks: [
            { name: "Neon Streets", plays: "1.3M", duration: "4:23", platform: "Spotify" },
            { name: "Night Runner", plays: "956K", duration: "3:45", platform: "YouTube" },
            { name: "Cyber Dreams", plays: "734K", duration: "4:12", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/tokyo-drift",
            youtube: "https://youtube.com/@tokyo-drift",
            soundcloud: "https://soundcloud.com/tokyo-drift",
            instagram: "https://instagram.com/tokyo.drift",
            followers: {
                spotify: "478K",
                youtube: "892K",
                soundcloud: "345K",
                instagram: "567K",
            }
        },
        status: "offline",
        lastActive: "3h ago",
        latestRelease: {
            title: "Neo Tokyo",
            type: "EP",
            releaseDate: "March 8, 2024",
            coverImage: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "nordic-frost",
        name: "Nordic Frost",
        genre: "Melodic Techno / Progressive",
        location: "Stockholm, SE",
        isVerified: true,
        bio: "Crafting deep, emotional journeys through sound.",
        profileImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "1.1M",
            followers: "789K",
            totalStreams: "42.3M",
            trackCount: "34",
        },
        featuredTracks: [
            { name: "Winter Tales", plays: "1.4M", duration: "7:15", platform: "Spotify" },
            { name: "Aurora", plays: "987K", duration: "8:23", platform: "YouTube" },
            { name: "Glacier", plays: "856K", duration: "6:45", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/nordic-frost",
            youtube: "https://youtube.com/@nordic-frost",
            soundcloud: "https://soundcloud.com/nordic-frost",
            instagram: "https://instagram.com/nordic.frost",
            followers: {
                spotify: "567K",
                youtube: "923K",
                soundcloud: "445K",
                instagram: "678K",
            }
        },
        status: "online",
        lastActive: "now",
        latestRelease: {
            title: "Northern Lights",
            type: "Album",
            releaseDate: "March 12, 2024",
            coverImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "tribal-tech",
        name: "Tribal Tech",
        genre: "Tribal House / Afro House",
        location: "Cape Town, ZA",
        isVerified: true,
        bio: "Fusing traditional African rhythms with modern house music.",
        profileImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1580746738584-6a58adfed9a6?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "934K",
            followers: "645K",
            totalStreams: "36.7M",
            trackCount: "41",
        },
        featuredTracks: [
            { name: "Tribal Spirit", plays: "1.2M", duration: "6:34", platform: "Spotify" },
            { name: "Desert Dance", plays: "876K", duration: "5:45", platform: "YouTube" },
            { name: "Rhythm of Life", plays: "654K", duration: "7:12", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/tribal-tech",
            youtube: "https://youtube.com/@tribal-tech",
            soundcloud: "https://soundcloud.com/tribal-tech",
            instagram: "https://instagram.com/tribal.tech",
            followers: {
                spotify: "434K",
                youtube: "767K",
                soundcloud: "323K",
                instagram: "545K",
            }
        },
        status: "away",
        lastActive: "30m ago",
        latestRelease: {
            title: "African Spirits",
            type: "EP",
            releaseDate: "March 3, 2024",
            coverImage: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "quantum-beats",
        name: "Quantum Beats",
        genre: "Experimental / IDM",
        location: "Montreal, CA",
        isVerified: true,
        bio: "Pushing the boundaries of electronic music through algorithmic composition.",
        profileImage: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "678K",
            followers: "456K",
            totalStreams: "25.4M",
            trackCount: "29",
        },
        featuredTracks: [
            { name: "Neural Network", plays: "845K", duration: "5:23", platform: "Spotify" },
            { name: "Quantum State", plays: "634K", duration: "6:12", platform: "YouTube" },
            { name: "Digital Entropy", plays: "523K", duration: "4:56", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/quantum-beats",
            youtube: "https://youtube.com/@quantum-beats",
            soundcloud: "https://soundcloud.com/quantum-beats",
            instagram: "https://instagram.com/quantum.beats",
            followers: {
                spotify: "312K",
                youtube: "534K",
                soundcloud: "234K",
                instagram: "445K",
            }
        },
        status: "online",
        lastActive: "now",
        latestRelease: {
            title: "Quantum Mechanics",
            type: "Album",
            releaseDate: "February 25, 2024",
            coverImage: "https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "solar-winds",
        name: "Solar Winds",
        genre: "Progressive Trance / Psytrance",
        location: "Goa, IN",
        isVerified: true,
        bio: "Creating transcendental journeys through psychedelic soundscapes.",
        profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "867K",
            followers: "589K",
            totalStreams: "31.2M",
            trackCount: "37",
        },
        featuredTracks: [
            { name: "Cosmic Dance", plays: "967K", duration: "8:45", platform: "Spotify" },
            { name: "Astral Journey", plays: "745K", duration: "7:23", platform: "YouTube" },
            { name: "Solar Eclipse", plays: "634K", duration: "9:15", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/solar-winds",
            youtube: "https://youtube.com/@solar-winds",
            soundcloud: "https://soundcloud.com/solar-winds",
            instagram: "https://instagram.com/solar.winds",
            followers: {
                spotify: "389K",
                youtube: "645K",
                soundcloud: "278K",
                instagram: "512K",
            }
        },
        status: "offline",
        lastActive: "5h ago",
        latestRelease: {
            title: "Cosmic Consciousness",
            type: "Album",
            releaseDate: "March 7, 2024",
            coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "urban-echo",
        name: "Urban Echo",
        genre: "UK Drill / Grime",
        location: "Manchester, UK",
        isVerified: true,
        bio: "Representing the new wave of British urban music.",
        profileImage: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "1.3M",
            followers: "912K",
            totalStreams: "48.6M",
            trackCount: "43",
        },
        featuredTracks: [
            { name: "City Lights", plays: "1.5M", duration: "3:45", platform: "Spotify" },
            { name: "Street Code", plays: "1.1M", duration: "3:23", platform: "YouTube" },
            { name: "Night Shift", plays: "892K", duration: "4:12", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/urban-echo",
            youtube: "https://youtube.com/@urban-echo",
            soundcloud: "https://soundcloud.com/urban-echo",
            instagram: "https://instagram.com/urban.echo",
            followers: {
                spotify: "645K",
                youtube: "1.2M",
                soundcloud: "434K",
                instagram: "867K",
            }
        },
        status: "online",
        lastActive: "now",
        latestRelease: {
            title: "Urban Symphony",
            type: "Mixtape",
            releaseDate: "March 14, 2024",
            coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=3270&auto=format&fit=crop"
        }
    },
    {
        id: "deep-forest",
        name: "Deep Forest",
        genre: "Deep House / Organic House",
        location: "Vancouver, CA",
        isVerified: true,
        bio: "Creating atmospheric soundscapes inspired by nature.",
        profileImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=3270&auto=format&fit=crop",
        stats: {
            monthlyListeners: "756K",
            followers: "534K",
            totalStreams: "27.8M",
            trackCount: "31",
        },
        featuredTracks: [
            { name: "Forest Whispers", plays: "867K", duration: "6:23", platform: "Spotify" },
            { name: "Mountain Air", plays: "645K", duration: "5:45", platform: "YouTube" },
            { name: "River Flow", plays: "534K", duration: "7:12", platform: "SoundCloud" },
        ],
        socialLinks: {
            spotify: "https://spotify.com/deep-forest",
            youtube: "https://youtube.com/@deep-forest",
            soundcloud: "https://soundcloud.com/deep-forest",
            instagram: "https://instagram.com/deep.forest",
            followers: {
                spotify: "345K",
                youtube: "567K",
                soundcloud: "234K",
                instagram: "478K",
            }
        },
        status: "away",
        lastActive: "45m ago",
        latestRelease: {
            title: "Natural Rhythms",
            type: "EP",
            releaseDate: "March 2, 2024",
            coverImage: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3270&auto=format&fit=crop"
        }
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const musician = musicians.find(m => m.id === id);
        if (musician) {
            return NextResponse.json(musician);
        }
        return NextResponse.json({ error: 'Musician not found' }, { status: 404 });
    }

    return NextResponse.json(musicians);
} 