"use client";
import { useState, useMemo, useEffect } from 'react';
import type { Musician } from '@/app/api/musicians/route';
import type { Venue } from '@/app/api/venues/route';
import SearchInput from './SearchInput';
import ListItem from './ListItem';
import Link from 'next/link';

type FilterCategory = 'musicians' | 'venues' | 'all';
type SortOption = 'name' | 'rating' | 'location' | 'type' | 'status';

// Add type definitions to handle stats properly
type MusicianStats = {
    monthlyListeners: string;
    followers: string;
    totalStreams: string;
    trackCount: string;
};

type VenueStats = {
    capacity: string;
    rating: string;
    totalEvents: string;
    reviewCount: string;
};

// Add this helper function at the top level, outside the component
const groupByFirstLetter = (items: (Musician | Venue)[]) => {
    return items.reduce((groups: { [key: string]: (Musician | Venue)[] }, item) => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(item);
        return groups;
    }, {});
};

export default function Sidebar() {
    // State Management
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus] = useState<'all' | Musician['status']>('all');
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
    const [sortBy, setSortBy] = useState<SortOption>('name');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [musiciansRes, venuesRes] = await Promise.all([
                    fetch('/api/musicians'),
                    fetch('/api/venues')
                ]);
                const [musiciansData, venuesData] = await Promise.all([
                    musiciansRes.json(),
                    venuesRes.json()
                ]);
                setMusicians(musiciansData);
                setVenues(venuesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Derived Data
    const locations = useMemo(() => {
        const allLocations = new Set<string>();
        venues.forEach(venue => allLocations.add(venue.location));
        musicians.forEach(musician => musician.location && allLocations.add(musician.location));
        return ['all', ...Array.from(allLocations)].sort();
    }, [venues, musicians]);

    const types = useMemo(() => {
        const allTypes = new Set<string>();
        venues.forEach(venue => allTypes.add(venue.type));
        musicians.forEach(musician => allTypes.add(musician.genre));
        return ['all', ...Array.from(allTypes)].sort();
    }, [venues, musicians]);

    // Filtering Logic
    const filteredItems = useMemo(() => {
        let items: (Musician | Venue)[] = [];

        if (filterCategory === 'all' || filterCategory === 'musicians') {
            items = [...items, ...musicians];
        }
        if (filterCategory === 'all' || filterCategory === 'venues') {
            items = [...items, ...venues];
        }

        return items.filter(item => {
            const matchesSearch = (
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ('genre' in item && item.genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                ('type' in item && item.type.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            const matchesStatus = selectedStatus === 'all' ||
                ('status' in item && item.status === selectedStatus);

            const matchesLocation = selectedLocation === 'all' ||
                ('location' in item && item.location === selectedLocation);

            const matchesType = selectedType === 'all' ||
                ('type' in item && item.type === selectedType) ||
                ('genre' in item && item.genre === selectedType);

            return matchesSearch && matchesStatus && matchesLocation && matchesType;
        });
    }, [searchTerm, selectedStatus, filterCategory, selectedLocation, selectedType, musicians, venues]);

    // Sorting Logic
    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rating':
                    // Check if the item is a venue (only venues have ratings)
                    const aRating = 'stats' in a && isVenueStats(a.stats) ? parseFloat(a.stats.rating) : 0;
                    const bRating = 'stats' in b && isVenueStats(b.stats) ? parseFloat(b.stats.rating) : 0;
                    return bRating - aRating;
                case 'location':
                    return (a.location || '').localeCompare(b.location || '');
                case 'type':
                    const aType = 'type' in a ? a.type : ('genre' in a ? a.genre : '');
                    const bType = 'type' in b ? b.type : ('genre' in b ? b.genre : '');
                    return aType.localeCompare(bType);
                default:
                    return 0;
            }
        });
    }, [filteredItems, sortBy]);

    // Add a type guard function to check if stats are venue stats
    function isVenueStats(stats: MusicianStats | VenueStats): stats is VenueStats {
        return 'rating' in stats;
    }

    // UI Components
    const FilterButtons = () => (
        <div className="flex gap-2 px-4 py-2 overflow-x-auto">
            {(['all', 'musicians', 'venues'] as const).map((category) => (
                <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-4 py-1.5 text-xs rounded-full transition-all ${filterCategory === category
                        ? 'bg-[#1ed760] text-black font-bold hover:bg-[#1db954]'
                        : 'bg-[#242424] text-[#b3b3b3] hover:bg-[#2a2a2a] hover:text-white'
                        }`}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );

    const SortDropdown = () => (
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 text-xs rounded-full bg-[#242424] text-white border-none focus:ring-2 focus:ring-[#1ed760]"
        >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="location">Location</option>
            <option value="type">Type</option>
        </select>
    );

    const LocationFilter = () => (
        <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-full bg-[#242424] text-white border-none focus:ring-2 focus:ring-[#1ed760]"
        >
            {locations.map(location => (
                <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                </option>
            ))}
        </select>
    );

    const TypeFilter = () => (
        <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-full bg-[#242424] text-white border-none focus:ring-2 focus:ring-[#1ed760]"
        >
            {types.map(type => (
                <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                </option>
            ))}
        </select>
    );

    if (loading) {
        return (
            <aside className="fixed top-0 left-0 w-72 h-screen bg-[#121212] flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1ed760]" />
            </aside>
        );
    }

    return (
        <aside className="fixed top-0 left-0 w-72 h-screen bg-black flex flex-col z-50">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 animate-gradient-xy pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-white/5">
                <Link href="/">
                    <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        MUSOS
                    </h2>
                </Link>
                <p className="text-sm text-zinc-400 mt-1">
                    {filteredItems.length} items found
                </p>
            </div>

            {/* Search */}
            <div className="relative z-10 p-4">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur group-hover:blur-md transition-all" />
                    <div className="relative">
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Search musicians and venues..."
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="relative z-10 space-y-2 px-4 py-2 border-b border-white/5">
                <FilterButtons />
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <SortDropdown />
                    <LocationFilter />
                    <TypeFilter />
                </div>
            </div>

            {/* Results List */}
            <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
                {sortedItems.length === 0 ? (
                    <p className="text-center text-zinc-400 py-4">
                        No matches found
                    </p>
                ) : (
                    <div className="space-y-1 p-2">
                        {Object.entries(groupByFirstLetter(sortedItems))
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([letter, items]) => (
                                <div key={letter} className="mb-4">
                                    <div className="sticky top-0 z-20 px-3 py-2">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm -z-10" />
                                            <h3 className="text-xs font-bold text-zinc-400 uppercase">
                                                {letter}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        {(items as (Musician | Venue)[]).map((item) => (
                                            <ListItem
                                                key={item.id}
                                                {...item}
                                                subtitle={'genre' in item ? item.genre : item.type}
                                                href={`/${'genre' in item ? 'profile' : 'venue'}/${item.id}`}
                                                status={'status' in item ? item.status : undefined}
                                                rating={'stats' in item && isVenueStats(item.stats) ? item.stats.rating : undefined}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </aside>
    );
} 