export type Theme = {
    id: string;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    gradients: {
        primary: string;
        secondary: string;
    };
};

export const themes: Theme[] = [
    {
        id: 'muso',
        name: 'Muso Default',
        colors: {
            primary: 'violet-600',
            secondary: 'fuchsia-600',
            accent: 'violet-400'
        },
        gradients: {
            primary: 'from-violet-600 to-fuchsia-600',
            secondary: 'from-violet-600/20 to-fuchsia-600/20'
        }
    },
    {
        id: 'synthwave',
        name: 'Synthwave',
        colors: {
            primary: 'pink-500',
            secondary: 'purple-600',
            accent: 'blue-400'
        },
        gradients: {
            primary: 'from-pink-500 via-purple-600 to-blue-700',
            secondary: 'from-pink-500/20 via-purple-600/20 to-blue-700/20'
        }
    },
    {
        id: 'goldstage',
        name: 'Gold Stage',
        colors: {
            primary: 'yellow-500',
            secondary: 'amber-600',
            accent: 'orange-400'
        },
        gradients: {
            primary: 'from-yellow-400 via-amber-500 to-orange-600',
            secondary: 'from-yellow-400/20 via-amber-500/20 to-orange-600/20'
        }
    },
    {
        id: 'midnight',
        name: 'Midnight Cinema',
        colors: {
            primary: 'red-600',
            secondary: 'slate-800',
            accent: 'red-500'
        },
        gradients: {
            primary: 'from-red-600 via-red-700 to-slate-900',
            secondary: 'from-red-600/20 via-red-700/20 to-slate-900/20'
        }
    },
    {
        id: 'neon',
        name: 'Neon Nights',
        colors: {
            primary: 'cyan-500',
            secondary: 'blue-600',
            accent: 'cyan-400'
        },
        gradients: {
            primary: 'from-cyan-400 via-blue-500 to-purple-600',
            secondary: 'from-cyan-400/20 via-blue-500/20 to-purple-600/20'
        }
    },
    {
        id: 'retrowave',
        name: 'Retro Wave',
        colors: {
            primary: 'fuchsia-500',
            secondary: 'purple-600',
            accent: 'pink-400'
        },
        gradients: {
            primary: 'from-fuchsia-500 via-purple-600 to-indigo-700',
            secondary: 'from-fuchsia-500/20 via-purple-600/20 to-indigo-700/20'
        }
    },
    {
        id: 'electric',
        name: 'Electric Blue',
        colors: {
            primary: 'blue-500',
            secondary: 'cyan-600',
            accent: 'blue-400'
        },
        gradients: {
            primary: 'from-blue-500 via-cyan-500 to-indigo-600',
            secondary: 'from-blue-500/20 via-cyan-500/20 to-indigo-600/20'
        }
    },
    {
        id: 'sunset',
        name: 'Sunset Vibes',
        colors: {
            primary: 'orange-500',
            secondary: 'rose-600',
            accent: 'yellow-400'
        },
        gradients: {
            primary: 'from-orange-400 via-rose-500 to-purple-600',
            secondary: 'from-orange-400/20 via-rose-500/20 to-purple-600/20'
        }
    },
    {
        id: 'acid',
        name: 'Acid Rain',
        colors: {
            primary: 'lime-500',
            secondary: 'green-600',
            accent: 'yellow-400'
        },
        gradients: {
            primary: 'from-lime-400 via-green-500 to-emerald-600',
            secondary: 'from-lime-400/20 via-green-500/20 to-emerald-600/20'
        }
    },
    {
        id: 'deephouse',
        name: 'Deep House',
        colors: {
            primary: 'indigo-500',
            secondary: 'violet-600',
            accent: 'blue-400'
        },
        gradients: {
            primary: 'from-indigo-500 via-violet-500 to-purple-700',
            secondary: 'from-indigo-500/20 via-violet-500/20 to-purple-700/20'
        }
    },
    {
        id: 'vinyl',
        name: 'Vinyl Black',
        colors: {
            primary: 'neutral-600',
            secondary: 'slate-800',
            accent: 'neutral-400'
        },
        gradients: {
            primary: 'from-neutral-600 via-slate-700 to-neutral-900',
            secondary: 'from-neutral-600/20 via-slate-700/20 to-neutral-900/20'
        }
    },
    {
        id: 'aurora',
        name: 'Aurora Lights',
        colors: {
            primary: 'teal-500',
            secondary: 'green-600',
            accent: 'cyan-400'
        },
        gradients: {
            primary: 'from-teal-400 via-green-500 to-cyan-600',
            secondary: 'from-teal-400/20 via-green-500/20 to-cyan-600/20'
        }
    }
]; 