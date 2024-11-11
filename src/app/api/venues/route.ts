import { NextResponse } from 'next/server';

export type Venue = {
    id: string;
    name: string;
    type: string;
    location: string;
    isVerified: boolean;
    bio: string;
    profileImage: string;
    coverImage: string;
    stats: {
        capacity: string;
        rating: string;
        totalEvents: string;
        reviewCount: string;
    };
    features: {
        name: string;
        description: string;
        icon: string;
    }[];
    upcomingEvents: {
        name: string;
        date: string;
        price: string;
        status: 'On Sale' | 'Selling Fast' | 'Few Tickets Left' | 'Sold Out';
    }[];
    contact: {
        website: string;
        email: string;
        phone: string;
        instagram: string;
    };
    amenities: {
        soundSystem: string;
        stageSize: string;
        greenRooms: string;
        parking: string;
    };
    status: 'open' | 'closed' | 'maintenance';
    lastUpdated?: string;
};

const venues: Venue[] = [
    {
        id: "electric-room",
        name: "The Electric Room",
        type: "Live Music Venue",
        location: "Los Angeles, CA",
        isVerified: true,
        bio: "Premier live music venue featuring state-of-the-art sound system and hosting both emerging artists and established acts.",
        profileImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=3270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=3270&auto=format&fit=crop",
        stats: {
            capacity: "1,200",
            rating: "4.8",
            totalEvents: "520+",
            reviewCount: "320",
        },
        features: [
            { name: "Sound System", description: "L-Acoustics K2", icon: "speaker" },
            { name: "Stage Size", description: "40ft x 30ft", icon: "stage" },
            { name: "Green Rooms", description: "4 Private Rooms", icon: "room" },
            { name: "Parking", description: "200 Spaces", icon: "parking" },
        ],
        upcomingEvents: [
            { name: "Electronic Night", date: "Mar 15", price: "$25", status: "On Sale" },
            { name: "Jazz Evening", date: "Mar 18", price: "$30", status: "Selling Fast" },
            { name: "Rock Festival", date: "Mar 22", price: "$40", status: "Few Tickets Left" },
        ],
        contact: {
            website: "www.electricroom.com",
            email: "bookings@electricroom.com",
            phone: "+1 (323) 555-0123",
            instagram: "@electricroom",
        },
        amenities: {
            soundSystem: "L-Acoustics K2 Line Array",
            stageSize: "40ft x 30ft Main Stage",
            greenRooms: "4 Private Rooms with Ensuite",
            parking: "200 Space Secure Parking",
        },
        status: "open",
        lastUpdated: "2h ago",
    },
    {
        id: "jazz-basement",
        name: "The Jazz Basement",
        type: "Jazz Club",
        location: "New York, NY",
        isVerified: true,
        bio: "Historic jazz club in the heart of Manhattan featuring nightly live performances and intimate atmosphere since 1954.",
        profileImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2274&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2270&auto=format&fit=crop",
        stats: {
            capacity: "150",
            rating: "4.9",
            totalEvents: "3400+",
            reviewCount: "890",
        },
        features: [
            { name: "Sound System", description: "Custom Jazz Setup", icon: "speaker" },
            { name: "Stage Size", description: "20ft x 15ft", icon: "stage" },
            { name: "Green Room", description: "2 Private Rooms", icon: "room" },
            { name: "Bar Service", description: "Full Bar", icon: "drink" },
        ],
        upcomingEvents: [
            { name: "Miles Davis Tribute", date: "Mar 16", price: "$45", status: "Selling Fast" },
            { name: "Late Night Jazz", date: "Mar 17", price: "$35", status: "On Sale" },
            { name: "Sunday Jazz Brunch", date: "Mar 19", price: "$50", status: "Few Tickets Left" },
        ],
        contact: {
            website: "www.jazzbasement.com",
            email: "info@jazzbasement.com",
            phone: "+1 (212) 555-0198",
            instagram: "@thejazzbasement",
        },
        amenities: {
            soundSystem: "Custom Jazz Acoustics",
            stageSize: "20ft x 15ft Intimate Stage",
            greenRooms: "2 Artist Lounges",
            parking: "Street Parking Available",
        },
        status: "open",
        lastUpdated: "1h ago",
    },
    {
        id: "sunset-arena",
        name: "Sunset Arena",
        type: "Large Concert Venue",
        location: "Miami, FL",
        isVerified: true,
        bio: "Modern amphitheater with stunning ocean views, hosting major concerts and festivals year-round.",
        profileImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2274&auto=format&fit=crop",
        stats: {
            capacity: "15,000",
            rating: "4.7",
            totalEvents: "890+",
            reviewCount: "2300",
        },
        features: [
            { name: "Sound System", description: "Meyer Sound LEO", icon: "speaker" },
            { name: "Stage Size", description: "100ft x 60ft", icon: "stage" },
            { name: "Green Rooms", description: "8 Luxury Suites", icon: "room" },
            { name: "Parking", description: "2000 Spaces", icon: "parking" },
        ],
        upcomingEvents: [
            { name: "Summer Music Fest", date: "Mar 20", price: "$85", status: "Selling Fast" },
            { name: "Pop Sensation Tour", date: "Mar 25", price: "$120", status: "Few Tickets Left" },
            { name: "EDM Night", date: "Mar 28", price: "$75", status: "On Sale" },
        ],
        contact: {
            website: "www.sunsetarena.com",
            email: "events@sunsetarena.com",
            phone: "+1 (305) 555-0134",
            instagram: "@sunsetarena",
        },
        amenities: {
            soundSystem: "Meyer Sound LEO Line Array",
            stageSize: "100ft x 60ft Main Stage",
            greenRooms: "8 Luxury Artist Suites",
            parking: "2000 Space Covered Garage",
        },
        status: "open",
        lastUpdated: "30m ago",
    },
    {
        id: "vinyl-lounge",
        name: "Vinyl Lounge",
        type: "Alternative Music Venue",
        location: "Portland, OR",
        isVerified: true,
        bio: "Underground venue known for indie rock shows and vinyl listening sessions.",
        profileImage: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=2274&auto=format&fit=crop",
        stats: {
            capacity: "300",
            rating: "4.6",
            totalEvents: "780+",
            reviewCount: "450",
        },
        features: [
            { name: "Sound System", description: "Vintage Analog", icon: "speaker" },
            { name: "Stage Size", description: "25ft x 20ft", icon: "stage" },
            { name: "Record Store", description: "In-House", icon: "vinyl" },
            { name: "Bar", description: "Craft Beer", icon: "drink" },
        ],
        upcomingEvents: [
            { name: "Indie Night", date: "Mar 17", price: "$20", status: "On Sale" },
            { name: "Vinyl Sessions", date: "Mar 19", price: "$15", status: "Few Tickets Left" },
            { name: "Local Band Showcase", date: "Mar 21", price: "$18", status: "Selling Fast" },
        ],
        contact: {
            website: "www.vinyllounge.com",
            email: "hello@vinyllounge.com",
            phone: "+1 (503) 555-0167",
            instagram: "@vinylloungepdx",
        },
        amenities: {
            soundSystem: "Custom Vintage Setup",
            stageSize: "25ft x 20ft Stage",
            greenRooms: "2 Artist Areas",
            parking: "Street Parking",
        },
        status: "open",
        lastUpdated: "45m ago",
    },
    {
        id: "metro-hall",
        name: "Metro Hall",
        type: "Classical Music Venue",
        location: "Chicago, IL",
        isVerified: true,
        bio: "Prestigious concert hall renowned for its perfect acoustics and classical music performances.",
        profileImage: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?q=80&w=2274&auto=format&fit=crop",
        stats: {
            capacity: "2,500",
            rating: "4.9",
            totalEvents: "1200+",
            reviewCount: "1800",
        },
        features: [
            { name: "Acoustics", description: "World-Class", icon: "sound" },
            { name: "Stage Size", description: "60ft x 40ft", icon: "stage" },
            { name: "Orchestra Pit", description: "80 Musicians", icon: "orchestra" },
            { name: "Seating", description: "Premium", icon: "seat" },
        ],
        upcomingEvents: [
            { name: "Symphony No. 9", date: "Mar 18", price: "$120", status: "Few Tickets Left" },
            { name: "Chamber Music", date: "Mar 21", price: "$85", status: "On Sale" },
            { name: "Piano Recital", date: "Mar 23", price: "$95", status: "Selling Fast" },
        ],
        contact: {
            website: "www.metrohall.com",
            email: "contact@metrohall.com",
            phone: "+1 (312) 555-0189",
            instagram: "@metrohallchi",
        },
        amenities: {
            soundSystem: "Natural Acoustics",
            stageSize: "60ft x 40ft Concert Stage",
            greenRooms: "6 Artist Suites",
            parking: "Underground Garage",
        },
        status: "open",
        lastUpdated: "1h ago",
    },
    {
        id: "blue-note",
        name: "Blue Note",
        type: "Blues Club",
        location: "Austin, TX",
        isVerified: true,
        bio: "Authentic blues club featuring nightly live music and Southern hospitality.",
        profileImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=2270&auto=format&fit=crop",
        stats: {
            capacity: "200",
            rating: "4.8",
            totalEvents: "2500+",
            reviewCount: "980",
        },
        features: [
            { name: "Sound System", description: "Blues Special", icon: "speaker" },
            { name: "Stage Size", description: "22ft x 18ft", icon: "stage" },
            { name: "BBQ Kitchen", description: "Southern Style", icon: "food" },
            { name: "Bar", description: "Whiskey Bar", icon: "drink" },
        ],
        upcomingEvents: [
            { name: "Blues Night", date: "Mar 16", price: "$30", status: "On Sale" },
            { name: "Guitar Legends", date: "Mar 19", price: "$35", status: "Selling Fast" },
            { name: "Soul Sunday", date: "Mar 21", price: "$28", status: "Few Tickets Left" },
        ],
        contact: {
            website: "www.bluenoteatx.com",
            email: "info@bluenoteatx.com",
            phone: "+1 (512) 555-0145",
            instagram: "@bluenoteatx",
        },
        amenities: {
            soundSystem: "Custom Blues Setup",
            stageSize: "22ft x 18ft Stage",
            greenRooms: "2 Artist Rooms",
            parking: "Lot Parking",
        },
        status: "open",
        lastUpdated: "3h ago",
    },
    {
        id: "warehouse-23",
        name: "Warehouse 23",
        type: "Alternative Venue",
        location: "Seattle, WA",
        isVerified: true,
        bio: "Converted warehouse space hosting experimental music and art performances.",
        profileImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=3270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2270&auto=format&fit=crop",
        stats: {
            capacity: "800",
            rating: "4.7",
            totalEvents: "650+",
            reviewCount: "420",
        },
        features: [
            { name: "Sound System", description: "D&B Audiotechnik", icon: "speaker" },
            { name: "Stage Size", description: "35ft x 25ft", icon: "stage" },
            { name: "Art Gallery", description: "Local Artists", icon: "art" },
            { name: "Food Trucks", description: "Rotating", icon: "food" },
        ],
        upcomingEvents: [
            { name: "Experimental Night", date: "Mar 17", price: "$25", status: "On Sale" },
            { name: "Art & Music Fusion", date: "Mar 20", price: "$30", status: "Few Tickets Left" },
            { name: "Electronic Arts", date: "Mar 22", price: "$28", status: "Selling Fast" },
        ],
        contact: {
            website: "www.warehouse23.com",
            email: "events@warehouse23.com",
            phone: "+1 (206) 555-0178",
            instagram: "@warehouse23sea",
        },
        amenities: {
            soundSystem: "D&B Audiotechnik Array",
            stageSize: "35ft x 25ft Performance Space",
            greenRooms: "3 Artist Areas",
            parking: "Street + Lot",
        },
        status: "open",
        lastUpdated: "4h ago",
    },
    {
        id: "echo-chamber",
        name: "Echo Chamber",
        type: "Electronic Music Venue",
        location: "Denver, CO",
        isVerified: true,
        bio: "State-of-the-art electronic music venue with immersive light shows and sound experiences.",
        profileImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=3270&auto=format&fit=crop",
        stats: {
            capacity: "1,000",
            rating: "4.8",
            totalEvents: "430+",
            reviewCount: "680",
        },
        features: [
            { name: "Sound System", description: "Funktion-One", icon: "speaker" },
            { name: "Light Show", description: "LED Matrix", icon: "lights" },
            { name: "Dance Floor", description: "Sprung Floor", icon: "dance" },
            { name: "Cooling System", description: "Climate Control", icon: "ac" },
        ],
        upcomingEvents: [
            { name: "Techno Tuesday", date: "Mar 16", price: "$30", status: "On Sale" },
            { name: "Bass Night", date: "Mar 19", price: "$35", status: "Selling Fast" },
            { name: "House Music", date: "Mar 21", price: "$40", status: "Few Tickets Left" },
        ],
        contact: {
            website: "www.echochamber.com",
            email: "info@echochamber.com",
            phone: "+1 (303) 555-0156",
            instagram: "@echochamberden",
        },
        amenities: {
            soundSystem: "Funktion-One Dance Stack",
            stageSize: "30ft x 25ft DJ Booth",
            greenRooms: "3 Artist Lounges",
            parking: "Secured Garage",
        },
        status: "open",
        lastUpdated: "2h ago",
    },
    {
        id: "red-room",
        name: "The Red Room",
        type: "Rock Venue",
        location: "Nashville, TN",
        isVerified: true,
        bio: "Iconic rock venue known for launching careers of legendary musicians since 1975.",
        profileImage: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=2274&auto=format&fit=crop",
        stats: {
            capacity: "500",
            rating: "4.9",
            totalEvents: "5000+",
            reviewCount: "1200",
        },
        features: [
            { name: "Sound System", description: "JBL Array", icon: "speaker" },
            { name: "Stage Size", description: "30ft x 25ft", icon: "stage" },
            { name: "Memorabilia", description: "Historic", icon: "history" },
            { name: "Bar", description: "Full Service", icon: "drink" },
        ],
        upcomingEvents: [
            { name: "Rock Legends", date: "Mar 18", price: "$45", status: "Few Tickets Left" },
            { name: "New Rock Night", date: "Mar 20", price: "$25", status: "On Sale" },
            { name: "Tribute Band", date: "Mar 23", price: "$35", status: "Selling Fast" },
        ],
        contact: {
            website: "www.redroomrock.com",
            email: "bookings@redroomrock.com",
            phone: "+1 (615) 555-0187",
            instagram: "@theredroomrock",
        },
        amenities: {
            soundSystem: "JBL Professional Array",
            stageSize: "30ft x 25ft Rock Stage",
            greenRooms: "4 Band Rooms",
            parking: "Venue Lot",
        },
        status: "open",
        lastUpdated: "5h ago",
    },
    {
        id: "harmony-hall",
        name: "Harmony Hall",
        type: "Multi-Purpose Venue",
        location: "San Francisco, CA",
        isVerified: true,
        bio: "Versatile performance space hosting everything from classical concerts to electronic shows.",
        profileImage: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?q=80&w=2274&auto=format&fit=crop",
        stats: {
            capacity: "1,800",
            rating: "4.7",
            totalEvents: "920+",
            reviewCount: "850",
        },
        features: [
            { name: "Sound System", description: "Adaptable System", icon: "speaker" },
            { name: "Stage Size", description: "50ft x 35ft", icon: "stage" },
            { name: "Configuration", description: "Flexible", icon: "setup" },
            { name: "Tech Booth", description: "Advanced", icon: "tech" },
        ],
        upcomingEvents: [
            { name: "Orchestra Night", date: "Mar 17", price: "$75", status: "On Sale" },
            { name: "Pop Concert", date: "Mar 20", price: "$55", status: "Selling Fast" },
            { name: "Dance Show", date: "Mar 22", price: "$45", status: "Few Tickets Left" },
        ],
        contact: {
            website: "www.harmonyhall.com",
            email: "info@harmonyhall.com",
            phone: "+1 (415) 555-0165",
            instagram: "@harmonyhallsf",
        },
        amenities: {
            soundSystem: "Configurable Array System",
            stageSize: "50ft x 35ft Modular Stage",
            greenRooms: "5 Dressing Rooms",
            parking: "Underground Parking",
        },
        status: "open",
        lastUpdated: "1h ago",
    },
    {
        id: "soundscape",
        name: "Soundscape",
        type: "Modern Music Venue",
        location: "Atlanta, GA",
        isVerified: true,
        bio: "Contemporary venue with cutting-edge technology and versatile performance spaces.",
        profileImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=3270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2270&auto=format&fit=crop",
        stats: {
            capacity: "2,000",
            rating: "4.8",
            totalEvents: "750+",
            reviewCount: "960",
        },
        features: [
            { name: "Sound System", description: "Next-Gen Audio", icon: "speaker" },
            { name: "Stage Size", description: "45ft x 35ft", icon: "stage" },
            { name: "Visual Effects", description: "4K Projection", icon: "visual" },
            { name: "VIP Areas", description: "Premium", icon: "vip" },
        ],
        upcomingEvents: [
            { name: "Future Sounds", date: "Mar 19", price: "$50", status: "On Sale" },
            { name: "Urban Night", date: "Mar 21", price: "$45", status: "Few Tickets Left" },
            { name: "Mixed Genre", date: "Mar 24", price: "$55", status: "Selling Fast" },
        ],
        contact: {
            website: "www.soundscapeatl.com",
            email: "contact@soundscapeatl.com",
            phone: "+1 (404) 555-0143",
            instagram: "@soundscapeatl",
        },
        amenities: {
            soundSystem: "Next-Generation Array",
            stageSize: "45ft x 35ft Performance Stage",
            greenRooms: "6 Modern Suites",
            parking: "Valet Available",
        },
        status: "open",
        lastUpdated: "30m ago",
    },
    {
        id: "rhythm-factory",
        name: "Rhythm Factory",
        type: "Industrial Music Venue",
        location: "Detroit, MI",
        isVerified: true,
        bio: "Converted factory space celebrating Detroit's rich musical heritage with modern amenities.",
        profileImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2270&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=2270&auto=format&fit=crop",
        stats: {
            capacity: "1,500",
            rating: "4.6",
            totalEvents: "480+",
            reviewCount: "720",
        },
        features: [
            { name: "Sound System", description: "Industrial Power", icon: "speaker" },
            { name: "Stage Size", description: "38ft x 28ft", icon: "stage" },
            { name: "Multiple Rooms", description: "3 Spaces", icon: "rooms" },
            { name: "Production", description: "In-House", icon: "production" },
        ],
        upcomingEvents: [
            { name: "Techno Night", date: "Mar 16", price: "$35", status: "On Sale" },
            { name: "Industrial Live", date: "Mar 19", price: "$40", status: "Few Tickets Left" },
            { name: "Electronic Fusion", date: "Mar 22", price: "$38", status: "Selling Fast" },
        ],
        contact: {
            website: "www.rhythmfactory.com",
            email: "info@rhythmfactory.com",
            phone: "+1 (313) 555-0198",
            instagram: "@rhythmfactorydet",
        },
        amenities: {
            soundSystem: "Industrial Grade System",
            stageSize: "38ft x 28ft Main Stage",
            greenRooms: "4 Artist Spaces",
            parking: "Free Lot Parking",
        },
        status: "open",
        lastUpdated: "4h ago",
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const venue = venues.find(v => v.id === id);
        if (venue) {
            return NextResponse.json(venue);
        }
        return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    return NextResponse.json(venues);
} 