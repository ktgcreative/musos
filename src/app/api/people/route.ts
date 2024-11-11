import { NextResponse } from 'next/server';

export type Person = {
    id: number;
    name: string;
    role: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
    lastActive?: string;
};

const people: Person[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        role: 'Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        status: 'online',
        lastActive: 'now'
    },
    {
        id: 2,
        name: 'Bob Smith',
        role: 'UI Designer',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
        status: 'offline',
        lastActive: '2h ago'
    },
    {
        id: 3,
        name: 'Charlie Brown',
        role: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        status: 'away',
        lastActive: '5m ago'
    },
    {
        id: 4,
        name: 'David Wilson',
        role: 'Backend Developer',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
        status: 'online',
        lastActive: 'now'
    },
    {
        id: 5,
        name: 'Emma Davis',
        role: 'DevOps Engineer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        status: 'online',
        lastActive: 'now'
    },
    {
        id: 6,
        name: 'Frank Miller',
        role: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        status: 'away',
        lastActive: '15m ago'
    },
    {
        id: 7,
        name: 'Grace Lee',
        role: 'QA Engineer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
        status: 'offline',
        lastActive: '1d ago'
    },
    {
        id: 8,
        name: 'Henry Taylor',
        role: 'Systems Architect',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
        status: 'online',
        lastActive: 'now'
    },
    {
        id: 9,
        name: 'Isabel Rodriguez',
        role: 'UX Researcher',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',
        status: 'away',
        lastActive: '30m ago'
    },
    {
        id: 10,
        name: 'Jack Thompson',
        role: 'Mobile Developer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        status: 'online',
        lastActive: 'now'
    },
    {
        id: 11,
        name: 'Kelly White',
        role: 'Project Manager',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
        status: 'offline',
        lastActive: '3h ago'
    },
    {
        id: 12,
        name: 'Liam Anderson',
        role: 'Security Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        status: 'online',
        lastActive: 'now'
    },
    {
        id: 13,
        name: 'Maria Garcia',
        role: 'Database Administrator',
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop',
        status: 'away',
        lastActive: '45m ago'
    },
    {
        id: 14,
        name: 'Nathan Parker',
        role: 'Cloud Engineer',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop',
        status: 'offline',
        lastActive: '5h ago'
    }
];

export async function GET() {
    return NextResponse.json(people);
}