import Image from 'next/image';
import Link from 'next/link';
import { MdVerified } from 'react-icons/md';

type ListItemProps = {
    id: string;
    name: string;
    isVerified: boolean;
    profileImage: string;
    subtitle: string;
    location: string;
    href: string;
    status?: string;
    rating?: string;
};

export default function ListItem({
    name,
    isVerified,
    profileImage,
    subtitle,
    location,
    href,
    status,
    rating
}: ListItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center p-3 rounded-xl hover:bg-zinc-800/50 backdrop-blur-sm transition-all group"
        >
            <div className="relative w-10 h-10">
                <Image
                    src={profileImage}
                    alt={name}
                    fill
                    className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="40px"
                />
                {status && (
                    <span
                        className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-black rounded-full ${status === 'online' ? 'bg-violet-400' :
                                status === 'away' ? 'bg-fuchsia-400' :
                                    'bg-zinc-400'
                            }`}
                    />
                )}
            </div>
            <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                        {name}
                        {isVerified && (
                            <span className="inline-block ml-1">
                                <MdVerified className="w-4 h-4 text-violet-400" />
                            </span>
                        )}
                    </p>
                    {rating && (
                        <span className="text-xs text-zinc-400">
                            ★ {rating}
                        </span>
                    )}
                </div>
                <p className="text-xs text-zinc-400">{subtitle}</p>
                <p className="text-xs text-zinc-400">{location}</p>
            </div>
        </Link>
    );
} 