"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
    children: React.ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
} & (
        | { isStatic: true; imageSrc: string }
        | { isStatic?: false; imageSrc?: never }
    );

export const LinkPreview = ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    layout = "fixed",
    isStatic = false,
    imageSrc = "",
}: LinkPreviewProps) => {
    let src;
    if (!isStatic) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Extract video ID
            const videoId = url.includes('youtube.com') ?
                url.split('v=')[1]?.split('&')[0] :
                url.split('youtu.be/')[1]?.split('?')[0];

            // Use YouTube thumbnail API
            src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        } else {
            const params = encode({
                url,
                screenshot: true,
                meta: false,
                embed: "screenshot.url",
                colorScheme: "dark",
                "viewport.isMobile": true,
                "viewport.deviceScaleFactor": 1,
                "viewport.width": width * 3,
                "viewport.height": height * 3,
            });
            src = `https://api.microlink.io/?${params}`;
        }
    } else {
        src = imageSrc;
    }

    const [isOpen, setOpen] = React.useState(false);

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);

    const translateX = useSpring(x, springConfig);

    const handleMouseMove = (event: any) => {
        const targetRect = event.target.getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
        x.set(offsetFromCenter);
    };

    return (
        <>
            {isMounted ? (
                <div className="hidden">
                    <Image
                        src={src}
                        width={width}
                        height={height}
                        quality={quality}
                        layout={layout}
                        priority={true}
                        alt="hidden image"
                    />
                </div>
            ) : null}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
            >
                <HoverCardPrimitive.Trigger
                    onMouseMove={handleMouseMove}
                    className={cn("text-black dark:text-white", className)}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)] data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="shadow-xl rounded-xl overflow-hidden bg-black/5 backdrop-blur-sm"
                                style={{
                                    x: translateX,
                                }}
                            >
                                <Link
                                    href={url}
                                    className="block p-1 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl hover:border-violet-500/20 transition-all duration-300"
                                    style={{ fontSize: 0 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src={isStatic ? imageSrc : src}
                                        width={width}
                                        height={height}
                                        quality={quality}
                                        layout={layout}
                                        priority={true}
                                        className="rounded-lg object-cover"
                                        alt="preview image"
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    );
};
