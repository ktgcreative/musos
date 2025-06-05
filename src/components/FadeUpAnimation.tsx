"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeUpAnimationProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

const fadeUpVariant = {
    initial: { opacity: 0, y: 100 },
    animate: (duration: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration,
        },
    }),
};

const FadeUpAnimation = ({
    children,
    delay = 0,
    duration = 0.5,
    className = ""
}: FadeUpAnimationProps) => {
    return (
        <motion.div
            variants={fadeUpVariant}
            initial="initial"
            animate="animate"
            custom={duration}
            transition={{
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeUpAnimation; 