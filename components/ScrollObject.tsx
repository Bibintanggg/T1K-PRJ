"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollObjectProps {
    children: React.ReactNode;
    // Trigger element - elemen yang jadi patokan mulai animasi
    triggerElement?: string | HTMLElement;
    // Animation config
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    // Scroll trigger config
    start?: string; // default: "top center"
    end?: string; // default: "bottom center"
    scrub?: boolean | number; // smooth scroll animation
    markers?: boolean; // debug mode
    pin?: boolean; // pin element saat scroll
    // Container
    containerRef?: React.RefObject<HTMLElement>;
    className?: string;
}

export default function ScrollObject({
    children,
    triggerElement,
    from = { opacity: 0, y: 100 },
    to = { opacity: 1, y: 0 },
    start = "top center",
    end = "bottom center",
    scrub = true,
    markers = false,
    pin = false,
    containerRef,
    className = "",
}: ScrollObjectProps) {
    const objectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!objectRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                objectRef.current,
                from,
                {
                    ...to,
                    scrollTrigger: {
                        trigger: triggerElement || objectRef.current,
                        start: start,
                        end: end,
                        scrub: scrub,
                        markers: markers,
                        pin: pin,
                        scroller: containerRef?.current || undefined,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [from, to, start, end, scrub, markers, pin, triggerElement, containerRef]);

    return (
        <div ref={objectRef} className={className}>
            {children}
        </div>
    );
}