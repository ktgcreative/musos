import {
    MagnifyingGlassIcon,
    EnvelopeIcon,
    UserIcon,
    Cog6ToothIcon,
    ShieldCheckIcon,
    LightBulbIcon,
    ArrowRightOnRectangleIcon,
    Cog8ToothIcon,
    PlusIcon,
    HomeIcon,
    Square2StackIcon,
    TicketIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
} from "@heroicons/react/24/solid";

export const userDropdownItems = [
    { href: "/my-profile", icon: UserIcon, label: "My profile" },
    { href: "/edit-profile", icon: Cog6ToothIcon, label: "Settings" },
    { isDivider: true },
    { href: "/privacy-policy", icon: ShieldCheckIcon, label: "Privacy policy" },
    { href: "/share-feedback", icon: LightBulbIcon, label: "Share feedback" },
    { isDivider: true },
    { href: "/logout", icon: ArrowRightOnRectangleIcon, label: "Sign out" },
];

export const teamDropdownItems = [
    { href: "/teams/1/settings", icon: Cog8ToothIcon, label: "Settings" },
    { isDivider: true },
    {
        href: "/teams/1",
        avatar: { src: "/tailwind-logo.svg" },
        label: "Musos Manager",
    },
    {
        href: "/teams/2",
        avatar: { initials: "WC", className: "bg-purple-500 text-white" },
        label: "Workcation",
    },
    { isDivider: true },
    { href: "/teams/create", icon: PlusIcon, label: "New team…" },
];

export const mainNavItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/events", icon: Square2StackIcon, label: "Events" },
    { href: "/orders", icon: TicketIcon, label: "Orders" },
    { href: "/edit-profile", icon: Cog6ToothIcon, label: "Settings" },
    { href: "/broadcasts", icon: MegaphoneIcon, label: "Broadcasts" },
];

export const upcomingEvents = [
    { href: "/events/1", label: "Bear Hug: Live in Concert" },
    { href: "/events/2", label: "Viking People" },
    { href: "/events/3", label: "Six Fingers — DJ Set" },
    { href: "/events/4", label: "We All Look The Same" },
];

export const bottomNavItems = [
    { href: "/support", icon: QuestionMarkCircleIcon, label: "Support" },
    { href: "/changelog", icon: SparklesIcon, label: "Changelog" },
];

export const utilityNavItems = [
    { href: "/search", icon: MagnifyingGlassIcon, label: "Search" },
    { href: "/inbox", icon: EnvelopeIcon, label: "Inbox" },
]; 