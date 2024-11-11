import Image from "next/image";
import { FaSpotify, FaYoutube, FaSoundcloud, FaInstagram } from 'react-icons/fa';
import { PiPlay } from "react-icons/pi";

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 p-6 lg:p-8 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl backdrop-blur-sm border border-white/5">
          <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Artist Profile"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Artist Name</h1>
            <p className="text-[#b3b3b3] mb-4">Electronic Music Producer · Los Angeles, CA</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-600/20">
                Follow
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all">
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Music Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Monthly Listeners', value: '45.2K', trend: '+12%', color: 'text-violet-400' },
            { label: 'Total Streams', value: '1.2M', trend: '+2.5K', color: 'text-fuchsia-400' },
            { label: 'Followers', value: '28.6K', trend: '+856', color: 'text-pink-400' },
            { label: 'Track Count', value: '42', trend: 'New: 2', color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label}
              className="p-4 bg-[#1c1c1c] rounded-xl border border-white/5 hover:border-white/10 transition-all hover:translate-y-[-2px]">
              <p className="text-sm text-[#b3b3b3]">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className={`text-sm ${stat.color} mt-1`}>{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Music */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Featured Tracks</h3>
              <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Midnight Dreams', plays: '124K', duration: '3:45', platform: 'Spotify' },
                { name: 'Electric Sunset', plays: '98K', duration: '4:12', platform: 'SoundCloud' },
                { name: 'Urban Echoes', plays: '76K', duration: '3:28', platform: 'YouTube' },
              ].map((track) => (
                <div key={track.name} className="p-4 bg-[#282828] rounded-lg hover:bg-[#2a2a2a] transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white hover:bg-violet-500 transition-colors">
                        <PiPlay className="w-6 h-6" />
                      </button>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-violet-400 transition-colors">
                          {track.name}
                        </h4>
                        <p className="text-sm text-[#b3b3b3]">
                          {track.plays} plays · {track.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#b3b3b3]">
                      {track.platform === 'Spotify' && <FaSpotify className="w-6 h-6" />}
                      {track.platform === 'SoundCloud' && <FaSoundcloud className="w-6 h-6" />}
                      {track.platform === 'YouTube' && <FaYoutube className="w-6 h-6" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Connect</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Spotify', icon: FaSpotify, color: 'from-green-600/20 to-green-500/20' },
                  { name: 'YouTube', icon: FaYoutube, color: 'from-red-600/20 to-red-500/20' },
                  { name: 'SoundCloud', icon: FaSoundcloud, color: 'from-orange-600/20 to-orange-500/20' },
                  { name: 'Instagram', icon: FaInstagram, color: 'from-pink-600/20 to-purple-600/20' },
                ].map((platform) => (
                  <button
                    key={platform.name}
                    className={`p-4 bg-gradient-to-br ${platform.color} rounded-xl backdrop-blur-sm 
                                border border-white/5 hover:border-white/10 transition-all hover:translate-y-[-2px]
                                flex flex-col items-center gap-2`}
                  >
                    <platform.icon className="w-6 h-6 text-white" />
                    <span className="text-white text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Embedded Player */}
            <div className="bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Latest Release</h3>
              <div className="aspect-video w-full bg-black/50 rounded-lg overflow-hidden">
                {/* Replace with actual embed */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/your-video-id"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Upcoming Shows */}
          <div className="lg:col-span-full bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Upcoming Shows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { venue: 'Electric Arena', date: 'Mar 15', location: 'Los Angeles, CA', status: 'On Sale' },
                { venue: 'Bass Factory', date: 'Mar 22', location: 'Miami, FL', status: 'Sold Out' },
                { venue: 'Cloud Nine', date: 'Apr 5', location: 'New York, NY', status: 'Presale' },
              ].map((show) => (
                <div key={show.venue}
                  className="p-4 bg-[#282828] rounded-lg hover:bg-[#2a2a2a] transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium group-hover:text-violet-400 transition-colors">
                        {show.venue}
                      </h4>
                      <p className="text-sm text-[#b3b3b3]">{show.location}</p>
                    </div>
                    <span className="px-3 py-1 text-xs rounded-full bg-violet-600/20 text-violet-400">
                      {show.status}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">{show.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
