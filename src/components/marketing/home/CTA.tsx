import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

export default function CTA() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-3xl p-8 md:p-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Take Your Music Career to the Next Level?
                    </h2>
                    <p className="text-lg text-[#b3b3b3] mb-8 max-w-2xl mx-auto">
                        Join thousands of musicians and venues already growing their presence on our platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/signup"
                            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                        >
                            Get Started Free
                            <MdArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 