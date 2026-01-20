"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface GiantScrollObjectProps {
    children: React.ReactNode;
    containerRef?: React.RefObject<HTMLElement>;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    // Enhanced visual effects
    blur?: boolean;          // Blur saat jauh
    glow?: boolean;          // Glow effect
    pulse?: boolean;         // Pulsing effect
    parallaxSpeed?: number;  // Kecepatan parallax (0.1 - 2)
    className?: string;
}

export default function GiantScrollObject({
    children,
    containerRef,
    from = { opacity: 0, y: 200, scale: 0.5 },
    to = { opacity: 0.7, y: -200, scale: 1.2 },
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    blur = true,
    glow = true,
    pulse = false,
    parallaxSpeed = 1,
    className = "",
}: GiantScrollObjectProps) {
    const objectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!objectRef.current) return;

        const ctx = gsap.context(() => {
            // Main animation
            const animation: gsap.TweenVars = { ...to };

            // Add blur effect
            if (blur) {
                animation.filter = "blur(0px)";
                (from as any).filter = "blur(10px)";
            }

            gsap.fromTo(objectRef.current, from, {
                ...animation,
                scrollTrigger: {
                    trigger: objectRef.current,
                    start: start,
                    end: end,
                    scrub: scrub * parallaxSpeed,
                    scroller: containerRef?.current || undefined,
                },
            });

            // Pulse effect
            if (pulse) {
                gsap.to(objectRef.current, {
                    scale: "+=0.1",
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        });

        return () => ctx.revert();
    }, [from, to, start, end, scrub, blur, pulse, parallaxSpeed, containerRef]);

    return (
        <div
            ref={objectRef}
            className={`
                ${className}
                ${glow ? "drop-shadow-[0_0_50px_currentColor]" : ""}
                transition-all duration-300
            `}
            style={{
                willChange: "transform, opacity, filter",
            }}
        >
            {children}
        </div>
    );
}