'use client';

import { Suspense, useState, useEffect } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Dropdown, DropdownMenu, DropdownButton } from "@/components/ui/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/ui/navbar";
import {
    SidebarItem,
    SidebarBody,
    SidebarHeader,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
    SidebarHeading,
} from "@/components/ui/sidebar";
import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/ui/sidebar-layout";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { DropdownItems } from "./DropdownItems";

import {
    userDropdownItems,
    teamDropdownItems,
    mainNavItems,
    upcomingEvents,
    bottomNavItems,
    utilityNavItems,
} from "./navigation-data";

interface SidebarFullProps {
    children: React.ReactNode;
}

function LoadingPlaceholder() {
    return (
        <div className="animate-pulse bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] min-h-screen">
            <div className="h-16 bg-zinc-800/50" /> {/* Navbar placeholder */}
            <div className="w-64 h-screen bg-zinc-900/50 fixed left-0 top-0">
                <div className="p-4">
                    <div className="h-10 bg-zinc-800/50 rounded-lg mb-4" />
                    <div className="space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-8 bg-zinc-800/50 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SidebarFull({ children }: SidebarFullProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <LoadingPlaceholder />;
    }

    return (
        <Suspense fallback={<LoadingPlaceholder />}>
            <SidebarLayout
                navbar={
                    <Navbar>
                        <NavbarSpacer />
                        <NavbarSection>
                            {utilityNavItems.map((item) => (
                                <NavbarItem key={item.href} href={item.href} aria-label={item.label}>
                                    <item.icon className="h-6 w-6" />
                                </NavbarItem>
                            ))}
                            <Dropdown>
                                <DropdownButton as={NavbarItem}>
                                    <Avatar src="/profile-photo.jpg" square />
                                </DropdownButton>
                                <DropdownMenu className="min-w-64" anchor="bottom end">
                                    <DropdownItems items={userDropdownItems} />
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarSection>
                    </Navbar>
                }
                sidebar={
                    <Sidebar>
                        <SidebarHeader>
                            <Dropdown>
                                <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                                    <Avatar src="/tailwind-logo.svg" />
                                    <SidebarLabel>Tailwind Labs</SidebarLabel>
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                                    <DropdownItems items={teamDropdownItems} />
                                </DropdownMenu>
                            </Dropdown>
                            <SidebarSection className="max-lg:hidden">
                                {utilityNavItems.map((item) => (
                                    <SidebarItem key={item.href} href={item.href}>
                                        <item.icon />
                                        <SidebarLabel>{item.label}</SidebarLabel>
                                    </SidebarItem>
                                ))}
                            </SidebarSection>
                        </SidebarHeader>
                        <SidebarBody>
                            <SidebarSection>
                                {mainNavItems.map((item) => (
                                    <SidebarItem key={item.href} href={item.href}>
                                        <item.icon />
                                        <SidebarLabel>{item.label}</SidebarLabel>
                                    </SidebarItem>
                                ))}
                            </SidebarSection>
                            <SidebarSection className="max-lg:hidden">
                                <SidebarHeading>Upcoming Events</SidebarHeading>
                                {upcomingEvents.map((event) => (
                                    <SidebarItem key={event.href} href={event.href}>
                                        {event.label}
                                    </SidebarItem>
                                ))}
                            </SidebarSection>
                            <SidebarSpacer />
                            <SidebarSection>
                                {bottomNavItems.map((item) => (
                                    <SidebarItem key={item.href} href={item.href}>
                                        <item.icon />
                                        <SidebarLabel>{item.label}</SidebarLabel>
                                    </SidebarItem>
                                ))}
                            </SidebarSection>
                        </SidebarBody>
                        <SidebarFooter className="max-lg:hidden">
                            <Dropdown>
                                <DropdownButton as={SidebarItem}>
                                    <span className="flex min-w-0 items-center gap-3">
                                        <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                                                Erica
                                            </span>
                                            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                                erica@example.com
                                            </span>
                                        </span>
                                    </span>
                                    <ChevronUpIcon />
                                </DropdownButton>
                                <DropdownMenu className="min-w-64" anchor="top start">
                                    <DropdownItems items={userDropdownItems} />
                                </DropdownMenu>
                            </Dropdown>
                        </SidebarFooter>
                    </Sidebar>
                }
            >
                <div className=" min-h-screen">
                    {children}
                </div>
            </SidebarLayout>
        </Suspense>
    );
}
