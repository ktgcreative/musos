"use client";
import { useState, useEffect } from 'react';
import { Musician } from '@/app/api/musicians/route';
import { Venue } from '@/app/api/venues/route';
import ListItem from './ListItem';

type Props = {
    searchTerm: string;
};

type FilterCategory = 'musicians' | 'venues' | 'all';
type SortOption = 'name' | 'rating' | 'location' | 'type' | 'status';

// Helper functions
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

function isVenueStats(stats: any): stats is { rating: string } {
    return 'rating' in stats;
}

export default function SidebarList({ searchTerm }: Props) {
    const [loading, setLoading] = useState(true);
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
    const [sortBy, setSortBy] = useState<SortOption>('name');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1ed760]" />
            </div>
        );
    }

    const allItems = [...musicians, ...venues];

    // Apply search filter
    const searchedItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ('genre' in item && item.genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ('type' in item && item.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Derived data - use allItems instead of searchedItems for complete lists
    const locations = Array.from(new Set(allItems.map(item => item.location))).sort();
    const types = Array.from(new Set(allItems.map(item =>
        'genre' in item ? item.genre : item.type
    ))).sort();

    // Filtering
    const filteredItems = searchedItems.filter(item => {
        const matchesCategory = filterCategory === 'all' ||
            (filterCategory === 'musicians' && 'genre' in item) ||
            (filterCategory === 'venues' && 'type' in item);

        const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;

        const matchesType = selectedType === 'all' ||
            ('genre' in item && item.genre === selectedType) ||
            ('type' in item && item.type === selectedType);

        return matchesCategory && matchesLocation && matchesType;
    });

    // Sorting
    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
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

    // Filter Components
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

    const FilterControls = () => (
        <div className="flex gap-2 overflow-x-auto">
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

            <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-full bg-[#242424] text-white border-none focus:ring-2 focus:ring-[#1ed760]"
            >
                <option value="all">All Locations</option>
                {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>

            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-full bg-[#242424] text-white border-none focus:ring-2 focus:ring-[#1ed760]"
            >
                <option value="all">All Types</option>
                {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="h-full">
            <div className="px-6 py-2 text-sm text-zinc-400">
                {searchedItems.length} items found
            </div>
            {/* Sticky Filters Section */}
            <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-white/5">
                <div className="space-y-2 px-4 py-2">
                    <FilterButtons />
                    <FilterControls />
                </div>
            </div>

            {/* Items List */}
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
                                <div className="sticky top-[84px] z-20 px-3 py-2">
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
    );
} 