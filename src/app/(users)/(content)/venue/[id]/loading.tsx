import { MdPeople, MdStar } from 'react-icons/md';

export default function LoadingVenue() {
    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header/Hero Section Skeleton */}
                <div className="relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-[#242424] animate-pulse" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="flex items-end gap-6">
                            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-[#1c1c1c] bg-[#242424] animate-pulse" />
                            <div className="flex-1">
                                <div className="h-12 w-64 bg-[#242424] rounded-lg animate-pulse mb-4" />
                                <div className="h-6 w-48 bg-[#242424] rounded-lg animate-pulse mb-4" />
                                <div className="flex gap-3">
                                    <div className="h-10 w-32 bg-[#242424] rounded-full animate-pulse" />
                                    <div className="h-10 w-32 bg-[#242424] rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Cards Skeleton */}
                    <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-5 w-32 bg-[#242424] rounded animate-pulse" />
                            <MdPeople className="w-5 h-5 text-[#242424]" />
                        </div>
                        <div className="h-8 w-24 bg-[#242424] rounded animate-pulse mb-1" />
                        <div className="h-4 w-20 bg-[#242424] rounded animate-pulse" />
                    </div>

                    <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-5 w-32 bg-[#242424] rounded animate-pulse" />
                            <MdStar className="w-5 h-5 text-[#242424]" />
                        </div>
                        <div className="h-8 w-24 bg-[#242424] rounded animate-pulse mb-1" />
                        <div className="h-4 w-20 bg-[#242424] rounded animate-pulse" />
                    </div>

                    {/* Upcoming Events Skeleton */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[150px]">
                        <div className="h-7 w-40 bg-[#2a2a2a] rounded animate-pulse mb-4" />
                        <div className="space-y-3">
                            {[1, 2, 3].map((index) => (
                                <div key={index}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[#2a2a2a]/50 animate-pulse"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#242424] rounded-lg" />
                                        <div>
                                            <div className="h-5 w-32 bg-[#242424] rounded mb-2" />
                                            <div className="h-4 w-24 bg-[#242424] rounded" />
                                        </div>
                                    </div>
                                    <div className="h-6 w-20 bg-[#242424] rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Venue Features Skeleton */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px]">
                        <div className="h-7 w-40 bg-[#2a2a2a] rounded animate-pulse mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-[#2a2a2a] rounded-xl animate-pulse"
                                >
                                    <div className="h-5 w-5 bg-[#242424] rounded mb-2" />
                                    <div className="h-5 w-24 bg-[#242424] rounded mb-1" />
                                    <div className="h-4 w-32 bg-[#242424] rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information Skeleton */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px]">
                        <div className="h-7 w-32 bg-[#2a2a2a] rounded animate-pulse mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-[#2a2a2a] rounded-xl animate-pulse"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-5 w-5 bg-[#242424] rounded" />
                                        <div className="h-5 w-20 bg-[#242424] rounded" />
                                    </div>
                                    <div className="h-4 w-32 bg-[#242424] rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 