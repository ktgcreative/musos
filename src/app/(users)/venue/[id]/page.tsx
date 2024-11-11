'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaInstagram, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaMusic } from 'react-icons/fa';
import { MdEmail, MdPeople, MdStar } from 'react-icons/md';
import type { Venue } from '@/app/api/venues/route';
import LoadingVenue from './loading';
import Hero from '@/components/shared/Hero';

export default function VenueProfile() {
    const params = useParams();
    const venueId = params.id;
    const [venue, setVenue] = useState<Venue | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await fetch(`/api/venues?id=${venueId}`);
                const data = await response.json();
                setVenue(data);
            } catch (error) {
                console.error('Error fetching venue:', error);
            } finally {
                setLoading(false);
            }
        };

        if (venueId) {
            fetchVenue();
        }
    }, [venueId]);

    if (loading || !venue) {
        return <LoadingVenue />;
    }

    const heroActions = [
        {
            icon: <FaCalendarAlt className="w-4 h-4" />,
            label: 'Book Venue',
            onClick: () => {/* Handle booking */ },
            primary: true
        },
        {
            icon: null,
            label: 'Contact',
            onClick: () => {/* Handle contact */ }
        }
    ];

    return (
        <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                <Hero
                    name={venue.name}
                    isVerified={venue.isVerified}
                    location={venue.location}
                    subtitle={venue.type}
                    profileImage={venue.profileImage}
                    coverImage={venue.coverImage}
                    actions={heroActions}
                />

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Cards */}
                    <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Capacity</h3>
                            <MdPeople className="w-5 h-5 text-violet-400" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{venue.stats.capacity}</p>
                        <p className="text-sm text-[#b3b3b3]">Standing Room</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-[#b3b3b3]">Rating</h3>
                            <MdStar className="w-5 h-5 text-yellow-400" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{venue.stats.rating}</p>
                        <p className="text-sm text-yellow-400">Based on {venue.stats.reviewCount} reviews</p>
                    </div>

                    {/* Upcoming Events Preview */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[150px]">
                        <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                        <div className="space-y-3">
                            {venue.upcomingEvents.map((event) => (
                                <div key={event.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center">
                                            <FaTicketAlt className="w-4 h-4 text-violet-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-medium text-white group-hover:text-violet-400 transition-colors">
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
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px]">
                        <h3 className="text-xl font-bold text-white mb-4">Venue Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Sound System', icon: FaMusic, description: venue.amenities.soundSystem },
                                { name: 'Stage Size', icon: FaMapMarkerAlt, description: venue.amenities.stageSize },
                                { name: 'Green Rooms', icon: MdPeople, description: venue.amenities.greenRooms },
                                { name: 'Parking', icon: FaMapMarkerAlt, description: venue.amenities.parking },
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
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-6 min-h-[250px]">
                        <h3 className="text-xl font-bold text-white mb-4">Contact & Social</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Website', icon: FaGlobe, link: venue.contact.website },
                                { name: 'Email', icon: MdEmail, link: venue.contact.email },
                                { name: 'Phone', icon: FaCalendarAlt, link: venue.contact.phone },
                                { name: 'Instagram', icon: FaInstagram, link: venue.contact.instagram },
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