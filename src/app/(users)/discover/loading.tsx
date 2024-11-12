import { MdMusicNote, MdPeople } from 'react-icons/md';

export default function LoadingDiscover() {
    return (
        <main className="flex-1 bg-black min-h-screen">
            {/* Background Effects */}
            <div className="fixed inset-0 ml-72 bg-gradient-to-br from-black via-black/95 to-transparent" />
            <div className="fixed inset-0 ml-72 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-10 w-40 bg-[#242424] rounded-lg animate-pulse" />
                        <div className="h-5 w-64 bg-[#242424] rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Musicians Section Skeleton */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-violet-600/20 backdrop-blur-sm">
                                <MdMusicNote className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                                <div className="h-8 w-32 bg-[#242424] rounded-lg animate-pulse" />
                                <div className="h-4 w-24 bg-[#242424] rounded-lg animate-pulse mt-1" />
                            </div>
                        </div>
                        <div className="h-10 w-24 bg-[#242424] rounded-full animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden"
                            >
                                <div className="aspect-square relative bg-[#242424] animate-pulse" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-7 w-32 bg-[#2a2a2a] rounded animate-pulse" />
                                        <div className="h-6 w-6 rounded-full bg-[#2a2a2a] animate-pulse" />
                                    </div>
                                    <div className="h-5 w-24 bg-[#2a2a2a] rounded animate-pulse mb-2" />
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded bg-[#2a2a2a] animate-pulse" />
                                        <div className="h-4 w-20 bg-[#2a2a2a] rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

                {/* Venues Section Skeleton */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-fuchsia-600/20 backdrop-blur-sm">
                                <MdPeople className="w-6 h-6 text-fuchsia-400" />
                            </div>
                            <div>
                                <div className="h-8 w-32 bg-[#242424] rounded-lg animate-pulse" />
                                <div className="h-4 w-24 bg-[#242424] rounded-lg animate-pulse mt-1" />
                            </div>
                        </div>
                        <div className="h-10 w-24 bg-[#242424] rounded-full animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden"
                            >
                                <div className="relative aspect-[4/3] bg-[#242424] animate-pulse" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-7 w-32 bg-[#2a2a2a] rounded animate-pulse" />
                                        <div className="h-6 w-6 rounded-full bg-[#2a2a2a] animate-pulse" />
                                    </div>
                                    <div className="h-5 w-24 bg-[#2a2a2a] rounded animate-pulse mb-2" />
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded bg-[#2a2a2a] animate-pulse" />
                                        <div className="h-4 w-20 bg-[#2a2a2a] rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
} 