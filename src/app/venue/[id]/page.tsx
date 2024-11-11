'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaInstagram, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaMusic } from 'react-icons/fa';
import { MdVerified, MdEmail, MdLocationOn, MdPeople, MdStar } from 'react-icons/md';


export default function VenueProfile() {
    const params = useParams();
    const venueId = params.id;

    // Mock data - would be fetched from API in real application
    const mockData = {
        id: venueId,
        name: "The Electric Room",
        isVerified: true,
        location: "Los Angeles, CA",
        type: "Live Music Venue",
        capacity: "1,200",
        rating: "4.8",
        totalEvents: "520+",
        bio: "Premier live music venue featuring state-of-the-art sound system and hosting both emerging artists and established acts.",
        coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=3270&auto=format&fit=crop",
        profileImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=3270&auto=format&fit=crop",
    };

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header/Hero Section */}
                <div className="relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden group">
                    <Image
                        src={mockData.coverImage}
                        alt="Venue Cover"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="flex items-end gap-6">
                            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-[#1c1c1c]">
                                <Image
                                    src={mockData.profileImage}
                                    alt={mockData.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-white">{mockData.name}</h1>
                                    {mockData.isVerified && (
                                        <MdVerified className="w-6 h-6 text-violet-400" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-[#b3b3b3] mb-4">
                                    <MdLocationOn className="w-5 h-5" />
                                    <span>{mockData.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{mockData.type}</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-full flex items-center gap-2 transition-all hover:scale-105">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        Book Venue
                                    </button>
                                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Venue Stats */}
                    <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Capacity</h3>
                            <MdPeople className="w-5 h-5 text-violet-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{mockData.capacity}</p>
                        <p className="text-sm text-[#b3b3b3] mt-1">Standing Room</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Rating</h3>
                            <MdStar className="w-5 h-5 text-yellow-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{mockData.rating}</p>
                        <p className="text-sm text-yellow-400 mt-1">Based on 320 reviews</p>
                    </div>

                    {/* Upcoming Events Preview */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                            <Link href="#" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Electronic Night', date: 'Mar 15', price: '$25', status: 'On Sale' },
                                { name: 'Jazz Evening', date: 'Mar 18', price: '$30', status: 'Selling Fast' },
                                { name: 'Rock Festival', date: 'Mar 22', price: '$40', status: 'Few Tickets Left' },
                            ].map((event) => (
                                <div key={event.name} className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl hover:bg-[#303030] transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center">
                                            <FaTicketAlt className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium group-hover:text-violet-400 transition-colors">
                                                {event.name}
                                            </h4>
                                            <p className="text-sm text-[#b3b3b3]">{event.date} • {event.price}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs rounded-full bg-violet-600/20 text-violet-400">
                                        {event.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Venue Features */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Venue Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Sound System', icon: FaMusic, description: 'L-Acoustics K2' },
                                { name: 'Stage Size', icon: FaMapMarkerAlt, description: '40ft x 30ft' },
                                { name: 'Green Rooms', icon: MdPeople, description: '4 Private Rooms' },
                                { name: 'Parking', icon: FaMapMarkerAlt, description: '200 Spaces' },
                            ].map((feature) => (
                                <div
                                    key={feature.name}
                                    className="p-4 bg-[#2a2a2a] rounded-xl hover:bg-[#303030] transition-all"
                                >
                                    <feature.icon className="w-5 h-5 text-violet-400 mb-2" />
                                    <h4 className="text-white font-medium mb-1">{feature.name}</h4>
                                    <p className="text-sm text-[#b3b3b3]">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Contact & Social</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Website', icon: FaGlobe, link: 'www.electricroom.com' },
                                { name: 'Email', icon: MdEmail, link: 'bookings@electricroom.com' },
                                { name: 'Instagram', icon: FaInstagram, link: '@electricroom' },
                                { name: 'Booking', icon: FaCalendarAlt, link: 'Request Booking' },
                            ].map((contact) => (
                                <div
                                    key={contact.name}
                                    className="p-4 bg-[#2a2a2a] rounded-xl hover:bg-[#303030] transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <contact.icon className="w-5 h-5 text-violet-400" />
                                        <span className="text-white font-medium">{contact.name}</span>
                                    </div>
                                    <p className="text-sm text-[#b3b3b3]">{contact.link}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 