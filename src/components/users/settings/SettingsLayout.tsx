import { ReactNode } from 'react';
import { Theme } from '@/config/themes';

interface SettingsLayoutProps {
    children: ReactNode;
    currentTheme: Theme;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}

export function SettingsLayout({ children, title, icon: Icon }: SettingsLayoutProps) {
    return (
        <div className="bg-gradient-secondary rounded-2xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            {children}
        </div>
    );
} 