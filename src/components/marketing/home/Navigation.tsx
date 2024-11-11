'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdMenu, MdClose } from 'react-icons/md';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-white">MUSOS</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                href="/discover"
                                className="text-sm text-zinc-300 hover:text-white transition-colors"
                            >
                                Discover
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-sm text-zinc-300 hover:text-white transition-colors"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm text-zinc-300 hover:text-white transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm text-zinc-300 hover:text-white transition-colors"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm text-white hover:text-zinc-300 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <MdClose className="w-6 h-6" />
                            ) : (
                                <MdMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black md:hidden">
                    <div className="flex flex-col pt-24 px-6 space-y-8">
                        <Link
                            href="/discover"
                            className="text-lg font-medium text-white hover:text-zinc-300 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Discover
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-lg font-medium text-white hover:text-zinc-300 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="text-lg font-medium text-white hover:text-zinc-300 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-lg font-medium text-white hover:text-zinc-300 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        <div className="pt-8 flex flex-col gap-4">
                            <Link
                                href="/login"
                                className="w-full py-3 text-center text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="w-full py-3 text-center bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 