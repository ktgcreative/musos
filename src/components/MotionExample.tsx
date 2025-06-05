"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

// Animation variants for reusability
const fadeUpVariant = {
    initial: { opacity: 0, y: 100 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const exitAnimation = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
};

const MotionExample = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="p-8 space-y-8">
            {/* Basic fade-up animation */}
            <motion.div
                variants={fadeUpVariant}
                initial="initial"
                animate="animate"
                className="bg-blue-500 text-white p-6 rounded-lg"
            >
                <h1 className="text-2xl font-bold">Welcome to Motion for Next.js!</h1>
                <p className="mt-2">This content fades up smoothly on page load.</p>
            </motion.div>

            {/* Button with hover and tap animations */}
            <motion.button
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVisible(!isVisible)}
            >
                Toggle Component
            </motion.button>

            {/* Exit animations with AnimatePresence */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="animated-box"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={exitAnimation}
                        className="bg-purple-500 text-white p-6 rounded-lg"
                    >
                        <h2 className="text-xl font-bold">Hello, Motion!</h2>
                        <p>This component slides in and out with smooth animations.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Staggered children animation */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delayChildren: 0.3,
                            staggerChildren: 0.2,
                        },
                    },
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {[1, 2, 3].map((item) => (
                    <motion.div
                        key={item}
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                            },
                        }}
                        className="bg-yellow-500 text-black p-4 rounded-lg text-center"
                    >
                        <h3 className="font-bold">Card {item}</h3>
                        <p>Staggered animation</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MotionExample; 