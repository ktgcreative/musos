import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

// Sample IDs for random selection
const SAMPLE_IDS = ['1', '2', '3', '4', '5'];

const getRandomId = () => {
    return SAMPLE_IDS[Math.floor(Math.random() * SAMPLE_IDS.length)];
};

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-b from-transparent to-black/50 backdrop-blur-sm mt-auto py-6 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Main Pages */}
                    <div>
                        <h4 className="text-white font-medium mb-3">Main Pages</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/discover" className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm">
                                    Discover
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Profiles */}
                    <div>
                        <h4 className="text-white font-medium mb-3">Profiles</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={`/profile/${getRandomId()}`}
                                    className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm"
                                >
                                    Random Artist
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/venue/${getRandomId()}`}
                                    className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm"
                                >
                                    Random Venue
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-medium mb-3">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/edit-profile" className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm">
                                    Edit Profile
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/yourusername/yourrepo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm inline-flex items-center gap-2"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-medium mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-[#b3b3b3] hover:text-violet-400 transition-colors text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                    <p className="text-center text-sm text-[#b3b3b3]">
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 