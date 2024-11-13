"use client";
import { useState, useEffect } from 'react';
import type { Musician } from '@/app/api/musicians/route';
import type { Venue } from '@/app/api/venues/route';
import SearchInput from './SearchInput';
import Link from 'next/link';
import SidebarList from './SidebarList';

export default function Sidebar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

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

    const filteredItems = [...musicians, ...venues].filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ('genre' in item && item.genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ('type' in item && item.type.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 animate-gradient-xy pointer-events-none" />

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

            <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
                <SidebarList items={filteredItems} />
            </div>
        </aside>
    );
} 