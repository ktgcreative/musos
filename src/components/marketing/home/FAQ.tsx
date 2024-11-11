'use client';

import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'How do I get started?',
            answer: 'Simply sign up for a free account and complete your profile. You can then start connecting with venues or musicians immediately.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for our premium plans.'
        },
        {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
        },
        {
            question: 'Do you offer support for venues?',
            answer: 'Yes, we offer dedicated support for venues through our Business plan, including custom solutions and priority support.'
        }
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[#b3b3b3]">
                        Find answers to common questions about our platform.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#242424] to-[#1c1c1c] rounded-xl overflow-hidden"
                        >
                            <button
                                className="w-full px-6 py-4 flex items-center justify-between text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                <MdExpandMore
                                    className={`w-6 h-6 text-violet-400 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-4">
                                    <p className="text-[#b3b3b3]">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 