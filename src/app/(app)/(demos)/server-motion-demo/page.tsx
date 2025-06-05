import FadeUpAnimation from "@/components/FadeUpAnimation";

// This is a server component
export default function ServerMotionDemoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto py-12 px-4">
                <FadeUpAnimation className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Server Component + Motion
                    </h1>
                    <p className="text-xl text-gray-600">
                        Using Motion animations in Next.js server components
                    </p>
                </FadeUpAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FadeUpAnimation delay={0.2} className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Server Components
                        </h2>
                        <p className="text-gray-600">
                            Server components provide better performance and SEO benefits while still supporting animations through client component wrappers.
                        </p>
                    </FadeUpAnimation>

                    <FadeUpAnimation delay={0.4} className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Motion Library
                        </h2>
                        <p className="text-gray-600">
                            The modern Motion library provides smooth, performant animations that work seamlessly with React 19 and Next.js 15.
                        </p>
                    </FadeUpAnimation>

                    <FadeUpAnimation delay={0.6} className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Best Practices
                        </h2>
                        <p className="text-gray-600">
                            Combine server components for data fetching and static content with client components for interactive animations.
                        </p>
                    </FadeUpAnimation>
                </div>

                <FadeUpAnimation delay={0.8} className="mt-12 text-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">
                            Why Motion over Framer Motion?
                        </h3>
                        <ul className="text-left text-gray-600 space-y-2">
                            <li>✅ Better React 19 compatibility</li>
                            <li>✅ Smaller bundle size</li>
                            <li>✅ More modern API</li>
                            <li>✅ Improved performance</li>
                            <li>✅ Active development and support</li>
                        </ul>
                    </div>
                </FadeUpAnimation>
            </div>
        </div>
    );
} 