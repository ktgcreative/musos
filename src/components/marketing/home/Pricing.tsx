import { MdCheck } from 'react-icons/md';
import Link from 'next/link';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started',
        features: [
            'Basic artist profile',
            'Connect up to 2 music platforms',
            'Basic analytics',
            'Limited venue discovery',
            'Community support'
        ],
        buttonText: 'Get Started',
        buttonHref: '/signup',
        highlighted: false
    },
    {
        name: 'Pro',
        price: '$5',
        period: 'per month',
        description: 'Everything you need to grow',
        features: [
            'Enhanced artist profile & EPK',
            'Connect unlimited music platforms',
            'Advanced analytics & insights',
            'Priority venue matching',
            'Direct messaging with venues',
            'Booking & payment management',
            'Priority support',
            'Custom profile domain'
        ],
        buttonText: 'Start Free Trial',
        buttonHref: '/signup?plan=pro',
        highlighted: true
    }
];

export default function Pricing() {
    return (
        <div className="relative bg-black py-24 sm:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 animate-gradient-xy" />

            <div className="relative z-10 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-violet-400">Pricing</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Choose the perfect plan for your journey
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative group ${plan.highlighted ? 'lg:translate-y-0' : 'lg:translate-y-8'
                                }`}
                        >
                            <div className="absolute inset-px rounded-2xl bg-zinc-900/50 backdrop-blur-sm" />
                            <div className="relative h-full flex flex-col overflow-hidden rounded-2xl">
                                <div className="p-8 sm:p-10">
                                    <h3 className="text-lg font-semibold leading-8 text-violet-400">
                                        {plan.name}
                                    </h3>
                                    <div className="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-white">
                                        {plan.price}
                                        <span className="text-lg font-semibold leading-8 tracking-normal text-zinc-400">
                                            /{plan.period}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-base leading-7 text-zinc-400">
                                        {plan.description}
                                    </p>
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                                    <ul role="list" className="space-y-4">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <MdCheck className="h-6 w-6 flex-none text-violet-400" />
                                                <span className="text-sm text-zinc-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={plan.buttonHref}
                                        className={`mt-8 block rounded-full px-8 py-4 text-center text-sm font-semibold leading-6 transition-all ${plan.highlighted
                                                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-105'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </Link>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-2xl shadow-lg shadow-violet-500/10 ring-1 ring-white/10" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 