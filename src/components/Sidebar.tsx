"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import type { Musician } from '@/app/api/musicians/route';

const Sidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<'all' | Musician['status']>('all');
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMusicians = async () => {
            try {
                const response = await fetch('/api/musicians');
                const data = await response.json();
                setMusicians(data);
            } catch (error) {
                console.error('Error fetching musicians:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMusicians();
    }, []);

    const groupedMusicians = useMemo(() => {
        const filtered = musicians.filter(musician => {
            const matchesSearch = musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                musician.genre.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || musician.status === selectedStatus;
            return matchesSearch && matchesStatus;
        });

        return filtered.reduce((groups, musician) => {
            const firstLetter = musician.name[0].toUpperCase();
            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(musician);
            return groups;
        }, {} as Record<string, Musician[]>);
    }, [searchTerm, selectedStatus, musicians]);

    const sortedLetters = Object.keys(groupedMusicians).sort();

    const getStatusColor = (status: Musician['status']) => {
        switch (status) {
            case 'online':
                return 'bg-[#1ed760]';
            case 'offline':
                return 'bg-[#b3b3b3]';
            case 'away':
                return 'bg-[#f6a609]';
        }
    };

    const StatusFilter = () => (
        <div className="flex gap-2 px-4 py-2 overflow-x-auto">
            {(['all', 'online', 'away', 'offline'] as const).map((status) => (
                <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-1.5 text-xs rounded-full transition-all ${selectedStatus === status
                        ? 'bg-white text-black font-bold hover:bg-[#f6f6f6]'
                        : 'bg-[#242424] text-[#b3b3b3] hover:bg-[#2a2a2a] hover:text-white'
                        }`}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
            ))}
        </div>
    );

    if (loading) {
        return (
            <aside className="w-72 h-screen bg-[#121212] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1ed760]" />
            </aside>
        );
    }

    return (
        <aside className="w-72 h-screen bg-gradient-to-b from-[#121212] to-[#181818] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-[#282828]">
                <Link href="/" className="block">
                    <h2 className="text-lg font-bold text-white">Musicians</h2>
                    <p className="text-sm text-[#b3b3b3] mt-1">
                        {musicians.filter(m => m.status === 'online').length} online
                    </p>
                </Link>
            </div>

            {/* Search */}
            <div className="p-4">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search musicians..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 bg-[#242424] text-white placeholder-[#b3b3b3] border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1ed760] transition-all"
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-[#b3b3b3]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <StatusFilter />

            {/* Navigation Links */}
            <nav className="px-4 py-2 border-b border-[#282828]">
                <Link
                    href="/discover"
                    className="flex items-center px-4 py-2 text-[#b3b3b3] hover:text-white rounded-md hover:bg-[#282828] transition-all"
                >
                    Discover
                </Link>
                <Link
                    href="/venues"
                    className="flex items-center px-4 py-2 text-[#b3b3b3] hover:text-white rounded-md hover:bg-[#282828] transition-all"
                >
                    Venues
                </Link>
            </nav>

            {/* Musicians List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortedLetters.length === 0 ? (
                    <p className="text-center text-[#b3b3b3] py-4">
                        No matches found
                    </p>
                ) : (
                    sortedLetters.map((letter) => (
                        <div key={letter} className="mb-4">
                            <div className="px-4 py-2 text-xs font-bold text-[#b3b3b3] bg-[#181818]">
                                {letter}
                            </div>
                            <div className="px-4 space-y-1">
                                {groupedMusicians[letter].map((musician) => (
                                    <Link
                                        key={musician.id}
                                        href={`/profile/${musician.id}`}
                                        className="flex items-center p-3 rounded-md hover:bg-[#282828] transition-all group"
                                    >
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={musician.profileImage}
                                                alt={musician.name}
                                                fill
                                                className="rounded-full object-cover"
                                                sizes="40px"
                                            />
                                            <span
                                                className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#181818] rounded-full ${getStatusColor(
                                                    musician.status
                                                )}`}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-medium text-white group-hover:text-[#1ed760] transition-colors">
                                                    {musician.name}
                                                </p>
                                                {musician.lastActive && (
                                                    <span className="text-xs text-[#b3b3b3]">
                                                        {musician.lastActive}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-[#b3b3b3]">
                                                {musician.genre}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* User Profile Link */}
            {musicians.length > 0 && (
                <div className="p-4 border-t border-[#282828]">
                    <Link
                        href={`/musician/${musicians[0].id}`}
                        className="flex items-center p-2 rounded-md hover:bg-[#282828] transition-all"
                    >
                        <div className="relative w-8 h-8">
                            <Image
                                src={musicians[0].profileImage}
                                alt={musicians[0].name}
                                fill
                                className="rounded-full object-cover"
                                sizes="32px"
                            />
                            <span
                                className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-[#181818] rounded-full ${getStatusColor(
                                    musicians[0].status
                                )}`}
                            />
                        </div>
                        <span className="ml-3 text-sm font-medium text-white">
                            Your Profile
                        </span>
                    </Link>
                </div>
            )}
        </aside>
    );
};

export default Sidebar; 