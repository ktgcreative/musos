import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { MdVerified, MdLocationOn } from 'react-icons/md';

type ActionButton = {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    primary?: boolean;
};

type HeroProps = {
    name: string;
    isVerified: boolean;
    location: string;
    subtitle: string;
    profileImage: string;
    coverImage: string;
    actions: ActionButton[];
};

const CoverImage = ({ src, alt }: { src: string; alt: string }) => (
    <Suspense fallback={<div className="absolute inset-0 bg-[#242424] animate-pulse" />}>
        <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
    </Suspense>
);

const ProfileImage = ({ src, alt }: { src: string; alt: string }) => (
    <Suspense fallback={<div className="absolute inset-0 bg-[#242424] animate-pulse" />}>
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
        />
    </Suspense>
);

const ActionButton = ({ icon, label, href, onClick, primary = false }: ActionButton) => {
    const className = `px-6 py-2 ${primary
        ? 'bg-violet-600 hover:bg-violet-700 hover:scale-105'
        : 'bg-white/10 hover:bg-white/20'
        } text-white font-medium rounded-full flex items-center gap-2 transition-all`;

    if (href) {
        return (
            <Link href={href} className={className}>
                {icon}
                {label}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className}>
            {icon}
            {label}
        </button>
    );
};

export default function Hero({
    name,
    isVerified,
    location,
    subtitle,
    profileImage,
    coverImage,
    actions
}: HeroProps) {
    return (
        <div className="relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden group">
            <CoverImage src={coverImage} alt="Cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-end gap-6">
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-[#1c1c1c]">
                        <ProfileImage src={profileImage} alt={name} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white">{name}</h1>
                            {isVerified && (
                                <MdVerified className="w-6 h-6 text-violet-400" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-[#b3b3b3] mb-4">
                            <MdLocationOn className="w-5 h-5" />
                            <span>{location}</span>
                            <span className="mx-2">•</span>
                            <span>{subtitle}</span>
                        </div>
                        <div className="flex gap-3">
                            {actions.map((action, index) => (
                                <ActionButton key={index} {...action} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 