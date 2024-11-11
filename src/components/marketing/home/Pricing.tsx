import { MdCheck } from 'react-icons/md';

export default function Pricing() {
    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            description: 'Perfect for getting started',
            features: [
                'Basic profile customization',
                'Limited venue discovery',
                'Basic analytics',
                'Community access'
            ]
        },
        {
            name: 'Pro',
            price: '$29',
            description: 'Best for growing artists',
            features: [
                'Advanced profile customization',
                'Priority venue matching',
                'Detailed analytics',
                'Promotional tools',
                'Priority support'
            ],
            popular: true
        },
        {
            name: 'Business',
            price: '$99',
            description: 'For venues and managers',
            features: [
                'Multiple profiles',
                'Advanced booking system',
                'Custom analytics',
                'API access',
                'Dedicated support',
                'Custom solutions'
            ]
        }
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-[#b3b3b3] max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-2xl p-8 ${plan.popular ? 'border-2 border-violet-500' : ''
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 text-white text-sm font-bold rounded-full">
                                    Most Popular
                                </span>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-[#b3b3b3] mb-4">{plan.description}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                {plan.price !== 'Free' && <span className="text-[#b3b3b3]">/month</span>}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <MdCheck className="w-5 h-5 text-violet-400" />
                                        <span className="text-[#b3b3b3]">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
                                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 