'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfileDefault() {
    const router = useRouter();

    useEffect(() => {
        router.push('/edit-profile/info');
    }, [router]);

    return null;
} 