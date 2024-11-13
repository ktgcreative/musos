"use client";
import Link from 'next/link';
import SearchInput from './SearchInput';
import SidebarList from './SidebarList';
import { useState } from 'react';

export default function Sidebar() {
    const [searchTerm, setSearchTerm] = useState('');

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
                <SidebarList searchTerm={searchTerm} />
            </div>
        </aside>
    );
} 