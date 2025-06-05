import Image from 'next/image';
import Link from 'next/link';
import { MdVerified, MdLocationOn, MdPeople, MdMusicNote } from 'react-icons/md';
import type { Musician } from '@/app/api/musicians/route';
import type { Venue } from '@/app/api/venues/route';

type CardVariant = 'square' | 'landscape';
type CardType = 'musician' | 'venue';

interface GridLayoutProps {
    title: string;
    data: (Musician | Venue)[];
    type: CardType;
    variant?: CardVariant;
    viewAllHref: string;
    maxItems?: number;
}

interface CardProps {
    item: Musician | Venue;
    type: CardType;
    variant: CardVariant;
}

function Card({ item, type, variant }: CardProps) {
    const isMusician = type === 'musician';
    const musician = item as Musician;
    const venue = item as Venue;

    const href = isMusician ? `/profile/${item.id}` : `/venue/${item.id}`;
    const hoverColor = isMusician ? 'violet' : 'fuchsia';
    const aspectRatio = variant === 'square' ? 'aspect-square' : 'aspect-[4/3]';

    return (
        <Link
            href={href}
            className={`group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-${hoverColor}-600/10 transition-all duration-300`}
        >
            <div className={`relative ${aspectRatio}`}>
                <Image
                    src={item.profileImage}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-xl font-bold text-white group-hover:text-${hoverColor}-400 transition-colors`}>
                        {item.name}
                    </h3>
                    {item.isVerified && (
                        <div className={`p-1 rounded-full bg-${hoverColor}-600/20 backdrop-blur-sm`}>
                            <MdVerified className={`w-4 h-4 text-${hoverColor}-400`} />
                        </div>
                    )}
                </div>
                <p className="text-sm text-zinc-300 mb-2">
                    {isMusician ? musician.genre : venue.type}
                </p>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <MdLocationOn className="w-4 h-4" />
                    {item.location}
                </div>
            </div>
        </Link>
    );
}

export default function GridLayout({
    title,
    data,
    type,
    variant = 'square',
    viewAllHref,
    maxItems = 8
}: GridLayoutProps) {
    const isMusician = type === 'musician';
    const icon = isMusician ? MdMusicNote : MdPeople;
    const IconComponent = icon;
    const themeColor = isMusician ? 'violet' : 'fuchsia';

    return (
        <div className="space-y-6 px-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-${themeColor}-600/20 backdrop-blur-sm`}>
                        <IconComponent className={`w-6 h-6 text-${themeColor}-400`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <p className="text-sm text-zinc-400">{data?.length || 0} {title.toLowerCase()}</p>
                    </div>
                </div>
                <Link
                    href={viewAllHref}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all"
                >
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.slice(0, maxItems).map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        type={type}
                        variant={variant}
                    />
                ))}
            </div>
        </div>
    );
} 